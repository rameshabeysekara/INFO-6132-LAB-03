import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const TransactionDetails = ({ route }) => {
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Name:</Text>
        <Text style={styles.amount}>{transaction.name}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Amount:</Text>
        <Text style={styles.amount}>${transaction.amount}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Location:</Text>
        <Text style={styles.amount}>{transaction.location}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Date:</Text>
        <Text style={styles.amount}>{transaction.date}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: "#666",
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TransactionDetails;
