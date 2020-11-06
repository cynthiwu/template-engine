const Employee = require("../lib/Employee")

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;

        this.getRole = function() {
            this.role = "Manager";
            return this.role;;
        }
    }  
        
    getOfficeNumber() {
        return this.officeNumber;
    }

}



module.exports = Manager;