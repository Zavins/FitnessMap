import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ScreenView from '../components/ScreenView';
import { StackScreenProps } from '../navigation/Navigation';
import { FAB, Snackbar, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const AgeScreen = ({ navigation }: StackScreenProps<'Age'>) => {
    const [age, setAge] = useState(0)
    const insets = useSafeAreaInsets();
    const [visible, setVisible] = useState(false)

    return (
        <ScreenView name='age' style={{...styles.container, paddingBottom: insets.bottom, paddingTop: insets.top}}>
            <FAB
                icon="arrow-right-bold"
                style={styles.fab}
                onPress={() => age ? navigation.navigate("Height", {age: age}) : setVisible(true)}
            />
            <Snackbar
                visible={visible}
                onDismiss={()=>{setVisible(false)}}
            >
                Please enter your age
            </Snackbar>
            <Text
                variant="displayMedium" 
                style={styles.title}
            >
                Fitness Map
            </Text>
            <Text variant="headlineSmall" style={styles.header}>
                how old are you?
            </Text>
            <TextInput
                theme={{ roundness: 40 }} 
                onChangeText={(v)=>{setAge(parseInt(v))}}
                keyboardType='numeric'
                textAlign={'center'}
                placeholder="age"
                maxLength={2}
                mode="outlined"
                multiline={true}
                numberOfLines={0}
                style={styles.textInput}
            />
            
        </ScreenView>
    );
}

export default AgeScreen





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
    textInput: {
        width: "80%",
        marginHorizontal: "10%",
        fontSize: 48,
        textAlign: "center",
        height: 100
    }
});