// Create all three classes
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    getID() {
        return this.id;
    }
    getName() {
        return this.name;
    }
};

class Role {
    constructor(id, title, salary, deparmentID) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.deparmentID = deparmentID;
    }
    getID() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getSalary() {
        return this.salary;
    }
    getDepID() {
        return this.departmentID;
    }
};

class Employee {
    constructor(id, firstName, lastName, roleID, managerID) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleID = roleID;
        this.managerID = managerID;
    }
    getID() {
        return this.id;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getRoleID() {
        return this.roleID;
    }
    getManagerID() {
        return this.managerID;
    }
}

// Export as Obj
module.exports = {
    Department: Department,
    Role: Role,
    Employee: Employee
}