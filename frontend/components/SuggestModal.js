import { View, Image, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import checkIn from '../assets/home/Check In.png';
import checkOut from '../assets/home/checkOut.png';
import { Svg, Path } from 'react-native-svg';
import circle from '../assets/home/circle.png';
import IP_Address from '../utilities';

const SuggestModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({ index: null, source: '' });
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(true);
  const [offsiteData, setOffsiteData] = useState([]);

  const handleCloseConfirmation = () => {
    setConfirmationVisible(false);
  };

  const data2 = {
    location: [
      {
        lname: 'Gail India',
        address: '225P+X6R, Daulat Ram Mahatre Marg, Sector 15, Tilaknagar, Mumbai',
      },
      {
        lname: 'Gail India',
        address: '225P+X6R, Daulat Ram Mahatre Marg, Sector 15, Baroda, Gujarat',
      },
      {
        lname: 'Gail India',
        address: '225P+X6R, Daulat Ram Mahatre Marg, Sector 15, Vidyavihar, Gujarat',
      },
    ],
  };

  const getOffsitesLocations = async () => {
    try {
      const response = await fetch(`http://${IP_Address}:6000/offsite`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Data:", data); // Log fetched data
        setOffsiteData(data);
      } else {
        const errorText = await response.text();
        console.error('Error Response:', errorText); // Log error response
      }
    } catch (error) {
      console.error('Fetch Error:', error); // Log fetch errors
    }
  };
  

  const manualCheckIn = () => {
    console.log('Manual Check In Triggered');
    setModalVisible(true);
    getOffsitesLocations(); // Fetch data when modal is opened
  };
  

  useEffect(() => {
    console.log('Fetched Offsite Data:', offsiteData);
  }, [offsiteData]);
  
  const closeModal = () => {
    setModalVisible(false);
    setSelectedLocation({ index: null, source: '' });
    setSearchQuery('');
    setFilteredLocations([]);
  };

  const handleLocationSelect = (index, source) => {
    setSelectedLocation({ index, source });
  };

  const handleChecked = () => {
    setIsCheckedIn(true);
    closeModal();
  };

  useEffect(() => {
    console.log('isCheckedIn state changed:', isCheckedIn);
  }, [isCheckedIn]);

  return (
    <View className='w-full'>
      <View className='w-full '>
        {isCheckedIn ? (
          <View className='w-full'>
            <View className='  items-center justify-center rounded-full'>
              <Image className='-z-10 h-[200px] w-[200px]' source={circle} />
              <TouchableOpacity className='z-10 top-0 translate-y-5 absolute bg-[#1E1E1E]' style={styles.button}>
                <Image className='h-[83px] w-[63px]' source={checkOut} />
                <Text className='text-lightGrey font-bold text-xs mt-2 uppercase'>Already</Text>
                <Text className='text-lightGrey font-bold text-xs uppercase'>Checked In</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className=' items-center justify-center rounded-full'>
            <Image className='-z-10 h-[200px] w-[200px]' source={circle} />
            <TouchableOpacity onPressIn={getOffsitesLocations} className='z-10 top-0 translate-y-5 bg-Blue absolute' style={styles.button} onPress={manualCheckIn}>
              <Image className='h-[83px] w-[63px]' source={checkIn} />
              <Text className='text-white font-bold text-base uppercase'>Manual</Text>
              <Text className='text-white font-bold text-base uppercase'>Check In</Text>
            </TouchableOpacity>
          </View>
        )}

        {isCheckedIn && confirmationVisible ? (
          <View className="p-3 -translate-y-16  bg-darkBg z-20 justify-center border border-solid border-seagreen rounded-xl">
            <Text className="text-seagreen font-bold text-[10px]">Checked In Confirmation Request sent to the admin</Text>
            <Text className="text-darkGrey text-[8px]">Working Hours will be displayed in the Records section once admin approves</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={handleCloseConfirmation}>
              <Svg width="10" height="10" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1 16L16 1M16 16L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className='flex-1 w-full h-full justify-end items-center' style={styles.modalContainer}>
          <View className='w-full p-6 rounded-t-2xl bg-[#161616] flex justify-center  space-y-5'>
            <Text className='text-Blue text-base font-bold'>Suggested Offsites</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
              <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1 16L16 1M16 16L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>
            <ScrollView className='flex flex-col space-y-4'>
  {offsiteData.slice(0, 1).map((loca, index) => (  // Using slice(0, 1) to get the first entry
    <TouchableOpacity
      key={index}
      onPress={() => handleLocationSelect(index, 'offsiteData')}
      className={`w-full ${selectedLocation.index === index && selectedLocation.source === 'offsiteData' ? 'border-Blue' : 'border-darkGrey'
        }`}
    >
      <View
        className={`bg-greyishBlack space-y-2 p-3 rounded-lg border-[0.5px] border-solid ${selectedLocation.index === index && selectedLocation.source === 'offsiteData' ? 'border-Blue' : 'border-darkGrey'
          }`}
      >
        <Text
          className={`text-xs font-bold ${selectedLocation.index === index && selectedLocation.source === 'offsiteData' ? 'text-Blue' : 'text-white'
            }`}
        >
          {loca.name}  {/* Changed from loca.lname to loca.name */}
        </Text>
        <Text className='text-[9px] text-darkGrey'>
          Latitude: {loca.latitude}, Longitude: {loca.longitude}  {/* Displaying latitude and longitude */}
        </Text>
      </View>
    </TouchableOpacity>
  ))}
</ScrollView>


            <TouchableOpacity
              className='bg-Blue flex items-center justify-center rounded-full w-full p-2'
              onPress={handleChecked}
            >
              <Text className='text-white font-bold text-lg'>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SuggestModal;
const styles = StyleSheet.create({
  button: {

    width: 160,
    height: 160,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 8,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchInput: {
    backgroundColor: '#202020',
    borderRadius: 5,
    padding: 10,
    color: 'white',
    marginTop: 10,
  },
  checkInButton: {
    backgroundColor: '#3085FE',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  checkInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});