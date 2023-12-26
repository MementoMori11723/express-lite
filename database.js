const sql = require("sqlite3");
let query;

// Connecting to database

const db = new sql.Database("./base.db", sql.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

// Creating Table
const Create = () => {
  query = "create table test(id integer primary key, name, phone_no)";
  db.run(query);
};

// Insert Data
const Insert = (arr) => {
  query = `insert into test(name,phone_no) values (?,?)`;
  db.run(query, arr, (err) => {
    if (err) return console.error(err.message);
  });
};

// Showing data
const Select = () => {
  query = `select * from test`;
  db.all(query, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => console.log(row));
  });
};

// Closing Connection
const Close = () => {
  db.close((err) => {
    if (err) return console.log(err.message);
    else console.log("Database closed successfuly");
  });
};

module.exports = { Create: Create, Insert: Insert, Select: Select };
