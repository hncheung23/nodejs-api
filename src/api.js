const axios = require('axios');
const { setupCache } = require('axios-cache-adapter')
require('dotenv').config();

// create cache timer
const cache = setupCache({
    maxAge: 3600 * 1000
})

// create axios instancev
const api = axios.create({
    adapter: cache.adapter
})

async function getDenial() {
    return api({
        method: 'get',
        url: 'https://incident-api.use1stag.elevatesecurity.io/incidents/denial/',
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
        }
    })
}

async function getIntrusion() {
    return api({
        method: 'get',
        url: 'https://incident-api.use1stag.elevatesecurity.io/incidents/intrusion/',
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
        }
    })
}

async function getExecutable() {
    return api({
        method: 'get',
        url: 'https://incident-api.use1stag.elevatesecurity.io/incidents/executable/',
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
        }
    })
}

async function getMisuse() {
    return api({
        method: 'get',
        url: 'https://incident-api.use1stag.elevatesecurity.io/incidents/misuse/',
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
        }
    })
}

async function getUnauthorized() {
    return api({
        method: 'get',
        url: 'https://incident-api.use1stag.elevatesecurity.io/incidents/unauthorized/',
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
        }
    })
}

async function getProbing() {
    return api({
        method: 'get',
        url: 'https://incident-api.use1stag.elevatesecurity.io/incidents/probing/',
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
        }
    })
}

async function getOther() {
    return api({
        method: 'get',
        url: 'https://incident-api.use1stag.elevatesecurity.io/incidents/other/',
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
        }
    })
}

async function getIdentities() {
    return api({
        method: 'get',
        url: 'https://incident-api.use1stag.elevatesecurity.io/identities',
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
        }
    })
}
module.exports = {
    getDenial,
    getIntrusion,
    getExecutable,
    getMisuse,
    getUnauthorized,
    getProbing,
    getOther,
    getIdentities
};