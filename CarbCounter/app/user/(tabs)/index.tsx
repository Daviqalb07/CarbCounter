import MealCard from "@/components/MealCard";
import NutritionInfo from "@/components/NutritionInfo";
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

const HomeScreen = () => {
    const newMeal = () => {
        router.navigate("/user/meal/register")
    }

    return (
        <>
            <ScrollView>
                <Box className="my-6 px-5">

                    <NutritionInfo
                        calories={nutritionInfo.calories}
                        carbohydrates={nutritionInfo.carbohydrates}
                    />
                </Box>

                <Text className="text-black text-2xl font-bold mb-3 text-center">Refeições do dia</Text>

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
            <Button
                className="absolute bottom-4 right-4 bg-primary-500 w-20 h-20 rounded-full items-center justify-center shadow-lg p-0"
                onPress={newMeal}
            >

                <Ionicons name="camera" size={45} color="white" />
            </Button>

        </>
    );
};

export default HomeScreen;
