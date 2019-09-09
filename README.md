<h1 align="center">Simple Notes with RESTfull API</h1>

<div align="center">
  <a href="#">
    <img src="https://img.shields.io/badge/npm-6.9.0-brightgreen.svg?style=flat-square" alt="npm version">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/NodeJS-12.4.0-blue.svg?style=flat-square" alt="npm version">
  </a>
  <a href="#">
    <img src="https://img.shields.io/badge/ExpressJS-4.x-orange.svg?style=flat-square" alt="npm version">
  </a>
</div>


## Introduction
This is a backend simple Notes with RESTfull API, here I Use node.js, expres js, and mysql 

## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/)
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/) - Make sure it's running on the default port.  

### Configuration Environment Variables
* Make .env file on this project
* Open .env file and copy paste this code below
``` bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB=a_note
NODE_ENV=development node server.js
```

## Installation
### Clone
```
$ git clone https://github.com/tatasfachrul/simple-REST
$ cd simple-REST
$ npm install
```

### Start Development Server
```
$ npm start
```

## Built With

* [NodeJS](https://nodejs.org/en/docs/)
* [ExpressJS](https://expressjs.com/en/starter/installing.html)
* [CORS](https://expressjs.com/en/resources/middleware/cors.html)
* [BodyParser](https://www.npmjs.com/package/body-parser)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [MySQL](https://expressjs.com/en/guide/database-integration.html#mysql)
