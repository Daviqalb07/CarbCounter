import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { Button } from '@/components/ui/button';
import { Icon, ChevronRightIcon, AddIcon } from '@/components/ui/icon';
import { Avatar } from '@/components/ui/avatar';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ViewerItemProps {
    name: string
}
const ViewerItem = (props: ViewerItemProps) => {
    const name = props.name
    return (
        <Button
            variant="link"
            className="h-16 w-full my-2 justify-between items-center border-b border-gray-300"
        >

            <HStack className="items-center">
                <Avatar className="mr-4 bg-primary-500">
                    <Text className="text-2xl text-white">{name.charAt(0)}</Text>
                </Avatar>
                <Text className="text-xl">{name}</Text>
            </HStack>
        </Button>
    )
}
export default function ViewersScreen() {
    const [userProfessionals, setUserProfessionals] = useState([]);
    const [userSupervisors, setUserSupervisors] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const user = JSON.parse(userData);
                    setUserProfessionals(user.professionals || []);
                    setUserSupervisors(user.supervisors || []);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <View className="flex-1 p-4">
            <Text className="text-2xl font-bold my-4">
                Profissionais
            </Text>

            {userProfessionals.map((professional, index) => (
                <ViewerItem
                    key={index}
                    name={professional.name}
                />
            ))}

            <Text className="text-2xl font-bold my-4">
                Supervisores
            </Text>

            {userSupervisors.map((supervisor, index) => (
                <ViewerItem
                    key={index}
                    name={supervisor.name}
                />
            ))}
        </View>
    );
};
