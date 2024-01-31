import { StyleSheet } from "react-native";

export const createBlogStyles =
    StyleSheet.create({
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
        row: {
            flexDirection: 'row'
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
        header: {
            justifyContent: 'space-between',
            marginBottom: 24
        },
        input: {
            marginBottom: 5,
            backgroundColor: '#FFF',
        },
        textArea: {
            marginBottom: 5,
            backgroundColor: '#FFF',
            height: 80
        },
        label: {
            color: '#FFF'
        },
        inlineContainer: {
            alignItems: 'flex-start',
            marginLeft: -18
        },
        bottomButtonContainer: {
            alignSelf: 'center',
            backgroundColor: '#FE2083',
            bottom: 20
        },
        btnUploadImage: {
            alignItems: 'flex-start',
            alignSelf: 'center',
            backgroundColor: '#FE2083',
            marginBottom: 20
        },
    });