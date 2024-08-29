import { StyleSheet, Text, View } from 'react-native'
import React from 'react'




const OffsiteAttendance = () => {
    const data = {
        records: [
          {
            date: "Mon, 19th August 24",
            workingHours: "9hrs 45mins",
          },
          {
            date: "Tue, 20th August 24",
            workingHours: "8hrs 30mins",
          },
          {
            date: "Wed, 21st August 24",
            workingHours: "7hrs 50mins",
          },
          {
            date: "Thu, 22nd August 24",
            workingHours: "6hrs 15mins",
          },
          
          {
            date: "Fri, 23rd August 24",
            workingHours: "8hrs 10mins",
          },
        ],
      };
  return (
    <View className='mt-3 justify-center items-center'>
      <Text className='text-white text-xs font-medium pb-4 '>Off site Attendance Record of Past 7 days</Text>

      {data.records.map((record, index) => (
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
    
  )
}

export default OffsiteAttendance;

const styles = StyleSheet.create({})