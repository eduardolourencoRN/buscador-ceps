import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
    color: '#FFF',
    fontSize: 16,
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
  textInfo: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
export default styles;
