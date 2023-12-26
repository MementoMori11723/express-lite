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
  let fail;
  query = `insert into test(name,phone_no) values (?,?)`;
  db.run(query, arr, (err) => {
    if (err) {
      fail = err;
      return console.error(err.message);
    }
  });
  if (fail) return fail.message;
  return "Data inserted Successfully!";
};

// Showing data
const Select = () =>
  new Promise((resolve, reject) => {
    const query = `select * from test`;
    const data = [];
    db.each(
      query,
      [],
      (err, row) => {
        if (err) reject(err.message);
        else data.push(row);
      },
      (err, rowCount) => {
        if (err) reject(err.message);
        else {
          console.log(`${rowCount} rows returned`);
          resolve(data);
        }
      }
    );
  });

// Closing Connection
const Close = () => {
  db.close((err) => {
    if (err) return console.log(err.message);
    else console.log("Database closed successfuly");
  });
};

module.exports = {
  Create: Create,
  Insert: Insert,
  Select: Select,
  Close: Close,
};
