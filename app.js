
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const employees = [];

// Input validation 

const validId = function(id) {
    for (let i = 0; i < employees.length; i++) {
        let usedId = employees[i].id;
        if (id === usedId) {
            console.log("\nID has already been assigned. Please select a new ID.")
            return false;
        }
    }
    if (id === "") {
        console.log("\nPlease enter a valid ID.");
        return false;
    } else if (isNaN(parseFloat(id))) {
        console.log("\nPlease enter a number.")
        return false;
    } else {
        return true;
    }  
}

const validEmail = function(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "") {
        console.log("\nPlease enter a valid email address.");
        return false;
    } else if (!re.test(email.toLowerCase())) {
        console.log("\nPlease enter a valid email address.");
        return false;
    } else {
        return true;
    }    
}

const validName = function(name) {
    if (name === "") {
        console.log("\nPlease enter a valid name.");
        return false;
    } else {
        return true;
    }
}

const validOffice = function(office) {
    if (office === "") {
        console.log("\nPlease enter a valid office number.");
        return false;
    } else {
        return true;
    }
}

const validGithub = function(github) {
    if (github === "") {
        console.log("\nPlease enter a valid github.");
        return false;
    } else {
        return true;
    }
}

const validSchool = function(school) {
    if (school === "") {
        console.log("\nPlease enter a valid school.");
        return false;
    } else {
        return true;
    }
}

// Question arrays based on employee type 

const managerQuestions = [
    {
        type: "input",
        message: "What is the manager's name?",
        name: "name",
        validate: validName,
    },
    {
        type: "input",
        message: "What is the manager's id?",
        name: "id",
        validate: validId,
    },
    {
        type: "input",
        message: "What is the manager's email?",
        name: "email",
        validate: validEmail,
    },
    {
        type: "input",
        message: "What is the manager's office number?",
        name: "office",
        validate: validOffice,

    },
]

const employeeQuestion = 
{
    type: "list",
    message: "Which type of team member would you like to add?",
    name: "type",
    choices: [
        "Engineer",
        "Intern",
        "I don't want to add any more team members.",
    ],
}

const engineerQuestions = 
[
    {
        type: "input",
        message: "What is the  engineer's name?",
        name: "name",
        validate: validName, 
    },
    {
        type: "input",
        message: "What is the engineer's id?",
        name: "id",
        validate: validId,
    },
    {
        type: "input",
        message: "What is the engineer's email?",
        name: "email",
        validate: validEmail,
    },
    {
        type: "input",
        message: "What is the engineer's GitHub uername?",
        name: "github",
        validate: validGithub,

    },
]


const internQuestions = 
[
    {
        type: "input",
        message: "What is the intern's name?",
        name: "name",
        validate: validName, 
    },
    {
        type: "input",
        message: "What is the intern's id?",
        name: "id",
        validate: validId,
    },
    {
        type: "input",
        message: "What is the intern's email?",
        name: "email",
        validate: validEmail,
    },
    {
        type: "input",
        message: "What is the intern's school?",
        name: "school",
        validate: validSchool,
    },
]

// Function to initiate manager prompt, create Manager object, push to array, and initiate employee type questioning once complete.
function initQuestions() {
    inquirer.prompt(managerQuestions).then(response => {
        const newManager = new Manager(response.name, response.id, response.email, response.office);
        employees.push(newManager);
        employeeRequest();
    });     
};

// Function to prompt employee type and initiate follow-up questions and object creation. 
function employeeRequest() {
    inquirer.prompt(employeeQuestion).then(response => {
            let type = response.type;
            switch(type) {
                case "Engineer":
                    inquirer.prompt(engineerQuestions).then(response => {
                        const newEngineer = new Engineer(response.name, response.id, response.email, response.github);
                        employees.push(newEngineer);
                        employeeRequest();
                    })
                    break;
                case "Intern":
                    inquirer.prompt(internQuestions).then(response => {
                        const newIntern = new Intern(response.name, response.id, response.email, response.school);
                        employees.push(newIntern);
                        employeeRequest();
                    })
                    break;
                case "I don't want to add any more team members.":
                    fs.access(OUTPUT_DIR, err => {
                        if (err) {
                            fs.mkdirSync(OUTPUT_DIR, (err) => {
                                if (err) throw err;    
                            });
                            writeHtml();
                        } else {
                            writeHtml();
                        }
                    });      
            }
        })
};

// Function to render HTML and write to output diretory
function writeHtml() {
    const renderhtml = render(employees);
    fs.writeFile(outputPath, renderhtml, (err) => {
        if (err) throw err;
        }); 
}

initQuestions();