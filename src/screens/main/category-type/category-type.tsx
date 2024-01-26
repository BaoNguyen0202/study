import { useEffect, useState } from "react";
import { CategoryTypeService } from "../../../service/category-type-service";
import { CategoryEntitySearch } from "../../../model/category-entity";
import { PaginationEntity } from "../../../model/pagination-entity";
import { CONFIG_URL, SCREEN_CONSTANT, STATUS_REPONSE_API } from "../../../config/configuration";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { CategoryTypeEntity } from "../../../model/category-type-entity";
import { Avatar, Button, Chip, Text } from 'react-native-paper';
import { UserAccountCategoryType } from "../../../model/user-account-entity";
import { Common } from "../../../utils";
import { useTheme } from '@react-navigation/native'

interface ChipSelected {
    id?: number | null;
    name?: string | null;
    selected?: boolean | null;
}

const CategoryTypeScreen = ({ navigation }: any) => {
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
        userAccountId: 'cde87cf5-06de-47ac-9574-ac22d89c9432',
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
                userAccountId: 'cde87cf5-06de-47ac-9574-ac22d89c9432',
                categoryTypeIds: data.filter(x => x.selected == true).map(x => x.id)
            };
            const response = await categoryTypeService.addUserCategoryType(request);

            if (response?.data?.code === STATUS_REPONSE_API.OK) {
                await Common.dismissKeyboard(() => {
                    navigation.navigate(SCREEN_CONSTANT.MAIN_TAB);
                });
                console.log('success');
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
                        <Text style={{ color: !tag.selected ? '#FE2083' : colors.text, fontWeight: 'bold' }}>{tag.name}</Text>
                    </Chip>
                ))}
            </ScrollView>
            {
                data.filter(x => x.selected === true).length > 0 ?
                    (<Button
                        style={styles.bottomButtonContainer} mode="contained" onPress={() => handleConfirm()}>
                        <Text style={{ color: colors.text, fontWeight: 'bold' }}>Tiếp theo</Text>
                    </Button>) : <></>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 16,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    chipTag: {
        margin: 4,
        backgroundColor: '#e3dcab',
    },
    centeredTextTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        padding: 16,
        color: '#FE2083',
    },
    centeredText: {
        textAlign: 'center',
    },
    selectedChip: {
        margin: 4,
        backgroundColor: '#FE2083',
    },
    bottomButtonContainer: {
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: '#FE2083',
        color: 'red'
    },
});

export default CategoryTypeScreen;
