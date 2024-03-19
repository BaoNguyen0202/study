import { StyleSheet } from "react-native";

const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerContent: {
        flex: 1,
        marginHorizontal: 24,
    },
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -9999
    },
    titleCont: {
        fontSize: 30,
        fontWeight: '700',
        color: '#FFFFFF',
        fontFamily: 'Plus Jakarta Sans'
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#FFF',
    },
    bottomButtonContainer: {
        alignSelf: 'center',
        backgroundColor: '#FE2083',
        marginTop: 40
    },
    modalContent: {
        backgroundColor: '#1A1429',
        marginHorizontal: 24,
        padding: 24,
        borderRadius: 16,
    },
    dropdown: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
})

export default registerStyles;