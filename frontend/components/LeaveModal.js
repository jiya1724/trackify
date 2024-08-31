import { View, Image, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import React, { useState } from 'react';
import arrow from '../assets/record/arrow.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Svg, Path } from 'react-native-svg';

const LeaveModal = ({ addLeaveRequest }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState({
    fromDate: null,
    toDate: null,
  });
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [reason, setReason] = useState('');

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const onChangeFrom = (event, selectedDate) => {
    setShowFromPicker(false);
    setDateRange((prev) => ({
      ...prev,
      fromDate: selectedDate || prev.fromDate,
    }));
  };

  const onChangeTo = (event, selectedDate) => {
    setShowToPicker(false);
    setDateRange((prev) => ({
      ...prev,
      toDate: selectedDate || prev.toDate,
    }));
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
    }).replace(' ', ' ');
  };

  const handleSubmit = () => {
    if (reason && dateRange.fromDate && dateRange.toDate) {
      const newRequest = {
        reason,
        fromDate: formatDate(dateRange.fromDate),
        toDate: formatDate(dateRange.toDate),
        reqDate: formatDate(new Date()),
        status: 'Pending',
      };
      addLeaveRequest(newRequest);
      closeModal();
      setDateRange({ fromDate: null, toDate: null });
      setReason('');
    }
  };

  return (
    <View>
      <View className='w-full'>
        <TouchableOpacity className="bg-Blue w-full p-3 rounded-lg justify-center items-center" onPress={openModal}>
          <Text className="text-white font-bold text-base">Request for a Leave</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className='flex-1 w-full h-full justify-end items-center' style={styles.modalContainer}>
          <View className='w-full p-6 rounded-t-2xl bg-[#161616] flex justify-center space-y-5'>
            <Text className='text-white text-base text-center font-bold'>Apply Leave</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
              <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M1 16L16 1M16 16L1 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </TouchableOpacity>

            <View>
              <Text className='text-white'>Select date:</Text>
              <View className='flex-row justify-between items-center mt-4'>
                <TouchableOpacity className='flex flex-row justify-center items-center space-x-2' onPress={() => setShowFromPicker(true)} style={styles.dateButton}>
                  <Text style={styles.dateText}>
                    {dateRange.fromDate ? formatDate(dateRange.fromDate) : 'From'}
                  </Text>
                  <Image className='h-2 w-4' source={arrow} />
                </TouchableOpacity>
                <View className='flex justify-center items-center'>
                  <Text className='text-darkGrey text-center font-bold align-middle'>------------------</Text>
                </View>
                <TouchableOpacity className='flex flex-row justify-center items-center space-x-2' onPress={() => setShowToPicker(true)} style={styles.dateButton}>
                  <Text style={styles.dateText}>
                    {dateRange.toDate ? formatDate(dateRange.toDate) : 'To'}
                  </Text>
                  <Image className='h-2 w-4' source={arrow} />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text className='text-white font-semibold'>Reason:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your reason here"
                placeholderTextColor="#7a7a7a"
                multiline={true}
                numberOfLines={4}
                value={reason}
                onChangeText={setReason}
              />
            </View>
            <View className='w-full'>
              <TouchableOpacity className="bg-Blue w-full p-3 rounded-lg justify-center items-center" onPress={handleSubmit}>
                <Text className="text-white font-bold text-base">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {showFromPicker && (
        <DateTimePicker
          testID="dateTimePickerFrom"
          value={dateRange.fromDate || new Date()}
          mode="date"
          display="default"
          onChange={onChangeFrom}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          testID="dateTimePickerTo"
          value={dateRange.toDate || new Date()}
          mode="date"
          display="default"
          onChange={onChangeTo}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#333',
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
  },
  textInput: {
    height: 80,
    marginTop:8,
    borderColor: '#7a7a7a',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical:'top',
    color: '#fff',
    backgroundColor: '#333',
  },
});

export default LeaveModal;
