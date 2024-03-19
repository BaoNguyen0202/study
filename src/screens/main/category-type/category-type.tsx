import { useEffect, useState } from "react";
import { CategoryTypeService } from "../../../service/category-type-service";
import { CategoryEntitySearch } from "../../../model/category-entity";
import { PaginationEntity } from "../../../model/pagination-entity";
import { CONFIG_URL, SCREEN_CONSTANT, STATUS_REPONSE_API } from "../../../config/configuration";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { CategoryTypeEntity } from "../../../model/category-type-entity";
import { ActivityIndicator, Avatar, Button, Chip, Text } from 'react-native-paper';
import { UserAccountCategoryType } from "../../../model/user-account-entity";
import { Common } from "../../../utils";
import { useTheme } from '@react-navigation/native'
import { WIDTH } from "../../../common/constant";
import Toast from "react-native-toast-message";
import { Ultility } from "../../../common/ultility";

interface ChipSelected {
    id?: number | null;
    name?: string | null;
    selected?: boolean | null;
}

const CategoryTypeScreen = ({ navigation }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const categoryTypeService = new CategoryTypeService();
    const [pageSize, setPageSize] = useState<number>(1000000);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [data, setData] = useState<CategoryTypeEntity[]>([]);
    const { colors } = useTheme();

    const dataSearch: CategoryEntitySearch = {
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
        pagingAndSortingModel: new PaginationEntity
    }
    const [categoryTypeSearch, setCategoryTypeSearch] = useState(dataSearch);

    const getData = async () => {
        categoryTypeSearch.pagingAndSortingModel.pageIndex = pageIndex;
        categoryTypeSearch.pagingAndSortingModel.pageSize = pageSize;
        await categoryTypeService.getList(categoryTypeSearch).then(res => {
            if (res?.data.code === STATUS_REPONSE_API.OK) {
                setData(res.data.data?.items ?? []);
            }
            else {
                Alert.alert(res?.data.message ?? 'Error');
            }
        });
    }

    const handleChipPress = (id: any) => {
        setData((prevHashtags) =>
            prevHashtags.map((tag) =>
                tag.id === id ? { ...tag, selected: !tag.selected } : tag
            )
        );
    };

    const handleConfirm = async () => {
        try {
            let request: UserAccountCategoryType = {
                userAccountId: Ultility.getUserInfo().id,
                categoryTypeIds: data.filter(x => x.selected == true).map(x => x.id)
            };
            const response = await categoryTypeService.addUserCategoryType(request);
            await Common.storage.set('category_type_selected_ids', JSON.stringify(request.categoryTypeIds));
            if (response?.data?.code === STATUS_REPONSE_API.OK) {
                setIsLoading(true);
                await Common.dismissKeyboard(() => {
                    navigation.navigate(SCREEN_CONSTANT.MAIN_TAB);
                });
            } else {
                console.error('Failed:', response?.data.message);
                Alert.alert('Failed', response?.data.message ?? 'Error');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'An error occurred during. Please try again later.');
        }
    }

    useEffect(() => {
        setCategoryTypeSearch(categoryTypeSearch);
        getData();
    }, [pageIndex, pageSize, categoryTypeSearch]);

    return (
        <View style={styles.headerContainer}>
            <Toast />
            <Text style={styles.centeredTextTitle}>Hãy lựa chọn chủ đề phù hợp với bạn!</Text>
            <ScrollView contentContainerStyle={styles.container}>
                {data.map((tag, index) => (
                    <Chip
                        key={tag.id}
                        style={[
                            styles.chipTag,
                            tag.selected && styles.selectedChip,
                        ]}
                        onPress={() => handleChipPress(tag.id)}
                        avatar={<Avatar.Image source={{ uri: CONFIG_URL.URL_UPLOAD + tag.image }} size={24} />}
                    >
                        <Text style={{ color: !tag.selected ? '#FE2083' : '#FFFFFF', fontWeight: 'bold', maxWidth: 100 }}>{tag.name}</Text>
                    </Chip>
                ))}
            </ScrollView>
            {isLoading ? <ActivityIndicator animating={true} color='#FE2083' /> : <></>}
            {
                data.filter(x => x.selected === true).length > 0 ?
                    (<Button
                        style={styles.bottomButtonContainer} mode="contained" onPress={() => handleConfirm()}>
                        <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Tiếp theo</Text>
                    </Button>) : <></>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 16,
        flex: 1,
        backgroundColor: '#1A1429',
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chipTag: {
        backgroundColor: '#e3dcab',
        color: '#FFFFFF',
        margin: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredTextTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        padding: 16,
        color: '#FE2083',
    },

    selectedChip: {
        backgroundColor: '#FE2083',
    },
    bottomButtonContainer: {
        alignSelf: 'center',
        backgroundColor: '#FE2083',
        bottom: 30
    },
});

export default CategoryTypeScreen;
