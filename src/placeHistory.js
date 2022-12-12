import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { PRIMARY_COLOR } from './colors';
function PlaceHistory({ route, navigation }) {
    const isFocused = useIsFocused()
    const [placeDetail, setPlaceDetail] = useState([])
    const [v1, setV1] = useState(0)
    const [v2, setV2] = useState(0)
    const [v3, setV3] = useState(0)
    const [v4, setV4] = useState(0)
    const [v5, setV5] = useState(0)
    const [v6, setV6] = useState(0)
    useEffect(() => {
        if (isFocused) getStorage();
    }, [isFocused])
    const getStorage = async () => {
        const stor = await AsyncStorage.getItem('AQIDetails')
        const parsedData = JSON.parse(stor)
        let tempDetail = [];
        let vi1 = 0, vi2 = 0, vi3 = 0, vi4 = 0, vi5 = 0, vi6 = 0;
        parsedData[route.params.name].map(data => {
            const aqi = parseInt(data.value)
            tempDetail = [...tempDetail, data]
            if (aqi <= 50) vi1 += 1
            else if (aqi <= 100) vi2 += 1
            else if (aqi <= 150) vi3 += 1
            else if (aqi <= 200) vi4 += 1
            else if (aqi <= 300) vi5 += 1
            else vi6 += 1
        })
        setV1(vi1); setV2(vi2); setV3(vi3); setV4(vi4); setV5(vi5); setV6(vi6);
        setPlaceDetail(tempDetail)

    }
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        // strokeWidth: 3, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    console.log(v1, v2, v3, v4)
    const data = [
        {
            name: "Good",
            AQI: v1,
            color: "green",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Moderate",
            AQI: v2,
            color: "yellow",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Innocuous",
            AQI: v3,
            color: "orange",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Unhealthy",
            AQI: v4,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Toxic",
            AQI: v5,
            color: "purple",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Hazardous",
            AQI: v6,
            color: "brown",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];


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


    const Item = ({ value, dateTime }) => (
        <View style={[styles.item, { backgroundColor: fontColor(value) }]}>
            {console.log(value)}

            <Text style={styles.title}>AQI - {value}  </Text>
            <Text style={styles.dateTime}>Date -  {dateTime.getDate() + '/' + (dateTime.getMonth() + 1) + '/' + dateTime.getFullYear()}</Text>
            <Text style={styles.dateTime}>Time - {formatAMPM(dateTime)}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item value={item.value} dateTime={new Date(item.timeInstance)} />
    );
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <PieChart
                    data={data}
                    width={325}
                    height={200}
                    chartConfig={chartConfig}
                    accessor={"AQI"}
                    backgroundColor={"transparent"}
                    paddingLeft={"0"}
                    center={[1, 5]}

                />
            </View>

            <FlatList
                data={placeDetail.reverse()}
                renderItem={renderItem}
                keyExtractor={item => item.timeInstance}
            />
        </SafeAreaView>
    )
}

export default PlaceHistory


const styles = StyleSheet.create({
    listStyle: {
        padding: 0
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5
    },
    title: {
        fontSize: 32,
        color: 'white'
    },
    dateTime: {
        color: 'white',
        display: 'flex',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    }
})