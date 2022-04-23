const MYSQLWrapper = require('./common/mysqlwrapper');

(
   async()=>{
       const result = await MYSQLWrapper.executeQuery(`SELECT * FROM lms.members where userid=?;`,['peterp'])
       console.log(result);
   } 
)();