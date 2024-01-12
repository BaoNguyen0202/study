import { InteractionManager, Keyboard } from 'react-native';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dismissKeyboard = async (func: () => void) => {
    await Keyboard.dismiss();
    await sleep(100);
    InteractionManager.runAfterInteractions(() => {
        if (typeof func === 'function') {
            func();
        }
    });
};
