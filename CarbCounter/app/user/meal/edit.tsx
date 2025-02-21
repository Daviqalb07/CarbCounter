import { useState, useEffect } from "react"
import { ScrollView, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button"
import { Icon, AddIcon, CloseIcon } from "@/components/ui/icon"
import { Image } from "@/components/ui/image"
import { Divider } from "@/components/ui/divider"
import { Input, InputField } from "@/components/ui/input"
import FoodItemEditable from "@/components/FoodItemEditable";
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@/components/ui/modal"
import { Heading } from "@/components/ui/heading";

export default function EditMealScreen() {
    const { imageData }: { imageData: string } = useLocalSearchParams()
    const [mealContent, setMealContent] = useState<{ name: string, portion: string }[]>([]);
    const [mealName, setMealName] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [newFood, setNewFood] = useState({ name: "", portion: "" })

    const postImageData = async () => {
        const apiUrl = `${process.env.EXPO_PUBLIC_NUTRITION_API_URL}/meal/estimation/portions`;

        try {
            console.log("Starting image upload...");
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "image": imageData
                })
            });

            console.log(`Image upload completed`);

            if (!response.ok) {
                router.back();
                return;
            }

            const jsonResponse = await response.json();
            setMealContent(jsonResponse.data);
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

    const handleAddFood = () => {
        if (newFood.name && newFood.portion) {
            setMealContent(prev => [...prev, { name: newFood.name, portion: newFood.portion }])
            setNewFood({ name: "", portion: "" })
            setShowModal(false)
        }
    }

    const handleCloseModal = () => {
        setNewFood({ name: "", portion: "" })
        setShowModal(false)
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
                        onEdit={() => {
                            console.log("EDITING")
                        }}
                        onDelete={() => {
                            setMealContent(prevContent => 
                                prevContent.filter((_, i) => i !== index)
                            );
                        }}
                    />
                ))) : <></>}
                <Button
                    action="default"
                    className="flex-1 mb-2 items-center justify-start p-0 gap-2"
                    onPress={() => setShowModal(true)}
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

            <Modal
                isOpen={showModal}
                onClose={handleCloseModal}
                size="lg"
            >
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <Heading size="md" className="text-typography-950">
                            Adicionar Alimento
                        </Heading>
                        <ModalCloseButton>
                        <Icon
                            as={CloseIcon}
                            size="md"
                            className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                        />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <Input className="mb-4">
                            <InputField
                                placeholder="Nome do alimento"
                                value={newFood.name}
                                onChangeText={(text) => setNewFood(prev => ({ ...prev, name: text }))}
                            />
                        </Input>
                        
                        <Input>
                            <InputField
                                placeholder="Porção (ex: 100g)"
                                value={newFood.portion}
                                onChangeText={(text) => setNewFood(prev => ({ ...prev, portion: text }))}
                            />
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={handleCloseModal}
                        >
                            <ButtonText>Cancelar</ButtonText>
                        </Button>
                        <Button
                            onPress={handleAddFood}
                        >
                            <ButtonText>Adicionar</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </View>
    )
}