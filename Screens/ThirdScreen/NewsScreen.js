import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "https://finnhub.io/api/v1/news?category=general&token=crals9pr01qhk4bqotb0crals9pr01qhk4bqotbg";

const NewsScreen = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState("");
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(API_URL);
                console.log(response);
                setNews(response.data);
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };
setInterval(()=>{
    fetchNews();
},60000)

    }, []);
    useEffect(() => {
        const fetchFirstName = async () => {
            try {
                const storedFirstName = await AsyncStorage.getItem("firstName");
                if (storedFirstName !== null) {
                    setFirstName(storedFirstName); // Set the first name in state
                }
            } catch (error) {
                console.error("Error fetching first name:", error);
            }
        };

        fetchFirstName();
    }, []);
    const renderItem = ({ item }) => (
        <View style={styles.newsItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.source}>{item.source} - {new Date(item.datetime * 1000).toDateString()}</Text>
                <Text style={styles.title}>{item.headline}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Hey, {firstName}!</Text>
            {loading ? <Text style={styles.loading}>Loading News...</Text> : (
                <FlatList
                    data={news}
                    keyExtractor={(item) => item.id?.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000", paddingHorizontal: 10, paddingTop: 40 },
    header: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    loading: { color: "#fff", textAlign: "center", marginTop: 20 },
    newsItem: { flexDirection: "row", backgroundColor: "#121212", padding: 10, borderRadius: 8, marginBottom: 10 },
    image: { width: 80, height: 80, borderRadius: 5, marginRight: 10 },
    textContainer: { flex: 1 },
    source: { color: "#999", fontSize: 12 },
    title: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default NewsScreen;
