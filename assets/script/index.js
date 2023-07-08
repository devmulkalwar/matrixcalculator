const selectionInp = document.querySelector(".select");
const sglDimInp = document.querySelector(".sgl-dimension");
const dblDimInp = document.querySelector(".dbl-dimension");
const matArea = document.querySelector("#matrixArea");
const inp = document.querySelector(".inp");
const inpA = document.querySelector(".inpA");
const inpB = document.querySelector(".inpB");
const ans = document.querySelector("#answerArea");
let matrix = [];
let matrixA = [];
let matrixB = [];

function updateDim() {//updates dimension according to selection
	sglDimInp.classList.add("hidden-dimension");
	dblDimInp.classList.remove("hidden-dimension");
}

window.onload = function () {//runs function onload
	updateDim();
};

function getDimension() {//get the input method runs onChnage
	const selectedValue = parseInt(selectionInp.value);
	if (selectedValue === 1 || selectedValue === 2 || selectedValue === 3) {
		sglDimInp.classList.add("hidden-dimension");
		dblDimInp.classList.remove("hidden-dimension");
	}

	else {
		dblDimInp.classList.add("hidden-dimension");
		sglDimInp.classList.remove("hidden-dimension");

	}

	resetMatrixInput();
	resetDimInput();
}

//validates dim inputs according to selected operation
function dimInpValidation() {
	const selectedValue = parseInt(selectionInp.value);

	let rowA = document.getElementById("rowAInp");
	let colA = document.getElementById("colAInp");

	let rowB = document.getElementById("rowBInp");
	let colB = document.getElementById("colBInp");

	let row = document.getElementById("rowInp");
	let col = document.getElementById("colInp");

	if (selectedValue === 1 || selectedValue === 2) {
		rowB.value = rowA.value;
		colB.value = colA.value;
	}

	else if (selectedValue === 3) {
		rowB.value = colA.value;
	}

	else {
		col.value = row.value;
	}
}


//runs on Create btn
function getInpMatrix() {
	resetMatrixInput();
	const selectedValue = parseInt(selectionInp.value);

	const rowA = parseInt(document.getElementById("rowAInp").value);
	const colA = parseInt(document.getElementById("colAInp").value);

	const rowB = parseInt(document.getElementById("rowBInp").value);
	const colB = parseInt(document.getElementById("colBInp").value);

	const row = parseInt(document.getElementById("rowInp").value);
	const col = parseInt(document.getElementById("colInp").value);

	if (selectedValue === 1 || selectedValue === 2 || selectedValue === 3) {

		if (isNaN(rowA) || isNaN(colA) || isNaN(rowB) || isNaN(colB)) {
			alert("Enter a Valid Value");
			resetDimInput();
			return;
		}

		createInpMatrix(rowA, colA, "A", "inpA");
		createInpMatrix(rowB, colB, "B", "inpB");

	}

	else {
		if (isNaN(row) || isNaN(col)) {
			alert("Enter a Valid Value");
			resetDimInput();
			return;
		}
		createInpMatrix(row, col, "", "inp");
		storeInpMatrix(row, col, "");
	}
}

//creates an input matrix 
function createInpMatrix(row, col, mat, cls) {

	let html = `<table  class="matTable">`;
	html += `<h3>Enter Matrix ${mat} Values:<h3>`

	for (let i = 0; i < row; i++) {
		html += "<tr>";
		for (let j = 0; j < col; j++) {
			let cellId = `cell_${mat}_${i}_${j}`;
			html += `<td><input type="text" inputmode="numeric" id="${cellId}" /></td>`;
		}
		html += "</tr>";
	}
	html += "</table>";

	let element = document.querySelector(`.${cls}`);
	element.innerHTML += html;

}

//to store data inside matrix
function storeInpMatrix(row, col, mat) {
	let matrixValues = [];
	for (let i = 0; i < row; i++) {
		matrixValues[i] = [];
		for (let j = 0; j < col; j++) {
			let cellId = `cell_${mat}_${i}_${j}`;
			let inputValue = parseFloat(document.getElementById(cellId).value);
			matrixValues[i][j] = isNaN(inputValue) ? 0 : inputValue;
		}
	}

	if (mat === "A") {
		matrixA = matrixValues;
	} else if (mat === "B") {
		matrixB = matrixValues;
	} else {
		matrix = matrixValues;
	}

}

//resets all the inputs 
function reset() {
	resetDimInput();
	resetMatrixInput();
}

//resets inputs
function resetMatrixInput() {
	inp.innerHTML = "";
	inpA.innerHTML = "";
	inpB.innerHTML = "";
	ans.innerHTML = "";
}

//resets dimension 
function resetDimInput() {
	document.getElementById("rowInp").value = "";
	document.getElementById("colInp").value = "";

	document.getElementById("rowAInp").value = "";
	document.getElementById("colAInp").value = "";

	document.getElementById("rowBInp").value = "";
	document.getElementById("colBInp").value = "";
}

//to add two matrices
function matrixAdd(matA, matB, rowA, colA, rowB, colB) {
	if (rowA === rowB && colA === colB) {
		let result = [];

		for (let i = 0; i < rowA; i++) {
			result[i] = [];

			for (let j = 0; j < colA; j++) {
				result[i][j] = matA[i][j] + matB[i][j];
			}
		}
		display(result, rowA, colA);
		return result;
	}

	else {
		return null;
	}
}

//to subtract two matrices
function matrixSub(matA, matB, rowA, colA, rowB, colB) {
	let result = [];

	for (let i = 0; i < rowA; i++) {
		result[i] = [];

		for (let j = 0; j < colA; j++) {
			result[i][j] = matA[i][j] - matB[i][j];
		}
	}
	display(result, rowA, colA);
	return result;
}

