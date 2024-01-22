import { StyleSheet } from "react-native";
import { HEIGHT, WIDTH } from "../../common/constant";

export const homeStyles =
    StyleSheet.create({
        commentText: {
            fontSize: 14,
            lineHeight: 20
        },
        container: {
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            padding: 16,
        },
        section: {
            width: '100%',
        },
        darkContainer: {
            flex: 1,
            justifyContent: 'center',
            padding: 16,
            backgroundColor: '#000',
        },
        header: {
            backgroundColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0,
        },
        appbarText: {
            fontWeight: 'bold',
            fontSize: 20,
        },
        titleContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        seeAllText: {
            flexDirection: 'row',
            color: '#FE2083',
            fontSize: 16,
            fontWeight: '600'
        },
        cardCustom: {
            marginRight: 10,
            width: 150,
            borderRadius: 10,
            backgroundColor: '#2E1F3E',
        },
        cardCustomPost: {
            marginRight: 10,
            width: WIDTH / 1.1,
            borderRadius: 10,
            backgroundColor: '#2E1F3E',
        },
        cardContent: {
            padding: 5
        },
        image: {
            width: '100%',
            height: '90%',
            resizeMode: 'cover',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            flex: 1,
            top: 0
        },
        backgroundImage: {
            flex: 1,
            width: '100%',
            height: '100%',
        },
        paper: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: HEIGHT / 18,
        },
        centeredText: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: '100%',
            textAlign: 'center',
            paddingBottom: 10,
            paddingTop: 10,
            fontSize: 18
        },
        nameCategory: {
            width: '100%',
            borderTopColor: '#0000004D',
            borderTopWidth: 10,
            borderBottomColor: '#0000004D',
            borderBottomWidth: 10,
        }
    });