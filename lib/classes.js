// Create all three classes
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
};

class Role {
    constructor(id, title, salary, deparmentID) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.deparmentID = deparmentID;
    }
};

class Employee {
    constructor(first_name, last_name, role_id, manager_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
}

// Export as Obj
module.exports = {
    Department: Department,
    Role: Role,
    Employee: Employee
}