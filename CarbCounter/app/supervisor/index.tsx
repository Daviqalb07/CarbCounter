import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputIcon } from '@/components/ui/input';
import { Icon, SearchIcon, ChevronRightIcon } from '@/components/ui/icon';
import { Avatar } from '@/components/ui/avatar';
import { HStack } from '@/components/ui/hstack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'; // Import the router

export default function SupervisorScreen() {
    const [search, setSearch] = useState('');
    const [code, setCode] = useState('');
    const [supervisedPatients, setSupervisedPatients] = useState([]);

    useEffect(() => {
        fetchSupervisedPatients();
    }, []);

    const fetchSupervisedPatients = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const user = await AsyncStorage.getItem('user');
            const supervisor = JSON.parse(user);

            const response = await fetch(`${process.env.EXPO_PUBLIC_CARBCOUNTER_API_URL}/api/supervisors/${supervisor.id}/patients`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log('Erro', errorData.error || 'Erro ao buscar supervisionados');
            } else {
                const data = await response.json();
                console.log(data);
                setSupervisedPatients(data.patients);
            }
        } catch (error) {
            console.error('Erro ao buscar supervisionados:', error);
            console.log('Erro', 'Erro ao buscar supervisionados');
        }
    };

    const addSupervisedPatient = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            const user = await AsyncStorage.getItem('user');
            const supervisor = JSON.parse(user);

            const response = await fetch(`${process.env.EXPO_PUBLIC_CARBCOUNTER_API_URL}/api/supervisors/${supervisor.id}/patients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ unique_code: code })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log('Erro', errorData.error || 'Erro ao adicionar supervisionado');
            } else {
                const data = await response.json();
                console.log('Sucesso', data.message);
                setCode('');
                fetchSupervisedPatients(); // Refresh the list of supervised patients
            }
        } catch (error) {
            console.error('Erro ao adicionar supervisionado:', error);
            console.log('Erro', 'Erro ao adicionar supervisionado');
        }
    };

    const handleLogout = async () => {
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            const response = await fetch(`${process.env.EXPO_PUBLIC_CARBCOUNTER_API_URL}/users/logout`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${authToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                await AsyncStorage.removeItem('authToken');
                await AsyncStorage.removeItem('user');
                router.replace('/');
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

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
                {supervisedPatients.map((item, index) => (
                    <Button
                        key={index}
                        onPress={() => router.push(`/supervisor/patient/${item.id}`)} // Redirect to patient profile
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
                    onPress={addSupervisedPatient}
                    className="bg-primary-500 p-4 rounded-md h-14"
                >
                    <Text className="text-white text-center">Adicionar</Text>
                </Button>
            </Box>

            <Box className="px-4 mt-4 w-full">
                <Button
                    action="negative"
                    className="p-4 rounded-md h-14"
                    onPress={handleLogout}
                >
                    <Text className="text-white text-center">Sair</Text>
                </Button>
            </Box>
        </Box>
    );
}