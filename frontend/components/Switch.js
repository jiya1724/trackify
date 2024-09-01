import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Home from '../screens/Home';
import Manual from '../screens/Manual';

const Switch = () => {
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
                values={["Main Office","Manual CheckIn/Out "]}
                selectedIndex={selectedIndex}
                onTabPress={handleIndexChange}
                tabsContainerStyle={styles.tabsContainer}
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
            />

            <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
            {selectedIndex === 0 && <Home/>}
            {selectedIndex === 1 && <Manual/>}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop:5
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
        marginTop: 0,
    },
});

export default Switch;
