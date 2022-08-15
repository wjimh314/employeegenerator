const inquirer = require("inquirer");
const fs = require("fs");

const generateHTML = ({ name, ID, github, email, office }) =>
	`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<link
			rel="stylesheet"
			href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
		/>
		<title>Team Profile Generator</title>
	</head>
	<body>
		<div class="jumbotron jumbotron-fluid">
			<div class="container">
				<ul class="list-group">
					<li class="list-group-item">${name}</li>
					<li class="list-group-item">${ID}</li>
					<li class="list-group-item">${email}</li>
					<li class="list-group-item">${office}</li>
					<li class="list-group-item">${github}</li>
				</ul>
			</div>
		</div>
	</body>
</html>`;
function generateManger() {
	inquirer
		.prompt([
			{
				type: "input",
				name: "name",
				message: "What is your name?",
			},
			{
				type: "input",
				name: "ID",
				message: "What is your id?",
			},
			{
				type: "input",
				name: "office",
				message: "What is your office number?",
			},

			{
				type: "input",
				name: "github",
				message: "Enter your GitHub Username",
			},
		])
		.then((answers) => {
			toDoNext(answers);
		});
	function toDoNext(manager, team) {
		if (!team) {
			team = [];
		}

		console.log(team);
		inquirer
			.prompt([
				{
					type: "list",
					name: "todo",
					message: "what do you want to do next?",
					choices: ["add intern", "add engineer", "or create your html?"],
				},
			])
			.then((answer) => {
				console.log(answer);
				switch (answer.todo) {
					case "add intern":
						addIntern(manager, team);
						break;

					case "add engineer":
						addEngineer();
						break;

					default:
						generateHTML();
						break;
				}
			});
	}

	function addIntern(manager, team) {
		console.log("i need to add intern");
		inquirer
			.prompt([
				{
					type: "input",
					name: "name",
					message: "what is your interns name?",
				},
			])
			.then((answers) => {
				toDoNext(answers);
			});
	}
	function addEngineer() {
		console.log("i need to add engineer");
		inquirer
			.prompt([
				{
					type: "input",
					name: "name",
					message: "what is your engineer's name?",
				},
			])
			.then((answers) => {
				team.push(answers);
				toDoNext(manager, team);
			});
	}
	function generateHTML() {
		console.log("create html");
	}
	//.then((answers) => {
	//

	//	fs.writeFile("index.html", htmlPageContent, (err) =>
	//		err ? console.log(err) : console.log("Successfully created index.html!")
	//	);
	//});}
}
generateManger();
