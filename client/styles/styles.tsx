import {StyleSheet} from 'react-native'
import { color } from 'react-native-elements/dist/helpers'
import {colors, fonts, padding, margins} from './base'

export const styles = StyleSheet.create({
    // TEXT
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
    headerMediumWrapText: {
        maxWidth: 100,
        fontSize: fonts.md,
        // fontFamily: fonts.primary,   // TODO - install expo fonts
        fontWeight: 'bold',
        color: colors.blue_dark,
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
    textHighlightXSmall: {
        fontWeight: 'bold',
        fontSize: fonts.xs,
        color: colors.green,
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
    textInputForm: {
        color: colors.blue_dark,
        backgroundColor: colors.white,
        paddingHorizontal: padding.sm,
        paddingVertical: padding.sm,
        marginVertical: margins.xs,
        borderRadius: 10,
        marginTop: margins.xs,
    },

    // CONTAINERS
    container: {
        flex: 1,
        padding: padding.md,
        backgroundColor: colors.white
    },
    containerForm: {
        flex: 1,
        padding: padding.md,
        alignItems: 'center', 
        marginTop: margins.md
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
    containerColsSmallCard: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between', 
        alignItems: 'stretch',
        height: 90,
        marginLeft: margins.sm
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
        marginBottom: margins.sm, 
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
    containerRowsNoWrap: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
    },
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        backgroundColor: colors.gray_light,
        padding: padding.md,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: margins.md,
    },
    listWrapper: {
        flex: 1,
        paddingTop: padding.md,
        paddingHorizontal: padding.md,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center'
    },
    inputContainer: {
        paddingTop: padding.sm,
        width: '90%',
    },
    signedContainer: {
        alignItems: 'center',
        padding: padding.sm
    },

    // SPACING
    itemRowSpaceRight: {
        marginRight: margins.xs,
    },
    itemRowSpaceLeft: {
        marginLeft: margins.xs,
    },

    // ALIGNMENT
    centerJustify: {
        justifyContent: 'center'
    },
    centerAlign: {
        alignItems: 'center'
    },
    centerAlignText: {
        textAlign: 'center'
    },

    // DROPDOWN
    dropdownWrapper: {
        paddingTop: padding.md,
        paddingHorizontal: padding.md,
        zIndex: 100,
        marginBottom: margins.lg, 
    },
    dropdownWrapperNoPadding: {
        zIndex: 100, 
    },
    dropdownInputDark: {
        backgroundColor: colors.white,
        borderColor: colors.blue_dark,
        paddingHorizontal: padding.sm,
        paddingVertical: padding.sm,
        marginVertical: margins.xs,
        borderRadius: padding.sm,
        marginTop: margins.xs
    },
    dropdownInputLight: {
        backgroundColor: colors.white,
        borderColor: colors.gray_light,
        paddingHorizontal: padding.sm,
        paddingVertical: padding.sm,
        marginVertical: margins.xs,
        borderRadius: padding.sm,
        marginTop: margins.xs
    },
    dropdownText: {
        color: colors.blue_dark
    },
    dropdownLabelStyle: {
        color: colors.white
    },
    
    // SPINNERS AND LOADERS
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    splashContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },

    // BUTTONS
    buttonBottomContainer: {
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        padding: padding.md,
    },
    buttonBottom: {
        backgroundColor: colors.green,
        width: '50%',
        height: 40,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
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

    // ICONS
    iconGreen: {
        color: colors.green
    },
    iconBlue: {
        color: colors.blue_dark
    },
    iconGrayDark: {
        color: colors.gray_dark
    }, 

    // IMAGES
    imgSizeLandscapeSmall: {
        width: 120,
        height: 90
    },
    imgSizeLandscapeMedium: {
        width: 150,
        height: 120
    },
})