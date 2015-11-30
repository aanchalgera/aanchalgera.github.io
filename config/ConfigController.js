'use strict';

var errors = []
,   configModel = require(__dirname + '/ConfigModel')
;

function ConfigController()
{
    function successHandler(res)
    {
        return function(response)
        {
            if (response) {                
                res.json(response);
            } else {
                res.status(404).send("Configs not found");
            }
        }
    }

    function errorHandler(res)
    {
        return function(error)
        {
            var errorMessages = error.errors.map(
                function(err)
                {
                    return err.message;
                }
            );
            res.status(400).send(errorMessages);
        }
    }

    function getConfigs(req, res)
    {
        configModel.build().retrieveAll(
            successHandler(res),
            errorHandler(res)
        );
    }


    function postConfig(req, res)
    {
        delete req.body['id'];
        configModel.build(req.body).addConfig(
            function(response)
            {
                if (response) {
                    res.status(201);
                    res.send(response);
                }
            },
            errorHandler(res)
        );
    }

    function getConfig(req, res)
    {
        configModel.build().retrieveById(
            req.params.configId,
            successHandler(res),
            errorHandler(res)
        );
    }

    function putConfig(req, res) {
        configModel.build(req.body).updateById(
            req.params.configId,
            successHandler(res),
            errorHandler(res)
        );
    }

    function deleteConfig(req, res) {
        configModel.build(req.body).deleteById(
            req.params.configId,
            successHandler(res),
            errorHandler(res)
        );
    }

  return {
    getConfigs: getConfigs,
    getConfig: getConfig,
    postConfig: postConfig,
    putConfig: putConfig,
    deleteConfig: deleteConfig
  }
}

module.exports = ConfigController;