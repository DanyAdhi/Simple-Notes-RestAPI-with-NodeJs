<h1 align="center">Simple Notes/ Rest API with NodeJs</h1>

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

## Features
available features on this repository:
1. Crud Notes 
2. Crud Category Notes
3. Search Notes
4. Sort Notes by time
5. Pull Down to refresh
6. Pull Up to Load-More

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
$ git clone https://github.com/DanyAdhi/Simple-Notes-RestAPI-with-NodeJs
$ cd simple-REST
$ npm install
```

### Start Development Server
```
$ create database 'a_note' on your sql server
$ Import database 'a_note' to your database
$ npm start
```

## Built With

* [NodeJS](https://nodejs.org/en/docs/)
* [ExpressJS](https://expressjs.com/en/starter/installing.html)
* [CORS](https://expressjs.com/en/resources/middleware/cors.html)
* [BodyParser](https://www.npmjs.com/package/body-parser)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [MySQL](https://expressjs.com/en/guide/database-integration.html#mysql)

<br />
<br />

## Contact
danyadhi4149@gmail.com
