import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Office from './Office';
import Offsite from './Offsite';

const SwitchTab = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [selectedIndex]);

    const handleIndexChange = (index) => {
        fadeAnim.setValue(0);
        setSelectedIndex(index);
    };

    return (
        <View style={styles.container}>
            <SegmentedControlTab
                values={['Office', 'Offsite']}
                selectedIndex={selectedIndex}
                onTabPress={handleIndexChange}
                tabsContainerStyle={styles.tabsContainer}
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
            />

            <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
                {selectedIndex === 0 && <View className="w-full"><Office /></View>}
                {selectedIndex === 1 && <View className='w-full'><Offsite /></View>}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    tabsContainer: {
        marginVertical: 20,
        height: 48,
    },
    tabStyle: {
        borderColor: '#3085FE',
        backgroundColor: '#1E1E1E',
    },
    activeTabStyle: {
        backgroundColor: '#3085FE',
    },
    tabTextStyle: {
        color: 'white',
    },
    activeTabTextStyle: {
        color: 'white',
    },
    contentContainer: {
        marginTop: 10,
    },
});

export default SwitchTab;
