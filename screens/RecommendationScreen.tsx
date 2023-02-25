import { Image, StyleSheet } from 'react-native';
import ScreenView from '../components/ScreenView';
import { StackScreenProps } from '../navigation/Navigation';
import { ActivityIndicator, Button, Card, FAB, List, Snackbar, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation, useQueryClient } from 'react-query'
import { get_dishes, get_sports } from '../utils/ApiFunctions';
import { View } from '../components/Themed';
import { useEffect, useState } from 'react';
import { AirbnbRating } from 'react-native-ratings';
import { DishProps } from '../utils/ApiInterface';


const RecommendationScreen = ({ route, navigation }: StackScreenProps<'Recommendation'>) => {
    const { age, weight, height } = route.params
    const insets = useSafeAreaInsets();
    const queryClient = useQueryClient()
    const [dishes, setDishes] = useState<[DishProps]>()
    const [sports, setSports] = useState<[string]>()
    const [visible, setVisible] = useState(false)
    const [regen, setRegen] = useState(true)

    const getDishMutation = useMutation(get_dishes, {
        onMutate: async (requestInfo) => {
            await queryClient.cancelQueries("get_dish")
            const previousRequestInfo = queryClient.getQueryData("get_dish")
            queryClient.setQueryData("get_dish", requestInfo)
            return { previousRequestInfo }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_dish")
            setDishes(data)
        }
    })

    const getSportMutation = useMutation(get_sports, {
        onMutate: async (requestInfo) => {
            await queryClient.cancelQueries("get_sports")
            const previousRequestInfo = queryClient.getQueryData("get_sports")
            queryClient.setQueryData("get_sports", requestInfo)
            return { previousRequestInfo }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_sports")
            setSports(data)
        }
    })


    useEffect(() => {
        if(regen){
            setRegen(false);
            setDishes(undefined)
            setSports(undefined)
            getDishMutation.mutate({ height: height, weight: weight, age: age })
            getSportMutation.mutate({ height: height, weight: weight, age: age })
        }
    }, [regen])

    return (
        <ScreenView name='Recommendation' style={{ ...styles.container, paddingBottom: insets.bottom, paddingTop: insets.top }}>
            {
                sports != undefined && sports.length > 0 && dishes != undefined && dishes.length > 0 ? (
                    <>
                        <Snackbar
                            visible={visible}
                            onDismiss={()=>{setVisible(false)}}
                        >
                            Thank you for the feedback!
                        </Snackbar>
                        <List.Section style={styles.listStyle}>
                            <List.Subheader>Today's meal plan</List.Subheader>
                            {
                                dishes.map((dish, i) => (
                                    <List.Item
                                        titleNumberOfLines={2}
                                        key={i}
                                        title={dish.name}
                                        onPress={() => navigation.navigate("Detail", { dish: dish })}
                                        left={() => <List.Image source={{ uri: dish.image_url }} />}
                                    />
                                ))
                            }
                        </List.Section>

                        <List.Section style={styles.listStyle}>
                            <List.Subheader>Today's fitness plan</List.Subheader>
                            {
                                sports.map((s, i) => (
                                    <List.Item key={i} title={s} />
                                ))
                            }
                        </List.Section>
                        <View style={{alignItems: "center", marginTop: "10%"}}>
                            <Button mode='contained' style={{marginBottom: 50}} onPress={()=>{setRegen(true)}}>Regenerate</Button>
                            <Text variant="titleLarge">How is this plan?</Text>
                            <AirbnbRating 
                                showRating={false} 
                                isDisabled={false} 
                                size={30} 
                                starContainerStyle={{justifyContent: "space-between", width : "50%"}}
                                onFinishRating={()=>setVisible(true)}
                            />
                        </View>
                    </>
                ) : (
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center", top: "-10%"}}>
                        <Image source={require('../assets/images/loading.gif')} />
                        <Text>Getting recommended data from our server ....</Text>
                    </View>
                )
            }
        </ScreenView>
    );
}

export default RecommendationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    listStyle: {
        marginTop: -20,
        marginHorizontal: 10,
    },
    inputView: {
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