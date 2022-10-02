import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, TextInput, Button, ActivityIndicator } from 'react-native-paper';

export default function App() {

  const [text, setText] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [weatherApi, setWeatherApi] = useState({});
  const [weatherApiData, setWeatherApiData] = useState({});
  const [apiImage, setApiImage] = useState({});

  const handleClick = async () => {
    setLoading(true);
    setWeatherApi({});
    setWeatherApiData({});
    setApiImage({});

    try {
      const response = await fetch('http://api.weatherstack.com/current?access_key=762e48fa5e4bb41920ce1bed2017ce4c&query='+text, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result.current);
      setWeatherApi(result.location);
      setWeatherApiData(result.current);
      setApiImage(result.current.weather_icons);
    } catch (err) {
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <ImageBackground source={require('./assets/clima.jpg')}
      resizeMode='cover'
      style={styles.image}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <TextInput
            label="Enter your city"
            value={text}
            onChangeText={text => setText(text)}
            style={styles.TextInput}
          />
          <Button icon="information" mode="contained" onPress={handleClick}>
            Get information
          </Button>
          {loading && <ActivityIndicator size="large" />}
          {err && <h2>{err}</h2>}
          <Text style={styles.TextApi}>Country: {weatherApi.country}</Text>
          <Text style={styles.TextApi}>Region: {weatherApi.region}</Text>
          <Text style={styles.TextApi}>City: {weatherApi.name}</Text>
          <Text style={styles.TextApi}>Humidity: {weatherApiData.humidity}</Text>
          <Text style={styles.TextApi}>Clouds: {weatherApiData.cloudcover}</Text>
          <Text style={styles.TextApi}>UV: {weatherApiData.uv_index}</Text>
          <Text style={styles.TextApi}>Feels like: {weatherApiData.feelslike}</Text>
          <Text style={styles.TextApi}>Temperature: {weatherApiData.temperature}</Text>
          <Text style={styles.TextApi}>Presion (bar): {weatherApiData.pressure}</Text>
          <Text style={styles.TextApi}>Description: {weatherApiData.weather_descriptions}</Text>
          
        </View>
      </ImageBackground>
      
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    margin: 50,
  },
  image:{
    flex: 1,
    flexDirection: 'column',
  },
  TextInput:{
    borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 15,
    borderRadius: 16,
  },
  TextApi:{
    padding: 5,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  }

});
