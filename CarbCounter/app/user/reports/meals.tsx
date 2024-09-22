import MealCard from "@/components/MealCard";
import { View, ScrollView } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Stack } from "expo-router";

const meals = [
    {
        mealName: "Almoço",
        mealTime: "12:00",
        calories: 300,
        carbs: 55,
        imageUrl: "https://cdn.folhape.com.br/upload/dn_arquivo/2023/09/whatsapp-image-2023-09-22-at-070623.jpeg",
    },
    {
        mealName: "Café da Manhã",
        mealTime: "08:00",
        calories: 300,
        carbs: 55,
        imageUrl: "https://blog.ciaathletica.com.br/wp-content/uploads/2024/05/cafe-da-manha-simples-e-saudavel-para-comecar-o-dia-.jpg"
    }
];

export default function MealsReportScreen() {
    const day = "10 set 2024"
    return (
        <View className="flex-1 py-4">
            <Text className="text-2xl text-black text-center font-bold my-4">Refeições de {day}</Text>
            <ScrollView>

                <VStack>
                    {meals.map((meal, index) => (
                        <MealCard
                            key={index}
                            mealName={meal.mealName}
                            mealTime={meal.mealTime}
                            calories={meal.calories}
                            carbs={meal.carbs}
                            imageUrl={meal.imageUrl}
                        />
                    ))}
                </VStack>
            </ScrollView>
        </View>
    )
}