# currency-converter
## Requirements

#### Used Node.js for backend, React JS with Redux for frontend, MongoDB - database cluster.

## Done 
 #### For backend use Node.js with any common framework (express, hapi, koa and serverless are all recommended) . 
 ####  Your API can be based on REST or GraphQL
 #### For frontend we prefer React but you can also use other modern frameworks
 #### In the backend, use an external API to get the currency rates.
 #### The frontend has to communicate only with your custom API.
 #### The app should also display the following stats:
 ####  1. Most popular destination currency
 ####  2. Total amount converted (in USD)
 #### 3. Total number of conversion requests made
 #### Do not use locally installed database. You can use local file, free version of some cloud database or any other method.

## Not Done - In the process.
 #### Make sure the stats are not cleared on restart and are aggregate for all visitors. This means they have to be calculated and stored in the backend.


## Used 
#### Try to use ES6+ and/or typescript
#### Split the code into several modules. Don’t use just one file for the Node server.

#### When building the API, consider it public. Other developers might use it so make sure it's understandable, validate inputs, etc.
#### Submit your work as a Git repo. Commit often as you work.
#### Make your work production-ready
#### Expect the app will be later developed further by someone else. Write your code with that in mind.

## Not used 
#### Additional tips - Currency rates APIs: https://openexchangerates.org, https://currencylayer.com, http://fixer.io. Used custom:  https://www.currencyconverterapi.com/docs.


Steps to run the code

#### 1. npm install
#### 2. cd backend
####   3. npm install
####   4. node server.js
#### 3. cd ..
#### 4. cd client
####   5. npm install
####   6. npm start
#### 7. cd ..
