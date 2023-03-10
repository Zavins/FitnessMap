import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ScreenView from '../components/ScreenView';
import { StackScreenProps } from '../navigation/Navigation';
import { FAB, Snackbar, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from '../components/Themed';



const WeightScreen = ({route, navigation }: StackScreenProps<'Weight'>) => {
    const {age, height} = route.params
    const [weight, setWeight] = useState(NaN)
    const [visible, setVisible] = useState(false)
    const insets = useSafeAreaInsets();
    return (
        <ScreenView name='weight' style={{...styles.container, paddingBottom: insets.bottom, paddingTop: insets.top}}>
            <FAB
                icon="arrow-right-bold"
                style={styles.fab}
                onPress={() => weight ? navigation.navigate('Recommendation', {age: age, height: height, weight: weight}) : setVisible(true)}
            />
            <Snackbar
                visible={visible}
                onDismiss={()=>{setVisible(false)}}
            >
                Please enter your weight
            </Snackbar>
            <Text
                variant="displayMedium" 
                style={styles.title}
            >
                Fitness Map
            </Text>

            <Text variant="headlineSmall" style={styles.header}>
                How much do you weight
            </Text>
            <View style={styles.inputView}>
                <TextInput
                    theme={{ roundness: 40 }} 
                    textAlign={'center'}
                    keyboardType='numeric'
                    placeholder="weight"
                    maxLength={3}
                    mode="outlined"
                    multiline={true}
                    numberOfLines={1}
                    style={styles.textInput}
                    onChangeText={(v)=>{setWeight(parseInt(v))}}
                />
                <Text variant="displayMedium" style={styles.header}>
                    lb
                </Text>
            </View>
        </ScreenView>
    );
}

export default WeightScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    title: {
        marginVertical: "30%",
    },
    header: {
        marginVertical: "5%",
    },
    inputView:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginHorizontal: "10%",
        alignItems: "flex-end",
    },
    textInput: {
        width: "60%",
        fontSize: 48,
        textAlign: "center",
        height: 100,
        marginRight: -30
    }
});