// Dependency
const build = require(`./classes`);  // not in use yet
const mysql = require(`mysql`);

// DB connection
const connection = mysql.createConnection({
    host: `localhost`,
    port: 3306,
    user: `root`,
    password: `root`,
    database: `et_db`
});
// Connect and begin
connection.connect((err) => {
    if (err) throw err;
});

/* Queries called by viewData() in app.js */
// queryDep() returns array of Department names
const queryDep = () => {
    const depArray = [];
    connection.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        for (i in res) {
            depArray.push(res[i].name);
        }
        console.log(depArray);
        return depArray;
    })
}
queryDep();

// under construction
const queryRole = (role) => {
    const query = `SELECT * FROM role WHERE ?`;
    connection.query(query, { title: role }, (err, res) => {
        if (err) throw err;
        // code
    })
}

const queryEmp = (emp) => {
    const query = `SELECT * FROM employee WHERE ?`;
    connection.query(query, { id: emp }, (err, res) => {
        if (err) throw err;
        // code
    })
}

// Export as Obj
module.exports = {
    queryDep: queryDep,
    queryRole: queryRole,
    queryEmp: queryEmp
}