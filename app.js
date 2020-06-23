// Dependecies
const mysql = require(`mysql`);
const inquirer = require(`inquirer`);
const conTable = require(`console.table`);
// sqlQueries.js utilizes classes.js
const query = require(`./lib/sqlQueries`);

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
    userQuery();
});

// Inquirer
const userQuery = () => {
    // first offer all options
    return inquirer.prompt(
        {
            type: `list`,
            name: `userTask`,
            message: `What would you like to do?`,
            choices: [
                `Add / Delete departments, roles or employees.`,
                `View department, role or employee details.`,
                `Update employee details.`,
                `View budget report.`,
                `Exit.`
            ]
        })
        //then switch/case to call appropriate functions
        .then((response) => {
            switch (response.userTask) {
                case `Add / Delete departments, roles or employees.`:
                    // this may break out into more cases & functions
                    manipulateData();
                    break;
                // This is the only case that does anything yet
                case `View department, role or employee details.`:
                    viewData();
                    break;

                case `Update employee details.`:
                    empUpdate();
                    break;

                case `View budget report.`:
                    payroll();
                    break;

                case `Exit.`:
                    connection.end();
                    break;
            }
        });
};

// manipulateData() guides user through Add / Delete processes
const manipulateData = () => {
    return inquirer.prompt(
        {
            type: `list`,
            name: `changeType`,
            message: `Add / Delete which data type?`,
            choices: [`DEPARTMENT`, `ROLE`, `EMPLOYEE`]
        },
        {
            type: `list`,
            name: `addOrDelete`,
            message: `Add or Delete data?`,
            choices: [`ADD`, `DELETE`]
        })
        .then((response) => {
            // hold changeType in var, pass to functions
            let dataType = response.changeType;
            if (response.addOrDelete === `ADD`) {
                addData(dataType);
            }
            else {
                deleteData(dataType);
            }
        })
};

const addData = (data) => {
    // code
    query.queryDep()
}

const deleteData = (data) => {
    // code
}

// viewData guides user through appropriate constructors
const viewData = () => {
    return inquirer.prompt([
        {
            type: `list`,
            name: `viewType`,
            message: `View which data type?`,
            choices: [`DEPARTMENT`, `ROLE`, `EMPLOYEE`]
        },
        {
            when: response => response.viewType === `DEPARTMENT`,
            type: `list`,
            name: `viewDep`,
            message: `Which Department?`,
            // THIS. omg this...
            choices: () => query.queryDep()
        },
        {
            when: response => response.viewType === `ROLE`,
            type: `list`,
            name: `viewRole`,
            message: `Which Role?`,
            choices: () => {

            }
        },
        {
            when: response => response.viewType === `EMPLOYEE`,
            type: `list`,
            name: `viewEmp`,
            message: `Which Employee?`,
            choices: () => {

            }
        }
    ])
    // would .then() work better?
    // .then((response) => {
    //     if (response.viewType === `DEPARTMENT`) {
    //         // code
    //     }
    //     else if (response.viewType === `ROLE`) {
    //         // code
    //     }
    //     else {
    //         // code
    //     }
    //     // userQuery();
    // })
}

const empUpdate = () => {
    // code
};

const payroll = () => {
    // code
};