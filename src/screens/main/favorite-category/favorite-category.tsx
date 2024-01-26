import { useEffect, useState } from "react";
import { UserCategoryEntity, UserCategoryEntitySearch } from "../../../model/category-entity";
import { CategoryService } from "../../../service/category-service";
import { Common } from "../../../utils";
import { PaginationEntity } from "../../../model/pagination-entity";
import { CONFIG_URL, SCREEN_CONSTANT, STATUS_REPONSE_API } from "../../../config/configuration";
import { Alert, FlatList, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Appbar, Avatar, Icon, MD2Colors, Searchbar, Surface } from "react-native-paper";
import { favoriteCategoryStyles } from "./favorite-category.style";
import { HEIGHT } from "../../../common/constant";

const FavoriteCategoryScreen = ({ navigation }: any) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const _handleSearch = () => {
        setIsSearch(!isSearch);
    };
    const _handleMore = async (type: any = '') => {
        if (type === 'CATEGORY') {
            await Common.dismissKeyboard(() => {
                navigation.navigate(SCREEN_CONSTANT.FAVORITE_CATEGORY);
            });
        }
    }
    const [pageSize, setPageSize] = useState<number>(8);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [data, setData] = useState<UserCategoryEntity[]>([]);
    const categoryService = new CategoryService();
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
    const [request, setRequest] = useState(categorySearch);
    const getData = async () => {
        request.pagingAndSortingModel.pageIndex = pageIndex;
        request.pagingAndSortingModel.pageSize = pageSize;
        request.pagingAndSortingModel.orderColumn = 'Name';
        request.pagingAndSortingModel.orderDirection = 'asc';
        setIsLoading(true);
        await categoryService.getListFavorite(request).then(res => {
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

    const handleSearch = async () => {
        console.log(searchQuery);
    }

    const loadMoreCategory = async () => {
        setPageSize(pageSize + 4);
        getData();
    }

    const saveFavoriteCategory = async (category: UserCategoryEntity) => {
        let req = {
            userAccountId: 'cde87cf5-06de-47ac-9574-ac22d89c9432',
            categoryId: category.id,
            selected: !category.selected
        }
        let response = await categoryService.saveFavoriteCategory(req);
        if (response?.data.code === STATUS_REPONSE_API.OK) {
            setData(data.filter(x => x.id !== category.id));
            Alert.alert('Thao tác thành công');
        }
        else {
            console.error('Failed:', response?.data.message);
            Alert.alert('Failed', response?.data.message ?? '');
        }
    }

    const navigateCategoryScreen = async () => {
        await Common.dismissKeyboard(() => {
            navigation.navigate(SCREEN_CONSTANT.CATEGORY);
        });
    }

    useEffect(() => {
        getData();
        return () => {
            console.log('Component will unmount. Clean-up if needed.');
        };
    }, []);

    const renderItem = ({ item }: any) => (
        <Surface key={item.id} style={favoriteCategoryStyles.cardCustom} elevation={4}>
            <ImageBackground
                source={{ uri: CONFIG_URL.URL_UPLOAD + item.image }}
                style={favoriteCategoryStyles.backgroundImage}
            >
                <View style={favoriteCategoryStyles.nameCategory}>
                    <TouchableOpacity style={favoriteCategoryStyles.bookMarkSelected} onPress={() => saveFavoriteCategory(item)}>
                        <Icon color='#FFFFFF' source={'bookmark'} size={15}></Icon>
                    </TouchableOpacity>
                    <View style={favoriteCategoryStyles.paper}>
                        <Text style={favoriteCategoryStyles.centeredText}>
                            {item.name}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </Surface>
    );

    return (
        <View style={{
            flex: 1, backgroundColor: '#1A1429', padding: 16, height: '100%'
        }}>
            {isSearch ?
                <Searchbar
                    placeholder="Tìm kiếm theo tên, chủ đề"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    onSubmitEditing={handleSearch}
                />
                : <></>}
            <View style={[favoriteCategoryStyles.section, { height: HEIGHT / 16 }]}>
                <Appbar.Header style={favoriteCategoryStyles.header}>
                    <View style={favoriteCategoryStyles.titleContainer}>
                        <Text style={favoriteCategoryStyles.appbarText}>Đã lưu</Text>
                    </View>
                    <Appbar.Action icon="magnify" onPress={_handleSearch} color={'#FFFFFF'} />
                    {/* <Avatar.Image source={{ uri: CONFIG_URL.URL_UPLOAD }} size={30} /> */}
                    <Avatar.Image source={require(`../../../assets/images/avatar.png`)} size={30} />
                </Appbar.Header>
            </View>
            <View style={[favoriteCategoryStyles.section, { height: HEIGHT / 16 }]}>
                <Appbar.Header style={favoriteCategoryStyles.header}>
                    <View style={favoriteCategoryStyles.titleContainer}>
                        <Text style={favoriteCategoryStyles.appbarText}>Chủ đề đã lưu</Text>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigateCategoryScreen()}>
                        <Text style={favoriteCategoryStyles.seeAllText}>Danh sách chủ đề</Text>
                        <Icon color='red' source={'chevron-right'} size={24}></Icon>
                    </TouchableOpacity>
                </Appbar.Header>
            </View>

            <FlatList
                data={data}
                renderItem={renderItem}
                numColumns={2}
                onEndReached={loadMoreCategory}
                onEndReachedThreshold={0.1}
            />
            {isLoading ? <ActivityIndicator animating={true} color='#FE2083' /> : <></>}
        </View>
    );
}

export default FavoriteCategoryScreen;
