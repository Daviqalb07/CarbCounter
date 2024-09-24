import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { Icon, ChevronRightIcon } from '@/components/ui/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ListItemProps {
  onPress: () => void,
  label: string,
  itemColor: string
}

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
      console.log('Logged out successfully');
      router.replace('/');
    } else {
      console.error('Failed to log out');
    }
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

const ListItem = (props: ListItemProps) => (
  <Button
    onPress={props.onPress}
    variant="link"
    className="h-14 my-2 border-b border-gray-300 justify-between"
  >
    <ButtonText className={`text-lg text-${props.itemColor} font-normal`}>{props.label}</ButtonText>
    <Icon as={ChevronRightIcon} className={`text-${props.itemColor}`} />
  </Button>
);

export default function ProfileScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <View className="flex-1 px-10 py-4">
      <Text className="text-2xl text-black text-center font-bold my-6">Perfil</Text>
      {user && (
        <>
          <Text className="text-lg text-black text-center my-2">
            {`Bem-vindo, ${user.name}`}
          </Text>
          {/* Display user unique code */}
          <Text className="text-lg text-black text-center my-2">
            {`Seu código: ${user.unique_code}`}
          </Text>
        </>
      )}

      {user?.role === 'patient' ? (
        <ListItem
          label={"Ver profissionais e supervisores"}
          onPress={() => router.navigate("/user/profile/viewers")}
          itemColor="black"
        />
      ) : (
        <ListItem
          label={"Ver pacientes"}
          onPress={() => router.navigate(`/${user?.role}`)}
          itemColor="black"
        />
      )}

      <ListItem
        label={"Sobre o CarbCounter"}
        onPress={() => console.log("Sobre o Carbcounter")}
        itemColor="black"
      />

      <ListItem
        label="Sair"
        onPress={handleLogout}
        itemColor="red-500"
      />
    </View>
  );
};
