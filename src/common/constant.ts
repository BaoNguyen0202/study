import { Dimensions } from "react-native";

interface DataConstant {
    id?: number;
    name?: string;
}

export const LIST_STATUS: DataConstant[] = [
    { id: 0, name: 'Trạng thái 0' },
    { id: 1, name: 'Trạng thái 1' },
    { id: 2, name: 'Trạng thái 2' },
];


export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;