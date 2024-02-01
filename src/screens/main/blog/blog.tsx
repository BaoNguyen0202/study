import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { UserBlogEntity } from "../../../model/blog-entity";
import { Alert, Image, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Appbar, Avatar, Icon } from "react-native-paper";
import { styles } from "../../discover/discover.style";
import { Ultility } from "../../../common/ultility";
import { CONFIG_URL, SCREEN_CONSTANT, STATUS_REPONSE_API } from "../../../config/configuration";
import { ImageAssets } from "../../../assets";
import { blogStyles } from "./blog.style";
import { favoriteCategoryStyles } from "../favorite-category/favorite-category.style";
import { HEIGHT } from "../../../common/constant";
import { Common } from "../../../utils";
import { RatingBlogEntity, RatingBlogEntitySearch } from "../../../model/rating-blog-entity";
import { PaginationEntity } from "../../../model/pagination-entity";
import { BlogService } from "../../../service/blog-service";
import { homeStyles } from "../../home/home.style";

const BlogScreen = ({ navigation }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const route = useRoute();
    const [data, setData] = useState<UserBlogEntity | null | undefined>(route.params);
    const [dataRating, setDataRating] = useState<RatingBlogEntity[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const blogService = new BlogService();

    const ratingSearch: RatingBlogEntitySearch = {
        id: null,
        createdAt: null,
        createdBy: null,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
        deletedBy: null,
        isSoftDeleted: null,
        searchString: null,
        blogId: data?.id,
        userAccountId: Ultility.getUserInfo().id,
        pagingAndSortingModel: new PaginationEntity,
    }

    const deleteBlog = async () => {
        console.log(data?.id);
    }
    const saveFavoriteBlog = async () => {
        setData(data);
        Alert.alert('Thao tác thành công');
    }
    const handleStartPlaying = async () => {
        await Common.dismissKeyboard(() => {
            navigation.navigate(SCREEN_CONSTANT.RECORD_PLAYER, data);
        });
    };

    const getDataRating = async () => {
        setIsLoading(true);
        ratingSearch.pagingAndSortingModel.pageIndex = pageIndex;
        ratingSearch.pagingAndSortingModel.pageSize = pageSize;
        ratingSearch.pagingAndSortingModel.orderColumn = 'CreatedAt';
        ratingSearch.pagingAndSortingModel.orderDirection = 'desc';
        await blogService.getListRating(ratingSearch).then(res => {
            if (res?.data.code === STATUS_REPONSE_API.OK) {
                setDataRating(res.data.data?.items ?? []);
                console.log(ratingSearch);
                setIsLoading(false);
            }
            else {
                Alert.alert(res?.data.message ?? 'Error');
                setIsLoading(false);
            }
        });
    }

    const loadMoreRating = async () => {
        setPageSize(pageSize + 1);
        getDataRating();
        console.log('Load more ' + pageSize)
    }

    const renderBlogTextContent = (text: string) => {
        return (
            <View>
                <Text style={homeStyles.commentText}> {(text ?? '').length > 200 ? text?.substring(0, 200) + '...' : text} {(text ?? '').length > 200 && <Text style={[homeStyles.commentText, { fontWeight: '800' }]}> Xem thêm</Text>}</Text>
            </View>
        )
    }

    useEffect(() => {
        getDataRating();
        return () => {
            console.log('Component will unmount. Clean-up if needed.');
        };
    }, []);

    const renderRating = () => {
        return (
            dataRating.length > 0 ?
                <>
                    {dataRating.map((rating) => (
                        <View key={rating.id}>
                            <View style={styles.row}>
                                <Avatar.Image source={rating.isIncognito ? require(`../../../assets/images/avatar.png`) : { uri: CONFIG_URL.URL_UPLOAD + rating.userAccount?.image ?? '' }} size={40} />
                                <View style={blogStyles.commentBox}>
                                    <View style={[styles.row, styles.spcabetwen, { marginBottom: 5 }]}>
                                        <View style={styles.row}>
                                            <Text style={[styles.text, { fontSize: 14 }]}>{rating?.displayName}</Text>
                                            {data?.incognitoName && (
                                                <View style={{ justifyContent: 'center', marginLeft: 4 }}>
                                                    <Icon color='#FFF' source={'check-decagram'} size={14} />
                                                </View>
                                            )}
                                        </View>
                                        <Text style={styles.date}> {Ultility.formatDistanceToNow(data?.createdAt)}</Text>
                                    </View>
                                    {renderBlogTextContent(rating.comment ?? '')}
                                </View>
                            </View>
                            <View style={[styles.footer, { marginTop: 12, marginLeft: 30 + 16 }]}>
                                <View style={[styles.row, styles.spcabetwen]}>
                                    <View style={[styles.row, { alignSelf: 'center' }]}>
                                        <View style={styles.row}>
                                            <Icon color={data?.selected ? '#FE2083' : '#FFFFFF'} source={'cards-heart'} size={14} />
                                            <Text style={[styles.text, styles.feedback]}>{data?.totalLike}</Text>
                                        </View>
                                        <View style={[styles.row, { marginLeft: 8 }]}>
                                            <Icon color='#FFFFFF' source={'dots-horizontal-circle'} size={14} />
                                            <Text style={[styles.text, styles.feedback]}>Phản hồi</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </>
                : <></>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[blogStyles.containerItem, { height: HEIGHT / 14, marginBottom: 20 }]}>
                <Appbar.Header style={favoriteCategoryStyles.header}>
                    <View style={favoriteCategoryStyles.titleContainer}>
                        <TouchableOpacity style={favoriteCategoryStyles.iconheader} onPress={() => navigation.goBack()}>
                            <Icon source={'chevron-left'} color="#FFF" size={24} />
                        </TouchableOpacity>
                        <Text style={[favoriteCategoryStyles.appbarText, { textAlign: 'center' }]}>{data?.isIncognito ? data?.incognitoName : data?.fullName}</Text>
                        <Avatar.Image source={{ uri: CONFIG_URL.URL_UPLOAD + Ultility.getUserInfo().image ?? '' }} size={40} />
                    </View>
                </Appbar.Header>
            </View>
            <Image source={ImageAssets.Bg_Image} style={styles.bgImage} />
            <View style={blogStyles.containerItem}>
                {data?.userAccountId == Ultility.getUserInfo().id && (
                    <View style={[styles.row, styles.spcabetwen, { marginBottom: 5 }]}>
                        <View style={styles.row}>
                        </View>
                        <TouchableOpacity onPress={() => deleteBlog()}>
                            <View>
                                <Icon color='#FFF' source={'delete'} size={17} />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                <View style={[styles.row, styles.spcabetwen]}>
                    <View style={styles.row}>
                        <Avatar.Image source={data?.isIncognito ? require(`../../../assets/images/avatar.png`) : { uri: CONFIG_URL.URL_UPLOAD + data?.avatar }} size={40} />
                        <View style={{ marginLeft: 8 }}>
                            <View style={styles.row}>
                                <Text style={[styles.text, { fontSize: 14 }]}>{data?.isIncognito ? data?.incognitoName : data?.fullName}</Text>
                                {data?.incognitoName && (
                                    <View style={{ justifyContent: 'center', marginLeft: 4 }}>
                                        <Icon color='#FFF' source={'check-decagram'} size={14} />
                                    </View>
                                )}
                            </View>
                            <Text style={[styles.text, { fontSize: 12, marginTop: 4 }]}>{data?.isIncognito ? 'Ẩn danh' : data?.userName}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.date}> {Ultility.formatDistanceToNow(data?.createdAt)}</Text>
                        <View style={styles.categoryName}>
                            <Text style={styles.text}>{data?.categoryName}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={[styles.text, styles.textContent]}>{data?.content}</Text>
                    {data?.type == 3 && data?.poster && (
                        < Image source={{ uri: CONFIG_URL.URL_UPLOAD + data?.poster }} style={styles.poster} />
                    )}
                </View>
                {data?.path && data?.type == 2 && (
                    <TouchableOpacity onPress={() => handleStartPlaying()}>
                        <View style={[styles.row, { backgroundColor: '#FFFFFF0D', height: 54, borderRadius: 12, marginBottom: 10 }]}>
                            <View style={[styles.leftPlay]}>
                                <ImageBackground
                                    source={{ uri: CONFIG_URL.URL_UPLOAD + data?.poster }}
                                >
                                    <View style={styles.polligon11}>
                                        <View style={styles.polligon10}>
                                        </View>
                                    </View>
                                </ImageBackground>
                                <Image source={ImageAssets.Polygon1} style={{ position: 'absolute' }} />
                            </View>
                            <View style={{ marginLeft: 8, marginVertical: 8 }}>
                                <Text style={[styles.text, { fontSize: 14, fontWeight: '500' }]}>{data.name}</Text>
                                <View style={[styles.row, { marginTop: 4 }]}>
                                    <Icon color='#C2C2C2' source={'volume-high'} size={14} />
                                    <Text style={[{ fontSize: 10, color: '#C2C2C2', justifyContent: 'center', marginLeft: 4 }, styles.feedback]}>00:00:00</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                <View style={styles.footer}>
                    <View style={[styles.row, styles.spcabetwen]}>
                        <View style={[styles.row, { alignSelf: 'center' }]}>
                            <View style={styles.row}>
                                <Icon color='#C2C2C2' source={'cards-heart'} size={14} />
                                <Text style={[styles.text, styles.feedback]}>{data?.totalLike}</Text>
                            </View>
                            <View style={[styles.row, { marginLeft: 8 }]}>
                                <Icon color='#C2C2C2' source={'dots-horizontal-circle'} size={14} />
                                <Text style={[styles.text, styles.feedback]}>{data?.totalComment}</Text>
                            </View>
                        </View>
                        <View style={data?.selected ? styles.favorite : styles.favoriteDefault} onTouchEnd={() => saveFavoriteBlog()}>
                            <Icon color='#FFF' source={'cards-heart'} size={14} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={blogStyles.line} />
            <View style={blogStyles.userComment}>
                {renderRating()}
            </View>
        </SafeAreaView>
    );
}

export default BlogScreen;