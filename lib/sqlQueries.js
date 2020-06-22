// Dependency
const build = require(`./classes`);

// DB connection - DO I NEED THESE?
const connection = mysql.createConnection({
    host: `localhost`,
    port: 3306,
    user: `root`,
    password: `root`,
    database: `etSchema`
});
// Connect and begin
connection.connect((err) => {
    if (err) throw err;
    userQuery();
});

/* Queries called by viewData() in app.js */
const queryDep = (dep) => {
    const query = `SELECT * FROM department WHERE ?`;
    connection.query(query, { name: dep }, (err, res) => {
        if (err) throw err;
        let depObj = res;
        return depObj;
    })
}

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