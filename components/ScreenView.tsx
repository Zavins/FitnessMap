import { DeviceEventEmitter, Keyboard, StyleSheet, View as DefaultView } from "react-native";
import { View } from "./Themed";

type ScreenViewProps = { name: string } & DefaultView['props']

const ScreenView = (props: ScreenViewProps) => {
    let { name, style, ...otherProps } = props
    return (
        <View
            style={[{ ...styles.screen }, style]}
            onTouchStart={() => {DeviceEventEmitter.emit("touchScreen", name); Keyboard.dismiss()}}
            {...otherProps}
        />
    )
}

export default ScreenView

const styles = StyleSheet.create({
    screen: {},
})