const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//render(employees);

// Create an inquirer set of question. Start with Employee type. Based on outcome, create a subclass of Employee, confirm details, push properies to an array of objects to be rendered. 
//Search how to make the questions loop. 

//Please build you team
//What is your manager's name?
//What is your manager's id?
//What is your manager's email?
//What is your manager's office number?
//Which type of team member would you like to add? (List) - Use arrow keys
//Last option is - "I don't want to add a team member"

const managerQuestions = [
    {
        type: "input",
        message: "What is your manager's name?",
        name: "managerName",
    },
    {
        type: "input",
        message: "What is your manager's id?",
        name: "managerId",
    },
    {
        type: "input",
        message: "What is your manager's email?",
        name: "managerEmail",
    },
    {
        type: "input",
        message: "What is your manager's office number?",
        name: "managerOffice",
    },
]

const employeeQuestion = 
{
    type: "list",
    message: "Which type of team member would you like to add?",
    name: "employeeType",
    choices: [
        "Engineer",
        "Intern",
        "I don't want to add any more team members",
    ],
}

function initQuestions() {
    inquirer.prompt(managerQuestions).then(subQuestions => {
        inquirer.prompt(employeeQuestion);
        let employeeType = employeeQuestion.name;
        switch(employeeType) {
            case "Engineer":
                console.log("Engineer");
                //Function here;
                // Return or break;
            case "Intern":
                console.log("Intern")
                //Function here;
                //Return or break;
            case "I don't want to add any more team members.":
                console.log("I don't to add any more team members.")
                //Function here;
                //Return or break;
        }
    })
};

initQuestions();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
