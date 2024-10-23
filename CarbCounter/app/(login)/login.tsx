import { Heading } from '@/components/ui/heading';
import { Center } from "@/components/ui/center";
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from '@/components/ui/vstack';
import { router } from 'expo-router';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_CARBCOUNTER_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { email, password } }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const token = response.headers.get('Authorization');
      if (token) {
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        router.dismissAll();
        if (data.user.role === 'professional') {
          router.replace('/professional');
        } else if (data.user.role === 'supervisor') {
          router.replace('/supervisor');
        } else {
          router.replace('/user');
        }
      } else {
        throw new Error('Token not found');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <>
      <Heading
        className="color-primary-700 text-center mt-24"
        size="2xl"
      >
        CarbCounter
      </Heading>
      <Heading
        className="text-center mb-4"
        size="lg"
      >
        Acesse sua conta
      </Heading>
      <Center className="mt-24 mx-12">
        <VStack space="md" className="w-full">
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input className='w-full rounded-md p-2'>
              <InputField
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </Input>
          </FormControl>
          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Senha</FormControlLabelText>
            </FormControlLabel>
            <Input className='w-full rounded-md p-2'>
              <InputField placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </Input>
          </FormControl>
          <Button
            className="mt-8 w-full p-2 rounded-md bg-primary-700"
            onPress={handleLogin}
          >
            <ButtonText className="text-center color-white">
              Entrar
            </ButtonText>
          </Button>
        </VStack>
      </Center>
    </>
  );
}