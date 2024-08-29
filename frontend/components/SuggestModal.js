import { View, Image, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import checkIn from '../assets/home/Check In.png';
import { Svg,Path } from 'react-native-svg';

const SuggestModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({ index: null, source: '' });

  const data1 = {
    location: [
      {
        lname: 'Gail India- Navi Mumbai',
        address: '225P+X6R, Daulat Ram Mahatre Marg, Sector 15, CBD Belapur,Navi Mumbai-400703',
      },
      {
        lname: 'Gail India- Navi Mumbai',
        address: '225P+X6R, Daulat Ram Mahatre Marg, Sector 15, CBD Belapur,Navi Mumbai-400703',
      },
    ],
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
  useEffect(() => {
 
    if (searchQuery.trim() !== '') {
      const filtered = data2.location.filter((loca) =>
        loca.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  }, [searchQuery]);
  const manualCheckIn = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedLocation({ index: null, source: '' })
    setSearchQuery('');
    setFilteredLocations([]);
  };
  
  const handleLocationSelect = (index, source) => {
    setSelectedLocation({ index, source });
  };

 

  return (
    <View>
      <View className='w-[200px] h-[200px] bg-Red flex justify-center items-center rounded-full'>
            <TouchableOpacity style={styles.button} onPress={manualCheckIn}>
              <Image className='h-[83px] w-[63px]' source={checkIn} />
              <Text className='text-white font-bold text-base uppercase'>Manual</Text>
              <Text className='text-white font-bold text-base uppercase'>Check In</Text>
            </TouchableOpacity>
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
<Path d="M1 16L16 1M16 16L1 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>

            </TouchableOpacity>
            <ScrollView className='flex flex-col space-y-4'>
            {data1.location.map((loca, index) => (
  <TouchableOpacity
    key={index}
    onPress={() => handleLocationSelect(index, 'data1')}
    className={`w-full ${
      selectedLocation.index === index && selectedLocation.source === 'data1' ? 'border-Blue' : 'border-darkGrey'
    }`}
  >
    <View
      className={`bg-greyishBlack space-y-2 p-3 rounded-lg border-[0.5px] border-solid ${
        selectedLocation.index === index && selectedLocation.source === 'data1' ? 'border-Blue' : 'border-darkGrey'
      }`}
    >
      <Text
        className={`text-xs font-bold ${
          selectedLocation.index === index && selectedLocation.source === 'data1' ? 'text-Blue' : 'text-white'
        }`}
      >
        {loca.lname}
      </Text>
      <Text className='text-[9px] text-darkGrey'>{loca.address}</Text>
    </View>
  </TouchableOpacity>
))}


            <Text className='text-white font-bold'>Not these? Search by city</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
             
              {filteredLocations.length > 0 ? (
                filteredLocations.map( (loca, index) => (
                  <TouchableOpacity
                  key={index}
                  onPress={() => handleLocationSelect(index, 'filteredLocations')}
                  className={`w-full ${
                    selectedLocation.index === index && selectedLocation.source === 'filteredLocations' ? 'border-Blue' : 'border-darkGrey'
                  }`}
                >
                  <View
                    className={`bg-greyishBlack space-y-2 p-3 rounded-lg border-[0.5px] border-solid ${
                      selectedLocation.index === index && selectedLocation.source === 'filteredLocations' ? 'border-Blue' : 'border-darkGrey'
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        selectedLocation.index === index && selectedLocation.source === 'filteredLocations' ? 'text-Blue' : 'text-white'
                      }`}
                    >
                      {loca.lname}
                    </Text>
                    <Text className='text-[9px] text-darkGrey'>{loca.address}</Text>
                  </View>
                </TouchableOpacity>
                ))
              ) : (
                <View className='h-10 w-full'>

                </View>
              )}
            

            <TouchableOpacity style={styles.checkInButton} onPress={closeModal}>
              <Text style={styles.checkInButtonText}>Check IN</Text>
            </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      
    </View>
  )
}

export default SuggestModal

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3085FE',
    width: 180,
    height: 180,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
