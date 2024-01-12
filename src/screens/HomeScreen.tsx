import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {fetchUserData} from '../api/api';
import DetailsScreen from './details';
import {StackNavigationProp} from '@react-navigation/stack';
import Header from './components/header';

type RootStackParamList = {
  Home: undefined;
  Details: {itemId: number};
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Props = {
  navigation: HomeScreenNavigationProp;
};
type ResultadoType = {
  city: string;
  neighborhood: string;
  state: string;
  street: string;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [erroempty, setErroEmpty] = useState<string | undefined>();
  const [resultado, setResultado] = useState<ResultadoType | null>(null);
  const [erro, setErro] = useState('');

  const handleSearch = () => {
    setLoading(true);
    setErro('');
    setResultado(null);

    if (!/^\d{5}-?\d{3}$/.test(cep)) {
      setErro('Formato de CEP inválido. Use XXXXX-XXX.');
      setLoading(false);
      return;
    }

    fetchUserData(cep)
      .then(userData => {
        setResultado(userData);
        setTimeout(() => {
          setLoading(false);
        }, 2000);

        Keyboard.dismiss();
      })
      .catch(error => {
        console.log(error.response.status);

        if (error.response?.status === 404) {
          setErroEmpty('Insira um CEP válido');
        }
        if (error.response?.status === 400) {
          setErro('Insira um CEP válido');
        }
        setLoading(false);
        console.error('Error:', error);
      });
  };

  const handleInputChange = (text: string) => {
    setCep(text.replace(/\D/g, '').replace(/^(\d{5})(\d{0,3})/, '$1-$2'));
    setErro('');
    setErroEmpty('');
  };

  const isSearchDisabled = !cep || loading;

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={0}>
      <View style={styles.container}>
        <Header />
        <TextInput
          style={styles.containerInput}
          onChangeText={handleInputChange}
          keyboardType="numeric"
          value={cep}
          placeholder="Digite o CEP"
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          maxLength={9}
          textAlign="center"
        />
        <TouchableOpacity
          disabled={isSearchDisabled}
          onPress={handleSearch}
          style={styles.button}>
          <Text style={styles.textInfo}>
            Pesquisar
          </Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.textInfo}>{erroempty ? erroempty : ''}</Text>
          {erro ? <Text style={styles.text}>{erro}</Text> : null}
          {loading ? (
            <ActivityIndicator />
          ) : resultado !== null && typeof resultado === 'object' ? (
            <DetailsScreen
              cidade={resultado.city}
              bairro={resultado.neighborhood}
              estado={resultado.state}
              rua={resultado.street}
            />
          ) : null}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerDetails: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
    gap: 30,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerInput: {
    width: '90%',
    marginLeft: 10,
    height: '8%',
    marginTop: 30,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#00BFFF',
    fontSize: 20,
  },
  text: {
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    width: '90%',
    marginLeft: 10,
    height: '8%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BFFF',
    borderColor: '#00BFFF',
    borderRadius: 20,
    borderWidth: 1,
  },
  textInfo:{
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  }
});

export default HomeScreen;
