import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import Summary from "./screens/Summary";
import Transactions from "./screens/Transactions";
import TransactionDetails from "./screens/TransactionDetails";

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
    <Stack.Screen name="Transactions List" component={Transactions} />
    <Stack.Screen name="Transaction Details" component={TransactionDetails} />
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
