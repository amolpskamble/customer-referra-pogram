## Project Setup Instructions 
&nbsp;
#### 1. create .env file in the project root with following content
```
### LOGGING ###
LOGGER_LEVEL=info

### DATABASE ###
DB=upstox
DB_URI=localhost:27017

### PORT ###
PORT=5000

#### NODE ENVIRONMENT ###
NODE_ENV=development
```

#### 2. Create a mongodb database as follow
```
#> mongod
>  use upstox
```
#### 3. Add unique database index
```
db.getCollection("customers").ensureIndex( { email: 1 }, { unique: true } )
db.getCollection("customers").ensureIndex( { customerId: 1 }, { unique: true } )
```
#### 4. Run the following command to install depedencies
```
npm install
```
#### 5. Run the following command to run the app
```
node index.js
```
***
&nbsp;
## API Documentation
#### Postman Collection
https://www.getpostman.com/collections/4fcc58968458c3db17e9
#### Postman Environment : import this .json file in the enviroment
```
{
  "id": "7cde4053-8aac-f506-b36c-cbdcbc8fdcc6",
  "name": "Customer Referral Program",
  "values": [
    {
      "enabled": true,
      "key": "uri",
      "value": "http://localhost:5000/api/v1",
      "type": "text"
    }
  ],
  "timestamp": 1534597951758,
  "_postman_variable_scope": "environment",
  "_postman_exported_at": "2018-08-19T22:31:38.203Z",
  "_postman_exported_using": "Postman/5.5.3"
}
```
&nbsp;
#### 1. For Adding A new Customer
    POST {{uri}}/customer
***

##### Body Parameters
- **email** — email of the customer. (required)
- **referral** — refer by (optional)
  
##### Request format
```
{
	"email":"amol.p.s.kamble@gmail.com"
}
```
##### Response Format
```
{
    "__v": 0,
    "customerId": 1,
    "updated_at": "2018-08-19T21:17:05.965Z",
    "created_at": "2018-08-19T21:17:05.965Z",
    "email": "amol.p.s.kamble@gmail.com",
    "_id": "5b79de510a9ea3101a6b82c4",
    "payback": 0,
    "nonce": "5b79de320a9ea3101a6b82c2"
}
```
&nbsp;
***
#### 2. Get teh customr by customer id
    GET {{uri}}/customer/:customerId
***

##### Path Parameters
- **customerId** — customer id (required)
##### Response Format
```
{
    "_id": "5b79de510a9ea3101a6b82c4",
    "customerId": 1,
    "updated_at": "2018-08-19T21:17:05.965Z",
    "created_at": "2018-08-19T21:17:05.965Z",
    "email": "amol.p.s.kamble@gmail.com",
    "__v": 0,
    "payback": 0,
    "nonce": "5b79de320a9ea3101a6b82c2"
}
```
&nbsp;
***
#### 3. Add a referral under a customer
    PUT {{uri}}/customer/:customerId/referral/:referralId
***

##### Path Parameters
- **customerId** — customer id of child node (required)
- **referralId** — customer id of parent node (required)

##### Response Format
```
true
```
&nbsp;
***
#### 4. Get all children under a customer
    GET {{uri}}/customer/:customerId/children
***

##### Path Parameters
- **customerId** — customer id (required)
##### Response Format
```
[
    {
        "_id": "5b79e0900a9ea3101a6b82c6",
        "customerId": 3,
        "updated_at": "2018-08-19T21:26:49.898Z",
        "created_at": "2018-08-19T21:26:40.860Z",
        "email": "amol.p.s.kamble1@gmail.com",
        "__v": 0,
        "referral": 1,
        "payback": 0,
        "nonce": "5b79de320a9ea3101a6b82c2"
    }
]
```
&nbsp;
***
#### 5. Get all customers with their referral count
    GET {{uri}}/customer/total/referral?order=desc
***

