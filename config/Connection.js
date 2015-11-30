'use strict';
var Sequelize = require('sequelize');

var database
,   user
,   password
,   host
;

switch(process.env.NODE_ENV) {
    case 'production':
    	database = 'cms';
    	user = 'root';
    	password = '';
    	host = 'localhost';
    	break;
    case 'testing':
    	database = 'cms';
    	user = 'cmsuser';
    	password = 'cmsPassword';
    	host = 'localhost';
    	break;
    case 'development':
    	database = 'cms';
    	user = 'root';
    	password = '';
    	host = 'localhost';
    	break;
}

var Connection = new Sequelize(database, user, password, {host: host, dialect: 'mysql'});

module.exports = Connection;