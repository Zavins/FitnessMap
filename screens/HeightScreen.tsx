import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import ScreenView from '../components/ScreenView';
import { StackScreenProps } from '../navigation/Navigation';
import { FAB, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from '../components/Themed';



const HeightScreen = ({ navigation }: StackScreenProps<'Height'>) => {
    const insets = useSafeAreaInsets();
    return (
        <ScreenView name='height' style={{...styles.container, paddingBottom: insets.bottom, paddingTop: insets.top}}>
            <FAB
                icon="arrow-right-bold"
                style={styles.fab}
                onPress={() => navigation.navigate("Weight")}
            />
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
                    textAlign={'center'}
                    placeholder="ft"
                    maxLength={1}
                    mode="outlined"
                    multiline={true}
                    numberOfLines={1}
                    style={styles.textInput}
                />
                <Text variant="displayMedium" >'</Text>
                <TextInput
                    theme={{ roundness: 30 }} 
                    textAlign={'center'}
                    placeholder="in"
                    maxLength={2}
                    mode="outlined"
                    multiline={true}
                    numberOfLines={1}
                    style={styles.textInput}
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