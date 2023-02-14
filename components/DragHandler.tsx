import { Pressable, StyleSheet, View } from 'react-native';

interface DragHandlerProps {
    onPress: () => void
}

const DragHandler = (props: DragHandlerProps) => {
    return (
        <Pressable style={styles.handleContainer} onPress={props.onPress}>
            <View style={styles.handle} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    handleContainer: {
        paddingVertical: 14,
        width: "100%",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    handle: {
        backgroundColor: '#D6D6D6',
        width: 36,
        height: 5,
        borderRadius: 4
    }
});



export default DragHandler;