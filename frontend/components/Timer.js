import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';

const Timer = ({ status }) => {
    const [time, setTime] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (status === 'true') {
            const id = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
            setIntervalId(id);
        } else if (status === 'false' && intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        } else if (status === 'reset') {
            clearInterval(intervalId);
            setIntervalId(null);
            setTime(0);
        }

        
        return () => clearInterval(intervalId);
    }, [status]);

    const formatTime = () => {
        const hrs = Math.floor(time / 3600);
        const mins = Math.floor((time % 3600) / 60);
        const secs = time % 60;
        return `${hrs.toString().padStart(2, '0')} hrs ${mins.toString().padStart(2, '0')} mins ${secs.toString().padStart(2, '0')} secs`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {formatTime()}
            </Text>
        </View>
    );
}

export default Timer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1A1A',
        borderWidth: 1,
        marginTop: 20,
        borderColor: '#2E8B57',
        borderRadius: 8,
        padding: 8,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#2E8B57',
    },
});
