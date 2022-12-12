import React, { useEffect, useState } from 'react'
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRIMARY_COLOR } from './colors';
function ListOfDevices({ navigation }) {

    const isFocused = useIsFocused()
    const [isDisabled, setIsDisabled] = useState(false)
    const [devices, setDevices] = useState(null)
    const [storage, setStorage] = useState(null)
    useEffect(() => {
        if (isFocused) {
            check();
            getStorage()
        }

    }, [isFocused])

    const getStorage = async () => {
        const stor = await AsyncStorage.getItem('AQIDetails')
        setStorage(stor)

    }

    const check = async () => {
        try {
            let available;
            available = await RNBluetoothClassic.getBondedDevices();
            setDevices(available)
        } catch (err) {
            console.log('err')
        }
    }

    const ConnectToDevice = async (device) => {
        setIsDisabled(true)
        let ispair;
        try {
            ispair = await RNBluetoothClassic.connectToDevice(device)
        }
        catch { }
        var sendConnectionRequest;
        if (ispair?._nativeDevice) {
            try {
                sendConnectionRequest = await RNBluetoothClassic.writeToDevice(device, 'fetchAQI')
                console.log("trying writing")
            }
            catch { console.log('error in sending') }
            var readid;
            if (sendConnectionRequest) {
                try {
                    readid = await RNBluetoothClassic.readFromDevice(device)
                    while (readid === null) {
                        readid = await RNBluetoothClassic.readFromDevice(device)
                    }
                    if (readid?.length) {
                        setIsDisabled(false)
                        let arr = readid.split(',');
                        let loc = null
                        loc = arr[0]
                        const val = parseInt(arr[1])
                        const dateTime = Date.now();
                        const newObj = {};
                        newObj.value = val;
                        newObj.timeInstance = dateTime;
                        var parsedStorage = JSON.parse(storage);
                        if (parsedStorage) {
                            if (parsedStorage[loc]) {
                                parsedStorage[loc] = [...parsedStorage[loc], newObj]
                            }
                            else {
                                parsedStorage[loc] = [newObj]
                            }
                        }
                        else {
                            parsedStorage = {}
                            parsedStorage[loc] = [newObj]
                        }
                        const stringifiedStorage = JSON.stringify(parsedStorage);
                        AsyncStorage.setItem('AQIDetails', stringifiedStorage)
                        navigation.navigate('OneTimeAQViewer', { 'location': loc, 'value': val, 'dateTime': dateTime })

                    }
                    else {
                        Alert.alert("Try Again", "Something went wrong", [
                            {
                                text: 'Ok',
                                onPress: () => setIsDisabled(false)
                            }
                        ])
                    }
                }
                catch {
                }
            }
        }
        else {
            Alert.alert("Try Again", "Make sure device is switched ON", [
                {
                    text: 'Ok',
                    onPress: () => setIsDisabled(false)
                }
            ])
        }
    }
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View >
                <Text style={styles.subHeading}>
                   {devices?'Connect to your Device':'Bluetooth devices not available'}
                </Text>
            </View>
            <View style={styles.devicelist}>
                {devices ? devices?.map((device) => {
                    return (
                        <View key={device._nativeDevice.id} style={styles.devices}>
                            <TouchableOpacity disabled={isDisabled} onPress={() => { ConnectToDevice(device._nativeDevice.address) }}>
                                <Text style={isDisabled ? styles.disableDeviceName : styles.devicename}>{device._nativeDevice.name}</Text>
                            </TouchableOpacity>

                        </View>
                    )
                }) : null}
            </View>
        </ScrollView>
    )
}

export default ListOfDevices



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
        // border: 100,
        margin: 10,
        fontSize: 70,
        fontWeight: 600,
        lineHeight: 20,
        // borderWidth: 1,
        // borderColor: 'black',
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
})
