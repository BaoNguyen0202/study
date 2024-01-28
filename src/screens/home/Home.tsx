import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, ImageBackground, Alert, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Appbar, Avatar, Button, Card, Icon, IconButton, Paragraph, Searchbar, Surface, Text, Title, TouchableRipple } from 'react-native-paper';
import { CONFIG_URL, SCREEN_CONSTANT, STATUS_REPONSE_API } from '../../config/configuration';
import { HEIGHT, WIDTH } from '../../common/constant';
import { homeStyles } from './home.style';
import { UserCategoryEntity, UserCategoryEntitySearch } from '../../model/category-entity';
import { CategoryService } from '../../service/category-service';
import { Common } from '../../utils';
import { PaginationEntity } from '../../model/pagination-entity';
import { UserBlogEntity, UserBlogEntitySearch } from '../../model/blog-entity';
import { BlogService } from '../../service/blog-service';
import { Ultility } from '../../common/ultility';
import { styles } from '../discover/discover.style';

const HomeScreen = ({ navigation }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const _handleMore = async (type: any = '') => {
        if (type === 'CATEGORY') {
            await Common.dismissKeyboard(() => {
                navigation.navigate(SCREEN_CONSTANT.FAVORITE_CATEGORY);
            });
        }
        if (type === 'PODCAST') {
            await Common.dismissKeyboard(() => {
                navigation.navigate(SCREEN_CONSTANT.RECORD_PLAYER);
            });
        }
        if (type === 'BLOG') {
            await Common.dismissKeyboard(() => {
                navigation.navigate(SCREEN_CONSTANT.DISCOVER);
            });
        }
    }
    const discoverStyles = styles;
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const _handleSearch = () => {
        setIsSearch(!isSearch);
    };
    //PageModel
    const [pageSizeCategory, setPageSizeCategory] = useState<number>(5);
    const [pageIndexCategory, setPageIndexCategory] = useState<number>(1);
    const [pageSizePodcast, setPageSizePodcast] = useState<number>(5);
    const [pageIndexPodcast, setPageIndexPodcast] = useState<number>(1);
    const [pageSizeBlogText, setPageSizeBlogText] = useState<number>(5);
    const [pageIndexBlogText, setPageIndexBlogText] = useState<number>(1);
    //SetData
    const [dataCategory, setDataCategory] = useState<UserCategoryEntity[]>([]);
    const [dataPodcast, setDataPodcast] = useState<UserBlogEntity[]>([]);
    const [dataBlogText, setDataBlogText] = useState<UserBlogEntity[]>([]);

    //Service
    const categoryService = new CategoryService();
    const blogService = new BlogService();

    //EntitySearch
    const categoryTypeSelectedIds = Common.storage.getString('category_type_selected_ids');
    const categorySearch: UserCategoryEntitySearch = {
        id: null,
        createdAt: null,
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
        deletedBy: null,
        isSoftDeleted: null,
        searchString: null,
        userAccountId: 'cde87cf5-06de-47ac-9574-ac22d89c9432',
        categoryTypeIds: categoryTypeSelectedIds ? JSON.parse(categoryTypeSelectedIds) : [],
        pagingAndSortingModel: new PaginationEntity
    }
    const [categoryRequest, setCategorySearch] = useState(categorySearch);

    const podcastSearch: UserBlogEntitySearch = {
        id: null,
        createdAt: null,
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
        deletedBy: null,
        isSoftDeleted: null,
        searchString: null,
        userAccountId: 'cde87cf5-06de-47ac-9574-ac22d89c9432',
        categoryTypeIds: categoryTypeSelectedIds ? JSON.parse(categoryTypeSelectedIds) : [],
        type: 2,
        pagingAndSortingModel: new PaginationEntity
    }
    const [podcastRequest, setPodcastSearch] = useState(podcastSearch);

    const blogTextSearch: UserBlogEntitySearch = {
        id: null,
        createdAt: null,
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
        deletedBy: null,
        isSoftDeleted: null,
        searchString: null,
        userAccountId: 'cde87cf5-06de-47ac-9574-ac22d89c9432',
        categoryTypeIds: categoryTypeSelectedIds ? JSON.parse(categoryTypeSelectedIds) : [],
        type: 0,
        pagingAndSortingModel: new PaginationEntity
    }
    const [blogTextRequest, setBlogTextSearch] = useState(blogTextSearch);

    //GetData
    const getDataCategory = async () => {
        setIsLoading(true);
        categoryRequest.pagingAndSortingModel.pageIndex = pageIndexCategory;
        categoryRequest.pagingAndSortingModel.pageSize = pageSizeCategory;
        await categoryService.getList(categoryRequest).then(res => {
            if (res?.data.code === STATUS_REPONSE_API.OK) {
                setDataCategory(res.data.data?.items ?? []);
                setIsLoading(false);
            }
            else {
                Alert.alert(res?.data.message ?? 'Error');
                setIsLoading(false);
            }
        });
    }
    const getDataPodcast = async () => {
        setIsLoading(true);
        podcastRequest.pagingAndSortingModel.pageIndex = pageIndexPodcast;
        podcastRequest.pagingAndSortingModel.pageSize = pageSizePodcast;
        await blogService.getList(podcastRequest).then(res => {
            if (res?.data.code === STATUS_REPONSE_API.OK) {
                setDataPodcast(res.data.data?.items ?? []);
                setIsLoading(false);
            }
            else {
                Alert.alert(res?.data.message ?? 'Error');
                setIsLoading(false);
            }
        });
    }

    const getDataBlogText = async () => {
        setIsLoading(true);
        blogTextRequest.pagingAndSortingModel.pageIndex = pageIndexBlogText;
        blogTextRequest.pagingAndSortingModel.pageSize = pageSizeBlogText;
        await blogService.getList(blogTextRequest).then(res => {
            if (res?.data.code === STATUS_REPONSE_API.OK) {
                setDataBlogText(res.data.data?.items ?? []);
                setIsLoading(false);
            }
            else {
                Alert.alert(res?.data.message ?? 'Error');
                setIsLoading(false);
            }
        });
    }

    useEffect(() => {
        getDataCategory();
        getDataPodcast();
        getDataBlogText();
        return () => {
            console.log('Component will unmount. Clean-up if needed.');
        };
    }, []);

    const renderBlogTextContent = (blogText: UserBlogEntity) => {
        return (
            <View>
                <Text style={homeStyles.commentText}> {blogText.content?.substring(0, 60) + '...' ?? ''} <Text style={[homeStyles.commentText, { fontWeight: '800' }]}> Xem thêm</Text></Text>
            </View>
        )
    }

    const saveFavoriteCategory = async (category: UserCategoryEntity) => {
        let req = {
            userAccountId: 'cde87cf5-06de-47ac-9574-ac22d89c9432',
            categoryId: category.id,
            selected: !category.selected
        }
        let response = await categoryService.saveFavoriteCategory(req);
        if (response?.data.code === STATUS_REPONSE_API.OK) {
            setDataCategory((prevCategories) =>
                prevCategories.map((c) =>
                    c.id === category.id ? { ...c, selected: !c.selected } : c
                )
            );
            Alert.alert('Thao tác thành công');
        }
        else {
            console.error('Failed:', response?.data.message);
            Alert.alert('Failed', response?.data.message ?? '');
        }
    }

    const saveFavoritePodcast = async (podcast: UserBlogEntity) => {
        setDataPodcast((prevBlogs) =>
            prevBlogs.map((c) =>
                c.id === podcast.id ? { ...c, selected: !c.selected } : c
            )
        );
        Alert.alert('Thao tác thành công');
    }

    const saveFavoriteBlogText = async (blogText: UserBlogEntity) => {
        setDataBlogText((prevBlogs) =>
            prevBlogs.map((c) =>
                c.id === blogText.id ? { ...c, selected: !c.selected } : c
            )
        );
        Alert.alert('Thao tác thành công');
    }

    const handleSearch = async () => {
        console.log(searchQuery);
    }

    const loadMoreCategory = async () => {
        setPageSizeCategory(pageSizeCategory + 1);
        getDataCategory();
        console.log('Load more category ' + pageSizeCategory)
    }

    return (
        <ScrollView style={{
            flex: 1, backgroundColor: '#1A1429', padding: 16
        }}>
            {isSearch ?
                <Searchbar
                    placeholder="Tìm kiếm theo tên, chủ đề"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    onSubmitEditing={handleSearch}
                />
                : <></>}
            <View style={homeStyles.section}>
                <Appbar.Header style={homeStyles.header}>
                    <View style={homeStyles.titleContainer}>
                        <Text style={homeStyles.appbarText}>Trang chủ</Text>
                    </View>
                    <Appbar.Action icon="magnify" onPress={_handleSearch} color={'#FFFFFF'} />
                    {/* <Avatar.Image source={{ uri: CONFIG_URL.URL_UPLOAD }} size={30} /> */}
                    <Avatar.Image source={require(`../../assets/images/avatar.png`)} size={30} />
                </Appbar.Header>
            </View>

            <View style={[homeStyles.section, { height: HEIGHT / 5.7 }]}>
                <Card>
                    <Card.Cover source={require(`../../assets/images/Frame7.png`)} style={homeStyles.backgroundImage} />
                </Card>
            </View>
            {isLoading ? <ActivityIndicator animating={true} color='#FE2083' /> : <></>}
            <View style={homeStyles.section}>
                <View style={[homeStyles.titleContainer, { height: HEIGHT / 10 }]}>
                    <Text style={homeStyles.appbarText}>Danh sách chủ đề</Text>
                    <TouchableOpacity onPress={() => _handleMore('CATEGORY')} style={{ flexDirection: 'row' }}>
                        <Text style={homeStyles.seeAllText}>Xem tất cả</Text>
                        <Icon color='red' source={'chevron-right'} size={24}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, height: HEIGHT / 5 }}>
                    <ScrollView horizontal style={{ flexDirection: 'row' }} onMomentumScrollEnd={() => { loadMoreCategory() }}>
                        {dataCategory.map((category) => (
                            <Surface key={category.id} style={homeStyles.cardCustom} elevation={4}>
                                <ImageBackground
                                    source={{ uri: CONFIG_URL.URL_UPLOAD + category.image }}
                                    style={homeStyles.backgroundImage}
                                >
                                    <View style={homeStyles.nameCategory}>
                                        <TouchableOpacity style={category.selected ? homeStyles.bookMarkSelected : homeStyles.bookMarkDisabled} onPress={() => saveFavoriteCategory(category)}>
                                            <Icon color='#FFFFFF' source={'bookmark'} size={15}></Icon>
                                        </TouchableOpacity>
                                        <View style={homeStyles.paper}>
                                            <Text style={homeStyles.centeredText}>
                                                {category.name}
                                            </Text>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </Surface>
                        ))}
                    </ScrollView>
                </View>
            </View>
            {isLoading ? <ActivityIndicator animating={true} color='#FE2083' /> : <></>}
            <View style={homeStyles.section}>
                <View style={[homeStyles.titleContainer, { height: HEIGHT / 9.5 }]}>
                    <Text style={homeStyles.appbarText}>Podcast nổi bật</Text>
                    <TouchableOpacity onPress={() => _handleMore('PODCAST')} style={{ flexDirection: 'row' }}>
                        <Text style={homeStyles.seeAllText}>Xem tất cả</Text>
                        <Icon color='red' source={'chevron-right'} size={24}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, height: HEIGHT / 4 }}>
                    <ScrollView horizontal style={{ flexDirection: 'row' }}>
                        {dataPodcast.map((podcast) => (
                            <Surface key={podcast.id} style={homeStyles.cardCustom} elevation={4}>
                                <Image
                                    source={{ uri: CONFIG_URL.URL_UPLOAD + podcast.poster }}
                                    style={homeStyles.image}
                                    alt='no image'
                                />
                                <View style={homeStyles.cardContent}>
                                    <Text style={homeStyles.namePodcast}>{podcast.name}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon color='#C2C2C2' source={'volume-high'} size={14}></Icon>
                                        <Text style={{ color: '#C2C2C2' }}> 00:05:00</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon color='#C2C2C2' source={'heart'} size={14}></Icon>
                                            <Text style={{ color: '#C2C2C2' }}> {podcast.totalLike ?? 0}</Text>
                                        </View>
                                        <TouchableOpacity style={podcast.selected ? homeStyles.heartSelected : homeStyles.heartDisabled} onPress={() => saveFavoritePodcast(podcast)}>
                                            <Icon color='#FFFFFF' source={'heart'} size={15}></Icon>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Surface>
                        ))}
                    </ScrollView>
                </View>
            </View>
            {isLoading ? <ActivityIndicator animating={true} color='#FE2083' /> : <></>}
            <View style={[homeStyles.section, { marginBottom: 30 }]}>
                <View style={[homeStyles.titleContainer, { height: HEIGHT / 10 }]}>
                    <Text style={homeStyles.appbarText}>Bài đăng nổi bật</Text>
                    <TouchableOpacity onPress={() => _handleMore('BLOG')} style={{ flexDirection: 'row' }}>
                        <Text style={homeStyles.seeAllText}>Xem tất cả</Text>
                        <Icon color='red' source={'chevron-right'} size={24}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, height: HEIGHT / 4.5 }}>
                    {dataBlogText.map((blogText) => (
                        <View key={blogText.id} style={discoverStyles.containerItem}>
                            <View style={[discoverStyles.row, discoverStyles.spcabetwen]}>
                                <View style={discoverStyles.row}>
                                    <Avatar.Image source={blogText.isIncognito ? require(`../../assets/images/avatar.png`) : { uri: CONFIG_URL.URL_UPLOAD + blogText.avatar }} size={40} />
                                    <View style={{ marginLeft: 8 }}>
                                        <View style={discoverStyles.row}>
                                            <Text style={[discoverStyles.text, { fontSize: 14 }]}>{blogText.isIncognito ? blogText.incognitoName : blogText.fullName}</Text>
                                            {blogText.incognitoName && (
                                                <View style={{ justifyContent: 'center', marginLeft: 4 }}>
                                                    <Icon color='#FFF' source={'check-decagram'} size={14} />
                                                </View>
                                            )}
                                        </View>
                                        <Text style={[discoverStyles.text, { fontSize: 12, marginTop: 4 }]}>{blogText.isIncognito ? 'Ẩn danh' : blogText.userName}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={discoverStyles.date}> {Ultility.formatDistanceToNow(blogText.createdAt)}</Text>
                                    <View style={discoverStyles.categoryName}>
                                        <Text style={discoverStyles.text}>{blogText.categoryName}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={discoverStyles.content}>
                                {renderBlogTextContent(blogText)}
                            </View>
                            <View style={discoverStyles.footer}>
                                <View style={[discoverStyles.row, discoverStyles.spcabetwen]}>
                                    <View style={[discoverStyles.row, { alignSelf: 'center' }]}>
                                        <View style={discoverStyles.row}>
                                            <Icon color='#C2C2C2' source={'cards-heart'} size={14} />
                                            <Text style={[discoverStyles.text, discoverStyles.feedback]}>{blogText.totalLike}</Text>
                                        </View>
                                        <View style={[discoverStyles.row, { marginLeft: 8 }]}>
                                            <Icon color='#C2C2C2' source={'dots-horizontal-circle'} size={14} />
                                            <Text style={[discoverStyles.text, discoverStyles.feedback]}>{blogText.totalComment}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={blogText.selected ? homeStyles.heartSelected : homeStyles.heartDisabled} onPress={() => saveFavoriteBlogText(blogText)}>
                                        <Icon color='#FFFFFF' source={'heart'} size={15}></Icon>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView >
    );
};

export default HomeScreen;
