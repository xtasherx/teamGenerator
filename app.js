const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// array to hold employee data
const employees = [];

// function to write data to page
const generateTeam = () => {
  const renderHTML = render(employees);
  console.log(employees);
  fs.writeFile(outputPath, renderHTML, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("Your team has been generated");
  });
};

const collectInput = async (input = []) => {
  const questions = [
    {
      type: "list",
      name: "empRole",
      message: "What is this team member's role?",
      choices: ["Manager", "Engineer", "Intern"],
    },
    {
      message: "What is the team member's ID #?",
      name: "empID",
    },
    {
      message: "What is the team member's name?",
      name: "empName",
    },
    {
      message: "What is the email for this team member?",
      name: "empEmail",
    },
    {
      message: "What is the office number for the manager?",
      name: "mgrNumber",
      when: (ans) => ans.empRole === "Manager",
    },
    {
      message: "What is the engineers github user name?",
      name: "engGitUser",
      when: (ans) => ans.empRole === "Engineer",
    },
    {
      message: "What school is this intern with?",
      name: "intSchool",
      when: (ans) => ans.empRole === "Intern",
    },
    {
      type: "confirm",
      name: "again",
      message: "Would you like to add a team member?",
    },
  ];

  const { again, ...answers } = await inquirer.prompt(questions);
  const newInput = [...input, answers];
  return again ? collectInput(newInput) : newInput;
};

const main = async () => {
  const input = await collectInput();
  input.forEach((employee) => {
    if (employee.empRole === "Manager") {
      const mgr = new Manager(
        employee.empName,
        employee.empID,
        employee.empEmail,
        employee.mgrNumber
      );
      employees.push(mgr);
    } else if (employee.empRole === "Engineer") {
      const eng = new Engineer(
        employee.empName,
        employee.empID,
        employee.empEmail,
        employee.engGitUser
      );
      employees.push(eng);
    } else {
      const int = new Intern(
        employee.empName,
        employee.empID,
        employee.empEmail,
        employee.intSchool
      );
      employees.push(int);
      generateTeam(employees);
    }
  });
};

main();
