// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { startDatabase } = require('./database/mongo');

const {
    getDenial,
    getIntrusion,
    getExecutable,
    getMisuse,
    getUnauthorized,
    getProbing,
    getOther,
    getIdentities
} = require('./api')
// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// define the end point
app.get('/incidents', async (req, res) => {
    try {
        const response = await Promise.all([
            getDenial(),
            getIntrusion(),
            getExecutable(),
            getMisuse(),
            getUnauthorized(),
            getProbing(),
            getOther(),
            getIdentities(),
        ])

        const typeList = ['denial', 'intrustion', 'executable', 'misuse', 'unauthorized', 'probing', 'other']
        const levelList = ['low', 'medium', 'high', 'critical']
        const ipToEmployee = response[7].data
        const results = {}

        for (const [index, type] of typeList.entries()) {
            for (const value of response[index].data.results) {
                const { priority, reported_by, internal_ip, machine_ip, employee_id, ip, identifier } = value
                const employeeNumber = (typeof identifier === 'string' ? undefined : identifier) || reported_by || employee_id
                const ipAddress = (typeof identifier === 'string' ? identifier : undefined) || internal_ip || machine_ip || ip || Object.keys(ipToEmployee).find((key) => ipToEmployee[key] === employeeNumber)
                results[ipToEmployee[ipAddress]] = results[ipToEmployee[ipAddress]] || levelList.reduce((a, v) => ({ ...a, [v]: { count: 0, incidents: [] } }), {})
                results[ipToEmployee[ipAddress]][priority]['count'] += 1
                results[ipToEmployee[ipAddress]][priority]['incidents'].push({ ...value })
            }
        }
        // sorting
        for (const employeeData in results) {
            for (const type in results[employeeData]) {
                if (results[employeeData][type].incidents.length > 0) {
                    results[employeeData][type].incidents.sort((a,b) => a.timestamp - b.timestamp)
                }
            }
        }

        res.send(results);
    } catch (error) {
        console.log(error)
    }
})

// start the in-memory MongoDB instance
startDatabase().then(async () => {
    // start the server
    app.listen(9000, async () => {
        console.log('listening on port 9000');
    });
});