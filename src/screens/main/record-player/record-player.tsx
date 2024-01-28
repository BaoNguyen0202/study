import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Icon } from 'react-native-paper';
import { HEIGHT, WIDTH } from '../../../common/constant';
import { useState } from 'react';
import { Audio } from '../../../utils';

interface AudioState {
    audioStatus?: string;
    recordTime?: number;
    playTime?: number;
    audioFilePath?: string;
}

const RecordPlayerScreen = ({ navigation }: any) => {

    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [isRandomPlay, setIsRandomPlay] = useState<boolean>(false);
    const [isNormalPlay, setIsNormalPlay] = useState<boolean>(true);
    const [recordFile, setRecordFile] = useState<AudioState>({});

    const playRecord = async () => {
        setIsPlay(!isPlay);
        if (isPlay) {
            try {
                await Audio.startPlaying(recordFile);
            } catch (error) {
                console.error('Error starting playback:', error);
            }
        }
        else {
            try {
                await Audio.pausePlaying();
            } catch (error) {
                console.error('Error pausing playback:', error);
            }
        }
    };

    const randomRecord = () => {
        setIsRandomPlay(true);
        setIsNormalPlay(false);
    }
    const normalRecord = () => {
        setIsRandomPlay(false);
        setIsNormalPlay(true);
    }
    const getRecordFile = async () => {
    }

    return (
        <SafeAreaView style={styles.contanier}>
            <View style={styles.mainbar}>
                <View style={styles.iconheader}>
                    <Icon source={'chevron-left'} color="#FFF" size={24} />
                </View>
                <Text style={styles.now_playing_text}> Now Playing </Text>
                <View style={[styles.iconheader, { marginLeft: "20%" }]}>
                    <Text style={{ color: '#FFF' }}>...</Text>
                </View>
            </View>

            <View style={styles.music_logo_view}>
                <Image source={require("../../../assets/images/logo.png")} style={styles.recently_played_image} />
            </View>
            <View style={styles.name_of_song_View} >
                <Text style={styles.name_of_song_Text1}>#02 - Practice</Text>
                <Text style={styles.name_of_song_Text2}>Digital Marketing - By Setup Cast</Text>
            </View>
            <View style={styles.slider_view}>
                <Text style={styles.slider_time}> {recordFile.playTime} </Text>
                <Slider
                    style={styles.slider_style}
                    minimumValue={0}
                    maximumValue={12.02}
                    minimumTrackTintColor="#e75480"
                    maximumTrackTintColor="#d3d3d3"
                    thumbTintColor="#e75480"
                    value={3.5}
                />
                <Text style={styles.slider_time}>{recordFile.recordTime}</Text>
            </View>

            <View style={styles.functions_view}>
                <TouchableOpacity style={isRandomPlay ? styles.iconMusic : styles.iconMusicDisable} onPress={() => randomRecord()}>
                    <Icon source={'shuffle'} color="#FFF" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconMusic} onPress={() => console.log('123')}>
                    <Icon source={'skip-previous'} color="#FFF" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconMusic} onPress={() => playRecord()}>
                    <Icon source={isPlay ? 'pause' : 'play'} color="#FFF" size={50} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconMusic} onPress={() => console.log('123')}>
                    <Icon source={'skip-next'} color="#FFF" size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={isNormalPlay ? styles.iconMusic : styles.iconMusicDisable} onPress={() => normalRecord()}>
                    <Icon source={'repeat'} color="#FFF" size={20} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RecordPlayerScreen;

const styles = StyleSheet.create({
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
        width: "100%",
        alignItems: "center",
        flexDirection: "row"
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
        height: "80%",
        width: "40%",
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
})