import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }}
      />
      <Tabs.Screen
        name="categories"
        options={{ title: "Categories", tabBarIcon: ({ color }) => <Ionicons name="grid" size={24} color={color} /> }}
      />
      <Tabs.Screen
        name="missions"
        options={{ title: "Missions", tabBarIcon: ({ color }) => <Ionicons name="rocket" size={24} color={color} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }}
      />
    </Tabs>
  );
}