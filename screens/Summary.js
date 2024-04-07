import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { getData } from "../firebase/firestoreFunctions"; // Import the getData function

const Summary = () => {
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getData(); // Fetch data from Firestore
        setTransactionsData(data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching transactions data: ", error);
      }
    };

    fetchTransactions();

    const intervalId = setInterval(fetchTransactions, 3000); // Set up an interval to fetch data every 3 seconds

    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, []);

  // Calculate total expenses
  const totalExpenses = transactionsData.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0
  );

  // Find the highest spending transaction
  const highestSpendingTransaction = transactionsData.reduce(
    (prev, current) => (prev.amount > current.amount ? prev : current),
    { amount: 0 } // Initial value to handle empty array
  );

  // Find the lowest spending transaction
  const lowestSpendingTransaction = transactionsData.reduce(
    (prev, current) => (prev.amount < current.amount ? prev : current),
    { amount: Infinity } // Initial value to handle empty array
  );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Total Transactions:</Text>
        <Text style={styles.amount}>{transactionsData.length}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Total Expenses:</Text>
        <Text style={styles.amount}>${totalExpenses}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Highest Spending: {highestSpendingTransaction.name}
        </Text>
        <Text style={styles.amount}>${highestSpendingTransaction.amount}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Lowest Spending: {lowestSpendingTransaction.name}
        </Text>
        <Text style={styles.amount}>${lowestSpendingTransaction.amount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "#666",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    marginVertical: 10,
  },
});

export default Summary;
