import _ from 'lodash';
import { differenceInDays, format, formatDistance, formatDistanceToNow, subDays } from 'date-fns';
import { vi } from 'date-fns/locale/vi'
import { Common } from '../utils';
import { UserAccountLoginEntity, UserAccountLoginResponseEntity } from '../model/user-account-entity';
import Sound from 'react-native-sound';
import { CONFIG_URL } from '../config/configuration';

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

    static getUserInfo = () => {
        const info: UserAccountLoginResponseEntity = JSON.parse(Common.storage.getString('user_info') ?? '{}');
        return info
    }

    static formatDuration = (seconds: any) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    static getSoundDurationByPath = (path: string | null) => {
        let _duration = Ultility.formatDuration(0);
        try {
            const soundObject = new Sound(CONFIG_URL.URL_RECORD + path, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('Error loading sound:', error);
                } else {
                    _duration = Ultility.formatDuration(soundObject.getDuration());
                }
            });
            return _duration;
        }
        catch (ex) {
            return _duration;
        }
    };
}