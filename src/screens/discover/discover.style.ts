import { StyleSheet } from "react-native";
import { HEIGHT } from "../../common/constant";

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
        marginTop: 40
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
        marginVertical: 26,
        marginTop: -10
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
        fontSize: 10,
        marginLeft: 3
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
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: '#FFF',
    },
    containerItem: {
        backgroundColor: '#2B233E',
        borderRadius: 20,
        marginBottom: 26,
        padding: 16
    },
    date: {
        color: '#FFFFFF',
        fontSize: 12,
        textAlign: 'right',
        paddingHorizontal: 8,
        paddingBottom: 2
        ,
    },
    categoryName: {
        backgroundColor: '#1B1627',
        borderRadius: 20,
        justifyContent: 'center',
        paddingHorizontal: 8
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
    leftPlay: {
        // backgroundColor: '#FE2083',
        width: 60,
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuContainer: {
        alignContent: 'flex-end',
        position: 'absolute',
        top: 90,
        right: 20,
        flex: 1
    },
    menuContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    menuBg: {
        backgroundColor: '#2B233E',
        borderRadius: 16,
        paddingVertical: 16
    },
    poster: {
        width: '100%',
        height: HEIGHT / 4,
        marginTop: 10,
        borderRadius: 12
    }
});