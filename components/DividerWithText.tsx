import { ReactNode } from "react"
import { View } from "react-native"
import { Divider } from "react-native-paper"
import { Text } from "./Themed"

interface DividerWithTextProps {
    align: "left" | "center" | "right"
    text: string | ReactNode
}

const flexGrowValue = {
    "left": [1, 20],
    "center": [1, 1],
    "right": [20, 1]
}

const DividerWithText = (props: DividerWithTextProps) => {
    let { align, text } = props

    return (
        <View style={{ flexDirection: "row", width: "100%", flexBasis: "auto", marginBottom: -15 }}>
            <Divider style={{ flexGrow: flexGrowValue[align][0] }} />
            <Text style={{ paddingHorizontal: 4, fontSize: 12, top: -12, lineHeight: 20 }}>{text}</Text >
            <Divider style={{ flexGrow: flexGrowValue[align][1] }} />
        </View>
    )
}

export default DividerWithText 