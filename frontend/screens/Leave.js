import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import LeaveModal from '../components/LeaveModal';
import Calen from '../assets/leave/calen.svg';
import pattern from '../assets/bgPattern.png';
import IP_Address from '../utilities';


const Leave = () => {

  const getLeaves = async () => {
    try {
      const response = await fetch(`http://localhost:5000/leave/getspecificleaves`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();

        // Define your geofence center point
        const geofenceCenter = { latitude: 19.072778, longitude: 72.900730 };
        const geofenceRadius = 2000; // Radius in meters

        // Filter the data to only include those within the geofence
        const filteredData = data.filter(offsite => {
          return geolib.isPointWithinRadius(
            { latitude: offsite.latitude, longitude: offsite.longitude },
            geofenceCenter,
            geofenceRadius
          );
        });

        // Set the filtered data
        console.log(filteredData)
        setOffsiteData(filteredData);
      } else {
        const errorText = await response.text();
        console.error('Error Response:', errorText);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  const [leaveRequests, setLeaveRequests] = useState([
    {
      reason: 'Suffering from Cold',
      fromDate: '31 Aug',
      toDate: '02 Sep',
      reqDate: '30 Aug',
      status: 'Pending',
    },
    {
      reason: 'Family Function',
      fromDate: '15 Sep',
      toDate: '17 Sep',
      reqDate: '10 Sep',
      status: 'Approved',
    },
    
  ]);


  const addLeaveRequest = (newRequest) => {
    setLeaveRequests((prevRequests) => [newRequest, ...prevRequests]);
  };

  return (
    <View className='w-full h-full bg-bg relative '>
      <Image className='absolute left-0 -translate-x-20' source={pattern} />
      <Image className='absolute right-0 bottom-0 translate-x-20' source={pattern} />
      
      <View className='pt-10  pb-5 flex-col items-center'>
        <Text className='text-white text-lg font-bold'>My Requests</Text>
      </View>

      <View className='h-full w-full p-5'>
        <View className='flex-1 space-y-4 h-full'>
          {leaveRequests.map((request, index) => (
            <View key={index} className='bg-greyishBlack space-y-3 rounded-lg p-4'>
              <View className='flex-row justify-between items-center'>
                <Text className='text-xs text-white font-semibold'>{request.reason}</Text>
                <View className={`p-1 border-[0.5px] border-solid rounded-md ${
                  request.status === 'Pending' ? 'border-Orange' : request.status === 'Approved' ? 'border-seagreen' : 'border-Red'
                }`}>
                  <Text className={`text-[10px] font-semibold ${
                    request.status === 'Pending' ? 'text-Orange' : request.status === 'Approved' ? 'text-seagreen' : 'text-Red'
                  }`}>{request.status}</Text>
                </View>
              </View>
              <View className='flex-row  space-x-2'>
                <Calen />
                <View className='space-y-1'>
                  <Text className='font-semibold text-darkGrey text-xs'>Leave from: <Text className='text-white'>{request.fromDate} - {request.toDate}</Text></Text>
                  <Text className='text-[9px] text-darkGrey'>Requested on {request.reqDate}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>


        <LeaveModal addLeaveRequest={addLeaveRequest} />

        <View className='h-36 w-full bottom-0'></View>
      </View>

      <Navbar />
    </View>
  );
}

export default Leave;
