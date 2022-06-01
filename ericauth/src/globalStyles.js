import { Dimensions } from 'react-native';
import { createGlobalStyle } from 'styled-components';

export const colors = {
    white: '#ffffff',
    black: '#000000',
    navy1: '2F3A4D',
    navy2: '47546B',
    navy3: '61718B',
    navy4: '4C5A72',
    skyblue: '2D9CDB',
};

export const theme = {
    background: colors.black,
    text: colors.black,
};
// figma phone size: (width)375 * (height)667
export const basicDimensions = {
    height: 667,
    width: 375,
};

// 세로 변환 작업
export const height = (
    Dimensions.get('screen').height *
    (1 / basicDimensions.height)
    ).toFixed(2);

// 가로 변환 작업
export const width = (
    Dimensions.get('screen').width *
    (1 / basicDimensions.width)
    ).toFixed(2);

export default createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
    }
`;