import { useState, useEffect } from 'react';
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "@/components/ui/modal"
import { Button, ButtonText } from "@/components/ui/button"
import { Icon, CloseIcon } from "@/components/ui/icon"
import { Input, InputField } from "@/components/ui/input"
import { Heading } from "@/components/ui/heading"

interface FoodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (food: { name: string; portion: string }) => void;
    initialFood?: { name: string; portion: string };
    mode?: 'add' | 'edit';
}

export default function FoodModal({ isOpen, onClose, onSubmit, initialFood, mode = 'add' }: FoodModalProps) {
    const [food, setFood] = useState({ name: "", portion: "" });

    useEffect(() => {
        if (initialFood) {
            setFood(initialFood);
        } else {
            setFood({ name: "", portion: "" });
        }
    }, [initialFood, isOpen]);

    const handleClose = () => {
        setFood({ name: "", portion: "" });
        onClose();
    };

    const handleSubmit = () => {
        if (food.name && food.portion) {
            onSubmit(food);
            handleClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="lg"
        >
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading size="md" className="text-typography-950">
                        {mode === 'add' ? 'Adicionar Alimento' : 'Editar Alimento'}
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
                            placeholder="Nome do alimento (ex: arroz)"
                            value={food.name}
                            onChangeText={(text) => setFood(prev => ({ ...prev, name: text }))}
                        />
                    </Input>
                    
                    <Input>
                        <InputField
                            placeholder="Porção (ex: 100g)"
                            value={food.portion}
                            onChangeText={(text) => setFood(prev => ({ ...prev, portion: text }))}
                        />
                    </Input>
                </ModalBody>
                <ModalFooter>
                    <Button
                        variant="outline"
                        action="secondary"
                        onPress={handleClose}
                    >
                        <ButtonText>Cancelar</ButtonText>
                    </Button>
                    <Button
                        onPress={handleSubmit}
                    >
                        <ButtonText>{mode === 'add' ? 'Adicionar' : 'Salvar'}</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
} 