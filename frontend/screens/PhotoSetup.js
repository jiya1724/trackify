import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator  } from 'react-native';
import { Camera, CameraType, } from 'expo-camera/legacy';
import pattern from '../assets/bgPattern.png';
import info from '../assets/photosetup/Info.png'
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../redux/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP_Address from '../utilities';

const PhotoSetup = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [facing, setFacing] = useState(CameraType.front);
  const [loading, setLoading] = useState(false);
  const [hasPermission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const userData = useSelector((state) => state.authentication.userData)
  const dispatch = useDispatch();
  console.log(userData)


  if (!hasPermission) {
    return <View />;
  }

  if (!hasPermission.granted) {
    return (
      <View className='bg-bg w-full h-full flex p-5 justify-center items-center '>
        <View className='h-48 border border-solid border-darkGrey bg-darkBg w-full justify-center items-center space-y-4 flex-col p-8'>
          <View className='flex flex-row gap-3 '>
            <Image className='h-5 w-5 flex justify-center items-center' source={info}></Image>
            <Text className="text-white font-bold text-sm">Allow access to Camera to continue</Text>
          </View>
          <TouchableOpacity onPress={requestPermission} style={styles.button}>
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }



  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri)
      dispatch(addData({
        image: photo.uri
      }))
      setImage(photo.uri);
    }
  };




  const toggleCameraFacing = () => {
    setFacing(facing === CameraType.front ? CameraType.back : CameraType.front);
  };
  const handleProceed =async () => {
    // try {
    //   const response = await fetch(`http://${IP_Address}:5000/emp/createemp`, {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(userData),
    //   });
    //   const data = await response.json();
    //   if (data.success) {
    //     // console.log(data.token)
    //     await AsyncStorage.setItem('auth-token', data.token);
    //     navigation.navigate('Home')
    //   } else {
    //     alert(data.message);
    //   }


    // } catch (error) {
    //   console.error(error);
    // }
   
      setLoading(true); 
      setTimeout(() => {
        setLoading(false); 
        alert('Your photo has been setup');
        navigation.navigate('Login')
      }, 2500);
      
  }
  return (
    <View className="bg-bg h-full w-full p-5 relative">
      <Image className="absolute left-0 rotate-45 -translate-x-20" source={pattern} />
      <Image className="absolute bottom-0 right-0 rotate-12 translate-x-20 translate-y-7" source={pattern} />
      <View className="pt-10 flex justify-center items-center">
        <Text className="text-Blue text-base text-blue font-bold">Setup Your Face</Text>
      </View>

      <View className="flex justify-center items-center pt-12">
        <View className="bg-white h-80 w-80 rounded-full overflow-hidden">
          {image ? (
            <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
          ) : (
            <Camera style={{ width: '100%', height: '100%' }} type={facing} ref={cameraRef} />
          )}
        </View>
      </View>
      <View className="flex flex-row items-center justify-center space-x-2 pt-3">
        <Image className="h-5 w-5" source={info} />
        <Text className="text-lightGrey text-[10px] font-bold">Look at the Camera while capturing your photo!</Text>
      </View>

      <View className="pt-12 flex-col space-y-7 items-center">
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.buttonText}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>Capture Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProceed} style={styles.button2}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.loadingText}>Saving your image...</Text>
        </View>
      )}
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
    fontWeight: '600',
    fontSize: 14,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, 
  },
  loadingText: {
    marginTop: 10,
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default PhotoSetup;