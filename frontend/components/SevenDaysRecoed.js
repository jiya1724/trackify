import React from 'react';
import { View, Text } from 'react-native';

const SevenDaysRecoed = ({ records }) => {
  return (
    <View className='mt-3 justify-center items-center'>
      <Text className='text-white text-xs font-medium pb-4 '>Attendance Record of Past 7 days</Text>
      {records.map((record, index) => (
        <View
          key={index}
          className='w-full flex-row p-3 rounded-lg border-[0.5px] border-solid border-darkGrey justify-between items-center mt-2'
        >
          <View className='justify-center space-y-1'>
            <Text className='text-xs text-white font-medium'>Working Hours:</Text>
            <Text className='text-[8px] text-darkGrey'>{record.date}</Text>
          </View>
          <View>
            <Text className='text-sm font-semibold text-white'>{record.workingHours}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default SevenDaysRecoed;
