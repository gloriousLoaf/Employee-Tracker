// Dependecies
const mysql = require(`mysql`);
const inquirer = require(`inquirer`);
const conTable = require(`console.table`);

// DB connection
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

// Inquirer
const userQuery = () => {
    return inquirer.prompt(
        {
            name: `userTask`,
            type: `list`,
            message: `What would you like to do?`,
            choices: [
              `Add / Delete departments, roles or employees.`,
              `View department, role or employee details.`,
              `Update employee details.`,
              `View budget report.`,
              `Exit.`
            ]
        }
    ).then((response) => {
        switch (response.userTask) {
        case `Add / Delete departments, roles or employees.`:
            // this may break out into more cases & functions
          manipulateData();
          break;
  
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
      }
    );
};

const manipulateData = () => {
    // code
};

const viewData = () => {
    // code
};

const empUpdate = () => {
    // code
};

const payroll = () => {
    // code
};