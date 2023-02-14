import { useEffect, useState } from "react"
import { DeviceEventEmitter, Keyboard, StyleSheet, TouchableOpacity, View as NativeView } from "react-native"
import { Searchbar } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import useModalDisplay from "../hooks/useModalDisplay"
import { View, Text, Icon } from "./Themed"


interface SearchBarProps {
    icon: {
        icon: any
        name: string
    }
    resultTextList: string[],
    maxResultDisplay?: number
    onChange?: (query: string) => void,
    onSelect?: (index: number) => void
}

const SearchBar = (props: SearchBarProps) => {
    let { icon, resultTextList, maxResultDisplay, onChange, onSelect } = props
    const [query, setQuery] = useState("")
    const [focused, setFocused] = useState(false)
    const display = useModalDisplay((state) => state.display)
    const insets = useSafeAreaInsets();


    useEffect(() => {
        const touchScreenListener = DeviceEventEmitter.addListener("touchScreen", (name) => { Keyboard.dismiss() })
        return () => {
            touchScreenListener.remove()
        }
    }, [])

    if (display && query.length > 0) {
        setQuery("")
    }

    return (
        //If modal is up, hide the search bar
        <NativeView style={{ ...styles.container, top: insets.top + 12, display: display ? "none" : "flex" }}>
            <Searchbar
                style={styles.searchBar}
                inputStyle={{ fontSize: 16 }}
                placeholder="Search"
                placeholderTextColor="#8d8d8d"
                value={query}
                onFocus={() => setFocused(true)}
                onChangeText={(query) => { setQuery(query), onChange && onChange(query) }}
            />
            {/* Show autocomplete results */
                focused && query.length > 0 && resultTextList.length > 0 && <View style={styles.resultContainer}>
                    {
                        resultTextList.slice(0, maxResultDisplay || resultTextList.length).map((v, i) => (
                            <ResultItem key={i} icon={icon} resultText={v} onPress={() => onSelect && onSelect(i)} />
                        ))
                    }
                </View>
            }
        </NativeView>
    )
}

export default SearchBar

interface ResultProps {
    icon: {
        icon: any
        name: string
    }
    resultText: string
    onPress?: () => void
}

const ResultItem = (props: ResultProps) => {
    let { icon, resultText, onPress } = props
    return (
        <TouchableOpacity style={styles.resultItem} onPress={() => onPress && onPress()}>
            <Icon Icon={icon.icon} name={icon.name} size={20} />
            <Text style={styles.resultText} numberOfLines={2}>{resultText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        position: "absolute",
        overflow: "hidden",
        paddingBottom: 4,
        zIndex: 1,
    },
    searchBar: {
        height: 40,
        width: "100%",
        borderRadius: 30,
    },
    resultContainer: {
        top: -20,
        paddingTop: 20,
        width: "100%",
        paddingHorizontal: 12,
        paddingBottom: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        zIndex: -1,
    },
    resultItem: {
        paddingVertical: 10,
        flexDirection: "row"
    },
    resultText: {
        marginLeft: 10
    }
})