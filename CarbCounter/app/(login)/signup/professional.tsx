import React, { useState } from 'react';
import { SignupForm, SignupFormField } from '@/components/SignupForm';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ProfessionalSignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [professionalRegister, setProfessionalRegister] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    professionalRegister: false,
    birthdate: false,
    password: false,
    confirmPassword: false
  });

  const registerProfessional = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_CARBCOUNTER_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            name,
            email,
            birth_date: birthdate,
            password,
            password_confirmation: confirmPassword,
            role: 'professional',
            professional_register: professionalRegister
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao registrar:', errorData);
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...errorData.errors,
        }));
      } else {
        const data = await response.json();
        const token = response.headers.get('Authorization');
        if (token) {
          await AsyncStorage.setItem('authToken', token);
          await AsyncStorage.setItem('user', JSON.stringify(data.user));
          router.dismissAll();
          router.replace('/user');
        } else {
          throw new Error('Token not found');
        }
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  const handleSubmit = () => {
    const nameError = name.length < 3;
    const professionalRegisterError = professionalRegister.length < 3;
    const emailError = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordError = password.length < 8;
    const confirmPasswordError = confirmPassword !== password;

    const birthdateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
    const birthdateError = !birthdateRegex.test(birthdate);

    setErrors({
      name: nameError,
      email: emailError,
      professionalRegister: professionalRegisterError,
      birthdate: birthdateError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });

    if (Object.values(errors).some(value => !value)) {
      registerProfessional();
    }
  };

  const fields: SignupFormField[] = [
    {
      name: "Nome completo",
      value: name,
      placeholder: "Seu Nome",
      onChangeText: setName,
      error: errors.name,
      errorMessage: "Digite seu nome completo"
    },
    {
      name: "Email",
      value: email,
      placeholder: "Seu email",
      onChangeText: setEmail,
      keyboardType: "email-address",
      error: errors.email,
      errorMessage: "Email inválido"
    },
    {
      name: "CRM ou CRN",
      value: professionalRegister,
      placeholder: "Seu registro profissional",
      onChangeText: setProfessionalRegister,
      error: errors.professionalRegister,
      errorMessage: "Registro profissional inválido",
    },
    {
      name: "Data de nascimento",
      value: birthdate,
      placeholder: "__/__/____",
      onChangeText: setBirthdate,
      error: errors.birthdate,
      errorMessage: "Data inválida"
    },
    {
      name: "Senha",
      value: password,
      placeholder: "Crie uma senha",
      onChangeText: setPassword,
      secureTextEntry: true,
      error: errors.password,
      errorMessage: "A senha deve ter no mínimo 8 caracteres"
    },
    {
      name: "Confirmar Senha",
      value: confirmPassword,
      placeholder: "Confirme sua senha",
      onChangeText: setConfirmPassword,
      secureTextEntry: true,
      error: errors.confirmPassword,
      errorMessage: "As senhas não correspondem"
    },
  ];

  return (
    <SignupForm fields={fields} onSubmit={handleSubmit} />
  )
}