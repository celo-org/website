import { StyleSheet, TextStyle } from 'react-native'


export enum colors {
    white = '#FFFFFF',
    navyBlue = '#0C74D4'
}

export enum typeFaces {
    futura = 'Jost, futura-pt, futura, sans-serif'
}


const fontDefaults = {
    textRendering: 'geometricPrecision',
    color: colors.white
}


export const fontInfo: Record<string, TextStyle> = {
    p: {
        fontFamily: typeFaces.futura,
        fontSize: 20,
        lineHeight: 28,
        ...fontDefaults
    }
}


export const fonts = StyleSheet.create(fontInfo)