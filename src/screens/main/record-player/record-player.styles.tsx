import { StyleSheet } from "react-native";
import { HEIGHT, WIDTH } from "../../../common/constant";

export const recordPlayerStyles =
    StyleSheet.create({
        contanier: {
            height: HEIGHT,
            width: WIDTH,
            backgroundColor: '#1A1429',
            padding: 16
        },
        mainbar: {
            height: "10%",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
        },
        now_playing_text: {
            fontSize: 19,
            marginLeft: "24%",
            color: '#FFFFFF',
        },
        music_logo_view: {
            height: "30%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        image_view: {
            height: "100%",
            width: "50%",
            borderRadius: 10
        },
        name_of_song_View: {
            height: "15%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            color: '#FFFFFF',
        },
        name_of_song_Text1: {
            fontSize: 19,
            fontWeight: "500",
            color: '#FFFFFF',
        },
        name_of_song_Text2: {
            color: "#FE2083",
            marginTop: "4%",
        },
        slider_view: {
            height: "10%",
            width: WIDTH,
            alignItems: "center",
            flexDirection: 'row',
            padding: 16
        },
        slider_style: {
            height: "70%",
            width: "60%"
        },
        slider_time: {
            fontSize: 15,
            color: "#FE2083"
        },
        functions_view: {
            flexDirection: "row",
            height: "10%",
            width: "100%",
            alignItems: "center",
            justifyContent: 'center',
        },
        recently_played_view: {
            height: "25%",
            width: "100%",
        },
        recently_played_text: {
            fontWeight: "bold",
            fontSize: 16,
            color: "#FE2083",
            marginLeft: "5%",
            marginTop: "6%"
        },
        recently_played_list: {
            backgroundColor: "#FFE3E3",
            height: "50%",
            width: "90%",
            borderRadius: 10,
            marginLeft: "5%",
            marginTop: "5%",
            alignItems: "center",
            flexDirection: "row"
        },
        recently_played_image: {
            marginTop: 20,
            height: "100%",
            width: "100%",
            borderRadius: 10
        },
        recently_played_list_text: {
            height: "100%",
            width: "60%",
            justifyContent: "center"
        },
        recently_played_list_text1: {
            fontSize: 15,
            marginLeft: "8%"
        },
        recently_played_list_text2: {
            fontSize: 16,
            color: "#FE2083",
            marginLeft: "8%"
        },
        iconheader: {
            backgroundColor: '#666565',
            width: 36,
            height: 36,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        iconMusic: {
            padding: 5,
            backgroundColor: '#FE2083',
            borderRadius: 50,
            marginLeft: '5%',
            marginRight: '5%'
        },
        iconMusicDisable: {
            padding: 5,
            backgroundColor: '#808080',
            borderRadius: 50,
            marginLeft: '5%',
            marginRight: '5%'
        }
    });