import { useLocalSearchParams } from "expo-router";
import { View, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Divider } from "@/components/ui/divider";
import InfoCircle from "@/components/InfoCircle";
import FoodItemCompleteInfo from "@/components/FoodItemCompleteInfo";


const mealInfo = {
    name: "Lanche",
    image: "https://www.mundoboaforma.com.br/wp-content/uploads/2019/09/hamburguer.jpg",
    content: [
        { name: 'Pão de Hamburger', portion: '67 g', calories: 134, carbohydrates: 33 },
        { name: 'Carne', portion: '200 g', calories: 400, carbohydrates: 0 },
        { name: 'Alface', portion: '5 g', calories: 1, carbohydrates: 0 },
        { name: 'Batata Frita', portion: '200 g', calories: 620, carbohydrates: 62 }
    ],
    calories: 1145,
    carbohydrates: 95
}





export default function MealInfoScreen() {
    const params = useLocalSearchParams()

    return (
        <View className="flex-1 px-4 py-6">
            <Image
                source={{ uri: mealInfo.image }}
                className="w-full h-48 rounded-lg my-4"
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
                {mealInfo.content.map((foodInfo, index) => (
                    <FoodItemCompleteInfo
                        key={index}
                        name={foodInfo.name}
                        portion={foodInfo.portion}
                        calories={foodInfo.calories}
                        carbohydrates={foodInfo.carbohydrates}
                    />
                ))}

            </ScrollView>
        </View>
    )
}