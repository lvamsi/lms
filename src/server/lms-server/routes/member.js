var express = require('express');
var router = express.Router();
const MYSQLWrapper = require('../common/mysqlwrapper');
const SQL = require('../common/sql.json');

/* GET users listing. */
router.get('/:mid/carddetails', async function(req, res, next) {
    const mId = req.params.mid;
    const [rows, fields]  = await MYSQLWrapper.executeQuery(SQL.carddetails,[mId])
    res.send(rows)
});

router.get('/:cid/checkoutbooks', async function(req, res, next) {
    const CID = req.params.cid;
    const [rows, fields]  = await MYSQLWrapper.executeQuery(SQL.checkedoutbooks,[CID])
    res.send(rows)
});

router.get('/:cid/checkoutbooks', async function(req, res, next) {
    const CID = req.params.cid;
    const [rows, fields]  = await MYSQLWrapper.executeQuery(SQL.checkedoutbooks,[CID])
    res.send(rows)
});

module.exports = router;