// Dependecies
const mysql = require(`mysql`);
const inquirer = require(`inquirer`);
const build = require(`./lib/classes`);
// sqlQueries.js utilizes classes.js
const query = require(`./lib/sqlQueries`);

// DB connection
const connection = mysql.createConnection({
    host: `localhost`,
    port: 3306,
    user: `root`,
    password: `root`,
    database: `employees_db`
});
// Connect and begin
connection.connect((err) => {
    if (err) throw err;
    userQuery();
});

// Begin Inquirer
const userQuery = () => {
    console.log(`Welcome to Employee Tracker.`)
    // first offer all options
    return inquirer.prompt(
        {
            type: `list`,
            name: `userTask`,
            message: `What would you like to do?`,
            choices: [
                `View all employees`,
                `View employees by department`,
                `Add employee`,
                `Update employee role`,
                `Exit.`
            ]
        })
        //then switch/case to call appropriate functions
        .then((response) => {
            switch (response.userTask) {
                case `View all employees`:
                    callEmp();
                    break;
                case `View employees by department`:
                    callDep();
                    break;

                case `Add employee`:
                    addEmp();
                    break;

                case `Update employee role`:
                    payroll();
                    break;

                case `Exit.`:
                    end();
                    break;
            }
        });
};

// keepGoing() restarts or quits, or at least it should
// Inquirer just sort gives up all the time, with code still to run
// OR it won't actually end when I specifically tell it to
const keepGoing = () => {
    inquirer.prompt([
        {
            type: `list`,
            name: `yesNo`,
            message: `Would you like to do more?`,
            choices: [`Yes`, `No`]
        }
    ]).then(response => {
        if (response.yesNo === `Yes`) {
            userQuery();
        }
        else {
            end();
        }
    })
}

// callEmp() & callDep() uses sqlQueries.js
const callEmp = () => {
    query.queryEmp();
    setTimeout(() => keepGoing(), 500);
}

// callDep() displays array of choices with id's from DB
const callDep = () => {
    query.queryDep();
    setTimeout(() => viewDep(), 500);
}

// pulls up all current departments
const viewDep = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `allDeps`,
            message: `Which Department? Enter ID number:`
        }
    ]).then(response => {
        let dep = response.allDeps;
        query.queryEmpByDep(dep);
        setTimeout(() => keepGoing(), 500)
    })
}

const newEmp = {};
// walks user through creating a new employee, sends it to empSQL() below
const addEmp = () => {
    inquirer.prompt([
        {
            type: `input`,
            name: `firstName`,
            message: `What is the person's first name?`
        },
        {
            type: `input`,
            name: `lastName`,
            message: `What is their last name?`
        }
    ]).then(response => {
        // add name to newEmp{}
        newEmp.first_name = response.firstName;
        newEmp.last_name = response.lastName;
        // query for available roles
        connection.query(`SELECT id, title FROM role`, (err, res) => {
            const roles = [];
            if (err) throw err;
            for (i in res) {
                roles.push(res[i].title);
            }
            inquirer.prompt([
                {
                    type: `list`,
                    name: `role`,
                    message: `Select employee's role:`,
                    choices: roles
                }
            ]).then(response => {
                // convert response.role to an ID based on index, add to newEmp{}
                roles.forEach((role, index) => {
                    if (role === response.role) {
                        newEmp.role_id = index + 1;
                    }
                })
                // query for current managers
                connection.query(`SELECT employee.id, concat(manager.first_name, " ", manager.last_name) AS manager_name FROM employee INNER JOIN employee AS manager ON manager.id = employee.manager_id`,
                    (err, res) => {
                        const managers = [];
                        if (err) throw err;
                        // filter out dupes, keep just the names
                        let temp = [...new Set(res.map(res => res.manager_name))]
                        for (i in temp) {
                            managers.push(temp[i]);
                        }
                        // add null as the last option
                        managers.push(`null`);
                        inquirer.prompt([
                            {
                                type: `list`,
                                name: `manager`,
                                message: `Select employee's manager:`,
                                choices: managers
                            }
                        ])
                            // convert manager name to ID, like with roles
                            .then(response => {
                                managers.forEach((human, index) => {
                                    if (response.manager === `null`) {
                                        newEmp.manager_id = `null`;
                                    }
                                    else if (human === response.manager) {
                                        newEmp.manager_id = index + 1;
                                    }
                                })
                                console.log(newEmp);
                                // // build an Employee obj using classes.js
                                // let addEmp = new build.Employee(newEmp.firstName, newEmp.lastName, newEmp.roleID, newEmp.managerID);
                                empSQL();
                            })
                    })
            })
        })
    })
}

// sends addEmp class constructor to MySQL Database
const empSQL = () => {
    connection.query(`INSERT INTO employee SETS ?`, newEmp, (err, res) => {
        if (err) throw err;
    })
    keepGoing();
}

// please end?
const end = () => {
    connection.end();
    return console.log(`Thanks for using Employee Tracker.`);
}