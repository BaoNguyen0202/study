import { StyleSheet } from "react-native";
import { HEIGHT, WIDTH } from "../../../common/constant";

export const blogStyles =
    StyleSheet.create({
        containerItem: {
            padding: 16
        },
        line: {
            borderBottomColor: '#3F345B',
            borderBottomWidth: 1,
            marginLeft: 16,
            marginRight: 16,
        },
        commentText: {
            fontSize: 14,
            lineHeight: 20,
            color: '#FFFFFF',
        },
        userComment: {
            padding: 16,
            // flexDirection: 'row'
        },
        commentBox: {
            color: '#FFFFFF12',
            backgroundColor: '#2c263a',
            borderRadius: 16,
            paddingTop: 8,
            paddingBottom: 12,
            paddingLeft: 8,
            paddingRight: 12,
            marginLeft: 8,
            width: WIDTH - 16 - 30 - 16 - 8
        }
    });