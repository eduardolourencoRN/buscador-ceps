import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function DetailsSearch(props) {
  const {cidade, bairro, estado, rua} = props
  return (
    <View style={styles.containerDetails}>
       <Text style={styles.text}>Rua: <Text style={styles.texttwo}>{rua}</Text> </Text>
          <Text style={styles.text}>Cidade: <Text style={styles.texttwo}>{cidade}</Text> </Text>
          <Text style={styles.text}>Bairro: <Text style={styles.texttwo}>{bairro}</Text> </Text>
          <Text style={styles.text}>Estado: <Text style={styles.texttwo}>{estado}</Text> </Text>
         
        </View>
  );
}


const styles = StyleSheet.create({
  containerDetails: {
    width: '90%',
    height:'20%',
    backgroundColor: '#fff',
    justifyContent:'center',
    gap: 30,
    flexWrap:'wrap',
    borderRadius: 20,
    marginLeft: 15,
    flexDirection:'row'
  },
  text: {
    color: '#000',
    marginTop:6,
    fontSize: 16,
    fontWeight: '800',
    textAlign:'left'
  },
  texttwo:
  {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine:'underline'
  }
});


export default DetailsSearch;
