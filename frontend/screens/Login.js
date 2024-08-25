import React,{useState} from 'react'
import { View ,Image,Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import pattern from '../assets/bgPattern.png'
import jiya from '../assets/login/jiya.png'
import logo from '../assets/Logo.png'

const Login = () => {

  
  const [formData, setFormData] = useState({
    pin: '',
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
      handleChange(name, text);
    }
  };

  const getInputStyle = (field) => ({
    ...styles.input,
    borderColor: focusedField === field ? '#007BFF' : '#BABABA',
  });

  return (
    <View className='bg-bg h-full w-full p-5 relative'>
      <Image className='absolute left-0 rotate-45 -translate-x-20' source={pattern} />
      <Image className='absolute bottom-0 right-0 rotate-12 translate-x-20 translate-y-7' source={pattern} />
      

      <View className='h-full w-full flex flex-col items-center mt-20 space-y-10'>
        <View className='flex flex-col space-y-5 justify-center items-center'>
          <View className='relative flex items-center '>
            <Image className='w-[71] h-20 absolute translate-x-16' source={logo}></Image>
            <Image className='h-36 w-36 rounded-full' source={jiya}/>
          </View>
          <View className='flex justify-center items-center'>
            <Text className='text-white text-base font-bold uppercase'>Jiya Trivedi</Text>
          </View>
        </View>

        <View className='w-full justify-center items-center space-y-6'>
          <Text className='text-Blue font-bold text-base '>Enter your PIN</Text>
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
            <TouchableOpacity style={styles.button} >
              <Text className="text-white font-bold text-base">Login</Text>
            </TouchableOpacity>
        </View>

        <Text className='text-Blue underline'>New User Signup</Text>


      </View>

    
     
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    width:'100%',
    height: 56,
    color: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    textAlign:'center',
    fontSize:16
    
  },
  button: {
    backgroundColor: '#007BFF',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login