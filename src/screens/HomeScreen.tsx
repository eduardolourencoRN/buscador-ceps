import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  PixelRatio,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {fetchUserData} from './api/api';
import DetailsScreen from './details';
import {StackNavigationProp} from '@react-navigation/stack';

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

export const responsiveSize = (size: number) => {
  const {width, height} = Dimensions.get('window');

  const baseWidth = 375;
  const baseHeight = 812;
  const basePixelRatio = 2;

  const responsiveWidth = (size * width) / baseWidth;
  const responsiveHeight = (size * height) / baseHeight;
  const responsiveSize =
    (responsiveWidth + responsiveHeight) / 2 / basePixelRatio;

  return responsiveSize;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [erroempty, setErroEmpty] = useState<string | undefined>();
  const [resultado, setResultado] = useState<ResultadoType | null>(null);
  const [erro, setErro] = useState('');
  const [lastSearchedCep, setLastSearchedCep] = useState('');

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
          <Text style={{color: '#fff'}}>Pesquisar</Text>
        </TouchableOpacity>
        <View>
          <Text style={{textAlign: 'center', color: 'red', fontSize: 16}}>
            {erroempty ? erroempty : ''}
          </Text>
          {erro ? (
            <Text style={{textAlign: 'center', color: 'red', fontSize: 16}}>
              {erro}
            </Text>
          ) : null}
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
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
  },
  button: {
    width: '90%',
    marginLeft: 10,
    height: '8%',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 20,
    borderWidth: 1,
  },
});

export default HomeScreen;
