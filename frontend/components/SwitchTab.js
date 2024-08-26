import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Office from './Office';

const AttendanceTab = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleIndexChange = (index) => {
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

            <View style={styles.contentContainer}>
                {selectedIndex === 0 && <View className="w-full"><Office/></View>}
                {selectedIndex === 1 && <Text >Offsite content goes here</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    tabsContainer: {
        marginVertical: 20,
        height:48
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
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default AttendanceTab;
