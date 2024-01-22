import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-store/store';
import { Appbar, Avatar, Button, Card, Icon, IconButton, Paragraph, Searchbar, Surface, Text, Title } from 'react-native-paper';
import { useTheme } from '@react-navigation/native'
import { CONFIG_URL } from '../../config/configuration';
import { HEIGHT, WIDTH } from '../../common/constant';
import { homeStyles } from './home.style';

const HomeScreen = ({ navigation }: any) => {
    const { colors } = useTheme();
    const _handleMore = () => console.log('Shown more');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const _handleSearch = () => {
        setIsSearch(!isSearch);
    };

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#1A1429' }}>
            {isSearch ?
                <Searchbar
                    placeholder="Tìm kiếm theo tên, chủ đề"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                : <></>}
            <View style={homeStyles.section}>
                <Appbar.Header style={homeStyles.header}>
                    <View style={homeStyles.titleContainer}>
                        <Text style={[homeStyles.appbarText, { color: colors.text }]}>Trang chủ</Text>
                    </View>
                    <Appbar.Action icon="magnify" onPress={_handleSearch} color={colors.text} />
                    {/* <Avatar.Image source={{ uri: CONFIG_URL.URL_UPLOAD }} size={30} /> */}
                    <Avatar.Image source={require(`../../assets/images/avatar.png`)} size={30} />
                </Appbar.Header>
            </View>

            <View style={[homeStyles.section, { height: HEIGHT / 5.7 }]}>
                <Card>
                    <Card.Cover source={require(`../../assets/images/Frame7.png`)} style={{ height: '100%', width: '100%' }} />
                </Card>
            </View>
            <View style={[homeStyles.section]}>
                <View style={[homeStyles.titleContainer, { height: HEIGHT / 10 }]}>
                    <Text style={[homeStyles.appbarText, { color: colors.text }]}>Danh sách chủ đề</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={homeStyles.seeAllText}>Xem tất cả</Text>
                        <Icon color='red' source={'chevron-right'} size={24}></Icon>
                    </View>
                </View>
                <View style={{ flex: 1, height: HEIGHT / 5 }}>
                    <ScrollView horizontal style={{ flexDirection: 'row' }}>
                        <Surface style={homeStyles.cardCustom} elevation={4}>
                            <ImageBackground
                                source={require(`../../assets/images/category_1.png`)}
                                style={homeStyles.backgroundImage}
                            >
                                <View style={{ position: 'absolute', top: 0, right: 0, padding: 10, backgroundColor: '#FE2083', borderRadius: 20, margin: 5 }}>
                                    <Icon color='#FFFFFF' source={'bookmark'} size={18}></Icon>
                                </View>
                                <View style={homeStyles.paper}>
                                    <View style={homeStyles.nameCategory}>
                                        <Text style={[homeStyles.centeredText, { color: colors.text }]}>
                                            Review Công ty
                                        </Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </Surface>
                        <Surface style={homeStyles.cardCustom} elevation={4}>
                            <ImageBackground
                                source={require(`../../assets/images/category_2.jpg`)}
                                style={homeStyles.backgroundImage}
                            >
                                <View style={{ position: 'absolute', top: 0, right: 0, padding: 10, backgroundColor: '#000000', borderRadius: 20, margin: 5 }}>
                                    <Icon color='#FFFFFF' source={'bookmark'} size={18}></Icon>
                                </View>
                                <View style={homeStyles.paper}>
                                    <View style={homeStyles.nameCategory}>
                                        <Text style={[homeStyles.centeredText, { color: colors.text }]}>
                                            Review Game
                                        </Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </Surface>
                        <Surface style={homeStyles.cardCustom} elevation={4}>
                            <ImageBackground
                                source={require(`../../assets/images/category_3.jpg`)}
                                style={homeStyles.backgroundImage}
                            >
                                <View style={{ position: 'absolute', top: 0, right: 0, padding: 10, backgroundColor: '#FE2083', borderRadius: 20, margin: 5 }}>
                                    <Icon color='#FFFFFF' source={'bookmark'} size={18}></Icon>
                                </View>
                                <View style={homeStyles.paper}>
                                    <View style={homeStyles.nameCategory}>
                                        <Text style={[homeStyles.centeredText, { color: colors.text }]}>
                                            Review Sách
                                        </Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </Surface>
                    </ScrollView>
                </View>
            </View>
            <View style={[homeStyles.section]}>
                <View style={[homeStyles.titleContainer, { height: HEIGHT / 10 }]}>
                    <Text style={[homeStyles.appbarText, { color: colors.text }]}>Podcast nổi bật</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={homeStyles.seeAllText}>Xem tất cả</Text>
                        <Icon color='#FE2083' source={'chevron-right'} size={24}></Icon>
                    </View>
                </View>
                <View style={{ flex: 1, height: HEIGHT / 4 }}>
                    <ScrollView horizontal style={{ flexDirection: 'row' }}>
                        <Surface style={homeStyles.cardCustom} elevation={4}>
                            <Image
                                source={require(`../../assets/images/blog_test1.png`)}
                                style={homeStyles.image}
                                alt='no image'
                            />

                            <View style={homeStyles.cardContent}>
                                <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 14 }}>Dev và những người bạn</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon color={colors.text} source={'play'} size={18}></Icon>
                                    <Text style={{ color: colors.text }}> 00:05:00</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon color={colors.text} source={'heart'} size={16}></Icon>
                                        <Text style={{ color: colors.text }}> 100</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', bottom: 10, backgroundColor: '#FE2083', borderRadius: 20, padding: 7 }}>
                                        <Icon color='#FFFFFF' source={'heart'} size={16}></Icon>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                        <Surface style={homeStyles.cardCustom} elevation={4}>
                            <Image
                                source={require(`../../assets/images/blog_test2.png`)}
                                style={homeStyles.image}
                                alt='no image'
                            />
                            <View style={homeStyles.cardContent}>
                                <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 14 }}>Dev và những người bạn</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon color={colors.text} source={'play'} size={18}></Icon>
                                    <Text style={{ color: colors.text }}> 00:05:00</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon color={colors.text} source={'heart'} size={16}></Icon>
                                        <Text style={{ color: colors.text }}> 100</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', bottom: 10, backgroundColor: '#000000', borderRadius: 20, padding: 7 }}>
                                        <Icon color='#FFFFFF' source={'heart'} size={16}></Icon>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                        <Surface style={homeStyles.cardCustom} elevation={4}>
                            <Image
                                source={require(`../../assets/images/blog_test1.png`)}
                                style={homeStyles.image}
                                alt='no image'
                            />
                            <View style={homeStyles.cardContent}>
                                <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 14 }}>Dev và những người bạn</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon color={colors.text} source={'play'} size={18}></Icon>
                                    <Text style={{ color: colors.text }}> 00:05:00</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon color={colors.text} source={'heart'} size={16}></Icon>
                                        <Text style={{ color: colors.text }}> 100</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', bottom: 10, backgroundColor: '#FE2083', borderRadius: 20, padding: 7 }}>
                                        <Icon color='#FFFFFF' source={'heart'} size={16}></Icon>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                    </ScrollView>
                </View>
            </View>
            <View style={[homeStyles.section]}>
                <View style={[homeStyles.titleContainer, { height: HEIGHT / 10 }]}>
                    <Text style={[homeStyles.appbarText, { color: colors.text }]}>Bài đăng nổi bật</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={homeStyles.seeAllText}>Xem tất cả</Text>
                        <Icon color='#FE2083' source={'chevron-right'} size={24}></Icon>
                    </View>
                </View>
                <View style={{ flex: 1, height: HEIGHT / 4.5 }}>
                    <ScrollView horizontal style={{ flexDirection: 'row' }}>
                        <Surface style={homeStyles.cardCustomPost} elevation={4}>
                            <View style={homeStyles.cardContent}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Avatar.Image source={require(`../../assets/images/avatar.png`)} size={30} />
                                    <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 18 }}> Người vô hình </Text>
                                    <Avatar.Image source={require(`../../assets/images/Check.png`)} size={20} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: colors.text, marginLeft: 30 }}> Ẩn danh</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', bottom: 10, backgroundColor: '#000000', marginRight: 5, borderRadius: 10 }}>
                                        <Text style={{ color: colors.text, padding: 5 }}> Nói xấu công ty</Text>
                                    </View>
                                </View>
                                <Text style={[{ color: colors.text }, homeStyles.commentText]}> Xin chào, đây là review của tôi. Nói chung là công ty như shiet.</Text>
                                <View style={homeStyles.cardContent}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon color={colors.text} source={'heart'} size={16}></Icon>
                                            <Text style={{ color: colors.text }}> 100    </Text>

                                            <Icon color={colors.text} source={'comment'} size={16}></Icon>
                                            <Text style={{ color: colors.text }}> 125</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', bottom: 10, backgroundColor: '#FE2083', borderRadius: 20, padding: 7 }}>
                                            <Icon color='#FFFFFF' source={'heart'} size={16}></Icon>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                        <Surface style={homeStyles.cardCustomPost} elevation={4}>
                            <View style={homeStyles.cardContent}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Avatar.Image source={require(`../../assets/images/avatar.png`)} size={30} />
                                    <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 18 }}> Người vô hình </Text>
                                    <Avatar.Image source={require(`../../assets/images/Check.png`)} size={20} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: colors.text, marginLeft: 30 }}> Ẩn danh</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', bottom: 10, backgroundColor: '#000000', marginRight: 5, borderRadius: 10 }}>
                                        <Text style={{ color: colors.text, padding: 5 }}> Nói xấu công ty</Text>
                                    </View>
                                </View>
                                <Text style={[{ color: colors.text }, homeStyles.commentText]}> Xin chào, đây là review của tôi. Nói chung là công ty như shiet.</Text>
                                <View style={homeStyles.cardContent}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon color={colors.text} source={'heart'} size={16}></Icon>
                                            <Text style={{ color: colors.text }}> 100    </Text>

                                            <Icon color={colors.text} source={'comment'} size={16}></Icon>
                                            <Text style={{ color: colors.text }}> 125</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', bottom: 10, backgroundColor: '#000000', borderRadius: 20, padding: 7 }}>
                                            <Icon color='#FFFFFF' source={'heart'} size={16}></Icon>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                        <Surface style={homeStyles.cardCustomPost} elevation={4}>
                            <View style={homeStyles.cardContent}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Avatar.Image source={require(`../../assets/images/avatar.png`)} size={30} />
                                    <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 18 }}> Người vô hình </Text>
                                    <Avatar.Image source={require(`../../assets/images/Check.png`)} size={20} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: colors.text, marginLeft: 30 }}> Ẩn danh</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', bottom: 10, backgroundColor: '#000000', marginRight: 5, borderRadius: 10 }}>
                                        <Text style={{ color: colors.text, padding: 5 }}> Nói xấu công ty</Text>
                                    </View>
                                </View>
                                <Text style={[{ color: colors.text }, homeStyles.commentText]}> Xin chào, đây là review của tôi. Nói chung là công ty như shiet.</Text>
                                <View style={homeStyles.cardContent}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Icon color={colors.text} source={'heart'} size={16}></Icon>
                                            <Text style={{ color: colors.text }}> 100    </Text>

                                            <Icon color={colors.text} source={'comment'} size={16}></Icon>
                                            <Text style={{ color: colors.text }}> 125</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', bottom: 10, backgroundColor: '#FE2083', borderRadius: 20, padding: 7 }}>
                                            <Icon color='#FFFFFF' source={'heart'} size={16}></Icon>
                                        </View>
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

export default HomeScreen;
