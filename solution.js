function calculateBalanceSheet(revenueData, expenseData) {
  // Create a map to store the balances for each month
  const balances = new Map();

  // Calculate the balances from revenue data
  for (const revenueEntry of revenueData) {
    const { amount, startDate } = revenueEntry;
    const [year, month] = startDate.split("-").slice(0, 2);
    const monthBalance = balances.get(`${year}-${month}`) || 0;
    balances.set(`${year}-${month}`, monthBalance + amount);
  }

  // Subtract the expenses from the balances
  for (const expenseEntry of expenseData) {
    const { amount, startDate } = expenseEntry;
    const [year, month] = startDate.split("-").slice(0, 2);
    const monthBalance = balances.get(`${year}-${month}`) || 0;
    balances.set(`${year}-${month}`, monthBalance - amount);
  }

  // Sort the balances by timestamp in ascending order
  const sortedBalances = Array.from(balances.entries()).sort();

  // Create the final balance sheet
  const balanceSheet = {
    balance: sortedBalances.map(([timestamp, balance]) => ({
      amount: balance,
      startDate: `${timestamp}-01T00:00:00.000Z`,
    })),
  };

  return balanceSheet;
}

// Example usage with the provided input data
const input = 
{
  "expenseData": [
    {
      "amount": 50,
      "startDate": "2021-01-01T00:00:00.000Z"
    },
    {
      "amount": 20,
      "startDate": "2021-02-01T00:00:00.000Z"
    },
    {
      "amount": 30,
      "startDate": "2021-03-01T00:00:00.000Z"
    }
  ],
  "revenueData": [
    {
      "amount": 60,
      "startDate": "2021-02-01T00:00:00.000Z"
    }
  ]
};



// Extract the revenue and expense data
const { revenueData, expenseData } = input;

// Calculate the balance sheet
const balanceSheet = calculateBalanceSheet(revenueData, expenseData);

// Convert the balance sheet to JSON string
const outputJSON = JSON.stringify(balanceSheet, null, 2);

// Print the result
console.log(outputJSON);

