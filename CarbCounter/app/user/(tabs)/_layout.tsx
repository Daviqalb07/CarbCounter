import { Heading } from "@/components/ui/heading";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function HomeTabLayout() {
  return (
    <>
      <Heading
        className="color-primary-700 text-center mt-12"
        size="2xl"
      >
        CarbCounter
      </Heading>

      <Tabs initialRouteName="index" screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: "book" | "home" | "person" | undefined;

          if (route.name === "reports") {
            iconName = "book";
          } else if (route.name === "index") {
            iconName = "home";
          } else if (route.name === "Perfil") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerShown: false
      })}>
        <Tabs.Screen
          name="index" options={{ title: "Início" }}
        />
      </Tabs>
    </>
  );
}