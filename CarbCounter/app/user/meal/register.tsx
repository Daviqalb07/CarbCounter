import { useState } from "react"
import { ScrollView, View } from "react-native"
import { router } from "expo-router";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button"
import { AddIcon } from "@/components/ui/icon"
import { Image } from "@/components/ui/image"
import { Divider } from "@/components/ui/divider"
import { Input, InputField } from "@/components/ui/input"
import FoodItemEditable from "@/components/FoodItemEditable";

const mealContent = [
    { name: 'Pão de Hamburger', portion: '67 g' },
    { name: 'Carne', portion: '200 g' },
    { name: 'Alface', portion: '5 g' },
    { name: 'Batata Frita', portion: '200 g' }
];


export default function EditMealScreen() {
    const [mealName, setMealName] = useState("")

    const handleSubmit = () => {
        router.replace({
            pathname: "/user/meal/[id]",
            params: {
                id: 1
            }
        })
    }

    return (
        <View className="flex-1 px-4 py-6">
            <Image
                source={{ uri: "https://www.mundoboaforma.com.br/wp-content/uploads/2019/09/hamburguer.jpg" }}
                className="w-full h-48 rounded-lg my-4"
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
                {mealContent.map((foodInfo, index) => (
                    <FoodItemEditable
                        key={index}
                        name={foodInfo.name}
                        portion={foodInfo.portion}
                    />
                ))}
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
                <ButtonText className="text-white text-center text-lg">Cadastrar</ButtonText>
            </Button>
        </View>

    )
}