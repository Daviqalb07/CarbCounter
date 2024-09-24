import React, { useState } from 'react';
import { SignupForm, SignupFormField } from '@/components/SignupForm';
import { router } from 'expo-router';

export default function SupervisorSignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    birthdate: false,
    password: false,
    confirmPassword: false
  });

  const handleSubmit = () => {
    // const nameError = name.length < 3;
    // const emailError = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // const passwordError = password.length < 8;
    // const confirmPasswordError = confirmPassword !== password

    // const birthdateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/
    // const birthdateError = !birthdateRegex.test(birthdate);

    // setErrors({
    //   name: nameError,
    //   email: emailError,
    //   birthdate: birthdateError,
    //   password: passwordError,
    //   confirmPassword: confirmPasswordError
    // });

    // if (Object.values(errors).some(value => !value)) {
    //   console.log('Form submitted:', { name, email, birthdate, password, confirmPassword });
    // }
    router.replace("/supervisor")
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

