import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-store/store';
import { Appbar, Avatar, Button, Card, Icon, IconButton, Paragraph, Searchbar, Surface, Text, Title } from 'react-native-paper';
import { useTheme } from '@react-navigation/native'
import { CONFIG_URL } from '../../config/configuration';
import { HEIGHT } from '../../common/constant';

const HomeScreen = ({ navigation }: any) => {
    const { colors } = useTheme();
    const _handleMore = () => console.log('Shown more');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const _handleSearch = () => {
        setIsSearch(!isSearch);
    };
    return (
        <ScrollView style={{ flex: 1 }}>
            {isSearch ?
                <Searchbar
                    placeholder="Tìm kiếm theo tên, chủ đề"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                : <></>}
            <View style={styles.section}>
                <Appbar.Header style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.appbarText, { color: colors.text }]}>Trang chủ</Text>
                    </View>
                    <Appbar.Action icon="magnify" onPress={_handleSearch} color={colors.text} />
                    <Avatar.Image source={{ uri: CONFIG_URL.URL_UPLOAD }} size={30} />
                </Appbar.Header>
            </View>

            <View style={[styles.section, { height: HEIGHT / 7 }]}>
                <Card>
                    <Card.Cover source={require(`../../assets/images/img_slide1.png`)} style={{ height: '100%', width: '100%' }} />
                </Card>
            </View>
            <View style={[styles.section]}>
                <View style={[styles.titleContainer, { height: HEIGHT / 10 }]}>
                    <Text style={[styles.appbarText, { color: colors.text }]}>Podcast nổi bật</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.seeAllText}>Xem tất cả</Text>
                        <Icon color='#FE2083' source={'chevron-right'} size={24}></Icon>
                    </View>
                </View>
                <View style={{ flex: 1, height: HEIGHT / 4 }}>
                    <ScrollView horizontal style={{ flexDirection: 'row' }}>
                        <Surface style={styles.cardCustom} elevation={4}>
                            <Image
                                source={require(`../../assets/images/blog_test1.png`)}
                                style={styles.image}
                                alt='no image'
                            />

                            <View style={styles.cardContent}>
                                <Text style={{ color: colors.text, fontWeight: 'bold' }}>Dev và những người bạn</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon color={colors.text} source={'play'} size={18}></Icon>
                                    <Text style={{ color: colors.text }}> 00:05:00</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon color={colors.text} source={'heart'} size={16}></Icon>
                                        <Text style={{ color: colors.text }}> 100</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', bottom: 10 }}>
                                        <Icon color='#FE2083' source={'bookmark'} size={24}></Icon>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                        <Surface style={styles.cardCustom} elevation={4}>
                            <Image
                                source={require(`../../assets/images/blog_test2.png`)}
                                style={styles.image}
                                alt='no image'
                            />
                            <View style={styles.cardContent}>
                                <Text style={{ color: colors.text, fontWeight: 'bold' }}>Dev và những người bạn</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon color={colors.text} source={'play'} size={18}></Icon>
                                    <Text style={{ color: colors.text }}> 00:05:00</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon color={colors.text} source={'heart'} size={16}></Icon>
                                        <Text style={{ color: colors.text }}> 100</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', bottom: 10 }}>
                                        <Icon color='#FE2083' source={'bookmark'} size={24}></Icon>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                        <Surface style={styles.cardCustom} elevation={4}>
                            <Image
                                source={require(`../../assets/images/blog_test1.png`)}
                                style={styles.image}
                                alt='no image'
                            />
                            <View style={styles.cardContent}>
                                <Text style={{ color: colors.text, fontWeight: 'bold' }}>Dev và những người bạn</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon color={colors.text} source={'play'} size={18}></Icon>
                                    <Text style={{ color: colors.text }}> 00:05:00</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon color={colors.text} source={'heart'} size={16}></Icon>
                                        <Text style={{ color: colors.text }}> 100</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', bottom: 10 }}>
                                        <Icon color='#FE2083' source={'bookmark'} size={24}></Icon>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                    </ScrollView>
                </View>
            </View>
            <View style={[styles.section]}>
                <View style={[styles.titleContainer, { height: HEIGHT / 10 }]}>
                    <Text style={[styles.appbarText, { color: colors.text }]}>Chủ đề yêu thích</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.seeAllText}>Xem tất cả</Text>
                        <Icon color='red' source={'chevron-right'} size={24}></Icon>
                    </View>
                </View>
                <View style={{ flex: 1, height: HEIGHT / 4 }}>
                    <ScrollView horizontal style={{ flexDirection: 'row' }}>
                        <Surface style={styles.cardCustom} elevation={4}>
                            <Image
                                source={require(`../../assets/images/blog_test1.png`)}
                                style={styles.image}
                                alt='no image'
                            />
                            <View style={styles.cardContent}>
                                <Text style={{ color: colors.text, fontWeight: 'bold' }}>Dev và những người bạn</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon color={colors.text} source={'play'} size={18}></Icon>
                                    <Text style={{ color: colors.text }}> 00:05:00</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon color={colors.text} source={'heart'} size={16}></Icon>
                                        <Text style={{ color: colors.text }}> 100</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', bottom: 10 }}>
                                        <Icon color='#FE2083' source={'bookmark'} size={24}></Icon>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                        <Surface style={styles.cardCustom} elevation={4}>
                            <Image
                                source={require(`../../assets/images/blog_test2.png`)}
                                style={styles.image}
                                alt='no image'
                            />
                            <View style={styles.cardContent}>
                                <Text style={{ color: colors.text, fontWeight: 'bold' }}>Dev và những người bạn</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon color={colors.text} source={'play'} size={18}></Icon>
                                    <Text style={{ color: colors.text }}> 00:05:00</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon color={colors.text} source={'heart'} size={16}></Icon>
                                        <Text style={{ color: colors.text }}> 100</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', bottom: 10 }}>
                                        <Icon color='#FE2083' source={'bookmark'} size={24}></Icon>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                        <Surface style={styles.cardCustom} elevation={4}>
                            <Image
                                source={require(`../../assets/images/blog_test1.png`)}
                                style={styles.image}
                                alt='no image'
                            />
                            <View style={styles.cardContent}>
                                <Text style={{ color: colors.text, fontWeight: 'bold' }}>Dev và những người bạn</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon color={colors.text} source={'play'} size={18}></Icon>
                                    <Text style={{ color: colors.text }}> 00:05:00</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon color={colors.text} source={'heart'} size={16}></Icon>
                                        <Text style={{ color: colors.text }}> 100</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', bottom: 10 }}>
                                        <Icon color='#FE2083' source={'bookmark'} size={24}></Icon>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 16,
    },
    section: {
        width: '100%',
    },
    darkContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#000',
    },
    header: {
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
    },
    appbarText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    seeAllText: {
        flexDirection: 'row',
        color: '#FE2083'
    },
    cardCustom: {
        marginRight: 10,
        width: 150,
        borderRadius: 10,
        backgroundColor: '#2E1F3E',
    },
    cardContent: {
        padding: 5
    },
    image: {
        width: '100%',
        height: '90%',
        resizeMode: 'cover',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        flex: 1,
        top: 0
    },
});

export default HomeScreen;
