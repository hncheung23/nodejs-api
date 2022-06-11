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

