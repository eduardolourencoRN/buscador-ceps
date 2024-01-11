import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

function DetailsScreen(props) {
  const {cidade, bairro, estado, rua} = props
  return (
    <View style={styles.containerDetails}>
          <Text style={styles.text}>cidade: <Text style={styles.texttwo}>{cidade}</Text> </Text>
          <Text style={styles.text}>Bairro: <Text style={styles.texttwo}>{bairro}</Text> </Text>
          <Text style={styles.text}>Estado: <Text style={styles.texttwo}>{estado}</Text> </Text>
          <Text style={styles.text}>Cidade: <Text style={styles.texttwo}>{rua}</Text> </Text>
        </View>
  );
}


const styles = StyleSheet.create({
  containerDetails: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    gap: 30,
    borderRadius: 20,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
  },
  texttwo:
  {
    color: '#008000',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
  }
});


export default DetailsScreen;
