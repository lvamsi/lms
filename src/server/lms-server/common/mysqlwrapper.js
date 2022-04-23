const mysql = require("mysql2/promise");

class MYSQLWrapper {
  constructor() {
    this.config = {
      host: "localhost",
      user: "root",
      password: "root@123",
      database: "lms",
    };
    this.pool = mysql.createPool(this.config);
  }

  async executeQuery(sql, fields) {
    let result = await this.pool.execute(sql, fields);
    return result;
  }
}

module.exports = new MYSQLWrapper();
