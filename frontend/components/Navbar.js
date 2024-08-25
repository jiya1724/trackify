import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from '../assets/Navbar/components/Home';
import Record from '../assets/Navbar/components/Record';
import Profile from '../assets/Navbar/components/Profile';
import Request from '../assets/Navbar/components/Request';

const Navbar = () => {
    const [activePage, setActivePage] = useState('Home');

    const getStrokeColor = (page) => {
        return activePage === page ? '#3085FE' : 'white';
    };

    const getTextColor = (page) => {
        return activePage === page ? '#3085FE' : 'white';
    };

    return (
        <View className='absolute bottom-0 z-20 bg-darkBg opacity-100 w-full h-16 flex-row items- justify-between pr-5 pl-5'>
            <View className='flex items-center justify-center space-y-1' onTouchStart={() => setActivePage('Home')}>
                <Home stroke={getStrokeColor('Home')} />
                <Text style={{ color: getTextColor('Home') }} className='text-xs'>Home</Text>
            </View>

            <View className='flex items-center justify-center space-y-1' onTouchStart={() => setActivePage('Requests')}>
                <Request stroke={getStrokeColor('Requests')} />
                <Text style={{ color: getTextColor('Requests') }} className='text-xs'>Requests</Text>
            </View>

            <View className='flex items-center justify-center space-y-1' onTouchStart={() => setActivePage('Records')}>
                <Record stroke={getStrokeColor('Records')} />
                <Text style={{ color: getTextColor('Records') }} className='text-xs'>Records</Text>
            </View>

            <View className='flex items-center justify-center space-y-1' onTouchStart={() => setActivePage('Profile')}>
                <Profile stroke={getStrokeColor('Profile')} />
                <Text style={{ color: getTextColor('Profile') }} className='text-xs'>Profile</Text>
            </View>
        </View>
    );
};

export default Navbar;

const styles = StyleSheet.create({});
