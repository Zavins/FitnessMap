import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import Colors from "../constants/Colors";
import useColorScheme from "./useColorScheme";

const useDefaultTheme = () => {
    const colorScheme = useColorScheme();
    const Theme = colorScheme === "light" ? MD3LightTheme : MD3DarkTheme
    return {
        ...Theme,
        colors: {
            ...Theme.colors,
            onPrimary: Colors[colorScheme].text,
            elevation: colorScheme === "light" ? {
                level0: "rgb(253, 252, 255)",
                level1: "rgb(253, 252, 255)",
                level2: "rgb(253, 252, 255)",
                level3: "rgb(253, 252, 255)",
                level4: "rgb(253, 252, 255)",
                level5: "rgb(253, 252, 255)",
            } : Theme.colors.elevation,
        }
    }
}

export default useDefaultTheme