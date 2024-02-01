import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createBlogStyles } from './create-blog.style'
import { ImageAssets } from '../../../assets'
import { Avatar, Button, Checkbox, Icon, TextInput } from 'react-native-paper'
import { favoriteCategoryStyles } from '../favorite-category/favorite-category.style'
import { BlogEntity, UserBlogEntity } from '../../../model/blog-entity'
import { HEIGHT } from '../../../common/constant'
import Toast from 'react-native-toast-message'

const CreateBlogScreen = ({ navigation }: any) => {

    const [data, setData] = useState<BlogEntity>({});
    const postBlog = async () => {
        Toast.show({
            type: 'error',
            text1: 'Thông báo',
            text2: `Bài đăng của bạn đã được lưu. Chúng tôi sẽ duyệt và hiển thị`
        });
    }

    return (
        <SafeAreaView style={createBlogStyles.container}>
            <Image source={ImageAssets.Bg_Image} style={createBlogStyles.bgImage} />
            <View style={createBlogStyles.containerContent}>
                <View style={[createBlogStyles.header, createBlogStyles.row]}>
                    <TouchableOpacity style={favoriteCategoryStyles.iconheader} onPress={() => navigation.goBack()}>
                        <Icon source={'chevron-left'} color="#FFF" size={24} />
                    </TouchableOpacity>
                    <Text style={createBlogStyles.textHeader}>Bài đăng</Text>
                    <View style={[createBlogStyles.row]}>
                        <Avatar.Image source={ImageAssets.avatar} size={30} />
                    </View>
                </View>
                <View>
                    <Text style={createBlogStyles.label}>Title</Text>
                    <TextInput mode='outlined' label="Tên bài viết" value={data.name ?? ''} style={createBlogStyles.input} />
                    <Text style={createBlogStyles.label}>Nội dung</Text>
                    <TextInput mode='outlined' label="Nội dung" value={data.content ?? ''} style={createBlogStyles.textArea} />
                </View>
                <View style={createBlogStyles.container}>
                    <View style={createBlogStyles.inlineContainer}>
                        <Checkbox.Item color={data.isIncognito ? '#FE2083' : ''}
                            labelStyle={{ color: '#FFF', fontSize: 14 }} position='leading' label="Ẩn danh" status={data.isIncognito ? 'checked' : 'unchecked'} onPress={() => data.isIncognito = !data.isIncognito} />
                    </View>
                    <TextInput mode='outlined' label="Tên hiển thị" value={data.name ?? ''} style={createBlogStyles.input} />
                    <View style={createBlogStyles.inlineContainer}>
                        <Checkbox.Item color={data.isIncognito ? '#FE2083' : ''}
                            labelStyle={{ color: '#FFF', fontSize: 14 }} position='leading' label="Có hình ảnh" status={data.isIncognito ? 'checked' : 'unchecked'} onPress={() => data.isIncognito = !data.isIncognito} />
                    </View>
                    <Button icon="image" style={createBlogStyles.btnUploadImage} mode="contained" onPress={() => console.log('Pressed')}>
                        Tải lên từ thư viện
                    </Button>
                    <View style={{ width: '100%', height: HEIGHT / 5 }}>
                        <Image source={require('../../../assets/images/category_1.png')} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
                    </View>
                </View>
                <Button style={createBlogStyles.bottomButtonContainer} mode="contained" onPress={() => postBlog()}>
                    <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Đăng ngay</Text>
                </Button>
            </View>
        </SafeAreaView >
    )
}

export default CreateBlogScreen