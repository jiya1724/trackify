import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, TextInput, TouchableOpacity } from 'react-native'
import React ,{useState}from 'react'
import pattern from '../assets/bgPattern.png'
import Navbar from './Navbar'
import Back from '../assets/profile/backArrow.svg'

const ChangePIN = () => {
    const [formData, setFormData] = useState({
        old: 0,
        newPin:0,
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
  return (
    <View className='w-full h-full bg-bg'>
        <Image className='absolute left-0 -translate-x-20' source={pattern} />
        <Image className='absolute right-0 bottom-0 translate-x-20' source={pattern} />

        <View className='bg-darkBg flex-row items-center pt-10  space-x-[25%] pb-5 '>
            <TouchableWithoutFeedback>
                <View className='translate-x-3'>
                <Back></Back>
                </View>
            </TouchableWithoutFeedback>
            <View className=' justify-center'>
                <Text className='text-white font-bold text-lg'>Change PIN</Text>
            </View>
        </View>

        <View className='p-5 space-y-6'>
            <View className='space-y-3 '>
            <Text className='text-sm text-Blue font-semibold '>Old PIN</Text>
            <TextInput
                className='drop-shadow-2xl shadow-[#747474] '
                style={getInputStyle('old')}
                value={formData.pin}
                onChangeText={handlePinChange('old')}
                placeholder="Enter PIN"
                placeholderTextColor="#BABABA"
                secureTextEntry
                keyboardType="numeric"
                onFocus={() => setFocusedField('old')}
                onBlur={() => setFocusedField(null)}
            />
        </View>
        <View className='space-y-3 '>
            <Text className='text-sm text-Blue font-semibold '>Enter New PIN</Text>
            <TextInput
                className='drop-shadow-2xl shadow-[#747474] '
                style={getInputStyle('newPin')}
                value={formData.pin}
                onChangeText={handlePinChange('newPin')}
                placeholder="New PIN"
                placeholderTextColor="#BABABA"
                secureTextEntry
                keyboardType="numeric"
                onFocus={() => setFocusedField('newPin')}
                onBlur={() => setFocusedField(null)}
            />
        </View>
        <View className='space-y-3 '>
            <Text className='text-sm text-Blue font-semibold '>Confirm PIN</Text>
            <TextInput
                className='drop-shadow-2xl shadow-[#747474] '
                style={getInputStyle('pin')}
                value={formData.pin}
                onChangeText={handlePinChange('pin')}
                placeholder="Confirm PIN"
                placeholderTextColor="#BABABA"
                secureTextEntry
                keyboardType="numeric"
                onFocus={() => setFocusedField('pin')}
                onBlur={() => setFocusedField(null)}
            />
        </View>
        <View className='w-full pt-12 '>
          <TouchableOpacity  style={styles.button} >
            <Text className="text-white font-bold text-base">Update PIN</Text>
          </TouchableOpacity>
        </View>
      


        </View>
        <Navbar/>
      
    </View>
  )
}

export default ChangePIN

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
})