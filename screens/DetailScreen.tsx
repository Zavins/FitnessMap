import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ScreenView from '../components/ScreenView';
import { StackScreenProps } from '../navigation/Navigation';
import { Card, Divider, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const DetailScreen = ({route, navigation }: StackScreenProps<'Detail'>) => {
    const {dish} = route.params
    const insets = useSafeAreaInsets();
    return (
        <ScreenView name='detail' style={{...styles.container, paddingBottom: insets.bottom, paddingTop: insets.top}}>
            <Card style={styles.card}>
                <Card.Title title={dish.name} titleStyle={styles.cardTitle}/>
                <Card.Cover source={{uri: dish.image_url}}/>
                <Card.Content style={styles.cardContent}>
                    <ScrollView style={styles.scrollView}>
                        <Text variant="titleMedium" >Total Calories: {dish.calories}</Text>
                        <Divider/>
                        <Text variant="titleMedium" >Ingredients:</Text>
                        <Text>{dish.ingredient}</Text>
                        <Divider/>
                        <Text variant="titleMedium" >Instructions:</Text>
                        <Text>{dish.instruction}</Text>
                    </ScrollView>
                </Card.Content>
            </Card>
        </ScreenView>
    );
}

export default DetailScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        overflow: "scroll"
    },
    card: {
        marginHorizontal: "10%",
        height: "95%"
    },
    cardTitle:{
        alignSelf: "center"
    },
    cardContent:{
        height: "60%"
    },
    scrollView:{

    }
});