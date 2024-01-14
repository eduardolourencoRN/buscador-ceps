import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import {fetchUserData} from '../api/api';
import DetailsScreen from './details';
import Header from './components/header';
import styles from '../styles/style';
import {Props, ResultType} from '../utils/types';

const HomeScreen: React.FC<Props> = () => {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [erroEmpty, setErroEmpty] = useState<string | undefined>();
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (cep.trim() === '') {
      setErroEmpty('Por favor, digite um CEP válido.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    if (!/^\d{5}-?\d{3}$/.test(cep)) {
      setError('Formato de CEP inválido. Use XXXXX-XXX.');
      setLoading(false);
      return;
    }

    try {
      const userData = await fetchUserData(cep);
      setResult(userData);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      Keyboard.dismiss();
      console.log(userData);
    } catch (error) {
      console.log(erroEmpty);
    }
  };

  const handleInputChange = (text: string) => {
    setCep(text.replace(/\D/g, '').replace(/^(\d{5})(\d{0,3})/, '$1-$2'));
    setError('');
    setErroEmpty('');
  };

  const isSearchDisabled = !cep || loading;

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
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
            onPress={handleSearch}
            style={styles.button}
            disabled={isSearchDisabled}>
            <Text style={styles.text}>Pesquisar</Text>
          </TouchableOpacity>
          <Text style={styles.textInfo}>{erroEmpty}</Text>
          <View>
            {error ? <Text style={styles.textInfo}>{error}</Text> : null}
            {loading ? (
              <ActivityIndicator />
            ) : result !== null && typeof result === 'object' ? (
              <DetailsScreen
                city={result.city}
                neighborhood={result.neighborhood}
                state={result.state}
                street={result.street}
              />
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
