import React, { useState } from 'react'
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import pattern from '../assets/bgPattern.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import logo from '../assets/Logo.png'
import { addData,setSessionToken } from '../redux/auth/authSlice';

const Login = ({ navigation }) => {
  

  const [formData, setFormData] = useState({
    userName: '',
    pin: 0,
  });
  const [focusedField, setFocusedField] = useState(null);
  const handleChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));

  };
  const handlePinChange = (name) => (text) => {
    if (/^\d{0,4}$/.test(text)) {
      handleChange(name, Number(text));
    }
  };

  const getInputStyle = (field) => ({
    ...styles.input,
    borderColor: focusedField === field ? '#007BFF' : '#BABABA',
  });

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.29.199:5000/emp/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        // console.log(data.token)
        await AsyncStorage.setItem('auth-token', data.token);
        navigation.navigate('Home')
      } else {
        alert(data.message);
      }


    } catch (error) {
      console.error(error);
    }

  }

  return (
    <View className='bg-bg h-full w-full p-5 relative'>
      <Image className='absolute right-0 translate-x-20' source={pattern} />
      <Image className='absolute left-0 bottom-0 -translate-x-20' source={pattern} />
      <View className='w-fit pt-10 pb-5 flex flex-col gap-6'>
        <Image className='w-[61px] h-[69px]' source={logo} />
        <View>
          <Text className='text-Blue font-black text-xl tracking-widest uppercase'>Trackify</Text>
          <Text className='text-white tracking-widest font-bold text-lg'>Welcome Back! 🙋🏻‍♂️</Text>

        </View></View>

      <View className='flex flex-col space-y-8'>
        <View className="flex flex-col space-y-3 w-full justify-center">
          <Text className="text-sm text-Blue font-semibold">Username<Text className='text-darkGrey font-medium text-[10px]'> ~provided by the company</Text></Text>
          <TextInput
            style={getInputStyle('username')}
            value={formData.userName}
            onChangeText={(text) => handleChange('userName', text)}
            placeholder="example_123"
            placeholderTextColor="#979797"
            onFocus={() => setFocusedField('username')}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <View className='space-y-3 '>
          <Text className='text-sm text-Blue font-semibold '>Enter your PIN</Text>
          <TextInput
            className='drop-shadow-2xl shadow-[#747474] '
            style={getInputStyle('pin')}
            value={formData.pin}
            onChangeText={handlePinChange('pin')}
            placeholder="Enter PIN"
            placeholderTextColor="#BABABA"
            secureTextEntry
            keyboardType="numeric"
            onFocus={() => setFocusedField('pin')}
            onBlur={() => setFocusedField(null)}
          />
        </View>
        <View className='w-full'>
          <TouchableOpacity onPress={handleLogin} style={styles.button} >
            <Text className="text-white font-bold text-base">Login</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className='w-full justify-end flex items-end pt-8'><Text className='text-Blue underline text-sm '>New User? Signup</Text></View>






    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 56,
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14

  },
  button: {
    backgroundColor: '#3085FE',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login