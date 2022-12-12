import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PRIMARY_COLOR } from './colors'

function HomeScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Text style={styles.subHeading}>
                    Select option to continue
                </Text>
            </View>
            <View >
                <TouchableOpacity onPress={() => navigation.navigate('ListOfDevices')}><Text style={styles.generateOtpTouchOpacTextValid}> Get Air Quality</Text></TouchableOpacity>
            </View>


            {<View >
                <TouchableOpacity onPress={() => navigation.navigate('placesPage')}><Text style={styles.generateOtpTouchOpacTextValid}>Air Quality History</Text></TouchableOpacity>
            </View>}
        </ScrollView>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black'
    },
    generateOtpTouchOpacTextValid: {
        color: 'white',
        fontWeight: '600',
        fontSize: 25,
        marginTop: 60,
        padding: 20,
        // backgroundColor: '#135cd1',
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 5,
        width: 250,
        textAlign: 'center',

    },
    subHeading: {
        position: 'relative',
        height: 23,
        marginTop: 24,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 23,
        lineHeight: 23,
        color: '#94989A',
    },
})
