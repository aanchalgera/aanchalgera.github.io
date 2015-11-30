'use strict';
var express = require('express')
,   router = express.Router()
,   configController = require(__dirname + '/ConfigController')()
;

router.route('/')
    .get(configController.getConfigs)
    .post(configController.postConfig)
;

router.route('/:configId')
    .put(configController.putConfig)
    .get(configController.getConfig)
    .delete(configController.deleteConfig)
;

module.exports = router;