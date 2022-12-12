import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

function BleEnaReq() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>  Please Enable Bluetooth First</Text>
        </View>
    )
}

export default BleEnaReq

const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        color: 'black'
    },
    text: {
        color: 'black'
    }
})
