import { StyleSheet } from "react-native";

export const trackListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191414',
    },
    musicTitle: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '500',
        marginTop: 12,
        marginHorizontal: 20,
        marginBottom: 1,
    },
    artisteTitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.8,
        marginHorizontal: 20,
        marginBottom: 12,
        marginTop: 1,
    },
    widgetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 0,
        height: 60,
        width: '100%',
        backgroundColor: '#5E5A5A',
    },
    widgetMusicTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
        marginTop: 12,
        marginHorizontal: 10,
        marginBottom: 1,
    },
    widgetArtisteTitle: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.8,
        marginHorizontal: 10,
        marginBottom: 12,
        marginTop: 1,
    },
    widgetImageStyle: {
        width: 55,
        height: 60,
        marginTop: 3,
    },
    linearGradient: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shuffleButton: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    shuffleButtonContainer: {
        paddingVertical: 15,
        paddingHorizontal: 35,
        borderRadius: 40,
        alignSelf: 'center',
        backgroundColor: '#FE2083',
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row'
    },
    leftPlay: {
        // backgroundColor: '#FE2083',
        width: 60,
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    polligon11: {
        backgroundColor: '#FFFFFF',
        width: 40,
        height: 40,
        borderRadius: 20,
        opacity: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    polligon10: {
        backgroundColor: '#FFFFFF',
        width: 25,
        height: 25,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#FFF'
    },
    feedback: {
        fontSize: 10,
        marginLeft: 3
    },
});