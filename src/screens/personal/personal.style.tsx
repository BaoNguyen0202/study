import { StyleSheet } from "react-native";
import { HEIGHT } from "../../common/constant";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -9999
    },
    textHeader: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    },
    containerContent: {
        flex: 1,
        marginHorizontal: 24,
        marginTop: 40
    },
    content: {
        paddingTop: 24,
        alignItems: 'center'
    },
    text: {
        color: '#FFF'
    },
    row: {
        flexDirection: 'row'
    },
    textGmail: {
        fontWeight: '400',
        fontSize: 14,
        marginLeft: 8,
    },
    button: {
        backgroundColor: '#FE2083',
        height: 48,
        borderRadius: 100,
        marginVertical: 10,
        justifyContent: 'center'
    },
    line: {
        height: 1,
        backgroundColor: '#3F345B',
        marginVertical: 8,
    },
    modalContent: {
        backgroundColor: '#1A1429',
        marginHorizontal: 24,
        padding: 24,
    },
    input: {
        marginVertical: 8
    },

});
