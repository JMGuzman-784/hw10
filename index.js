// Manager class
// Engineer class
// Intern class
const employees = [];
const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

// after all employees are generated create a single html page
// go through all employees and add onto html page
function startApp() {
    inquirer
    .prompt([
        {
            name: "name", 
            type: "input",
            message: "enter manager's name",
        },
        {
            name: "id", 
            type: "input",
            message: "enter manager's employee ID",
        },
        {
            name: "email", 
            type: "input",
            message: "enter manager's email address",
        },
        {
            name: "office", 
            type: "input",
            message: "enter manager's office number",
        },
    ])
    .then(answer => {
    console.log(answer);
        // create new manager using the Values from inquirer
    const manager = new Manager(answer.name, answer.id, answer.email, answer.office)
    // Push manager into array
        employees.push(manager);
        getMenu();
    // Make function
    
});
}

function createEngineer() {
    console.log("to create Engineer");
    inquirer
    .prompt([
        {
            name: "name", 
            type: "input",
            message: "enter engineer's name",
        },
        {
            name: "id", 
            type: "input",
            message: "enter engineer's employee ID",
        },
        {
            name: "email", 
            type: "input",
            message: "enter engineer's email address",
        },
        {
            name: "github", 
            type: "input",
            message: "enter engineer's github username",
        },
        {
            name: "newEmp", 
            type: "confirm",
            message: "would you like to add another team member?",
        },
    ])
    .then((answer) => {
         // create new manager using the Values from inquirer
         const engineer = new Engineer(answer.name, answer.id, answer.email, answer.github);
         // Push engineer into array
            employees.push(engineer);
        if(answer.newEmp === true) {
            getMenu();
        } else {
            createHtml();
        }
    });
}

function createIntern() {
    console.log("to create Intern");
    inquirer
    .prompt([
        {
            name: "name", 
            type: "input",
            message: "enter intern's name",
        },
        {
            name: "id", 
            type: "input",
            message: "enter intern's employee ID",
        },
        {
            name: "email", 
            type: "input",
            message: "enter intern's email address",
        },
        {
            name: "school", 
            type: "input",
            message: "enter interns's school",
        },
        {
            name: "newEmp", 
            type: "confirm",
            message: "would you like to add another team member?",
        },
    ])
    .then((answer) => {
         // create new manager using the Values from inquirer
         const intern = new Intern(answer.name, answer.id, answer.email, answer.school);
         // Push intern into array
            employees.push(intern);
        if(answer.newEmp === true) {
            getMenu();
        } else {
            const theHtml = generateHtml(intern);
            fs.writeFile('team.html', theHtml, (err) => 
            (err ? console.error(err) : console.log('Success!')));
        }
    });
}

function createHtml() {
    console.log("create or add to HTML");
    console.log(employees);
    const theHtml = generateHtml();
    fs.writeFile('team.html', theHtml, (err) => 
    (err ? console.error(err) : console.log('Success!'))
    );
}

function getMenu() {
    inquirer
    .prompt([
        {
            name: "employee", 
            type: "list",
            message: "which employee would you like to create?",
            choices: ["engineer", "intern", "finish"]
        },
    ])
    .then((choice) => {
        console.log(choice);
        if (choice.employee === "engineer") {
            createEngineer();
        }
        if (choice.employee === "intern") {
            createIntern();
        }
        if (choice.employee === "finish") {
            createHtml();
        }
    })
}

const generateHtml = () => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style/main.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <title>Team Profile Generator</title>
    </head>
    <body>

    <header class="header" style="text-align: center; padding: 1rem; background-color: aquamarine;"><h1>Team Profile Generator</h1></header>
    <section class="p-1-5 section-style" style="padding: 1.5rem; flex-wrap: wrap; display: flex; grid-gap: 1rem; justify-content: center;">
    ${empCard()}
    </section>
    <script src="./scripts/index.js"></script>
    </body>
    </html>`;
};

const empCard = () => {
    let employeeCard = "";

    employees.forEach((employee) => {
        employeeCard += `
        <section class="p-1-5 section-style" style="padding: 1.5rem; flex-wrap: wrap; display: flex; grid-gap: 1rem; justify-content: center;">
        <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
            <h2 class="card-header">
                ${employee.getName()}
            </h2>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${employee.getId()}</li>
                    <li class="list-group-item"><a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
                    ${employee.office? `<li class="list-group-item">${employee.office}</li>`:`<div style="display:none;"></div>`}
                    ${employee.school? `<li class="list-group-item">${employee.school}</li>`:`<div style="display:none;"></div>`}
                    ${employee.github? `<li class="list-group-item"><a href="https://github.com/${employee.github}" target="_blank">${employee.github}</a></li>`:`<div style="display:none;"></div>`}
                </ul>
                <p class="card-text">
                    ${employee.getRole()}
                </p>
            </div>
        </div>
    </section>
    `;
    })
    return employeeCard;
};

startApp();
