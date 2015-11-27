'use strict';

var errors = []
,   configModel = require(__dirname + '/configModel')
;


function configController
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
        if (req.query.complete) {
            configModel.build().getCompletedConfigs(
                successHandler(res),
                errorHandler(res)
            );
        } else {
            configModel.build().retrieveAll(
                successHandler(res),
                errorHandler(res)
            );
        }
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

  function getConfig(req, res) {
    configModel.build().retrieveById(
      req.params.configId,
      successHandler(res),
      errorHandler(res)
    );
  }

    function putConfig(req, res) {
        configModel.build(req.body).updateById(
            req.params.configId,
            function(response, transaction)
            {
                if (statusRunning === req.body.status) {
                    var blogUrl = getBlogUrl(req.body.segment);
                    var requestData = prepareRequestData(req.body);
                    axios.put(
                        `${blogUrl}${apiUrl}/${req.body.id}.json`,
                        requestData
                    ).then(
                        function(response)
                        {
                            transaction.commit();
                            res.status(200).send(response.data);
                        }
                    ).catch(
                        function(err)
                        {
                            transaction.rollback();
                            res.status(400).send(err.data);
                        }
                    );
                } else {
                    transaction.commit();
                    res.status(200).send(response);
                }
            },
            errorHandler(res)
        );
    }
}