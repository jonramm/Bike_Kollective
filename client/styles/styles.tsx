import {StyleSheet} from 'react-native'
import {colors, fonts, padding, margins} from './base'

export const styles = StyleSheet.create({
    headerSmall: {
        fontSize: fonts.sm,
        // fontFamily: fonts.primary,   // TODO - install expo fonts
        fontWeight: 'bold',
        marginBottom: margins.xs 
    },
    headerMedium: {
        fontSize: fonts.md,
        // fontFamily: fonts.primary,   // TODO - install expo fonts
        fontWeight: 'bold',
        marginBottom: margins.xs,
        color: colors.blue_dark,
    },
    headerLarge: {
        fontSize: fonts.lg,
        // fontFamily: fonts.primary,   // TODO - install expo fonts
        fontWeight: 'bold',
        marginBottom: margins.xs,
        color: colors.blue_dark 
    },
    headerContainerXSmall: {
        marginBottom: margins.xs
    },
    headerContainerSmall: {
        marginBottom: margins.sm
    },
    headerContainerMedium: {
        marginBottom: margins.md
    },
    headerContainerLarge: {
        marginBottom: margins.lg
    },
    textSmall: {
        fontSize: fonts.sm,
        color: colors.blue_dark,
    },
    textMedium: {
        fontSize: fonts.md,
        color: colors.blue_dark,
    },
    textLarge: {
        fontSize: fonts.lg,
        color: colors.blue_dark,
    },
    textHighlightSmall: {
        fontWeight: 'bold',
        fontSize: fonts.sm,
        color: colors.green,
    },
    textHightlightMedium: {
        fontWeight: 'bold',
        fontSize: fonts.md,
        color: colors.green,
    },
    textHighlightLarge: {
        fontWeight: 'bold',
        fontSize: fonts.lg,
        color: colors.green,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    containerColsXSmall: {
        flexDirection: 'column',
        padding: padding.xs,
        justifyContent:'space-between'
    },
    containerColsSmall: {
        flexDirection: 'column',
        padding: padding.sm, 
        justifyContent:'space-between'
    },
    containerColsMedium: {
        flexDirection: 'column',
        padding: padding.md,
        justifyContent:'space-between'
    },
    containerColsLarge: {
        flexDirection: 'column',
        padding: padding.lg,
        justifyContent:'space-between'
    },
    containerRowsXSmall: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: margins.xs
    },
    containerRowsSmall: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: margins.sm
    },
    containerRowsMedium: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: margins.md
    },
    containerRowsLarge: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: margins.md
    },
    containerRowsFlexWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    cardContainer: {
        backgroundColor: colors.gray_light,
        padding: padding.md,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: margins.md,
    },
    itemRowSpaceRight: {
        marginRight: margins.xs,
    },
    itemRowSpaceLeft: {
        marginLeft: margins.xs,
    },
    centerJustify: {
        justifyContent: 'center'
    },
    centerAlign: {
        alignItems: 'center'
    },
    centerAlignText: {
        textAlign: 'center'
    },
    listWrapper: {
        paddingTop: padding.md,
        paddingHorizontal: padding.md
    },
    dropdownWrapper: {
        paddingTop: padding.md,
        paddingHorizontal: padding.md,
        zIndex: 100,
        marginBottom: margins.lg
    },
    dropdownInput: {
        backgroundColor: colors.white,
        paddingHorizontal: padding.sm,
        paddingVertical: padding.sm,
        marginVertical: margins.xs,
        borderRadius: padding.sm,
        marginTop: margins.xs
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    buttonBottomContainer: {
        width: '100%',
        marginTop: margins.xl
    },
    buttonBottom: {
        backgroundColor: colors.green,
        width: '100%',
        padding: padding.md,
        borderRadius: 30,
        alignItems: 'center'
    },
    buttonBottomText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: fonts.md
    },
    buttonTop: {
        paddingTop: padding.sm,
        alignItems: 'center'
    },
    iconGreen: {
        color: colors.green
    },
    iconBlue: {
        color: colors.blue_dark
    },
    iconGrayDark: {
        color: colors.gray_dark
    }, 
    imgSizeSmall: {
        width: 120,
        height: 90
    }
})