import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import Logo from '../assets/Logo.png';
import pattern from '../assets/bgPattern.png';

const Signup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    companyCode: '',
    setupPin: '',
    confirmPin: '',
  });
  const [focusedField, setFocusedField] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { username, companyCode, setupPin, confirmPin } = formData;

    if (!username || !companyCode || !setupPin || !confirmPin) {
      setErrorMessage("All fields are required!");
      return;
    }

    if (setupPin !== confirmPin) {
      setErrorMessage("Pins do not match!");
      return;
    }

    if (setupPin.length !== 4 || confirmPin.length !== 4) {
      setErrorMessage("PIN should be exactly 4 digits.");
      return;
    }

    setErrorMessage('');
   
    alert("Form submitted!");
    navigation.navigate('PhotoSetup'); // Navigate to the PhotoSetup screen
    setFormData({
      username: '',
      companyCode: '',
      setupPin: '',
      confirmPin: '',
    });
  };

  const getInputStyle = (field) => ({
    ...styles.input,
    borderColor: focusedField === field ? '#007BFF' : '#BABABA',
  });

  const handlePinChange = (name) => (text) => {
    if (/^\d{0,4}$/.test(text)) {
      handleChange(name, text);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className='bg-bg h-full w-full relative'>
            <Image className='absolute right-0 translate-x-20' source={pattern} />

            <View className='w-full p-5 h-full z-10'>
              <View className='w-fit pt-10 flex flex-col gap-6'>
                <Image className='w-[61px] h-[69px]' source={Logo} />
                <View>
                  <Text className='text-white tracking-widest font-bold text-lg'>Welcome👋🏻to</Text>
                  <Text className='text-Blue font-black text-xl tracking-widest uppercase'>Trackify</Text>
                </View>

                <View className="flex flex-col space-y-3">
                  <View className="flex flex-col gap-2 w-full justify-center">
                    <Text className="text-sm text-Blue font-semibold">
                      Username
                      <Text className='text-darkGrey font-medium text-[10px]'> ~will be provided by the company</Text>
                    </Text>
                    <TextInput
                      style={getInputStyle('username')}
                      value={formData.username}
                      onChangeText={(text) => handleChange('username', text)}
                      placeholder="example_123"
                      placeholderTextColor="#979797"
                      onFocus={() => setFocusedField('username')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>

                  <View className="flex flex-col gap-2 w-full justify-center">
                    <Text className="text-sm text-Blue font-semibold">
                      Company Code
                      <Text className='text-darkGrey font-medium text-[10px]'> ~this code will be provided by the company</Text>
                    </Text>
                    <TextInput
                      style={getInputStyle('companyCode')}
                      value={formData.companyCode}
                      onChangeText={(text) => handleChange('companyCode', text)}
                      placeholder="Enter company code"
                      placeholderTextColor="#979797"
                      onFocus={() => setFocusedField('companyCode')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>

                  <View className="flex flex-col gap-2 w-full justify-center">
                    <Text className="text-sm text-Blue font-semibold">Setup a PIN</Text>
                    <TextInput
                      style={getInputStyle('setupPin')}
                      value={formData.setupPin}
                      onChangeText={handlePinChange('setupPin')}
                      placeholder="Enter PIN"
                      placeholderTextColor="#BABABA"
                      secureTextEntry
                      keyboardType="numeric"
                      onFocus={() => setFocusedField('setupPin')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <Text className="text-darkGrey text-xs font-semibold">PIN should be exactly 4 digits.</Text>
                  </View>

                  <View className="flex flex-col gap-2 w-full justify-center">
                    <Text className="text-sm text-Blue font-semibold">Confirm PIN</Text>
                    <TextInput
                      style={getInputStyle('confirmPin')}
                      value={formData.confirmPin}
                      onChangeText={handlePinChange('confirmPin')}
                      placeholder="Confirm PIN"
                      placeholderTextColor="#BABABA"
                      secureTextEntry
                      keyboardType="numeric"
                      onFocus={() => setFocusedField('confirmPin')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>

                  {errorMessage ? (
                    <Text style={{ color: '#E64646', marginTop: 10 }}>{errorMessage}</Text>
                  ) : null}

                </View>

                <View>
                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text className="text-white font-bold text-base">Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 56,
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Signup;
