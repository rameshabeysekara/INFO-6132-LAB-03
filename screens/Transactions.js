import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { getData } from "../firebase/firestoreFunctions";

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getData(); // Fetch data from Firestore
      setTransactionsData(data); // Update state with the fetched data
    };

    const unsubscribe = navigation.addListener("focus", () => {
      fetchTransactions(); // Fetch data when the screen is focused
    });

    return unsubscribe; // Return the function to unsubscribe from the event
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("Transaction Details", { transaction: item })
      }
    >
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.amount}>${item.amount}</Text>
        <FontAwesome
          name="chevron-right"
          size={24}
          color={navigation.isFocused() ? "#ffbb39" : "gray"}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactionsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={false}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default Transactions;
