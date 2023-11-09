import { Component, } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, FlatList, ScrollView } from "react-native";
import Grafica from "./Grafica";

export default class Moneda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibilidad: false,
      coinData: [],
    }
  }

  eliminarParametro(symbol) {
    const filtrado = symbol.replace("USDT", "");
    return filtrado;
  }

  eliminarSimboloNegativo(priceChange) {
    return priceChange.startsWith('-') ? priceChange.slice(1) : priceChange;
  }

  Abrir = (coin) => {
    const coinData = Object.keys(coin).map((key) => ({
      nombre: key,
      valor: coin[key],
    }));

    this.setState({ visibilidad: true, coinData });
  };

  Cerrar = () => {
    this.setState({ visibilidad: false, coinData: [] });
  };

  render() {
    const { coin } = this.props;
    const { coinData } = this.state;
    const filtrado = this.eliminarParametro(coin.symbol);
    const priceChange = this.eliminarSimboloNegativo(coin.priceChange);

    return (
      <View>

        <View style={styles.containerItem}>
          <View style={styles.coinName}>
            <TouchableOpacity style={styles.containerNames} onPress={() => this.Abrir(coin)}>
              <Text style={styles.coinName}>{filtrado}</Text>
              <Text style={styles.textSymbol}>{coin.symbol}</Text>
            </TouchableOpacity>

          </View>
          <View>
            <Text style={styles.textPrice}>${priceChange}</Text>
            <Text
              style={[
                styles.pricePercentage,
                coin.priceChangePercent > 0
                  ? styles.priceUp
                  : styles.priceDown,
              ]}
            >
              {coin.priceChangePercent}%
            </Text>
          </View>
        </View>

        <Modal visible={this.state.visibilidad} animationType="slide" >
          <View style={styles.ContenedorModal}>
            <TouchableOpacity style={styles.volver} onPress={this.Cerrar}>
              <Text style={styles.textoVolver}>Volver</Text>
            </TouchableOpacity>
            <ScrollView >
              {coinData.map((coins, index) => (
                <View style={styles.modalRow} key={index}>
                  <Text style={styles.Nombres}>{coins.nombre}</Text>
                  <Text style={styles.valores}>{coins.valor}</Text>
                </View>
              ))}
            </ScrollView>

          </View>
          <Grafica symbol={filtrado}/>
        </Modal>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "#121212",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: "row",
    color: 'white',
  },
  text: {
    color: "#fff",
  },
  textPrice: {
    color: "#fff",
    fontWeight: "bold",
  },
  pricePercentage: {
    textAlign: "right",
  },
  priceUp: {
    color: "#00B589",
  },
  priceDown: {
    color: "#fc4422",
  },
  image: {
    width: 30,
    height: 30,
  },
  textSymbol: {
    color: "#434343",
    textTransform: "uppercase",
  },
  ContenedorModal: {
    flex: 1,
    backgroundColor: "#141414",
    padding: 20,
  },
  volver: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,

  },
  textoVolver: {
    color: "white",
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: 'white',
    padding: 8,
  },
  Nombres: {
    fontSize: 16,
    fontWeight: "bold",
    color: 'white',
  },
  valores: {
    fontSize: 16,
    color: 'white',
  },

});