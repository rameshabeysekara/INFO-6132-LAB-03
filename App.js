import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import Summary from "./screens/Summary";
import Transactions from "./screens/Transactions";
import TransactionDetails from "./screens/TransactionDetails";
import AddTransaction from "./screens/AddTransaction";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TransactionsStack = () => (
  <Stack.Navigator
    screenOptions={({ route }) => ({
      headerStyle: {
        backgroundColor: "#ffbb39",
      },
    })}
  >
    <Stack.Screen
      name="Transactions List"
      component={Transactions}
      options={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Add Transaction")}
          >
            <Text
              style={{
                color: "#000",
                marginRight: 20,
                fontWeight: "bold",
                borderColor: "#fff",
                borderWidth: 2,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        ),
      })}
    />
    <Stack.Screen name="Transaction Details" component={TransactionDetails} />
    <Stack.Screen name="Add Transaction" component={AddTransaction} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Transactions") {
              iconName = "tasks";
            } else if (route.name === "Summary") {
              iconName = "info";
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          activeTintColor: "#ffbb39",
          inactiveTintColor: "gray",
          labelStyle: {
            fontSize: 12,
          },
          headerStyle: {
            backgroundColor: "#ffbb39",
          },
        })}
      >
        <Tab.Screen
          name="Transactions"
          component={TransactionsStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Summary" component={Summary} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
