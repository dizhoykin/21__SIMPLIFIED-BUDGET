const income = document.querySelector('#income');
const summaryIncome = document.querySelector('.summary-amount--income');
const summaryExpenses = document.querySelector('.summary-amount--expenses');
const summaryBalance = document.querySelector('.summary-amount--balance');
const expensesTable = document.querySelector('.expense-table');

const expensesNodeTemplate = document.querySelector('#expenses-node').content;
const addExpense = document.querySelector('.add-expense');
const addExpenseButton = addExpense.querySelector('#add-expense-button');

const getBalance = () => {
  summaryBalance.textContent = +summaryIncome.textContent - +summaryExpenses.textContent;
}

income.addEventListener('change', () => {
  summaryIncome.textContent = income.value;
  getBalance();
  income.value = '';
});

addExpenseButton.addEventListener('click', () => {
  const expenseName = addExpense.querySelector('#expense-name');
  const expenseAmount = addExpense.querySelector('#expense-amount');

  if ((expenseName.value != '') && (expenseAmount.value != '')) {
    const expensesItem = expensesNodeTemplate.cloneNode(true);
    const expensesItemName = expensesItem.querySelector('.expenses-item--name');
    const expensesItemAmount = expensesItem.querySelector('.expenses-item--amount');

    expensesItemName.textContent = expenseName.value;
    expensesItemAmount.textContent = expenseAmount.value;

    expensesTable.appendChild(expensesItem);

    summaryExpenses.textContent = Number(summaryExpenses.textContent) + Number(expenseAmount.value);
    getBalance();

    expenseName.value = '';
    expenseAmount.value = '';

    const deleteButtons = document.querySelectorAll('.delete-expense');

    deleteButtons.forEach(deleteButton => {
      deleteButton.addEventListener('click', () => {
        const expensesItem = deleteButton.closest('.expenses-item');
        const expensesAmountField = expensesItem.querySelector('.expenses-item--amount');
        expensesTable.removeChild(expensesItem);

        summaryExpenses.textContent = Number(summaryExpenses.textContent) - Number(expensesAmountField.textContent);
        getBalance();
      });
    });
  }
});

getBalance();
