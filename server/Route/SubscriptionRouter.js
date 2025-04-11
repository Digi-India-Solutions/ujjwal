const express = require('express');
const { createSubscription, getSubscription } = require('../Controllar/SubscriptionControllar.js');

const router= express.Router();

router.post('/create-subscription', createSubscription);
router.get('/subscription', getSubscription);

module.exports = router;