import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Details: {itemId: number};
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type ResultType = {
  city: string;
  neighborhood: string;
  state: string;
  street: string;
};
export {HomeScreenNavigationProp, ResultType, Props};
