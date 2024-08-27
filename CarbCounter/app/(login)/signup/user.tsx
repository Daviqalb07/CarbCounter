import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FormControl, FormControlLabel, FormControlLabelText, FormControlErrorText } from '@/components/ui/form-control';

export default function UserSignUpScreen() {
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

    const AquaDeep = "#004D40"

    const handleSubmit = () => {
        const nameError = name.length < 3;
        const emailError = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passwordError = password.length < 8;
        const confirmPasswordError = confirmPassword !== password

        const birthdateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/
        const birthdateError = !birthdateRegex.test(birthdate);

        setErrors({
            name: nameError,
            email: emailError,
            birthdate: birthdateError,
            password: passwordError,
            confirmPassword: confirmPasswordError
        });

        if (Object.values(errors).some(value => !value)) {
            console.log('Form submitted:', { name, email, birthdate, password, confirmPassword });
        }
    };

    return (
        <View className='flex-1 bg-white px-5 justify-center'>
            <Text className={`text-3xl font-bold text-center mb-2.5 text-[${AquaDeep}]`}>CarbCounter</Text>
            <Text className='text-xl font-medium text-center mb-5'>Crie sua conta</Text>

            <FormControl isInvalid={errors.name} className='mb-3.5'>
                <FormControlLabel>
                    <FormControlLabelText className='font-semibold text-lg'>Nome completo</FormControlLabelText>
                </FormControlLabel>
                <TextInput
                    className='border border-[#ccc] rounded-lg p-2.5 mt-1'
                    value={name}
                    onChangeText={setName}
                    placeholder="Seu Nome"
                />
            </FormControl>

            <FormControl isInvalid={errors.email} className='mb-3.5'>
                <FormControlLabel>
                    <FormControlLabelText className='font-semibold text-lg'>Email</FormControlLabelText>
                </FormControlLabel>
                <TextInput
                    className='border border-[#ccc] rounded-lg p-2.5 mt-1'
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Seu email"
                    keyboardType='email-address'
                />
                {!errors.password ? '' : (
                    <FormControlErrorText>Email inválido.</FormControlErrorText>
                )}
            </FormControl>

            <FormControl isInvalid={errors.birthdate} className='mb-3.5'>
                <FormControlLabel>
                    <FormControlLabelText className='font-semibold text-lg'>Data de nascimento</FormControlLabelText>
                </FormControlLabel>
                <TextInput
                    className='border border-[#ccc] rounded-lg p-2.5 mt-1'
                    value={birthdate}
                    onChangeText={setBirthdate}
                    placeholder="__/__/____"
                    secureTextEntry
                />
                {!errors.password ? '' : (
                    <FormControlErrorText>Data de nascimento inválida.</FormControlErrorText>
                )}
            </FormControl>

            <FormControl isInvalid={errors.password} className='mb-3.5'>
                <FormControlLabel>
                    <FormControlLabelText className='font-semibold text-lg'>Senha</FormControlLabelText>
                </FormControlLabel>
                <TextInput
                    className='border border-[#ccc] rounded-lg p-2.5 mt-1'
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Crie uma senha"
                    secureTextEntry
                />
                {!errors.password ? '' : (
                    <FormControlErrorText>Senha inválida.</FormControlErrorText>
                )}
            </FormControl>

            <FormControl isInvalid={errors.confirmPassword} className='mb-3.5'>
                <FormControlLabel>
                    <FormControlLabelText className='font-semibold text-lg'>Confirmar Senha</FormControlLabelText>
                </FormControlLabel>
                <TextInput
                    className='border border-[#ccc] rounded-lg p-2.5 mt-1'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirme sua senha"
                    secureTextEntry
                />
                {!errors.confirmPassword ? '' : (
                    <FormControlErrorText>As senhas não correspondem.</FormControlErrorText>
                )}
            </FormControl>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text className='text-white text-base'>Cadastrar</Text>
            </TouchableOpacity>

            {/* <Text style={styles.footerText}>
                Ao clicar em continuar, você concorda com nossos{' '}
                <Text style={styles.link} onPress={() => Linking.openURL('#')}>
                    Termos de Serviço
                </Text>{' '}
                e{' '}
                <Text style={styles.link} onPress={() => Linking.openURL('#')}>
                    Política de Privacidade
                </Text>.
            </Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#004d40',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    footerText: {
        textAlign: 'center',
        color: '#777',
    },
    link: {
        color: '#004d40',
        textDecorationLine: 'underline',
    },
});
