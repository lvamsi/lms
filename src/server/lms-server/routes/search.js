var express = require('express');
var router = express.Router();
const MYSQLWrapper = require('../common/mysqlwrapper');
const SQL = require('../common/sql.json');


/* Search */
router.get('/', async function(req, res, next) {
    const query = `%${req.query.q}%`;
    const params = [query,query,query,query]
    const [rows,fields] =await MYSQLWrapper.executeQuery(SQL.search,params);
    res.send(rows);
});

module.exports = router;