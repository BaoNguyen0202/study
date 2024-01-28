import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, FlatList, TouchableHighlight, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Card, Checkbox, Icon, Menu } from 'react-native-paper';
import { ImageAssets } from '../../assets';
import blog from '../../../blog.json';
import { UserBlogEntity } from '../../model/blog-entity';
import Sound from 'react-native-sound';
import { styles } from './discover.style';
import { Ultility } from '../../common/ultility';
import { CONFIG_URL } from '../../config/configuration';
import { HEIGHT } from '../../common/constant';

interface TypeCheckboxFilter {
    id: number,
    name: string,
    checked: boolean | null
}

const Discover = ({ navigation }: any) => {
    const [selectedButton, setSelectedButton] = useState('');
    const [selectedTab, setSelectedTab] = useState<string>('post');
    const [data, setData] = useState<UserBlogEntity | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [soundInstance, setSoundInstance] = useState<Sound | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAvatarMenuVisible, setAvatarMenuVisible] = useState(false);
    const listTypeCheckBoxFilter: TypeCheckboxFilter[] = [
        { id: 0, name: 'Văn bản', checked: true },
        { id: 2, name: 'Âm thanh', checked: true },
        { id: 3, name: 'Hình ảnh', checked: true },
    ]
    const [typeCheckBoxFilters, setDataCheckBoxFilter] = useState<TypeCheckboxFilter[]>(listTypeCheckBoxFilter);

    const handleAvatarClick = () => {
        setAvatarMenuVisible(!isAvatarMenuVisible);
    };

    const handleButtonPress = (value: string) => {
        setSelectedButton(value);
        setSelectedTab(value)
    };

    const handleStartPlaying = async (filePath: string) => {
        console.log(filePath);
        // navigation.navigate('', { filePath })
    };

    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.containerItem}>
                <View style={[styles.row, styles.spcabetwen]}>
                    <View style={styles.row}>
                        <Avatar.Image source={{ uri: item.avatar }} size={40} />
                        <View style={{ marginLeft: 8 }}>
                            <View style={styles.row}>
                                <Text style={[styles.text, { fontSize: 14 }]}>{item.isIncognito ? item.incognitoName : item.fullName}</Text>
                                {item.incognitoName && (
                                    <View style={{ justifyContent: 'center', marginLeft: 4 }}>
                                        <Icon color='#FFF' source={'check-decagram'} size={14} />
                                    </View>
                                )}
                            </View>
                            <Text style={[styles.text, { fontSize: 12, marginTop: 4 }]}>{item.isIncognito ? 'Ẩn danh' : item.userName}</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.date}> {Ultility.formatDistanceToNow(item.createdAt)}</Text>
                        <View style={styles.categoryName}>
                            <Text style={styles.text}>{item.categoryName}</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.content}>
                    <Text style={[styles.text, styles.textContent]}>{item.content}</Text>
                    {item.type == 3 && item.poster && (
                        < Image source={{ uri: CONFIG_URL.URL_UPLOAD + item.poster }} style={styles.poster} />
                    )}
                    {item.path && item.type == 2 && (
                        <TouchableOpacity onPress={() => handleStartPlaying(item.path)}>
                            <View style={[styles.row, { backgroundColor: '#FFFFFF0D', height: 54, borderRadius: 12, marginTop: 10 }]}>
                                <View style={[styles.leftPlay]}>
                                    <ImageBackground
                                        source={{ uri: CONFIG_URL.URL_UPLOAD + item.poster }}
                                    >
                                        <View style={styles.polligon11}>
                                            <View style={styles.polligon10}>
                                            </View>
                                        </View>
                                    </ImageBackground>
                                    <Image source={ImageAssets.Polygon1} style={{ position: 'absolute' }} />
                                </View>
                                <View style={{ marginLeft: 8, marginVertical: 8 }}>
                                    <Text style={[styles.text, { fontSize: 14, fontWeight: '500' }]}>Chửi công ty lofi cực chill</Text>
                                    <View style={[styles.row, { marginTop: 4 }]}>
                                        <Icon color='#C2C2C2' source={'volume-high'} size={14} />
                                        <Text style={[{ fontSize: 10, color: '#C2C2C2', justifyContent: 'center', marginLeft: 4 }, styles.feedback]}>00:00:00</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.footer}>
                    <View style={[styles.row, styles.spcabetwen]}>
                        <View style={[styles.row, { alignSelf: 'center' }]}>
                            <View style={styles.row}>
                                <Icon color='#C2C2C2' source={'cards-heart'} size={14} />
                                <Text style={[styles.text, styles.feedback]}>{item.totalLike}</Text>
                            </View>
                            <View style={[styles.row, { marginLeft: 8 }]}>
                                <Icon color='#C2C2C2' source={'dots-horizontal-circle'} size={14} />
                                <Text style={[styles.text, styles.feedback]}>{item.totalComment}</Text>
                            </View>
                        </View>
                        <View style={isFavorite ? styles.favorite : styles.favoriteDefault} onTouchEnd={() => setIsFavorite(!isFavorite)}>
                            <Icon color='#FFF' source={'cards-heart'} size={14} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    const renderContent = () => {
        let data = blog.data.items;

        switch (selectedTab) {
            case 'post':
                return <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            case 'hot':
                const dataHost = data.filter(item => item.code === '001');

                return <FlatList
                    data={dataHost}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            case 'slur':
                const dataSlur = data.filter(item => item.code === '002');

                return <FlatList
                    data={dataSlur}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            default:
                return null;
        }
    };
    useEffect(() => {
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={ImageAssets.Bg_Image} style={styles.bgImage} />
            <View style={styles.containerContent}>
                <View style={[styles.header, styles.row]}>
                    <Text style={styles.textHeader}>Bài đăng</Text>
                    <View style={[styles.row]}>
                        <TouchableOpacity onPress={() => handleAvatarClick()}>
                            <Avatar.Image style={{ backgroundColor: '#817a87', marginRight: 10 }} source={ImageAssets.filter} size={30} />
                        </TouchableOpacity>
                        <Avatar.Image source={ImageAssets.avatar} size={30} />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, selectedTab === 'post' && styles.selectedButton, { marginLeft: -6 }]}
                        onPress={() => handleButtonPress('post')}
                    >
                        <Text style={styles.buttonText}>Tất cả bài đăng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedTab === 'hot' && styles.selectedButton]}
                        onPress={() => handleButtonPress('hot')}
                    >
                        <Text style={styles.buttonText}>Nổi bật</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, selectedTab === 'slur' && styles.selectedButton]}
                        onPress={() => handleButtonPress('slur')}
                    >
                        <Text style={styles.buttonText}>Nói xấu công ty</Text>
                    </TouchableOpacity>
                </View>
                {renderContent()}
            </View>
            {isAvatarMenuVisible && (
                <View style={styles.menuContainer}>
                    <View style={styles.menuBg}>
                        {typeCheckBoxFilters.map((type) => (
                            <View style={styles.menuContent}>
                                <Checkbox.Android
                                    status={type.checked == true ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setDataCheckBoxFilter((prevTypes) =>
                                            prevTypes.map((c) =>
                                                c.id === type.id ? { ...c, checked: !c.checked } : c
                                            )
                                        );
                                    }}
                                    color={type.checked ? '#FE2083' : ''}
                                />
                                <Text style={styles.text}>{type.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </SafeAreaView >
    )
}


export default Discover