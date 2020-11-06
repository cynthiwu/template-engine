const Employee = require("../lib/Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;

        this.getRole = function() {
            this.role = "Engineer";
            return this.role;
        }
    }

    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;