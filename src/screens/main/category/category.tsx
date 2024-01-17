import { useEffect, useState } from "react";
import { CategoryEntity, CategoryEntitySearch } from "../../../model/category-entity";
import { PaginationEntity } from "../../../model/pagination-entity";
import { STATUS_REPONSE_API } from "../../../config/configuration";
import { Alert } from "react-native";
import { CategoryService } from "../../../service/category-service";

const CategoryScreen = ({ navigation }: any) => {
    const categoryService = new CategoryService();
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [data, setData] = useState<CategoryEntity[]>([]);

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
        categoryTypeId: null,
        pagingAndSortingModel: new PaginationEntity
    }
    const [categorySearch, setCategorySearch] = useState(dataSearch);

    const getData = async () => {
        categorySearch.pagingAndSortingModel.pageIndex = pageIndex;
        categorySearch.pagingAndSortingModel.pageSize = pageSize;
        await categoryService.getList(categorySearch).then(res => {
            if (res?.data.code === STATUS_REPONSE_API.OK) {
                setData(res.data.data || []);
            }
            else {
                Alert.alert(res?.data.message ?? 'Error');
            }
        });
    }

    useEffect(() => {
        setCategorySearch(categorySearch);
        getData();
    }, [pageIndex, pageSize, categorySearch]);

    return;
}

export default CategoryScreen;
