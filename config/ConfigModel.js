'use strict';
var Sequelize = require('sequelize');
var Connection = require(__dirname + '/Connection');

var Config = Connection.define(
    'config', 
    {
        id: {
          type: Sequelize.INTEGER, 
          primaryKey: true, 
          autoIncrement: true
        },
        site_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        site_url: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isUrl: {
              msg: 'Site URL must be a valid URL.'
            }
          }
        },  
        cloudinary_url: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isUrl: {
              msg: 'Cloudinary URL must be a valid URL.'
            }
          }
        },  
        cdn_url: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isUrl: {
              msg: 'CDN URL must be a valid URL.'
            }
          }
        }
    },
    {
        tableName: 'config',
        timestamps: false,
        instanceMethods: 
        {
            retrieveAll: function(onSuccess, onError) {
                Config
                    .findAll({})
                    .then(onSuccess)
                    .error(onError);
            },
            retrieveById: function(configId, onSuccess, onError) {
                Config
                    .findById(configId)
                    .then(onSuccess)
                    .error(onError);
            },
            addConfig: function(onSuccess, onError) {
                Config
                    .build(this.dataValues)
                    .save()
                    .then(onSuccess)
                    .catch(function(error) {onError(error); });
            },
            updateById: function(configId, onSuccess, onError) {
                delete this.dataValues['id'];
                Config
                    .update(
                        this.dataValues,
                        {
                            where: {
                                id: configId
                            }
                        }
                    )
                    .then(onSuccess)
                    .catch(function(error) {onError(error);});
            },
            deleteById: function(configId, onSuccess, onError) {
                Config
                    .findById(configId)
                    .then(function(config){
                        return config.destroy();
                    })
                    .then(onSuccess)
                    .catch(function(error){onError(error);})
            }
        }
    }
);

module.exports = Config;