//to multiply two matrices
function matrixMultiply(matA, matB, rowA, colA, rowB, colB) {

	let result = [];

	for (let i = 0; i < rowA; i++) {
		result[i] = [];

		for (let j = 0; j < colB; j++) {
			let sum = 0;
			for (let k = 0; k < colA; k++) {
				sum = sum + (matA[i][k] * matB[k][j]);
			}
			result[i].push(sum);
		}
	}
	display(result, rowA, colB);
	return result;

}

//to calculate determinant of matrix
function matrixDet(matrix, k) {
	let det, sign = 1;
	if (k === 1) {
		det = matrix[0][0];
		detDisplay(det);
		return det;
	}
	else if (k === 2) {
		det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
		detDisplay(det);
		return det;
	}
	else {
		det = 0;
		for (let c = 0; c < k; c++) {
			let subMatrix = [];
			for (let i = 1; i < k; i++) {
				subMatrix[i - 1] = [];
				for (let j = 0; j < k; j++) {
					if (j !== c) {
						subMatrix[i - 1].push(matrix[i][j]);
					}
				}
			}
			det += sign * matrix[0][c] * matrixDet(subMatrix, k - 1);
			sign = -sign;
		}
		detDisplay(det);
		return det;
	}
}

//to find upper triangular matrix
function upperTriangle(matrix, row, col) {
	let result = [];
	for (let i = 0; i < row; i++) {
		result[i] = [];
		for (let j = 0; j < col; j++) {
			if (i > j) {
				result[i].push(0); // Set lower triangular elements to 0
			}
			else {
				let sum = 0;
				sum = sum + matrix[i][j];
				result[i].push(sum);
			}
		}
	}
	display(result, row, col);
	return result;
}

//to find lower triangular matrix
function lowerTriangle(matrix, row, col) {
	let result = [];
	for (let i = 0; i < row; i++) {
		result[i] = [];
		for (let j = 0; j < col; j++) {
			if (i < j) {
				result[i].push(0); // Set upper triangular elements to 0
			}
			else {
				let sum = 0;
				sum = sum + matrix[i][j];
				result[i].push(sum);
			}
		}
	}
	display(result, row, col);
	return result;
}

//to find identity matrix
function identity(matrix, row, col) {
	let result = [];
	for (let i = 0; i < row; i++) {
		result[i] = [];
		for (let j = 0; j < col; j++) {
			if (i == j) {
				result[i].push(1);
			}
			else {
				result[i].push(0);
			}
		}
	}
	display(result, row, col);
	return result;
}

//displays the result
function display(mat, row, col) {//to display result
	let html = `<h3>Answer</h3>`;
	html += `<table class="matTable">`;
	for (let i = 0; i < row; i++) {
		html += "<tr>";
		for (let j = 0; j < col; j++) {
			const cellId = `cell_result_${i}_${j}`;
			html += `<td><input type="text" id="${cellId}" value="${mat[i][j]}" /></td>`;
		}
		html += "</tr>";
	}
	html += "</table>";

	ans.innerHTML = html;
}

//displays the result for determinant
function detDisplay(det) {
	let html = `<h3>Answer</h3>`
	html += `<h3>Determinant = ${det}</h3>`;
	ans.innerHTML = html;
}

// runs on solve button 
function solve() {
	const selection = parseInt(selectionInp.value);

	const rowA = parseInt(document.getElementById("rowAInp").value);
	const colA = parseInt(document.getElementById("colAInp").value);

	const rowB = parseInt(document.getElementById("rowBInp").value);
	const colB = parseInt(document.getElementById("colBInp").value);

	const row = parseInt(document.getElementById("rowInp").value);
	const col = parseInt(document.getElementById("colInp").value);

	if (selection === 1 || selection === 2 || selection === 3) {
		if (isNaN(rowA) || isNaN(colA) || isNaN(rowB) || isNaN(colB)) {
			alert("Enter a Valid Value");
			resetDimInput();
			return;
		}
		storeInpMatrix(rowA, colA, "A");
		storeInpMatrix(rowB, colB, "B");
	} else {
		if (isNaN(row) || isNaN(col)) {
			alert("Enter a Valid Value");
			resetDimInput();
			return;
		}
		storeInpMatrix(row, col, "");
	}

	switch (selection) {
		case 1:
			console.log("1");
			console.log("Matrix A:", matrixA);
			console.log("Matrix B:", matrixB);
			console.log("addition: ", matrixAdd(matrixA, matrixB, rowA, colA, rowB, colB));
			break;

		case 2:
			console.log("2");
			console.log("Matrix A:", matrixA);
			console.log("Matrix B:", matrixB);
			console.log("addition: ", matrixSub(matrixA, matrixB, rowA, colA, rowB, colB));
			break;

		case 3:
			console.log("3");
			console.log("Matrix A:", matrixA);
			console.log("Matrix B:", matrixB);
			console.log("multiplication: ", matrixMultiply(matrixA, matrixB, rowA, colA, rowB, colB));
			break;

		case 4:
			console.log("4");
			console.log("Matrix:", matrix);
			console.log("determinanat: ", matrixDet(matrix, row));
			break;

		case 5:
			console.log("5");
			console.log("Matrix:", matrix);
			console.log("upper triangle: ", upperTriangle(matrix, row, col));
			break;

		case 6:
			console.log("6");
			console.log("Matrix:", matrix);
			console.log("lower triangle: ", lowerTriangle(matrix, row, col));
			break;

		case 7:
			console.log("7");
			console.log("Matrix:", matrix);
			console.log("identity: ", identity(matrix, row, col));
			break;

		default:
			break;
	}
}
