import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { View, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Divider } from "@/components/ui/divider";
import InfoCircle from "@/components/InfoCircle";
import FoodItemCompleteInfo from "@/components/FoodItemCompleteInfo";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MealInfoScreen() {
    const { name, mealContent, image }: {
        name: string,
        mealContent: string,
        image: string
    } = useLocalSearchParams();
    const parsedMealContent = mealContent ? JSON.parse(mealContent) : [];
    const [mealInfo, setMealInfo] = useState({
        name: name,
        image: image,
        content: [],
        calories: 0,
        carbohydrates: 0
    });

    let totalCalories = 0;
    let totalCarbohydrates = 0;

    const postMealContent = async () => {
        try {
            console.log("Starting image upload...");
            const response = await fetch(`${process.env.EXPO_PUBLIC_NUTRITION_API_URL}/meal/estimation/nutrition`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedMealContent),
            });
            console.log(`Image upload completed`);
            
            if (!response.ok) {
                router.back()
            }

            const result = await response.json();
            result.data.forEach((item: any) => {
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

    const updateImageToImgur = async (image: string) => {
        try {
            const formData = new FormData();
            formData.append('image', image);
            console.log("Starting image upload...");
            const response = await fetch(`${process.env.EXPO_PUBLIC_IMGUR_API_URL}`, {
                method: 'POST',
                headers: {
                    'Authorization': process.env.EXPO_PUBLIC_IMGUR_CLIENT_ID,
                },
                body: formData,
            });
            console.log(`Image upload completed`);

            if (!response.ok) {
                console.error("Failed to upload image to Imgur");
                return null;
            }

            const result = await response.json();
            return result.data.link;
        } catch (error) {
            console.error("Error uploading image to Imgur:", error);
            return null;
        }
    };

    const handleSubmit = async () => {
        const imgurImageUrl = await updateImageToImgur(image);
        try {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const userId = user?.id;
            const response = await fetch(`${process.env.EXPO_PUBLIC_CARBCOUNTER_API_URL}/api/meals`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${await AsyncStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    meal: {
                        name: mealInfo.name,
                        image: imgurImageUrl,
                        foods: mealInfo.content.map((food: any) => ({
                            name: food.name,
                            portion: food.portion,
                            calories: food.calories,
                            carbohydrates: food.carbohydrates
                        }))
                    }
                }),
            });

            if (!response.ok) {
                console.error("Failed to register meal");
                return;
            }

            const result = await response.json();
            console.log("Meal registered successfully:", result);
            router.replace("/user");
        } catch (error) {
            console.error("Error registering meal:", error);
        }
    };

    useEffect(() => {
        postMealContent();
    }, []);

    return (
        <View className="flex-1 px-4 py-6">
            <Image
                source={{
                    uri: `data:image/png;base64,${image}`
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
                {mealInfo.content.length > 0 ? (mealInfo.content.map((foodInfo: any, index: number) => (
                    <FoodItemCompleteInfo
                        key={index}
                        name={foodInfo.name}
                        portion={foodInfo.portion}
                        calories={foodInfo.calories}
                        carbohydrates={foodInfo.carbohydrates}
                    />
                ))) : <></>}

            </ScrollView>

            <Button
                className="bg-primary-600 my-4 py-2 h-12 rounded-lg"
                onPress={handleSubmit}
            >
                <ButtonText className="text-white text-center text-lg">Avançar</ButtonText>
            </Button>
        </View>
    )
}