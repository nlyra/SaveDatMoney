import { Platform, StyleSheet, Dimensions } from 'react-native';

export const colors = {
    primary: '#2ea44f',
    danger: '#F85757',
    warning: '#ffe700'
}

export const fonts = {
    sm: 10,
    md: 20,
    lg: 30,
    xl: 40,
}

export const padding = {
    sm: 10,
    md: 20,
    lg: 30,
    xl: 40,
}

export const buttons = StyleSheet.create({
    standard: {
        backgroundColor: colors.primary,
        height: 48,
        borderRadius: 5,
        justifyContent: "center",
        width: '20%',
        alignItems: 'center',
    },
    long: {
        backgroundColor: colors.primary,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: '35%',
    }
});