import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ScreenView from '../components/ScreenView';
import { StackScreenProps } from '../navigation/Navigation';
import { FAB, Snackbar, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from '../components/Themed';
import { Height } from '../utils/ApiInterface';



const HeightScreen = ({route, navigation }: StackScreenProps<'Height'>) => {
    const {age} = route.params
    const [height, setHeight] = useState<Height>({inches: NaN, feet: NaN})
    const [visible, setVisible] = useState(false)

    const insets = useSafeAreaInsets();
    return (
        <ScreenView name='height' style={{...styles.container, paddingBottom: insets.bottom, paddingTop: insets.top}}>
            <FAB
                icon="arrow-right-bold"
                style={styles.fab}
                onPress={() => height.feet && height.inches ? navigation.navigate("Weight", {age: age, height: height}) : setVisible(true)}
            />

            <Snackbar
                visible={visible}
                onDismiss={()=>{setVisible(false)}}
            >
                Please enter your height
            </Snackbar>
            <Text
                variant="displayMedium" 
                style={styles.title}
            >
                Fitness Map
            </Text>

            <Text variant="headlineSmall" style={styles.header}>
                Tell us your height
            </Text>
            <View style={styles.inputView}>
                <TextInput
                    theme={{ roundness: 30 }} 
                    keyboardType='numeric'
                    textAlign={'center'}
                    placeholder="ft"
                    maxLength={1}
                    mode="outlined"
                    multiline={true}
                    numberOfLines={1}
                    style={styles.textInput}
                    onChangeText={(v)=>setHeight({feet: parseInt(v), inches: height.inches})}
                />
                <Text variant="displayMedium" >'</Text>
                <TextInput
                    theme={{ roundness: 30 }} 
                    keyboardType='numeric'
                    textAlign={'center'}
                    placeholder="in"
                    maxLength={2}
                    mode="outlined"
                    multiline={true}
                    numberOfLines={1}
                    style={styles.textInput}
                    onChangeText={(v)=>setHeight({inches: parseInt(v), feet: height.feet})}
                />
                <Text variant="displayMedium" >''</Text>
            </View>
        </ScreenView>
    );
}

export default HeightScreen





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
    },
    textInput: {
        width: 100,
        fontSize: 48,
        textAlign: "center",
        height: 100,
        marginRight: -30
    }
});