import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import pattern from '../assets/bgPattern.png';

const FaceVerify = (navigation) => {
  const [base64Image, setBase64Image] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading

  // Function to handle camera launch
  const takePhoto = async () => {
    // Request camera permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }

    // Launch the camera directly
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: false, // We'll manually convert to base64
    });

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setBase64Image(`data:image/jpeg;base64,${base64}`);
    }
  };

  // useEffect hook to launch the camera when the component mounts
  useEffect(() => {
    takePhoto(); // Automatically open camera
  }, []);

  const handleVerify = () => {
    setLoading(true); // Start loading
    setTimeout(() => {
      setLoading(false); // Stop loading after 3 seconds
      navigation.navigate('HomeSlide')
    }, 3000);
  };

  return (
    <View className="bg-bg flex-1 h-full w-full">
      <Image className="absolute left-0 -translate-x-20" source={pattern} />
      <Image className="absolute right-0 bottom-0 translate-x-20" source={pattern} />
      <View className="w-full justify-center items-center mt-10">
        <Text className="text-Blue font-bold text-xl">Verify Your Identity</Text>
      </View>

      <View className="mt-8 p-5 flex-col space-y-36">
        <View className="w-full items-center justify-center ">
          {base64Image && (
            <Image
              source={{ uri: base64Image }}
              style={{ width: 400, height: 400 }}
            />
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text className="text-white font-bold text-base">Verify</Text>
        </TouchableOpacity>
      </View>

     
      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Verifying...</Text>
        </View>
      )}
    </View>
  );
};

export default FaceVerify;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3085FE',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
