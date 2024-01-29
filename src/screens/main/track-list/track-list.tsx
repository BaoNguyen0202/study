import { View, Text, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { musiclibrary } from '../../../../data';
import { Appbar, Icon, Searchbar } from 'react-native-paper';
import { ImageAssets } from '../../../assets';
import { favoriteCategoryStyles } from '../favorite-category/favorite-category.style';
import { HEIGHT } from '../../../common/constant';
import { SCREEN_CONSTANT } from '../../../config/configuration';
import { Common } from '../../../utils';
import { UserBlogEntity } from '../../../model/blog-entity';
import { trackListStyles } from './track-list.styes';

const TrackListScreen = ({ navigation }: any) => {
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const _handleSearch = () => {
        setIsSearch(!isSearch);
    };
    const handleSearch = async () => {
        console.log(searchQuery);
    }
    const loadMore = async () => {
        // setIsLoading(true);
    }
    const navigateToRecordPlayer = async (track: UserBlogEntity) => {
        await Common.dismissKeyboard(() => {
            navigation.navigate(SCREEN_CONSTANT.RECORD_PLAYER, track);
        });
    };

    const PlaylistImageView = () => (
        <>
            <View style={{
                flex: 1, backgroundColor: '#FE2083', height: '100%', padding: 16
            }}>
                {isSearch ?
                    <Searchbar
                        placeholder="Tìm kiếm theo tên"
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                        onSubmitEditing={handleSearch}
                    />
                    : <></>}
                <View style={[favoriteCategoryStyles.section, { height: HEIGHT / 20 }]}>
                    <Appbar.Header style={favoriteCategoryStyles.header}>
                        <View style={favoriteCategoryStyles.titleContainer}>
                            <TouchableOpacity style={favoriteCategoryStyles.iconheader} onPress={() => navigation.goBack(SCREEN_CONSTANT.HOME)}>
                                <Icon source={'chevron-left'} color="#FFF" size={24} />
                            </TouchableOpacity>
                            <Text style={[favoriteCategoryStyles.appbarText, { textAlign: 'center' }]}>Công việc, sự nghiệp</Text>
                            <Appbar.Action icon="magnify" onPress={_handleSearch} color={'#FFFFFF'} />
                        </View>
                    </Appbar.Header>
                </View>
            </View>
            <LinearGradient
                colors={['#FE2083', 'rgb(223 168 182)', '#191414']}
                style={trackListStyles.linearGradient}>
                <Image
                    style={{ width: 200, height: 200 }}
                    source={require('../../../assets/images/category_1.png')}
                />
            </LinearGradient>
            <TouchableOpacity style={trackListStyles.shuffleButtonContainer}>
                <Text style={[trackListStyles.shuffleButton]}>Phát tất cả
                </Text>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                    <Icon color='#fff' source={'play'} size={25} />
                </View>
            </TouchableOpacity>
        </>
    );

    const renderSingleMusic = ({ item, index }: any) => {
        return (
            <>
                {index === 0 && <PlaylistImageView />}
                <TouchableOpacity onPress={() => navigateToRecordPlayer(item)}>
                    <View style={[trackListStyles.row, { backgroundColor: '#FFFFFF0D', height: 54, borderRadius: 12, marginTop: 10 }]}>
                        <View style={[trackListStyles.leftPlay]}>
                            <ImageBackground
                                source={{ uri: item.artwork }}
                            >
                                <View style={trackListStyles.polligon11}>
                                    <View style={trackListStyles.polligon10}>
                                    </View>
                                </View>
                            </ImageBackground>
                            <Image source={ImageAssets.Polygon1} style={{ position: 'absolute' }} />
                        </View>
                        <View style={{ marginLeft: 8, marginVertical: 8 }}>
                            <Text style={[trackListStyles.text, { fontSize: 14, fontWeight: '500' }]}>Chửi công ty lofi cực chill</Text>
                            <View style={[trackListStyles.row, { marginTop: 4 }]}>
                                <Icon color='#C2C2C2' source={'volume-high'} size={14} />
                                <Text style={[{ fontSize: 10, color: '#C2C2C2', justifyContent: 'center', marginLeft: 4 }, trackListStyles.feedback]}>00:00:00</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );
    };

    return (
        <View style={trackListStyles.container}>
            <SafeAreaView />
            <FlatList
                data={musiclibrary}
                keyExtractor={item => item.url}
                onEndReached={loadMore}
                renderItem={renderSingleMusic}
                onEndReachedThreshold={0.1}
            />
            {isLoading ? <ActivityIndicator animating={true} color='#FE2083' /> : <></>}
        </View>
    )
}

export default TrackListScreen