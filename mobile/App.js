import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  async function getProducts() {
    try {
      const response = await fetch("http://10.0.2.2:3000/api/products");

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();
      return setProducts(result);

    } catch (error) {
      console.log(error);
      setErrorMessage("Det gick inte att hämta produkter just nu, prova igen senare.");
    } finally {
      setLoading(false);
    }
  }

  async function setStorage() {
    await AsyncStorage.setItem("favorites", JSON.stringify([3]));
  }

  async function getStorage() {
    const data = await AsyncStorage.getItem("favorites");
    console.log("data - ", data);
    const favorites = JSON.parse(data);
    console.log("favorites - ", favorites);
    setFavorites(favorites);
  }

  useEffect(() => {
    getProducts();
    getStorage();
  }, []);

  if (loading) {
    return <View style={styles.container}>
      <ActivityIndicator size={80} />
      <Text>Håller på att hämta data...</Text>
    </View>;
  }

  if (errorMessage) {
    return <View style={styles.container}>
      <Text>{errorMessage}</Text>
    </View>;
  }

  if (products.length === 0) {
    return <View style={styles.container}>
      <Text>Inga produkter hittades!</Text>
    </View>;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      <Text>Mina favoriter</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text>{products[item - 1].name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
