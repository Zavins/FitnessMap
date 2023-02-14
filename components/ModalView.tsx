import { useEffect, useRef } from "react"
import { Animated, BackHandler, StyleSheet, View as DefaultView } from "react-native"
import { Appbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useModalDisplay from "../hooks/useModalDisplay";
import useWindowLayout from "../hooks/useWindowLayout";
import { AnimatedView } from "./Themed";

type ModalViewProps = DefaultView['props'] & {
    height: number
    onBackAction: () => void
}



const ModalView = (props: ModalViewProps) => {

    let { style, height, onBackAction, ...otherProps } = props
    const setDisplay = useModalDisplay((state) => state.setDisplay)
    const layout = useWindowLayout((state) => state.layout)
    const insets = useSafeAreaInsets();
    const modalTop = useRef(new Animated.Value(layout.height)).current;

    useEffect(() => {
        Animated.timing(modalTop, {
            toValue: layout.height - insets.bottom - 400,
            duration: 400,
            useNativeDriver: false
        }).start();
        setDisplay(true)
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => { onBackAction(); return true })
        return () => {
            backHandler.remove()
            setDisplay(false)
        }
    }, [layout])

    return (
        <DefaultView style={styles.container}>
            <Appbar.BackAction style={{ ...styles.backAction, top: insets.top }} onPress={onBackAction} />
            <AnimatedView style={[{ ...styles.modal, top: modalTop, paddingBottom: insets.bottom }, style]}{...otherProps} />
        </DefaultView>
    )
}

export default ModalView

const styles = StyleSheet.create({
    container: {
        width: "100%",
        position: "absolute",
        height: "100%"
    },
    backAction: {
        position: "absolute",
        left: 0,
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: "hidden",
        position: "absolute",
        bottom: -2,
        width: "100%",
        borderWidth: 1,
        borderColor: "#d6d6d6",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
})