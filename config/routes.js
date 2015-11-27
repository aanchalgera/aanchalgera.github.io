'use strict';
var express = require('express')
,   router = express.Router()
,   configController = require(__dirname + '/ConfigController')
;

router.route('/')
    .get(configController.getCampaigns);
    .post(configController.postCampaign)
    .delete(configController.patchCampaign)

router.route('/:configId')
    .put(configController.putCampaign)
    .get(configController.getCampaign);

module.exports = router;