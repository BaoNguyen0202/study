import _ from 'lodash';

export class Ultility {
    convertToNumber = (value: any) => {
        if (value) {
            return _.toNumber(value);
        }
        return null;
    }

    orderArray = (arr: [], field: [], type: string = 'asc') => {
        return _.orderBy(arr, field, [type]);
    }

    filterByField = (arr: [], field: string, value: any) => {
        return _.filter(arr, (item) => item[field] === value) ?? null;
    }

    getUserInfo = () => { }
}