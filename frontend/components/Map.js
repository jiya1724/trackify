import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const { width,height } = Dimensions.get('window'); // Get the screen width

const styles = StyleSheet.create({
    container: {
        width: width * 0.97, // Set the width to 80% of the screen width
        height: height* 0.4 ,
        position: 'relative',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

const Map = ({region,setRegion}) => {

    

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={region}
                onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            />
        </View>
    )
}

export default Map
