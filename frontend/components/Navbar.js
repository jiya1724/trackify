import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Home from '../assets/Navbar/components/Home';
import Record from '../assets/Navbar/components/Record';
import Profile from '../assets/Navbar/components/Profile';
import Request from '../assets/Navbar/components/Request';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const Navbar = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [activePage, setActivePage] = useState('Home');

    useEffect(() => {
        setActivePage(route.name);
    }, [route.name]);

    const getStrokeColor = (page) => {
        return activePage === page ? '#3085FE' : 'white';
    };

    const getTextColor = (page) => {
        return activePage === page ? '#3085FE' : 'white';
    };

    return (
        <View className='absolute bottom-0 z-20 bg-darkBg opacity-100 w-full h-16 flex-row items- justify-between pr-5 pl-5'>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('HomeSlide')}>
                <View className='flex items-center justify-center space-y-1'>
                    <Home stroke={getStrokeColor('HomeSlide')} />
                    <Text style={{ color: getTextColor('HomeSlide') }} className='text-xs'>Home</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Leave')}>
                <View className='flex items-center justify-center space-y-1'>
                    <Request stroke={getStrokeColor('Leave')} />
                    <Text style={{ color: getTextColor('Leave') }} className='text-xs'>Requests</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Records')}>
                <View className='flex items-center justify-center space-y-1'>
                    <Record stroke={getStrokeColor('Records')} />
                    <Text style={{ color: getTextColor('Records') }} className='text-xs'>Records</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile')}>
                <View className='flex items-center justify-center space-y-1'>
                    <Profile stroke={getStrokeColor('Profile')} />
                    <Text style={{ color: getTextColor('Profile') }} className='text-xs'>Profile</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default Navbar;

const styles = StyleSheet.create({});
