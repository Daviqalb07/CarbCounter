import { Heading } from "@/components/ui/heading";
import { Stack } from "expo-router";
export default function HomeTabLayout() {
    return (
        <>
            <Heading
                className="color-primary-700 text-center mt-12"
                size="2xl"
            >
                CarbCounter
            </Heading>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
            </Stack>
        </>
    );
}