import { useState, useEffect } from "react"
import { ScrollView, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button"
import { AddIcon } from "@/components/ui/icon"
import { Image } from "@/components/ui/image"
import { Divider } from "@/components/ui/divider"
import { Input, InputField } from "@/components/ui/input"
import FoodItemEditable from "@/components/FoodItemEditable";


export default function EditMealScreen() {
    const { imageData }: { imageData: string } = useLocalSearchParams()
    const [mealContent, setMealContent] = useState<{ name: string, portion: string }[]>([]);
    const [mealName, setMealName] = useState("")

    const postImageData = async () => {
        const apiUrl = `${process.env.EXPO_PUBLIC_NUTRITION_API_URL}/meal/estimation/portions`;

        const formData = new FormData();
        formData.append("image", imageData);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                router.back()
            }

            const jsonResponse = await response.json();
            setMealContent(jsonResponse.data)
        } catch (error) {
            console.error("Erro ao enviar a imagem:", error);
        }
    };

    useEffect(() => {
        postImageData();
    }, []);

    const handleSubmit = () => {
        router.replace({
            pathname: "/user/meal/register",
            params: {
                name: mealName,
                mealContent: JSON.stringify(mealContent),
                image: imageData
            }
        })
    }

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
            <Input className="px-4 mb-4 h-12">
                <InputField
                    className="text-lg text-center"
                    placeholder="Nome da refeição"
                    onChangeText={setMealName}
                />
            </Input>

            <Divider orientation="horizontal" />

            <ScrollView className="mt-4 px-2">
                {mealContent.length > 0 ? (mealContent.map((foodInfo, index) => (
                    <FoodItemEditable
                        key={index}
                        name={foodInfo.name}
                        portion={foodInfo.portion}
                    />
                ))) : <></>}
                <Button
                    action="default"
                    className="flex-1 mb-2 items-center justify-start p-0 gap-2"
                    onPress={() => console.log("ADDING NEW INGREDIENT")}
                >
                    <ButtonIcon as={AddIcon} className="text-typography-500" />
                    <ButtonText className="text-typography-500">Adicionar alimento</ButtonText>
                </Button>
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