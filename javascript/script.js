/*
File: script.js
Student Name: Tennessee Foster
Date Created/Modify: 6/4/2026
Email: tennessee_foster@student.uml.edu
Copyright (c) 2026 by Tennessee Foster. All rights reserved.
*/

// Get the DOM elements
const form = document.getElementById("tableForm");
const resetButton = document.getElementById("resetBtn");
const tableDisplay = document.getElementById("tableDisplay");
const errorArea = document.getElementById("errorArea");

// Constants min and max
const minNumber = -50;
const maxNumber = 50;

/*
Show error message if user don't do something right in input
emoji lass access 6/8/2026 -> https://getemoji.com/
 */
function showError(message) {
	errorArea.innerHTML = `<div class="error-message">⚠️ ${message}</div>`;
	// Auto-hide after 5 seconds
	setTimeout(() => {
		if (errorArea.innerHTML) {
			errorArea.innerHTML = "";
		}
	}, 5000);
}

/*
Clear error message
 */
function clearError() {
	errorArea.innerHTML = "";
}

/*
check user inputs to make sure it vaild or not
 */
function validateUserInputs(minX, maxX, minY, maxY) {
	// Check if all values are numbers only and if user even enter a number at all(blank)
	if (isNaN(minX) || isNaN(maxX) || isNaN(minY) || isNaN(maxY)) {
		showError("Please enter valid numbers in all fields");
		return false;
	}

	// Check number range limits (-50 to 50)
	if (
		minX < minNumber ||
		minX > maxNumber ||
		maxX < minNumber ||
		maxX > maxNumber ||
		minY < minNumber ||
		minY > maxNumber ||
		maxY < minNumber ||
		maxY > maxNumber
	) {
		showError(`Numbers must be between ${minNumber} and ${maxNumber}`);
		return false;
	}
	// Calculate table size to prevent too big of a table
	// if user enter -50 to 50 for x and y -50 to 50 = 101(x rows) * 101(y rows) = 10,201
	// 10,201 > 2500 yes don't make the table too big
	let xCount = Math.abs(maxX - minX) + 1; // if user enter -50 it turns to 50
	let yCount = Math.abs(maxY - minY) + 1;
	let totalCells = xCount * yCount;

	// if 2500 (50 * 50) is greater than that don't make the table too big
	if (totalCells > 2500) {
		showError(
			`Table too large (${totalCells} cells). Please use smaller ranges (max 2500 cells).`,
		);
		return false;
	}
	// makes sure that min number must be less than max for both x and y won't show both if user enter both wrong
	if (minX > maxX) {
		showError("Horizontal Min must be less than or equal to Max");
		return false;
	}
	if (minY > maxY) {
		showError("Vertical Min must be less than or equal to Max");
		return false;
	}

	return true;
}

/*
Generate the user multiplication table from input
 */
function generateUserTable(minX, maxX, minY, maxY) {
	// Create array of x values (multipliers the  horizontal axis)
	let xValues = [];
	for (let number = minX; number <= maxX; number++) {
		xValues.push(number);
	}

	// Create array of y values (multipliers the vertical axis)
	let yValues = [];
	for (let number = minY; number <= maxY; number++) {
		yValues.push(number);
	}

	// Build User table from input
	let table = '<table class="multiplication-table">';
	table += "<thead>";
	table += "<tr>";
	table += "<th>×</th>"; // Corner cell(muplication)

	// Add header row (multipliers)
	for (let x of xValues) {
		table += `<th>${x}</th>`;
	}
	table += "</tr>";
	table += "</thead>";
	table += "<tbody>";

	// Add data rows
	for (let y of yValues) {
		table += "<tr>";
		table += `<th>${y}</th>`; // Row header (multiplicand)

		// Calculate and add each cell
		for (let x of xValues) {
			let product = x * y;
			table += `<td>${product}</td>`;
		}
		table += "</tr>";
	}

	table += "</tbody>";
	table += "</table>";

	// Display the table for user
	tableDisplay.innerHTML = table;
}

/*
Handle user form submission reasonable user inputs
 */
function handleUserInputSubmit(event) {
	event.preventDefault();

	// Get input values from user string to int
	let minX = parseInt(document.getElementById("minX").value);
	let maxX = parseInt(document.getElementById("maxX").value);
	let minY = parseInt(document.getElementById("minY").value);
	let maxY = parseInt(document.getElementById("maxY").value);

	// Validate user inputs
	if (!validateUserInputs(minX, maxX, minY, maxY)) {
		return;
	}

	// Generate the table for user
	generateUserTable(minX, maxX, minY, maxY);
	clearError();
}

/*
 Reset form to default values 1 and 5
 */
function resetUserInputs() {
	document.getElementById("minX").value = "1";
	document.getElementById("maxX").value = "5";
	document.getElementById("minY").value = "1";
	document.getElementById("maxY").value = "5";

	// Clear/remove old table
	tableDisplay.innerHTML =
		"Enter numbers and click Generate Table to create your table";
	clearError();
}

// reset button and submit user data
form.addEventListener("submit", handleUserInputSubmit);
resetButton.addEventListener("click", resetUserInputs);
