import { StyleSheet } from "react-native";
import { HEIGHT, WIDTH } from "../../../common/constant";

export const favoriteCategoryStyles =
    StyleSheet.create({

        section: {
            width: '100%',
        },
        header: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
        },
        titleContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        appbarText: {
            fontWeight: 'bold',
            fontSize: 20,
            color: '#FFFFFF',
            fontFamily: 'PlusJakartaSans-Regular'
        },
        seeAllText: {
            flexDirection: 'row',
            color: '#FE2083',
            fontSize: 16,
            fontWeight: '600',
            fontFamily: 'PlusJakartaSans-Regular'
        },
        cardCustom: {
            marginTop: 12,
            marginBottom: 12,
            borderRadius: 10,
            backgroundColor: '#2E1F3E',
            height: HEIGHT / 5,
            width: (WIDTH / 2) - 30,
            margin: 8
        },
        backgroundImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            overflow: 'hidden',
        },
        nameCategory: {
            width: '100%',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        },
        paper: {
            width: '100%',
            borderTopColor: '#0000004D',
            borderTopWidth: 10,
            borderBottomColor: '#0000004D',
            borderBottomWidth: 10,
        },
        centeredText: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '100%',
            textAlign: 'center',
            paddingBottom: 10,
            paddingTop: 10,
            fontSize: 18,
            color: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
        },
        bookMarkSelected: {
            position: 'absolute',
            top: 0,
            right: 0,
            padding: 10,
            backgroundColor: '#FE2083',
            borderRadius: 20,
            margin: 5,
        },
        bookMarkDisabled: {
            position: 'absolute',
            top: 0,
            right: 0,
            padding: 10,
            backgroundColor: '#000000',
            borderRadius: 20,
            margin: 5,
        },
        iconheader: {
            backgroundColor: '#666565',
            width: 36,
            height: 36,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });