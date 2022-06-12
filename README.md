# nodejs-api

Instructions on how to run

1. go to root directory
2. run: ```npm install```
3. run: ```node src```
4. Go to ```http://localhost:9000/incidents```  
5. We get the results :)  

Paragraph with overall approach and other approaches you considered

I am using nodejs with express and axios to make the api call. With the help of ```Helmet```, which helps secure my Express apps by setting various HTTP headers. Besides, I create a new ```morgan``` logger middleware function to log HTTP requests and we can store the log to the in-memory MongoDB instance. Since we have 7 api calls to make, I use ```Promise.all``` approaches instead of using several ```await```. ```Promise.all``` has a fail-fast behavior and it is rejected if any of the elements are rejected. As we need all the responsese from the api calls, it is a waste of time if we have to wait for all other api calls finished before we reject. Last but not least, cache with 1hr expiration is implemented in the api call in order to reduce the amount of callings and saving the time.

Paragraph on how you would enhance this code if you needed it to run in production

1. We can set the correct status code for that in the response. If the everything is okay, we can return status code 2xx. If the request cannot be fulfilled because of a client error (like requesting a resource that does not exist), we can return 4xx.
2. Conduct a black-box testing on api call. We can examine the functionality of an application without the knowledge of its internal structures or workings. Therefore none of the dependencies are mocked, but the system is tested as a whole.
3. Enforce rate limiting for controlling how many requests a given consumer can send to the API. For example, we can use X-Rate-Limit-Limit to control the number of requests allowed in a given time interval in order to prevent overload of server.
