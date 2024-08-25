import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SwitchTab = () => {
    const [selectedTab, setSelectedTab] = useState('Office');

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'Office' && styles.activeTab]}
                    onPress={() => setSelectedTab('Office')}
                >
                    <Text style={[styles.tabText, selectedTab === 'Office' && styles.activeTabText]}>Office</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'Offsite' && styles.activeTab]}
                    onPress={() => setSelectedTab('Offsite')}
                >
                    <Text style={[styles.tabText, selectedTab === 'Offsite' && styles.activeTabText]}>Offsite</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#1e1e1e', 
        borderRadius: 10,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    tabText: {
        color: '#fff', 
        fontSize: 16,
    },
    activeTab: {
        backgroundColor: '#3085FE', 
    },
    activeTabText: {
        color: '#fff', 
        fontWeight: 'bold',
    },
});

export default SwitchTab;
