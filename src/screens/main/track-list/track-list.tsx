import { View, Text, Image, TouchableOpacity, Pressable, SafeAreaView, FlatList, StyleSheet, ImageBackground, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { musiclibrary } from '../../../../data';
import { Appbar, Icon, Searchbar } from 'react-native-paper';
import { ImageAssets } from '../../../assets';
import { favoriteCategoryStyles } from '../favorite-category/favorite-category.style';
import { HEIGHT, WIDTH } from '../../../common/constant';
import { CONFIG_URL, SCREEN_CONSTANT, STATUS_REPONSE_API } from '../../../config/configuration';
import { Common } from '../../../utils';
import { UserBlogEntity, UserBlogEntitySearch } from '../../../model/blog-entity';
import { trackListStyles } from './track-list.styes';
import { useRoute } from '@react-navigation/native';
import { UserCategoryEntity } from '../../../model/category-entity';
import { PaginationEntity } from '../../../model/pagination-entity';
import { Ultility } from '../../../common/ultility';
import { BlogService } from '../../../service/blog-service';

const TrackListScreen = ({ navigation }: any) => {
    const categoryTypeSelectedIds = Common.storage.getString('category_type_selected_ids');
    const route = useRoute();
    const [category, setCategory] = useState<UserCategoryEntity | null | undefined>(route.params);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const blogService = new BlogService();
    const trackListSearch: UserBlogEntitySearch = {
        id: null,
        createdAt: null,
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
        deletedBy: null,
        isSoftDeleted: null,
        searchString: null,
        userAccountId: Ultility.getUserInfo().id,
        categoryTypeIds: categoryTypeSelectedIds ? JSON.parse(categoryTypeSelectedIds) : [],
        type: null,
        types: [2],
        categoryId: null,
        pagingAndSortingModel: new PaginationEntity
    }
    const [request, setTrackListSearch] = useState(trackListSearch);
    const [data, setData] = useState<UserBlogEntity[]>([]);
    const [pageSize, setPageSize] = useState<number>(20);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const getDataBlog = async () => {
        setIsLoading(true);
        request.pagingAndSortingModel.pageIndex = pageIndex;
        request.pagingAndSortingModel.pageSize = pageSize;
        request.pagingAndSortingModel.orderColumn = 'Name';
        request.pagingAndSortingModel.orderDirection = 'asc';
        await blogService.getListAllByType(request).then(res => {
            if (res?.data.code === STATUS_REPONSE_API.OK) {
                setData(res.data.data?.items ?? []);
                setIsLoading(false);
            }
            else {
                Alert.alert(res?.data.message ?? 'Error');
                setIsLoading(false);
            }
        });
    }

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
                            <TouchableOpacity style={favoriteCategoryStyles.iconheader} onPress={() => navigation.goBack()}>
                                <Icon source={'chevron-left'} color="#FFF" size={24} />
                            </TouchableOpacity>
                            <Text style={[favoriteCategoryStyles.appbarText, { textAlign: 'center', width: WIDTH / 2 }]}>{category?.name}</Text>
                            <Appbar.Action icon="magnify" onPress={_handleSearch} color={'#FFFFFF'} />
                        </View>
                    </Appbar.Header>
                </View>
            </View>
            <LinearGradient
                colors={['#FE2083', 'rgb(223 168 182)', '#191414']}
                style={trackListStyles.linearGradient}>
                <Image
                    style={{ width: WIDTH - 150, height: 200 }}
                    source={{ uri: CONFIG_URL.URL_UPLOAD + category?.image ?? '' }}
                />
            </LinearGradient>
            <TouchableOpacity style={trackListStyles.shuffleButtonContainer}>
                <Text style={[trackListStyles.shuffleButton]}>Phát tất cả
                </Text>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                    <Icon color='#fff' source={'play'} size={25} />
                </View>
            </TouchableOpacity>
            {data.map((track) => (
                <TouchableOpacity key={track.id} onPress={() => navigateToRecordPlayer(track)}>
                    <View style={[trackListStyles.row, { backgroundColor: 'rgb(223 168 182)', height: 54, borderRadius: 12, marginTop: 10 }]}>
                        <View style={[trackListStyles.leftPlay]}>
                            <ImageBackground
                                source={{ uri: CONFIG_URL.URL_UPLOAD + track.poster ?? '' }}
                            >
                                <View style={trackListStyles.polligon11}>
                                    <View style={trackListStyles.polligon10}>
                                    </View>
                                </View>
                            </ImageBackground>
                            <View style={{ position: 'absolute' }}>
                                <Icon color='#fff' source={'pause'} size={25} />
                            </View>
                        </View>
                        <View style={{ marginLeft: 8, marginVertical: 8 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[trackListStyles.text, { fontSize: 14, fontWeight: '500', width: WIDTH - 100 }]}><Image source={ImageAssets.Chart} style={{ position: 'absolute', width: 14, height: 14 }} /> {track.name}</Text>
                                <Text style={[trackListStyles.text, { fontSize: 14, fontWeight: '500', position: 'absolute', right: 0, top: 8, flexDirection: 'row' }]}>
                                    <Icon color={track.selected ? '#FE2083' : '#FFF'} source={'cards-heart'} size={14} /> {track.totalLike}    <Icon color='#FFF' source={'dots-horizontal-circle'} size={14} /> {track.totalComment}
                                </Text>
                            </View>
                            <View style={[trackListStyles.row, { marginTop: 4 }]}>
                                <Icon color='#FFF' source={'volume-high'} size={14} />
                                <Text style={[{ fontSize: 10, color: '#FFF', justifyContent: 'center', marginLeft: 4 }, trackListStyles.feedback]}>00:00:00</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
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
                        </View>
                        <View style={{ marginLeft: 8, marginVertical: 8 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={[trackListStyles.text, { fontSize: 14, fontWeight: '500', width: WIDTH - 100 }]}><Image source={ImageAssets.Chart} style={{ position: 'absolute', width: 14, height: 14 }} /> Chửi công ty lofi cực chill</Text>
                                <Text style={[trackListStyles.text, { fontSize: 14, fontWeight: '500', position: 'absolute', right: 0, top: 8, flexDirection: 'row' }]}>
                                    <Icon color='#C2C2C2' source={'cards-heart'} size={14} /> 0   <Icon color='#C2C2C2' source={'dots-horizontal-circle'} size={14} /> 0
                                </Text>
                            </View>
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

    useEffect(() => {
        getDataBlog();
        return () => {
            console.log('Component will unmount. Clean-up if needed.');
        };
    }, []);

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