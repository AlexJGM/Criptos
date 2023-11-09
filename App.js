import { StatusBar } from 'react-native';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, SafeAreaView } from 'react-native';
import Moneda from './componentes/Moneda';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      refreshing: false,
      search: "",
    }
  }


  cargarDatos = async () => {
    try {
      const res = await fetch(
        "https://api.binance.com/api/v3/ticker/24hr"
      );
      const datos = await res.json();
      const datos2 = datos.filter((coin) => coin.symbol.includes("USDT"));
      this.setState({ coins: datos2 });
    } catch (error) {
      console.error("Error", error);
    }
  }

  componentDidMount() {
    this.cargarDatos();
  }

  render() {
    const { coins, refreshing, search } = this.state;

    return (
      <SafeAreaView  style={[styles.container]}>
        <StatusBar backgroundColor="#141414" barStyle="light-content" />

        <View style={styles.header}>
          <Text style={styles.title}>CryptoMarket</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search a Coin"
            placeholderTextColor="#858585"
            onChangeText={(text) => this.setState({ search: text })}
          />
        </View>


        <FlatList
          style={styles.list}
          data={coins.filter(
            (coin) =>
              coin.symbol.toLowerCase().includes(search.toLowerCase())
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Moneda coin={item}  />
          )}
          refreshing={refreshing}
          onRefresh={async () => {
            this.setState({ refreshing: true });
            await this.cargarDatos();
            this.setState({ refreshing: false });
          }}
        />
    </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141414",
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  list: {
    width: "90%",
  },
  searchInput: {
    color: "#fff",
    borderBottomColor: "#4657CE",
    borderBottomWidth: 1,
    width: "40%",
    textAlign: "center",
  },
});