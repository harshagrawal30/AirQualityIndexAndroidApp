import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PRIMARY_COLOR } from './colors';

function PlacesPage({ navigation }) {
    const [storage, setStorage] = useState(null)
    const isFocused = useIsFocused()
    const [places, setPlaces] = useState([])
    useEffect(() => {
        if (isFocused) {
            getStorage();
        }
    }, [isFocused])
    const getStorage = async () => {
        const stor = await AsyncStorage.getItem('AQIDetails')
        var tempPlaces = [];
        for (const property in JSON.parse(stor)) {
            tempPlaces.push(property)
        }
        setPlaces(tempPlaces)
        setStorage(stor)
    }
    const eraseStorage = () => {
        AsyncStorage.removeItem('AQIDetails')
        setPlaces(null)
    }
    const deleteStorage = () => {
        Alert.alert('Warning', 'Are you sure to delete all', [
            {
                text: 'Delete',
                onPress: () => eraseStorage()
            },
            {
                text: 'cancel',
            }
        ],
            {
                cancelable: true
            })
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View >
                <Text style={styles.subHeading}>
                    {places.length ? 'Select place to view History' : 'Places list is Empty'}
                </Text>
            </View>
            <View style={styles.devicelist}>
                {places.length ? places?.map((place) => {
                    return (
                        <View key={place} style={styles.devices}>
                            <TouchableOpacity onPress={() => navigation.navigate('placeHistory', { 'name': place })}>
                                <Text style={styles.devicename}>{place}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })
                    : null}
                {places.length ? <View style={[styles.devices, { backgroundColor: 'red' }]}>
                    <TouchableOpacity onPress={() => deleteStorage()}>
                        <Text style={styles.devicename}>Delete All</Text>
                    </TouchableOpacity>
                </View> : null}
            </View>
        </ScrollView>
    )
}

export default PlacesPage


const styles = StyleSheet.create({
    container: {
        position: 'relative',
        background: '#FFFFFF',
        borderRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
    },
    textBox: {
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    devicelist: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 20
    },
    devices: {
        textAlign: 'center',
        display: 'flex',
        alignSelf: 'center',
        position: 'relative',
        border: 100,
        margin: 10,
        fontSize: 70,
        fontWeight: 600,
        lineHeight: 20,
        width: '100%',
        borderRadius: 5,
        padding: 10,
        backgroundColor: PRIMARY_COLOR
    },
    devicename: {
        fontSize: 20,
        lineHeight: 20,
        fontWeight: '600',
        color: "white",
        alignSelf: 'center',
        padding: 10,
    },
    disableDeviceName: {
        fontSize: 20,
        lineHeight: 20,
        fontWeight: '600',
        color: "grey",
        alignSelf: 'center',
        padding: 10
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
    Avatar: {
        maxHeight: 40,
        maxWidth: 40,
        display: 'flex',
        borderRadius: 50,
    },
    AvatarContainer: {
        maxHeight: 30,
        marginTop: 10,
        display: 'flex',
        right: 10
    },
    deleteButton: {
        backgroundColor: 'red'
    }
})
