import NutritionInfo from '@/components/NutritionInfo';
import { ScrollView } from "react-native";
import { View } from 'react-native';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { Button, ButtonIcon } from '@/components/ui/button';
import { ChevronDownIcon, ChevronRightIcon } from '@/components/ui/icon';
import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectBackdrop,
    SelectContent,
    SelectDragIndicatorWrapper,
    SelectDragIndicator,
    SelectItem
} from '@/components/ui/select';
import { Divider } from '@/components/ui/divider';
import { useState, useEffect } from 'react';
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportScreen = () => {
    const [selectedRange, setSelectedRange] = useState('last_week');
    const [reportsData, setReportsData] = useState({});
    const [user, setUser] = useState(null);
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
                setIsUserLoaded(true);
            }
        };

        fetchUser();
    }, []);

    const fetchReportsData = async (range) => {
        if (user) {
            try {
                const patientId = user.role === 'patient' ? user.id : JSON.parse(await AsyncStorage.getItem('patient')).id;
                const response = await fetch(`${process.env.EXPO_PUBLIC_CARBCOUNTER_API_URL}/api/patients/${patientId}/reports?filter=${range}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${await AsyncStorage.getItem('authToken')}`
                    }
                });
                const data = await response.json();
                console.log(data)
                setReportsData(data);
            } catch (error) {
                console.error("Error fetching reports data:", error);
            }
        }
    };

    useEffect(() => {
        if (isUserLoaded) {
            fetchReportsData(selectedRange);
        }
    }, [selectedRange, isUserLoaded]);

    const handleTimeRangeSelection = (value: string) => {
        setSelectedRange(value);
    };

    const handlePress = async (date, data) => {
        router.push("/user/reports/meals");
        const dayMeals = {
            date: date,
            meals: data.meals
        };
        await AsyncStorage.setItem('dayMeals', JSON.stringify(dayMeals));
    };

    return (
        <View className="flex-1 p-4 mt-4">
            <HStack className="justify-between items-center">
                <Text className="text-2xl text-black font-bold">
                    Relatórios
                </Text>

                <Select
                    initialLabel="Últimos 7 dias"
                    selectedValue={selectedRange}
                    onValueChange={handleTimeRangeSelection}
                >
                    <SelectTrigger variant="rounded" size="md" className="w-44 border-primary-400 justify-between" >
                        <SelectInput className="text-primary-400" />
                        <SelectIcon className="mr-2 text-primary-400" as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal >
                        <SelectBackdrop />
                        <SelectContent >
                            <SelectDragIndicatorWrapper >
                                <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label="Últimos 7 dias" value="last_week" />
                            <SelectItem label="Últimos 14 dias" value="last_fortnight" />
                            <SelectItem label="Último mês" value="last_month" />
                        </SelectContent>
                    </SelectPortal>
                </Select>
            </HStack>

            <ScrollView >
                {Object.entries(reportsData?.meals_by_day || {}).map(([date, data], index) => (
                    <Box key={index} className="mt-4">
                        <VStack >
                            <Text className="font-bold text-xl">
                                {new Date(date).toLocaleDateString('pt-BR')}
                            </Text>

                            <Box className="my-2">
                                <NutritionInfo
                                    calories={data.total_calories}
                                    carbohydrates={data.total_carbohydrates}
                                />
                            </Box>

                            <Button
                                variant="link"
                                className="justify-between px-2 mb-1"
                                onPress={() => handlePress(date, data)}
                            >
                                <Text className="text-lg">Ver Refeições</Text>
                                <ButtonIcon as={ChevronRightIcon} />
                            </Button>

                            <Divider orientation="horizontal" className="mb-4" />
                        </VStack>
                    </Box>
                ))}
            </ScrollView>
        </View>
    );
};

export default ReportScreen;