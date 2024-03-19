import { useEffect, useState } from "react";
import { UserCategoryEntity, UserCategoryEntitySearch } from "../../../model/category-entity";
import { CategoryService } from "../../../service/category-service";
import { Common } from "../../../utils";
import { PaginationEntity } from "../../../model/pagination-entity";
import { CONFIG_URL, SCREEN_CONSTANT, STATUS_REPONSE_API } from "../../../config/configuration";
import { Alert, FlatList, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Appbar, Avatar, Icon, MD2Colors, Modal, Searchbar, Surface } from "react-native-paper";
import { HEIGHT } from "../../../common/constant";
import { favoriteCategoryStyles } from "../favorite-category/favorite-category.style";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../discover/discover.style";
import { Ultility } from "../../../common/ultility";
import SuccessModal from "../../modal/success-modal/success-modal";

const CategoryScreen = ({ navigation }: any) => {
    const [visibleSuccessModal, setVisibleSuccessModal] = useState(false);
    const hideModal = async () => {
        setVisibleSuccessModal(false);
    };
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
        userAccountId: Ultility.getUserInfo().id,
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
        await categoryService.getList(request).then(res => {
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
        request.searchString = searchQuery;
        await getData();
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
            setData((prevCategories) =>
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

    const navigateDiscovery = async (item: UserCategoryEntity) => {
        await Common.dismissKeyboard(() => {
            console.log(item.name);
            navigation.navigate(SCREEN_CONSTANT.DISCOVER, item);
        });
    }

    useEffect(() => {
        getData();
        return () => {
            console.log('Component will unmount. Clean-up if needed.');
        };
    }, []);

    const renderItem = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigateDiscovery(item)}>
            <Surface key={item.id} style={favoriteCategoryStyles.cardCustom} elevation={4}>
                <ImageBackground
                    source={{ uri: CONFIG_URL.URL_UPLOAD + item.image }}
                    style={favoriteCategoryStyles.backgroundImage}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[styles.hashtag, { width: '60%' }]}>
                            <Text style={{ color: '#FE2083', fontWeight: 'bold' }}>#{item.hashtag?.toString().split('_')[0]}</Text>
                        </View>
                        <TouchableOpacity style={item.selected ? favoriteCategoryStyles.bookMarkSelected : favoriteCategoryStyles.bookMarkDisabled} onPress={() => saveFavoriteCategory(item)}>
                            <Icon color='#FFFFFF' source={'bookmark'} size={15}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={favoriteCategoryStyles.nameCategory}>
                        <View style={favoriteCategoryStyles.paper}>
                            <Text style={favoriteCategoryStyles.centeredText}>
                                {item.name}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </Surface>
        </TouchableOpacity>
    );

    return (
        <View style={{
            flex: 1, backgroundColor: '#1A1429', padding: 16, height: '100%'
        }}>
            {isSearch ?
                <Searchbar
                    placeholder="Tìm kiếm theo tên chủ đề, hashtag"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    onSubmitEditing={handleSearch}
                />
                : <></>}
            <View style={[favoriteCategoryStyles.section, { height: HEIGHT / 14 }]}>
                <Appbar.Header style={favoriteCategoryStyles.header}>
                    <View style={favoriteCategoryStyles.titleContainer}>
                        <TouchableOpacity style={favoriteCategoryStyles.iconheader} onPress={() => navigation.goBack()}>
                            <Icon source={'chevron-left'} color="#FFF" size={24} />
                        </TouchableOpacity>
                        <Text style={[favoriteCategoryStyles.appbarText, { textAlign: 'center' }]}>Danh sách chủ đề</Text>
                        <Appbar.Action icon="magnify" onPress={_handleSearch} color={'#FFFFFF'} />
                    </View>
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
            <Modal visible={visibleSuccessModal} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>
                <SuccessModal message={'Thao tác thành công'} hideModal={hideModal} />
            </Modal>
        </View>
    );
}

export default CategoryScreen;
