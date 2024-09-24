import MealCard from "@/components/MealCard";
import { View, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Stack } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

export default function MealsReportScreen() {
    const [dayMeals, setDayMeals] = useState([]);
    const [day, setDay] = useState("");

    useEffect(() => {
        const fetchDayMeals = async () => {
            try {
                const storedMeals = await AsyncStorage.getItem('dayMeals');
                if (storedMeals) {
                    const parsedMeals = JSON.parse(storedMeals);
                    setDayMeals(parsedMeals.meals);
                    setDay(new Date(parsedMeals.date).toLocaleDateString('pt-BR'));
                }
            } catch (error) {
                console.error("Failed to fetch day meals from async storage", error);
            }
        };

        fetchDayMeals();
    }, []);

    return (
        <View className="flex-1 py-4">
            <Text className="text-2xl text-black text-center font-bold my-4">Refeições de {day}</Text>
            <ScrollView>
                <VStack>
                    {dayMeals.map((meal, index) => (
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
        </View>
    )
}