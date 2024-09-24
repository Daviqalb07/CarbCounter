import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { View, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Divider } from "@/components/ui/divider";
import InfoCircle from "@/components/InfoCircle";
import FoodItemCompleteInfo from "@/components/FoodItemCompleteInfo";


export default function MealInfoScreen() {
    const { name, mealContent, imageData }: {
        name: string,
        mealContent: string,
        imageData: string
    } = useLocalSearchParams();
    const parsedMealContent = mealContent ? JSON.parse(mealContent) : [];
    const [mealInfo, setMealInfo] = useState({
        name: name,
        image: imageData,
        content: [],
        calories: 0,
        carbohydrates: 0
    });

    let totalCalories = 0;
    let totalCarbohydrates = 0;

    const postMealContent = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_NUTRITION_API_URL}/meal/estimation/nutrition`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedMealContent),
            });

            if (!response.ok) {
                router.back()
            }

            const result = await response.json();
            result.data.forEach(item => {
                totalCalories += item.calories || 0;
                totalCarbohydrates += item.carbohydrates || 0;
            });

            setMealInfo((previous) => (
                {
                    ...previous,
                    content: result.data,
                    calories: totalCalories,
                    carbohydrates: totalCarbohydrates
                }
            ))
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    useEffect(() => {
        postMealContent();
    }, []);

    return (
        <View className="flex-1 px-4 py-6">
            <Image
                source={{
                    uri: `data:image/png;base64,${imageData}`
                }}
                className="w-full h-1/2 rounded-lg my-4"
                resizeMode="cover"
                alt="Meal image"
            />

            <Text className="px-4 mb-4 text-bold text-2xl text-center">
                {mealInfo.name}
            </Text>

            <Divider orientation="horizontal" />

            <Box className="my-4 flex-row justify-between px-14">
                <InfoCircle
                    value={mealInfo.calories}
                    text="kcal"
                    color="#40A578"
                />
                <InfoCircle
                    value={mealInfo.carbohydrates}
                    text="g CHO"
                    color="#006769"
                />
            </Box>

            <Divider orientation="horizontal" />

            <ScrollView className="mt-4 px-2">
                {mealInfo.content.length > 0 ? (mealInfo.content.map((foodInfo, index) => (
                    <FoodItemCompleteInfo
                        key={index}
                        name={foodInfo.name}
                        portion={foodInfo.portion}
                        calories={foodInfo.calories}
                        carbohydrates={foodInfo.carbohydrates}
                    />
                ))) : <></>}

            </ScrollView>
        </View>
    )
}