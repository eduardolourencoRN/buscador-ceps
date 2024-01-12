import React from 'react';
import { View, Text,StyleSheet } from 'react-native';

function Header() {
  
    return (
      <View style={styles.header}>
        <Text style={styles.TextHeader}>Informações do CEP</Text>
      </View>
    );
  }

  const styles = StyleSheet.create({
    header:
    {
        width:'100%',
        height:'8%',
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextHeader:
    {
        fontSize:29,
        fontFamily:'Mono',
        color:'#FFF',
        fontWeight:'700'
    }
  })

export default Header;