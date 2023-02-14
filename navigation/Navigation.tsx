import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import * as Linking from 'expo-linking';
import StackNavigator, { RootStackParamList } from './StackNavigator';

export type StackScreenProps<
    RouteName extends keyof (RootStackParamList)
> = NativeStackScreenProps<RootStackParamList, RouteName>

const Navigation = () => {
    const colorScheme = useColorScheme();
    return (
        <NavigationContainer linking={linking} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <StackNavigator />
        </NavigationContainer>
    );
}
export default Navigation

//The routes/links for each screen
const linking = {
    prefixes: [Linking.createURL('/')],
    Root: {
        screens: {
            Main: {
                screens: {
                    MainScreen: 'Main',
                    NewScreen: 'New',
                    WeightScreen: 'Weight',
                },
                
            }
        },
    },
    Modal: 'modal',
    NotFound: '*',
};




