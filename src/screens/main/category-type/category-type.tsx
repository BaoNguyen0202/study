import { useEffect, useState } from "react";
import { CategoryTypeService } from "../../../service/category-type-service";
import { CategoryEntitySearch } from "../../../model/category-entity";
import { PaginationEntity } from "../../../model/pagination-entity";
import { STATUS_REPONSE_API } from "../../../config/configuration";
import { Alert } from "react-native";
import { CategoryTypeEntity } from "../../../model/category-type-entity";

const CategoryTypeScreen = ({ navigation }: any) => {
    const categoryTypeService = new CategoryTypeService();
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [data, setData] = useState<CategoryTypeEntity[]>([]);

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
        pagingAndSortingModel: new PaginationEntity
    }
    const [categoryTypeSearch, setCategoryTypeSearch] = useState(dataSearch);

    const getData = async () => {
        categoryTypeSearch.pagingAndSortingModel.pageIndex = pageIndex;
        categoryTypeSearch.pagingAndSortingModel.pageSize = pageSize;
        await categoryTypeService.getList(categoryTypeSearch).then(res => {
            if (res?.data.code === STATUS_REPONSE_API.OK) {
                setData(res.data.data || []);
            }
            else {
                Alert.alert(res?.data.message ?? 'Error');
            }
        });
    }

    useEffect(() => {
        setCategoryTypeSearch(categoryTypeSearch);
        getData();
    }, [pageIndex, pageSize, categoryTypeSearch]);

    return;
}

export default CategoryTypeScreen;
