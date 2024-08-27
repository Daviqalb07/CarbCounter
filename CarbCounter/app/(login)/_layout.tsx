import { Stack } from "expo-router";
import "@/global.css";

export default function LoginLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="login" />
			<Stack.Screen name="signup/user" />
			<Stack.Screen name="signup/professional" />
			<Stack.Screen name="signup/supervisor" />
		</Stack>
	);
}
