import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AgeScreen from "../screens/AgeScreen";
import DetailScreen from "../screens/DetailScreen";
import HeightScreen from "../screens/HeightScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import RecommendationScreen from "../screens/RecommendationScreen";
import WeightScreen from "../screens/WeightScreen";
import { DishProps, Height } from "../utils/ApiInterface";
export type RootStackParamList = {
    Age: undefined;
    Height: {age:number};
    Weight: {age: number, height: Height};
    Recommendation: {age: number, height: Height, weight:number};
    Detail: {dish: DishProps};
    NotFound: undefined;
};
/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Age" component={AgeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Height" component={HeightScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
            <Stack.Screen name="Weight" component={WeightScreen} options={{ headerShown: false, animation: 'slide_from_right'}} />
            <Stack.Screen name="Recommendation" component={RecommendationScreen} options={{ animation: 'flip'}} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ animation: 'flip'}} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    );
}

export default StackNavigator
