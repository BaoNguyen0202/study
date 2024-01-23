import _ from 'lodash';
import { differenceInDays, format, formatDistance, formatDistanceToNow, subDays } from 'date-fns';
import { vi } from 'date-fns/locale/vi'

export class Ultility {
    static convertToNumber = (value: any) => {
        if (value) {
            return _.toNumber(value);
        }
        return null;
    }

    static orderArray = (arr: [], field: [], type: string = 'asc') => {
        return _.orderBy(arr, field, [type]);
    }

    static filterByField = (arr: [], field: string, value: any) => {
        return _.filter(arr, (item) => item[field] === value) ?? null;
    }

    static formatDistanceToNow = (dateTime: Date | null | undefined) => {
        return dateTime ? formatDistance(subDays(new Date(), differenceInDays(dateTime, new Date())), new Date(), { addSuffix: true, locale: vi })
            : 'Một tháng trước';
    }

    static getUserInfo = () => { }
}