##### Path Parameters
- **order** — sorting order desc or asc (optional)
##### Response Format
```
[
    {
        "_id": "5b79de510a9ea3101a6b82c4",
        "customerId": 1,
        "updated_at": "2018-08-19T21:26:49.912Z",
        "created_at": "2018-08-19T21:17:05.965Z",
        "email": "amol.p.s.kamble@gmail.com",
        "payback": 30,
        "totalReferral": 1
    },
    {
        "_id": "5b79e07b0a9ea3101a6b82c5",
        "customerId": 2,
        "updated_at": "2018-08-19T21:26:19.207Z",
        "created_at": "2018-08-19T21:26:19.207Z",
        "email": "akamble@gmail.com",
        "payback": 0,
        "totalReferral": 0
    },
    {
        "_id": "5b79e0900a9ea3101a6b82c6",
        "customerId": 3,
        "updated_at": "2018-08-19T21:26:49.898Z",
        "created_at": "2018-08-19T21:26:40.860Z",
        "email": "amol.p.s.kamble1@gmail.com",
        "payback": 0,
        "totalReferral": 0
    }
]
```
&nbsp;
***
#### 6. Add a new Ambassador
    POST {{uri}}/ambassador
***

##### Body Parameters
- **email** — email of the customer. (required)
- **referral** — refer by (optional)
  
##### Request format
```
{
	"email":"akamble3444@gmail.com"
}
```
##### Response Format
```
{
    "__v": 0,
    "customerId": 4,
    "updated_at": "2018-08-19T21:35:39.776Z",
    "created_at": "2018-08-19T21:35:39.776Z",
    "email": "akamble3444@gmail.com",
    "isAmbassador": true,
    "_id": "5b79e2ab0a9ea3101a6b82c8",
    "payback": 0,
    "nonce": "5b79de320a9ea3101a6b82c2"
}
```
&nbsp;
***
#### 7. Convert a customer to an ambassador
    PUT {{uri}}/customer/:customerId/to/ambassador
***

##### Path Parameters
- **customerId** — customer id (required)
##### Response Format
```
true
```
&nbsp;
***
#### 8. Get ambassdaor childrens
    GET {{uri}}/ambassador/:customerId/children
***

##### Path Parameters
- **customerId** — customer id (required)
##### Response Format
```
[
    {
        "_id": "5b79e0900a9ea3101a6b82c6",
        "customerId": 3,
        "updated_at": "2018-08-19T21:45:22.510Z",
        "created_at": "2018-08-19T21:26:40.860Z",
        "email": "amol.p.s.kamble1@gmail.com",
        "__v": 0,
        "referral": 1,
        "isAmbassador": true,
        "payback": 0,
        "nonce": "5b79de320a9ea3101a6b82c2"
    }
]
```
&nbsp;
***
#### 9. Get all children of an ambassador at nth level
    GET {{uri}}/customer/:customerId/children/:level
***

##### Path Parameters
- **customerId** — customer id (required)
- **level** — start from 0 (required), 0-first level, 1-second level

##### Response Format
```
[
    {
        "_id": "5b79e0900a9ea3101a6b82c6",
        "customerId": 3,
        "updated_at": "2018-08-19T21:45:22.510Z",
        "created_at": "2018-08-19T21:26:40.860Z",
        "email": "amol.p.s.kamble1@gmail.com",
        "payback": 0,
        "nonce": "5b79de320a9ea3101a6b82c2",
        "__v": 0,
        "referral": 1,
        "isAmbassador": true,
        "path": [
            {
                "_id": "5b79de510a9ea3101a6b82c4",
                "customerId": 1,
                "updated_at": "2018-08-19T21:49:10.705Z",
                "created_at": "2018-08-19T21:17:05.965Z",
                "email": "amol.p.s.kamble@gmail.com",
                "payback": 30,
                "nonce": "5b79e0990a9ea3101a6b82c7",
                "__v": 0,
                "isAmbassador": true
            }
        ]
    }
]
```
***