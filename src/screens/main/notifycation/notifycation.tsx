import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    FlatList,
    Alert,
    Image,
    ActivityIndicator,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { NotifycationService } from '../../../service/notifycation-service';
import { NotifycationEntity, NotifycationEntitySearch } from '../../../model/notifycation-entity';
import { PaginationEntity } from '../../../model/pagination-entity';
import { Ultility } from '../../../common/ultility';
import { STATUS_REPONSE_API } from '../../../config/configuration';
import { ImageAssets } from '../../../assets';
import { notifycationStyles } from './notifycation.styles';
import { Icon } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

const NotifycationScreen = () => {
    const isFocused = useIsFocused();
    const [data, setData] = useState<NotifycationEntity[]>([]);
    const [dataUnread, setDataUnread] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const notifycationService = new NotifycationService();
    const notifycationSearch: NotifycationEntitySearch = {
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
    const [request, setRequest] = useState(notifycationSearch);
    const getData = async () => {
        request.pagingAndSortingModel.pageIndex = pageIndex;
        request.pagingAndSortingModel.pageSize = pageSize;
        request.pagingAndSortingModel.orderColumn = 'CreatedAt';
        request.pagingAndSortingModel.orderDirection = 'desc';
        setIsLoading(true);
        await notifycationService.getList(request).then(res => {
            if (res?.data.code === STATUS_REPONSE_API.OK) {
                setData(res.data.data?.items ?? []);
                setIsLoading(false);
            }
            else {
                Alert.alert(res?.data.message ?? 'Error');
                setIsLoading(false);
            }
        });
        await notifycationService.getCountUnread({ userAccountId: Ultility.getUserInfo().id }).then(res => {
            if (res?.data.code === STATUS_REPONSE_API.OK) {
                setDataUnread(res.data.data ?? 0);
                setIsLoading(false);
            }
            else {
                Alert.alert(res?.data.message ?? 'Error');
                setIsLoading(false);
            }
        })
    }

    const LeftSwipeActions = () => {
        return (
            <View
                style={{ flex: 1, justifyContent: 'center' }}
            >
                <Text
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        backgroundColor: '#ccffbd',
                        marginBottom: 10,
                        borderRadius: 10
                    }}
                >
                    Đánh dấu đã đọc
                </Text>
            </View>
        );
    };
    const swipeFromLeftOpen = async (item: NotifycationEntity) => {
        if (!item.isRead) {
            let req = {
                id: item.id,
                userAccountId: Ultility.getUserInfo().id,
                isRead: true
            };
            await notifycationService.readNotify(req).then(res => {
                if (res?.data.code === STATUS_REPONSE_API.OK) {
                    setIsLoading(false);
                    setData((prevNotifies) =>
                        prevNotifies.map((noti) =>
                            noti.id === req.id ? { ...noti, isRead: !noti.isRead } : noti
                        )
                    );
                    setDataUnread(dataUnread > 0 ? dataUnread - 1 : 0);
                }
                else {
                    Alert.alert(res?.data.message ?? 'Error');
                    setIsLoading(false);
                }
            });
        }
    };

    const loadMore = () => {

    }

    const renderItem = ({ item }: any) => {
        return (
            <Swipeable
                renderLeftActions={LeftSwipeActions}
                onSwipeableLeftOpen={() => swipeFromLeftOpen(item)}
            >
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        backgroundColor: item.isRead ? '#FE2083' : 'rgb(223 168 182)',
                        marginBottom: 10,
                        borderRadius: 10
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '60%', flexDirection: 'row' }}>
                            <Icon color='#FFFFFF' source={'bell'} size={15}></Icon>
                            <Text style={{ fontSize: 13, color: '#FFF', fontWeight: 'bold', marginLeft: 5 }} >
                                {item.message}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 13, color: '#FFF' }} >
                                {Ultility.formatDistanceToNow(item.createdAt)}
                            </Text>
                        </View>
                    </View>
                </View>
            </Swipeable>
        )
    }


    useEffect(() => {
        if (isFocused) {
            getData();
        }
        return () => {
            console.log('Component will unmount. Clean-up if needed.');
        };
    }, [isFocused]);

    return (
        <SafeAreaView style={notifycationStyles.container}>
            <Image source={ImageAssets.Bg_Image} style={notifycationStyles.bgImage} />
            <View style={notifycationStyles.containerContent}>
                <Text style={notifycationStyles.textHeader}>Thông báo ({dataUnread})</Text>
            </View>
            {isLoading ? <ActivityIndicator animating={true} color='#FE2083' /> : <></>}
            <FlatList
                data={data}
                keyExtractor={(item) => item?.id ?? ''}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                renderItem={renderItem}
            />
        </SafeAreaView>

    );
};

export default NotifycationScreen;