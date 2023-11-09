import { Platform } from 'react-native';
import React, { Component } from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';


export default class Grafica extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      fechas: [],
    };
  }


  componentDidMount() {
    const { symbol } = this.props;
    this.obtenerDatosHistoricos(symbol);
  }


  obtenerDatosHistoricos = async (symbol) => {
    try {
      const response = await fetch(
        `https://api.binance.com/api/v1/klines?symbol=${symbol}USDT&interval=1d&limit=8`
      );


      if (!response.ok) {
        throw new Error(`La solicitud a la API falló con código de estado: ${response.status}`);
      }


      const data = await response.json();


      const prices = data.map((item) => parseFloat(item[4]));
      const dates = data.map((item) => new Date(item[0]));


      const formattedDates = dates.map((date) => {
        const options = { dia: 'numeric', mes: 'short' };
        return date.toLocaleString('default', options);
      });


      this.setState({ datos: prices, fechas: formattedDates });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    const screenWidth = Dimensions.get('window').width;
    const { datos, fechas } = this.state;
    if(Platform.OS === 'web') {
      return (
        <View>
          <LineChart
            data={{
              labels: fechas,
              datasets: [
                {
                  data: datos,  
                },
              ],
            }}
            width={screenWidth}
            height={220}
            yAxisLabel="$"
            chartConfig={{
              backgroundGradientFrom: '#141414',
              backgroundGradientTo: '#141414',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              decimalPlaces: 2,
            }}
          />
        </View>
      );
    }  
  }
}
