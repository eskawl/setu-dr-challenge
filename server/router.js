const { Router } = require('express');
const { getBills, getReceipt } = require('../lib/views');
const { authentication } = require('./middleware');

const router = Router();

router.use(authentication);

router.post('/bills/fetch',  getBills);

router.post('/bills/fetchReceipt', getReceipt);

module.exports = exports = router;
