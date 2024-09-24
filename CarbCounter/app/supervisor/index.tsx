import React, { useState } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputIcon } from '@/components/ui/input';
import { Icon, SearchIcon, ChevronRightIcon } from '@/components/ui/icon';
import { Avatar } from '@/components/ui/avatar';
import { HStack } from '@/components/ui/hstack';

export default function SupervisorScreen() {
    const [search, setSearch] = useState('');
    const [code, setCode] = useState('');
    const listItems = [
        { id: 1, name: "Yago" },
        { id: 2, name: "Catherine" },
        { id: 3, name: "Vitor" },
        { id: 5, name: "Matheus" },
        { id: 6, name: "Junior" }
    ];

    return (
        <Box className="flex-1 p-4">
            <Box className="p-4">
                <Text className="text-2xl font-bold text-center">Supervisionados</Text>
            </Box>

            <Box className="px-4 flex-row items-center">
                <Input className="px-4 mb-4 h-12 w-full">
                    <InputField
                        className="text-lg"
                        placeholder="Buscar paciente"
                        value={search}
                        onChangeText={setSearch}
                    />
                    <InputIcon as={SearchIcon} />
                </Input>
            </Box>

            <ScrollView className="mt-4 px-4 h-1/2">
                {listItems.map((item, index) => (
                    <Button
                        key={index}
                        onPress={() => console.log('Ver perfil de', item.name)}
                        variant="link"
                        className="h-16 w-full mb-2 justify-between items-center border-b border-gray-300"
                    >

                        <HStack className="items-center">
                            <Avatar className="mr-4 bg-primary-300">
                                <Text className="text-2xl text-white">{item.name.charAt(0)}</Text>
                            </Avatar>
                            <Text className="text-xl">{item.name}</Text>
                        </HStack>

                        <Icon as={ChevronRightIcon} />
                    </Button>
                ))}
            </ScrollView>

            <Box className="px-4">
                <TextInput
                    placeholder="Insira o código para adicionar paciente"
                    className="border border-gray-300 rounded-md p-2 mt-4"
                    value={code}
                    onChangeText={setCode}
                />
            </Box>

            <Box className="px-4 mt-4 w-full">
                <Button
                    onPress={() => console.log('Adicionando supervisionado')}
                    className="bg-primary-500 p-4 rounded-md h-14"
                >
                    <Text className="text-white text-center">Adicionar</Text>
                </Button>
            </Box>

            <Box className="px-4 mt-4 w-full">
                <Button
                    action="negative"
                    className="p-4 rounded-md h-14"
                    onPress={() => console.log('Saindo')}
                >
                    <Text className="text-white text-center">Sair</Text>
                </Button>
            </Box>
        </Box>
    );
};

