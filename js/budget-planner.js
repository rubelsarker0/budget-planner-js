/****** Initial values *******/
const incomeField = document.querySelector('#income');
const foodField = document.querySelector('#food');
const rentField = document.querySelector('#rent');
const clothesField = document.querySelector('#clothes');
const saveField = document.querySelector('#save');
const balanceField = document.querySelector('#balance');
const calculateBtn = document.querySelector('#calculate-btn');
const btnSave = document.querySelector('#btn-save');
const errorMessage = document.querySelector('#error-message');
const saveError = document.querySelector('#save-error');

/****** Expenses calculation *******/
function calculateExpenses() {
	const incomeAmount = parseInt(incomeField.value);
	const foodAmount = parseInt(foodField.value);
	const rentAmount = parseInt(rentField.value);
	const clothesAmount = parseInt(clothesField.value);
	const totalExpenses = foodAmount + rentAmount + clothesAmount;

	if (
		isNaN(incomeAmount) ||
		incomeAmount < 0 ||
		isNaN(foodAmount) ||
		foodAmount < 0 ||
		isNaN(rentAmount) ||
		rentAmount < 0 ||
		isNaN(clothesAmount) ||
		clothesAmount < 0
	) {
		errorMessage.classList.remove('d-none');
	} else if (totalExpenses > incomeAmount) {
		errorMessage.textContent = "You don't have enough income";
		errorMessage.classList.remove('d-none');
	} else {
		const balance = incomeAmount - totalExpenses;
		displayAmounts(totalExpenses, balance);
		clearInputFields();
		errorMessage.classList.add('d-none');
	}
}

/****** Saving calculation *******/
function calculateSaving() {
	const savingAmountField = document.querySelector('#saving-amount');
	const reamingBalanceField = document.querySelector('#remaining-balance');
	const balanceAmount = parseInt(balanceField.innerText);
	const incomeAmount = parseInt(incomeField.value);
	const savingPercentage = parseInt(saveField.value);
	const savingAmount = (savingPercentage / 100) * incomeAmount;

	if (isNaN(savingPercentage) || savingPercentage < 0) {
		saveError.classList.remove('d-none');
	} else if (savingAmount > balanceAmount) {
		saveError.textContent = "You don't have enough balance";
		saveError.classList.remove('d-none');
	} else {
		const reamingBalance = balanceAmount - savingAmount;
		savingAmountField.innerText = savingAmount;
		reamingBalanceField.innerText = reamingBalance;
		saveField.value = '';
		incomeField.value = '';
		saveError.classList.add('d-none');
	}
}

/****** displaying the expenses and balance *******/
function displayAmounts(totalExpenses, balance) {
	const totalExpensesField = document.querySelector('#total-expenses');
	totalExpensesField.innerText = totalExpenses;
	balanceField.innerText = balance;
}

/****** Clearing the input field *******/
function clearInputFields() {
	foodField.value = '';
	rentField.value = '';
	clothesField.value = '';
}

/****** Add listener to the button *******/
calculateBtn.addEventListener('click', calculateExpenses);
btnSave.addEventListener('click', calculateSaving);
