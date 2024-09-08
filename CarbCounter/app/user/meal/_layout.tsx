import { Stack } from "expo-router";
import { Heading } from "@/components/ui/heading";

export default function LoginLayout() {
    return (
        <>
            <Heading
                className="color-primary-700 text-center mt-12"
                size="2xl"
            >
                CarbCounter
            </Heading>
            <Stack screenOptions={{ headerShown: false, headerBackButtonMenuEnabled: true }}>
                <Stack.Screen name="register" />
            </Stack>
        </>
    );
}
