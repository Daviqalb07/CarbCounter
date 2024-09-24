import MealCard from "@/components/MealCard";
import { useState, useEffect } from "react";
import NutritionInfo from "@/components/NutritionInfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "@expo/vector-icons/Ionicons";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { ScrollView } from "react-native";
import { Button } from "@/components/ui/button";
import { router } from "expo-router";
import { Box } from "@/components/ui/box";

const nutritionInfo = {
    calories: 600,
    carbohydrates: 110
}

const HomeScreen = () => {
    const [meals, setMeals] = useState([]);
    const [user, setUser] = useState(null);
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
                setIsUserLoaded(true);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchMeals = async () => {
            if (user) {
                try {
                    const response = await fetch(`${process.env.EXPO_PUBLIC_CARBCOUNTER_API_URL}/api/patients/${user.id}/meals`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `${await AsyncStorage.getItem('authToken')}`
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data)
                        setMeals(data);
                    } else {
                        console.error("Failed to fetch meals");
                    }
                } catch (error) {
                    console.error("Error fetching meals:", error);
                }
            }
        };

        if (isUserLoaded) {
            fetchMeals();
        }
    }, [isUserLoaded, user]);

    const openCameraView = () => {
        router.push("/user/camera")
    }

    const totalNutrition = meals.reduce((acc, meal) => {
        acc.calories += meal.total_calories;
        acc.carbohydrates += meal.total_cho;
        return acc;
    }, { calories: 0, carbohydrates: 0 });

    return (
        <>
            <ScrollView>
                <Box className="my-6 px-5">
                    <NutritionInfo
                        calories={totalNutrition.calories}
                        carbohydrates={totalNutrition.carbohydrates}
                    />
                </Box>

                <Text className="text-black text-2xl font-bold mb-3 text-center">Refeições do dia</Text>

                <VStack>
                    {meals.map((meal, index) => (
                        <MealCard
                            key={index}
                            mealName={meal.name}
                            mealTime={new Date(meal.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            calories={meal.total_calories}
                            carbs={meal.total_cho}
                            imageUrl={meal.image}
                        />
                    ))}
                </VStack>
            </ScrollView>
            <Button
                className="absolute bottom-4 right-4 bg-primary-500 w-20 h-20 rounded-full items-center justify-center shadow-lg p-0"
                onPress={openCameraView}
            >

                <Ionicons name="camera" size={45} color="white" />
            </Button>

        </>
    );
};

export default HomeScreen;