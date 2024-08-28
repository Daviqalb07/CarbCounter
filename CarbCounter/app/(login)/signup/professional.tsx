import React, { useState } from 'react';
import { SignupForm, SignupFormField } from '@/components/SignupForm';

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
      console.log('Form submitted:', { name, email, professionalRegister, birthdate, password, confirmPassword });
    }
  };

  const fields: SignupFormField[] = [
    {
      name: 'Nome completo',
      value: name,
      placeholder: 'Seu Nome',
      onChangeText: setName,
    },
    {
      name: 'Email',
      value: email,
      placeholder: 'Seu email',
      onChangeText: setEmail,
      keyboardType: 'email-address',
      error: email.length > 0 && !email.includes('@') ? 'Email inválido' : undefined,
    },
    {
      name: 'CRM ou CRN',
      value: professionalRegister,
      placeholder: 'Seu registro profissional',
      onChangeText: setProfessionalRegister,
      error: professionalRegister.length > 0 && professionalRegister.length < 5 ? 'Registro inválido' : undefined,
    },
    {
      name: 'Data de nascimento',
      value: birthdate,
      placeholder: '__/__/____',
      onChangeText: setBirthdate,
    },
    {
      name: 'Senha',
      value: password,
      placeholder: 'Crie uma senha',
      onChangeText: setPassword,
      secureTextEntry: true,
    },
    {
      name: 'Confirmar Senha',
      value: confirmPassword,
      placeholder: 'Confirme sua senha',
      onChangeText: setConfirmPassword,
      secureTextEntry: true,
      error: confirmPassword.length > 0 && confirmPassword !== password ? 'As senhas não correspondem' : undefined,
    },
  ];


  return (
    <SignupForm fields={fields} onSubmit={handleSubmit} />
  )
}

