const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/engineer");

function processAns(ans) {
  console.log(ans);
}

inquirer
  .prompt([
    {
      type: "list",
      name: "empRole",
      message: "What is this team member's role?",
      choices: ["Manager", "Engineer", "Intern"],
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
  ])
  .then(processAns);
