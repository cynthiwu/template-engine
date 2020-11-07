const Employee = require("../lib/Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;

        this.getRole = function() {
            this.role = "Intern";
            return this.role;

        }
    }

    getSchool() {
        return this.school;
    }
}

module.exports = Intern;