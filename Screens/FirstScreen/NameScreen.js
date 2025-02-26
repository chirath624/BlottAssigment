import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LegalNameScreen = () => {
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async () => {
        if (!firstName.trim() || !lastName.trim()) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        try {
            // Store firstName in AsyncStorage
            await AsyncStorage.setItem("firstName", firstName);


            // Navigate to the next screen
            navigation.navigate("NotificationScreen");
        } catch (error) {

            Alert.alert("Error", "Failed to save data. Please try again.");
        }
    };
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <Text style={styles.title}>Your legal name</Text>
            <Text style={styles.subtitle}>We need to know a bit about you so that we can create your account.</Text>

            <TextInput
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input} placeholder="First Name" />
            <TextInput
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
                placeholder="Last Name" />

            <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
                <Text style={styles.buttonText}>→</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start", // Align content to the left
        justifyContent: "flex-start", // Align content to the top
        paddingHorizontal: 20, // Add some padding on the left
        paddingTop: 50, // Move content downward slightly
        backgroundColor: "#fff",
    },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    subtitle: { fontSize: 14, color: "gray", marginBottom: 20 },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "100%",
        fontSize: 18,
        paddingVertical: 5,
        marginBottom: 20,
    },
    button: {
        alignSelf: "flex-end", // Keep button aligned to the right
        backgroundColor: "blue",
        borderRadius: 50,
        padding: 10,
    },
    buttonText: { fontSize: 24, color: "white" },
});

export default LegalNameScreen;
