import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList, TouchableHighlight, ImageBackground, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Avatar, Card, Checkbox, Icon, Menu } from 'react-native-paper';
import { ImageAssets } from '../../assets';
import blog from '../../../blog.json';
import { UserBlogEntity, UserBlogEntitySearch } from '../../model/blog-entity';
import Sound from 'react-native-sound';
import { styles } from './discover.style';
import { Ultility } from '../../common/ultility';
import { CONFIG_URL, SCREEN_CONSTANT, STATUS_REPONSE_API } from '../../config/configuration';
import { HEIGHT, WIDTH } from '../../common/constant';
import { Common } from '../../utils';
import { UserCategoryEntity, UserCategoryEntitySearch } from '../../model/category-entity';
import { PaginationEntity } from '../../model/pagination-entity';
import { CategoryService } from '../../service/category-service';
import { BlogService } from '../../service/blog-service';
import { homeStyles } from '../home/home.style';
import { useIsFocused, useRoute } from '@react-navigation/native';

interface TypeCheckboxFilter {
    id: number,
    name: string,
    checked: boolean | null
}

const Discover = ({ navigation }: any) => {
    const isFocused = useIsFocused();
    const route = useRoute();
    const categorySelected: UserCategoryEntity | null | undefined = route.params;
    const categoryTypeSelectedIds = Common.storage.getString('category_type_selected_ids');
    const listTypeCheckBoxFilter: TypeCheckboxFilter[] = [
        { id: 0, name: 'Văn bản', checked: true },
        { id: 2, name: 'Âm thanh', checked: true },
        { id: 3, name: 'Hình ảnh', checked: true },
    ]
    const [typeCheckBoxFilters, setDataCheckBoxFilter] = useState<TypeCheckboxFilter[]>(listTypeCheckBoxFilter);
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
    const blogSearch: UserBlogEntitySearch = {
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
        type: null,
        categoryId: null,
        types: typeCheckBoxFilters.filter(x => x.checked).map(x => x.id),
        pagingAndSortingModel: new PaginationEntity
    }
    const [blogRequest, setBlogSearch] = useState(blogSearch);
    const blogService = new BlogService();
    const [dataBlog, setDataBlog] = useState<UserBlogEntity[]>([]);
    const [categoryRequest, setCategorySearch] = useState(categorySearch);
    const categoryService = new CategoryService();
    const [dataCategory, setDataCategory] = useState<UserCategoryEntity[]>([]);
    const [pageSizeCategory, setPageSizeCategory] = useState<number>(5);
    const [pageIndexCategory, setPageIndexCategory] = useState<number>(1);
    const [pageSizeBlog, setPageSizeBlog] = useState<number>(5);
    const [pageIndexBlog, setPageIndexBlog] = useState<number>(1);
    const [selectedButton, setSelectedButton] = useState('');
    const [selectedTab, setSelectedTab] = useState<string>('ALL');
    const [data, setData] = useState<UserBlogEntity | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [soundInstance, setSoundInstance] = useState<Sound | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAvatarMenuVisible, setAvatarMenuVisible] = useState(false);
    const [listChecked, setListChecked] = useState<number[]>(typeCheckBoxFilters.filter(x => x.checked).map(x => x.id));
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleAvatarClick = () => {
        setAvatarMenuVisible(!isAvatarMenuVisible);
    };

    const handleButtonPress = (value: string) => {
        setSelectedButton(value);
        setSelectedTab(value);
        blogRequest.categoryId = value;
        if (value === 'ALL' || value === '') {
            blogRequest.categoryId = null;

        }
        getDataBlog();
    };

    const handleStartPlaying = async (filePath: string) => {
        // navigation.navigate('', { filePath })
    };

    const navigateBlogDetail = async (item: UserBlogEntity) => {
        await Common.dismissKeyboard(() => {
            navigation.navigate(SCREEN_CONSTANT.BLOG, item);
        });
    }

    const deleteBlog = async (item: UserBlogEntity) => {
        console.log(item.id);
    }

    const renderContent = () => {
        return <FlatList
            data={dataBlog}
            keyExtractor={(item) => item?.id ?? ''}
            onEndReached={loadMoreBlog}
            onEndReachedThreshold={0.1}
            renderItem={renderItem}
        />
    }

    const renderBlogTextContent = (blog: UserBlogEntity) => {
        return (
            <View>
                <Text style={homeStyles.commentText}> {(blog.content ?? '').length > 200 ? blog.content?.substring(0, 200) + '...' : blog.content} {(blog.content ?? '').length > 200 && <Text onPress={() => navigateBlogDetail(blog)} style={[homeStyles.commentText, { fontWeight: '800' }]}> Xem thêm</Text>}</Text>
            </View>
        )
    }

    const saveFavoriteBlog = async (blog: UserBlogEntity) => {
        let _selected = !blog.selected;
        let req = {
            userAccountId: 'cde87cf5-06de-47ac-9574-ac22d89c9432',
            blogId: blog.id,
            selected: _selected
        }
        let response = await blogService.saveFavoriteBlog(req);
        if (response?.data.code === STATUS_REPONSE_API.OK) {
            setDataBlog((prevBlogs) =>
                prevBlogs.map((c) =>
                    c.id === blog.id ? { ...c, selected: _selected, totalLike: (_selected ? (c.totalLike ?? 0) + 1 : (c.totalLike ?? 0) - 1) } : c
                )
            );
            Alert.alert('Thao tác thành công');
        }
        else {
            console.error('Failed:', response?.data.message);
            Alert.alert('Failed', response?.data.message ?? '');
        }
    }

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.containerItem} onPress={() => navigateBlogDetail(item)}>
                {item.userAccountId == Ultility.getUserInfo().id && (
                    <View style={[styles.row, styles.spcabetwen, { marginBottom: 5 }]}>
                        <View style={styles.row}>
                        </View>
                        <TouchableOpacity onPress={() => deleteBlog(item)}>
                            <View style={styles.row}>
                                <Icon color='#FFF' source={'dots-horizontal'} size={17} />
                                <Icon color='#FFF' source={'close'} size={17} />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                <View style={[styles.row, styles.spcabetwen]}>
                    <View style={styles.row}>
                        <Avatar.Image source={item.isIncognito ? require(`../../assets/images/avatar.png`) : { uri: CONFIG_URL.URL_UPLOAD + item.avatar }} size={40} />
                        <View style={{ marginLeft: 8 }}>
                            <View style={styles.row}>
                                <Text style={[styles.text, { fontSize: 14 }]}>{item.isIncognito ? item.incognitoName : item.fullName}</Text>
                                {item.incognitoName && (
                                    <View style={{ justifyContent: 'center', marginLeft: 4 }}>
                                        <Icon color='#FFF' source={'check-decagram'} size={14} />
                                    </View>
                                )}
                            </View>
                            <Text style={[styles.text, { fontSize: 12, marginTop: 4 }]}>{item.isIncognito ? 'Ẩn danh' : item.userName}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.date}> {Ultility.formatDistanceToNow(item.createdAt)}</Text>
                        <View style={styles.categoryName}>
                            <Text style={styles.text}>{item.categoryName}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                    {renderBlogTextContent(item)}
                    {item.type == 3 && item.poster && (
                        < Image source={{ uri: CONFIG_URL.URL_UPLOAD + item.poster }} style={styles.poster} />
                    )}
                    {item.path && item.type == 2 && (
                        <TouchableOpacity onPress={() => handleStartPlaying(item.path)}>
                            <View style={[styles.row, { backgroundColor: '#FFFFFF0D', height: 54, borderRadius: 12, marginTop: 10 }]}>
                                <View style={[styles.leftPlay]}>
                                    <ImageBackground
                                        source={{ uri: CONFIG_URL.URL_UPLOAD + item.poster }}
                                    >
                                        <View style={styles.polligon11}>
                                            <View style={styles.polligon10}>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                    <Image source={ImageAssets.Polygon1} style={{ position: 'absolute' }} />
                                </View>
                                <View style={{ marginLeft: 8, marginVertical: 8 }}>
                                    <Text style={[styles.text, { fontSize: 14, fontWeight: '500' }]}>Chửi công ty lofi cực chill</Text>
                                    <View style={[styles.row, { marginTop: 4 }]}>
                                        <Icon color='#C2C2C2' source={'volume-high'} size={14} />
                                        <Text style={[{ fontSize: 10, color: '#C2C2C2', justifyContent: 'center', marginLeft: 4 }, styles.feedback]}>00:00:00</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.footer}>
                    <View style={[styles.row, styles.spcabetwen]}>
                        <View style={[styles.row, { alignSelf: 'center' }]}>
                            <View style={styles.row}>
                                <Icon color='#C2C2C2' source={'cards-heart'} size={14} />
                                <Text style={[styles.text, styles.feedback]}>{item.totalLike}</Text>
                            </View>
                            {/* naviagtionBlog */}
                            <TouchableOpacity style={[styles.row, { marginLeft: 8 }]} onPress={() => navigateBlogDetail(item)}>
                                <Icon color='#C2C2C2' source={'dots-horizontal-circle'} size={14} />
                                <Text style={[styles.text, styles.feedback]}>{item.totalComment}</Text>
                            </TouchableOpacity >
                        </View>
                        <View style={item.selected ? styles.favorite : styles.favoriteDefault} onTouchEnd={() => saveFavoriteBlog(item)}>
                            <Icon color='#FFF' source={'cards-heart'} size={14} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    // LOAD DATA
    const getDataCategory = async () => {
        setIsLoading(true);
        categoryRequest.pagingAndSortingModel.pageIndex = pageIndexCategory;
        categoryRequest.pagingAndSortingModel.pageSize = pageSizeCategory;
        categoryRequest.pagingAndSortingModel.orderColumn = 'Name';
        categoryRequest.pagingAndSortingModel.orderDirection = 'asc';
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

    const getDataBlog = async () => {
        setIsLoading(true);
        blogRequest.pagingAndSortingModel.pageIndex = pageIndexBlog;
        blogRequest.pagingAndSortingModel.pageSize = pageSizeBlog;
        blogRequest.pagingAndSortingModel.orderColumn = 'CreatedAt';
        blogRequest.pagingAndSortingModel.orderDirection = 'desc';
        await blogService.getListAllByType(blogRequest).then(res => {
            if (res?.data.code === STATUS_REPONSE_API.OK) {
                setDataBlog(res.data.data?.items ?? []);
                setIsLoading(false);
            }
            else {
                Alert.alert(res?.data.message ?? 'Error');
                setIsLoading(false);
            }
        });
    }

    const loadMoreCategory = async () => {
        setPageSizeCategory(pageSizeCategory + 1);
        getDataCategory();
        console.log('Load more category ' + pageSizeCategory)
    }

    const loadMoreBlog = async () => {
        setPageSizeBlog(pageSizeBlog + 1);
        getDataBlog();
        console.log('Load more blog ' + pageSizeBlog)
    }

    const filterBlogByType = async (type: TypeCheckboxFilter) => {
        setDataCheckBoxFilter((prevTypes) =>
            prevTypes.map((c) =>
                c.id === type.id ? { ...c, checked: !c.checked } : c
            )
        );
        console.log(typeCheckBoxFilters.filter(x => x.checked).map(x => x.id));
        // if (!(typeCheckBoxFilters.filter(x => x.checked).length > 0)) {
        //     setDataBlog([]);
        // }
        // else {
        //     setListChecked(typeCheckBoxFilters.filter(x => x.checked).map(x => x.id))
        //     console.log(listChecked);
        //     getDataBlog()
        // }
    }

    const navigateCreateBlog = async () => {
        await Common.dismissKeyboard(() => {
            navigation.navigate(SCREEN_CONSTANT.CREATE_BLOG);
        });
    }

    useEffect(() => {
        if (isFocused) {
            if (categorySelected) {
                blogRequest.categoryId = categorySelected.id;
                setSelectedTab(categorySelected.id ?? 'ALL');
            }
            else {
                blogRequest.categoryId = null;
                setSelectedTab('ALL');
            }
        }
        getDataCategory();
        getDataBlog();
        return () => {
            console.log('Component will unmount. Clean-up if needed.');
        };
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={ImageAssets.Bg_Image} style={styles.bgImage} />
            <View style={styles.containerContent}>
                <View style={[styles.header, styles.row]}>
                    <Text style={[styles.textHeader, { flexWrap: 'wrap', width: WIDTH / 2 }]}>{route.params ? categorySelected?.name : 'Bài đăng'}</Text>
                    <View style={[styles.row]}>
                        {selectedTab != 'ALL' && (<TouchableOpacity onPress={() => navigateCreateBlog()}>
                            <Avatar.Image style={{ backgroundColor: '#817a87', marginRight: 10 }} source={ImageAssets.plus} size={30} />
                        </TouchableOpacity>)}
                        <TouchableOpacity onPress={() => handleAvatarClick()}>
                            <Avatar.Image style={{ backgroundColor: '#817a87', marginRight: 10 }} source={ImageAssets.filter} size={30} />
                        </TouchableOpacity>
                        <Avatar.Image source={ImageAssets.avatar} size={30} />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <ScrollView horizontal onMomentumScrollEnd={() => { loadMoreCategory() }}>
                        {isLoading ? <ActivityIndicator animating={true} color='#FE2083' /> : <></>}
                        <TouchableOpacity
                            style={[styles.button, selectedTab === 'ALL' && styles.selectedButton]}
                            onPress={() => handleButtonPress('ALL')}
                        >
                            <Text style={styles.buttonText}>Tất cả bài đăng</Text>
                        </TouchableOpacity>
                        {dataCategory.map((category) => (
                            <TouchableOpacity
                                key={category.id}
                                style={[styles.button, selectedTab === category.id && styles.selectedButton]}
                                onPress={() => handleButtonPress(category.id ?? '')}
                            >
                                <Text style={styles.buttonText}>{category.name ?? ''}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {renderContent()}
            </View>
            {isAvatarMenuVisible && (
                <View style={styles.menuContainer}>
                    <View style={styles.menuBg}>
                        {typeCheckBoxFilters.map((type) => (
                            <View key={type.id} style={styles.menuContent}>
                                <Checkbox.Android
                                    status={type.checked == true ? 'checked' : 'unchecked'}
                                    onPress={() => filterBlogByType(type)}
                                    color={type.checked ? '#FE2083' : ''}
                                />
                                <Text style={styles.text}>{type.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </SafeAreaView >
    )
}


export default Discover