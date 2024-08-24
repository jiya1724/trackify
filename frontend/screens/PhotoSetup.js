import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import pattern from '../assets/bgPattern.png';

const PhotoSetup = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className='bg-bg h-full w-full p-5 relative'>
      <Image className='absolute left-0 rotate-45 -translate-x-20' source={pattern} />
      <Image className='absolute bottom-0 right-0 rotate-12 translate-x-20 translate-y-7' source={pattern} />
      <View className='pt-10 flex justify-center items-center'>
        <Text className='text-Blue text-base text-blue font-bold'>Setup Your Face</Text>
      </View>

      <View className='flex justify-center items-center pt-16'>
        <View className="bg-white h-80 w-80 rounded-full overflow-hidden">
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <Text style={styles.placeholderText}>No Image</Text>
          )}
        </View>
      </View>

      <View className='pt-24 flex-col space-y-8 items-center'>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Add a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    width: '100%', 
    borderRadius: 10,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3085FE',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  button2: {
    backgroundColor: '#3085FE',
    width: '80%',
    borderRadius: 10,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'semi-bold', 
    fontSize: 16,
  },
  placeholderText: {
    color: '#B0B0B0', 
    textAlign: 'center',
    lineHeight: 80,
  },
});

export default PhotoSetup;
