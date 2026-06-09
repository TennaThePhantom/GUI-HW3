/*
File: script.js
Student Name: Tennessee Foster
Date Created/Modify: 6/4/2026
Copyright (c) 2026 by Tennessee Foster. All rights reserved.
*/

// Get DOM elements
const form = document.getElementById("tableForm");
const resetButton = document.getElementById("resetBtn");
const tableDisplay = document.getElementById("tableDisplay");
const errorArea = document.getElementById("errorArea");

// Constants
const minNumber = -50;
const maxNumber = 50;

/**
 * Show error message if user enter numbers wrong greater than 50 or less than -50
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

/**
 * Clear error message
 */
function clearError() {
	errorArea.innerHTML = "";
}

/**
 * check user inputs to make sure it vaild or not
 */
function validateInputs(startX, endX, startY, endY) {
	// Check if all values are numbers -50 to 50
	if (isNaN(startX) || isNaN(endX) || isNaN(startY) || isNaN(endY)) {
		showError("Please enter valid numbers in all fields");
		return false;
	}

	// Check number range limits (-50 to 50)
	if (
		startX < minNumber ||
		startX > maxNumber ||
		endX < minNumber ||
		endX > maxNumber ||
		startY < minNumber ||
		startY > maxNumber ||
		endY < minNumber ||
		endY > maxNumber
	) {
		showError(`Numbers must be between ${minNumber} and ${maxNumber}`);
		return false;
	}
	// Calculate table size to prevent too big of a table
	// if user enter - 50 to 50 for x and y -50 to 50 = 101(x rows) * 101(y rows) = 10,201
	// 10,201 > 2500 yes don't make the table too big
	let xCount = Math.abs(endX - startX) + 1;
	let yCount = Math.abs(endY - startY) + 1;
	let totalCells = xCount * yCount;

	// if 2500 is too small sorry I didn't know what counts as too big for numbers to generate the table
	if (totalCells > 2500) {
		showError(
			`Table too large (${totalCells} cells). Please use smaller ranges (max 2500 cells).`,
		);
		return false;
	}
	// makes sure that start must be less than end for both x and y
	if (startX > endX) {
		showError("Horizontal Min must be less than or equal to Max");
		return false;
	}
	if (startY > endY) {
		showError("Vertical Min must be less than or equal to Max");
		return false;
	}

	return true;
}

/**
 * Generate the multiplication table
 */
function generateTable(startX, endX, startY, endY) {
	// Create array of x values (multipliers - horizontal axis)
	let xValues = [];
	for (let i = startX; i <= endX; i++) {
		xValues.push(i);
	}

	// Create array of y values (multiplicands - vertical axis)
	let yValues = [];
	for (let i = startY; i <= endY; i++) {
		yValues.push(i);
	}

	// Build HTML table
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

	// Display the table
	tableDisplay.innerHTML = table;
}

/**
 * Handle form submission
 */
function handleSubmit(event) {
	event.preventDefault();

	// Get input values
	let startX = parseInt(document.getElementById("startX").value);
	let endX = parseInt(document.getElementById("endX").value);
	let startY = parseInt(document.getElementById("startY").value);
	let endY = parseInt(document.getElementById("endY").value);

	// Validate inputs
	if (!validateInputs(startX, endX, startY, endY)) {
		return;
	}

	// Generate the table
	generateTable(startX, endX, startY, endY);
	clearError();
}

/**
 * Reset form to default values
 */
function resetForm() {
	document.getElementById("startX").value = "1";
	document.getElementById("endX").value = "5";
	document.getElementById("startY").value = "1";
	document.getElementById("endY").value = "5";

	// Clear table display
	tableDisplay.innerHTML =
		'Enter numbers and click Generate Table to create your table';
	clearError();
}

// Add event listeners
form.addEventListener("submit", handleSubmit);
resetButton.addEventListener("click", resetForm);
