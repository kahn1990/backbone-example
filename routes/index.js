var express = require('express')
,index = require('./api/index')	//加载
,RedisStore = require('connect-redis');

var router = express.Router();
router.get('/', index.indexs);
router.get('/wuzei', index.wuzei);
router.get('/more', index.more);
router.get('/about', index.about);
router.get('/isweb', index.isweb);
router.get('/backWebApp', index.backWebApp);
router.post('/toAppSearch', index.searchInfo);
router.post('/json/searchInfo', index.searchInfo);
module.exports = router;