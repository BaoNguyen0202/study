import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-store/store';
import { Appbar, Avatar, Button, Card, Icon, IconButton, Paragraph, Surface, Text, Title } from 'react-native-paper';
import { useTheme } from '@react-navigation/native'
import { CONFIG_URL } from '../../config/configuration';

const HomeScreen = ({ navigation }: any) => {
    const { colors } = useTheme();
    const _handleSearch = () => console.log('Searching');
    const _handleMore = () => console.log('Shown more');

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Appbar.Header style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.appbarText, { color: colors.text }]}>Trang chủ</Text>
                    </View>
                    <Appbar.Action icon="magnify" onPress={_handleSearch} color={colors.text} />
                    <Avatar.Image source={{ uri: CONFIG_URL.URL_UPLOAD }} size={30} />
                </Appbar.Header>
            </View>
            <View style={[styles.section, { height: '15%' }]}>
                <Card>
                    <Card.Cover source={require(`../../assets/images/img_slide1.png`)} style={{ height: '100%', width: '100%' }} />
                </Card>
            </View>
            <View style={[styles.section, { height: '25%' }]}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.appbarText, { color: colors.text }]}>Podcast nổi bật</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.seeAllText}>Xem tất cả</Text>
                        <Icon color='red' source={'chevron-right'} size={24}></Icon>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <ScrollView horizontal style={{ flexDirection: 'row' }}>
                        <Surface style={styles.cardCustom} elevation={4}>
                            <Image
                                source={{ uri: 'https://picsum.photos/700' }}
                                style={styles.image}
                                alt='no image'
                            />
                        </Surface>
                    </ScrollView>
                </View>
            </View>
            <View style={[styles.section, { height: '25%' }]}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.appbarText, { color: colors.text }]}>Chủ đề ưa thích</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.seeAllText}>Xem tất cả</Text>
                        <Icon color='red' source={'chevron-right'} size={24}></Icon>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <ScrollView horizontal style={{ flexDirection: 'row' }}>

                    </ScrollView>
                </View>
            </View>
        </View>
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
        height: 'auto',
        marginRight: 10,
        width: 150,
    },
    image: {
        width: '100%',
        height: 'auto',
        resizeMode: 'cover',
    },
});

export default HomeScreen;
