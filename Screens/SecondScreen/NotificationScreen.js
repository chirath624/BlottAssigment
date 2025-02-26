import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, PermissionsAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {check,request, RESULTS} from 'react-native-permissions';

const NotificationScreen = () => {

    const navigation = useNavigation();
    const requestNotificationPermission = async () => {
        const result = await request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        return result;
    };

    const checkNotificationPermission = async () => {
        const result = await check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        return result;
    };
    const requestPermission = async () => {
        const checkPermission = await checkNotificationPermission();
        if (checkPermission !== RESULTS.GRANTED) {
            const request = await requestNotificationPermission();
            if(request === RESULTS.GRANTED){
                navigation.navigate('NewsScreen')
            }
        }else if(checkPermission === RESULTS.GRANTED){
            navigation.navigate('NewsScreen')
        }
    };


    return (
        <View style={styles.container}>
            <Image source={require('../../assets/notification.png')} style={styles.image} />
            <Text style={styles.title}>Get the most out of Blott ✅</Text>
            <Text style={styles.subtitle}>
                Allow notifications to stay in the loop with your payments, requests, and groups.
            </Text>
            <TouchableOpacity style={styles.button}  onPress={() => requestPermission()}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    image: {
        width: 80,
        height: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default NotificationScreen;
