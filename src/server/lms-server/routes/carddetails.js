var express = require("express");
var router = express.Router();
const MYSQLWrapper = require("../common/mysqlwrapper");
const SQL = require("../common/sql.json");

/* GET users listing. */
router.get("/carddetails/:cid", async function (req, res, next) {
  const CID = req.params.cid;
  const [rows, fields] = await MYSQLWrapper.executeQuery(SQL.carddetails2, [
    CID,
  ]);
  if (rows && rows.length == 1) res.send(rows[0]);
  else res.send({});
});

/* GET users listing. */
router.get("/issuebook", async function (req, res, next) {
  const CID = req.query.CID;
  const ISBN = req.query.ISBN;
  const empno = req.query.empno;
  console.log("CID ", CID, " ISBN ", ISBN, " empno ", empno);
  let currDate = new Date();
  let currDay = ("0" + currDate.getDate()).slice(-2);
  let currMonth = ("0" + (currDate.getMonth() + 1)).slice(-2);
  let currYear = currDate.getFullYear();
  let currDateS = currDay + "/" + currMonth + "/" + currYear;
  try {
    const [rows, fields] = await MYSQLWrapper.executeQuery(SQL.issuebook, [
      empno,
      CID,
      ISBN,
      currDateS,
      null,
    ]);
    res.send({ message: "Successfully inserted" });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Issue while processing issue book" });
  }
});

router.get("/overduebooks", async function (req, res, next) {
  try {
    const [rows, fields] = await MYSQLWrapper.executeQuery(SQL.overduebooks);
    res.send(rows);
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Issue while executing SQL" });
  }
});

router.get("/librariancidsearch", async function (req, res, next) {
  try {
    let CID = req.query.CID;
    const [rows1, fields1] = await MYSQLWrapper.executeQuery(SQL.carddetails2,[CID]);
    const [rows2, fields2] = await MYSQLWrapper.executeQuery(SQL.checkedoutbooks,[CID]);
    res.send({carddetails: rows1[0],checkedoutbooks:rows2});
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Issue while executing SQL" });
  }
});


router.get("/returnbook", async function (req, res, next) {
    try {
      let CID = req.query.CID;
      let EMPNO = req.query.EMPNO;
      let ISBN = req.query.ISBN;
      const [rows1, fields1] = await MYSQLWrapper.executeQuery(SQL.returnbook,[EMPNO,CID,ISBN]);
      res.status(200).send({message:"Successfully Updated"});
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "Issue while executing SQL" });
    }
});

router.get("/getpublishers", async function (req, res, next) {
    try {
      const [rows, fields] = await MYSQLWrapper.executeQuery(SQL.getpublishers);
      res.status(200).send(rows);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "Issue while executing SQL" });
    }
});

router.post("/addpublisher",async function(req,res,next){
    try{
        console.log(req.body);
        const PID = Math.floor(+new Date()/1000);
        const PNAME = req.body.pname;
        const PLACE = req.body.pplace;
        const [rows,fields] = await MYSQLWrapper.executeQuery(SQL.addpublisher,[PID,PNAME,PLACE])
        res.send({message : 'Successfully added publisher'});
    }catch(e){
        console.error(e);
        res.status(500).send({ message: "Couldn't add publisher" });
    }
});

router.post("/addbook",async function(req,res,next){
    try{
        console.log(req.body);
        const t=req.body;
        //ISBN,PID,BOOKTITLE,BOOKDESC,CATEGORY,PUBLISHERID,PERDAYCHARGE,AUTHORNAME
        const [rows,fields] = await MYSQLWrapper.executeQuery(SQL.addbook,[t.ISBN,t.pid,t.title,t.desc,t.category,null,t.cpd,t.authorname])
        res.send({message : 'Successfully added book'});
    }catch(e){
        console.error(e);
        res.status(500).send({ message: "Couldn't add book" });
    }
});


module.exports = router;
