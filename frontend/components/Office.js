import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { writeAsStringAsync, documentDirectory } from 'expo-file-system';
import checkin from '../assets/record/arrowSector.png';
import arrow from '../assets/record/arrow.png';
import SevenDaysRecoed from './SevenDaysRecoed';
import { useSelector } from 'react-redux';

// Helper function to get past 7 days' records
const getPastSevenDaysRecords = () => {
  const records = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const day = date.toLocaleDateString('en-GB', { weekday: 'short' });
    const dayMonth = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
    });

    const formattedDate = `${day}, ${dayMonth} ${date.getFullYear()}`;
    
    // Randomly generated working hours for demo purposes
    const workingHours = `${Math.floor(Math.random() * 3) + 6}hrs ${Math.floor(Math.random() * 60)}mins`;

    records.push({ date: formattedDate, workingHours });
  }

  return records;
};

// Convert data to CSV format
const generateCSV = (records) => {
  const header = 'Date,Working Hours\n';
  const rows = records.map(record => `${record.date},${record.workingHours}`).join('\n');
  return header + rows;
};

const Office = () => {
  const showworking = useSelector((state) => state.punch.working);
  const showCheckin = useSelector((state) => state.punch.showCheckinTime);

  const [dateRange, setDateRange] = useState({
    fromDate: null,
    toDate: null,
  });
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Set past 7 days' records when component mounts
    setRecords(getPastSevenDaysRecords());
  }, []);

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

  const download = async () => {
    try {
      // Convert data to CSV format
      const csv = generateCSV(records);

      // Define file path and write CSV content
      const fileUri = documentDirectory + '7_days_records.csv';
      await writeAsStringAsync(fileUri, csv, { encoding: 'utf8' });

      Alert.alert('Download Complete', `File saved to ${fileUri}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Download Failed', 'An error occurred while saving the file.');
    }
  };

  return (
    <View className='h-full w-full flex flex-col space-y-8'>
      <View className='space-y-2'>
        <Text className='text-Blue text-base font-bold'>Today:</Text>
        <View className='w-full flex flex-row space-x-4'>
          <View className='flex flex-col space-y-2 bg-greyishBlack border-solid border-[0.5px] border-Blue rounded-lg p-3 justify-center items-center'>
            <View className='flex flex-row space-x-2'>
              <Image className='h-5 w-5' source={checkin} />
              <Text className='text-white text-xs font-medium'>Check In</Text>
            </View>
            <View className='w-full flex justify-center items-center text-center'>
              <Text className='text-white font-bold text-base'>{showCheckin}</Text>
            </View>
          </View>
          <View className='flex flex-1 flex-col space-y-2 bg-greyishBlack border-solid border-[0.5px] border-Blue rounded-lg p-3 justify-center items-center'>
            <View className='flex flex-row space-x-2'>
              <Text className='text-white text-xs font-medium'>Total Working Hours:</Text>
            </View>
            <View className='w-full flex justify-center items-center text-center'>
              <Text className='text-white font-bold text-base'>{showworking}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className='justify-center items-center'>
        <Text className='text-Blue text-xs underline font-medium'>
          Select Date Range to download earlier attendance data
        </Text>
      </View>

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
          <Image className='h-2 w-4 ' source={arrow} />
        </TouchableOpacity>
      </View>

      <View className='w-full justify-center items-center'>
        <TouchableOpacity style={styles.button} onPress={download}>
          <Text className="text-white font-bold text-base">Download</Text>
        </TouchableOpacity>
      </View>

      <View>
        <SevenDaysRecoed records={records} />
      </View>

      <View className='h-12 w-full bottom-0'></View>
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
  dateButton: {
    backgroundColor: '#1e1e1e',
    padding: 14,
    borderRadius: 6,
  },
  dateText: {
    color: '#3085FE',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3085FE',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
});

export default Office;
