import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        justifyContent: 'space-between',
        marginBottom: 24
    },
    row: {
        flexDirection: 'row'
    },
    containerContent: {
        flex: 1,
        marginHorizontal: 24,
        marginTop: 51
    },
    textHeader: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    },
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -9999
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 26
    },
    button: {
        flex: 1,
        backgroundColor: '#2B233E',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 6
    },
    selectedButton: {
        backgroundColor: '#FE2083',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: 12
    },
    text: {
        color: '#FFF'
    },
    card: {
        shadowColor: '#919EAB',
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.3,
        shadowRadius: 24,
        elevation: 12,

        marginBottom: 26,
        backgroundColor: '#2B233E',
        borderRadius: 20,
    },
    spcabetwen: {
        justifyContent: 'space-between'
    },
    content: {
        marginVertical: 16
    },
    footer: {
        justifyContent: 'center'
    },
    feedback: {
        fontSize: 10
    },
    textContent: {
        fontSize: 14
    },
    favorite: {
        width: 32,
        height: 32,
        borderRadius: 50,
        backgroundColor: '#FE2083',
        justifyContent: 'center',
        alignItems: 'center'
    },
    favoriteDefault: {
        width: 32,
        height: 32,
        borderRadius: 50,
        backgroundColor: '#1B1627',
        justifyContent: 'center',
        alignItems: 'center'
    }

});