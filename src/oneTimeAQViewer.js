
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

function OneTimeAQViewer({ route, navigation }) {

    const date = new Date(Date.now())
    const aqiVal = route.params.value
    const dateTime = new Date(route.params.dateTime)


    const fontColor = (aqiVal) => {
        if (aqiVal <= 50) return 'green'
        else if (aqiVal <= 100) return 'yellow'
        else if (aqiVal <= 150) return 'orange'
        else if (aqiVal <= 200) return 'red'
        else if (aqiVal <= 300) return 'purple'
        else return 'brown'
    }

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.text}>
                    Place - {route.params.location}
                </Text>
                <Text style={styles.text}>
                    AQI - {route.params.value}
                </Text>
                <Text style={styles.text}>
                    Date - {dateTime.getDate() + '/' + (dateTime.getMonth() + 1) + '/' + dateTime.getFullYear()}
                </Text>

                <Text style={styles.text}>
                    Time - {formatAMPM(dateTime)}
                </Text>
                <Text style={styles.text}>
                    Result -<Text style={{ color: fontColor(aqiVal) }}> {aqiVal <= 50 ? 'Good' : aqiVal <= 100 ? 'Moderate' : aqiVal <= 150 ? 'Unhealthy for Sensitive Group' : aqiVal <= 200 ? 'Unhealthy' : aqiVal <= 300 ? 'Very Unhealthy' : 'Hazardous'}</Text>
                </Text>
            </View>
        </ScrollView>
    )
}

export default OneTimeAQViewer


const styles = StyleSheet.create({
    container: {
        color: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        padding: 20

    },
    text: {
        color: 'black',
        fontSize: 35,
        fontWeight: '600',
        textAlign: 'left',
        paddingTop: 40
    },
    result: {
        fontSize: 35,
        fontWeight: '600',
        textAlign: 'left',
        paddingTop: 40,

    }
})
