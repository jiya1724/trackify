import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const App = () => {
  const [base64Image, setBase64Image] = useState(null);

  const takePhoto = async () => {
    // Request camera permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }

    // Launch the camera
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: false, // We will manually convert to base64
    });
    console.log(result)

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setBase64Image(`data:image/jpeg;base64,${base64}`);
    }
  };
  const showLink = ()=>{
    console.log(base64Image)
  }

  return (
    <View className='w-full h-full flex-1 items-center justify-center' >
      <Button title="Take Photo" onPress={takePhoto} />
      <Button title="show link" onPress={showLink} />
      {base64Image && (
        <Image
          source={{ uri: base64Image }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
};

export default App;
