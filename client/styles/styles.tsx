import {StyleSheet} from 'react-native'
import {colors, fonts, padding, margins} from './base'

export const styles = StyleSheet.create({
    // HEADERS & TEXT
    headerSmall: {
        fontSize: fonts.sm,
        fontFamily: fonts.bold,   
        marginBottom: margins.xs 
    },
    headerMedium: {
        fontSize: fonts.md,
        fontFamily: fonts.bold,   
        marginBottom: margins.xs,
        color: colors.blue_dark, 
    },
    headerLarge: {
        fontSize: fonts.lg,
        fontFamily: fonts.bold,
        marginBottom: margins.xs,
        color: colors.blue_dark, 
        
    },
    headerXLarge: {
        fontSize: fonts.xl,
        fontFamily: fonts.bold,
        marginBottom: margins.xs,
        color: colors.blue_dark 
    },
    textSmall: {
        fontSize: fonts.sm,
        color: colors.blue_dark,
        fontFamily: fonts.primary
    },
    textMedium: {
        fontSize: fonts.md,
        color: colors.blue_dark,
        fontFamily: fonts.primary
    },
    textLarge: {
        fontSize: fonts.lg,
        color: colors.blue_dark,
        fontFamily: fonts.primary
    },
    textHighlightXSmall: {
        fontSize: fonts.xs,
        color: colors.green,
        fontFamily: fonts.primary
    },
    textHighlightSmall: {
        fontSize: fonts.sm,
        color: colors.green,
        fontFamily: fonts.primary
    },
    textHightlightMedium: {
        fontSize: fonts.md,
        color: colors.green,
        fontFamily: fonts.primary
    },
    textHighlightLarge: {
        fontSize: fonts.lg,
        color: colors.green,
        fontFamily: fonts.primary
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
    textAvailable: {
        fontSize: fonts.md,
        color: colors.blue_dark,
    },
    textUnavailable: {
        fontSize: fonts.md,
        color: colors.gray_dark
    },
    textHighlightSmallItalic: {
        fontSize: fonts.sm,
        color: colors.green,
        fontFamily: fonts.italic
    },

    // CONTAINERS & WRAPPERS
    containerFlex: {
        flex: 1,
    },
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between', 
        height: 110,
        marginLeft: margins.lg, 
        marginRight: margins.lg
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
    containerColsNoPadding: {
        flexDirection: 'column',
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
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
    containerRowsNoPadding: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    listWrapperPadding: {
        flex: 1,
        padding: padding.md,
        alignContent: 'center',
        alignItems: 'center'
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
    popupContainer: {
        width: 200,
        height: 'auto',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    popupDisplayContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    textScrollContainer: {
        maxHeight: '100%', 
        bottom: 60, 
        maxWidth: '100%'
    },

    // SPACING & PADDING
    itemRowSpaceRight: {
        marginRight: margins.xs,
    },
    itemRowSpaceLeft: {
        marginLeft: margins.xs,
    },
    paddingMedium: {
        padding: padding.md,
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
        color: colors.blue_dark,
        fontFamily: fonts.primary
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
        justifyContent: 'center',
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
    buttonGreen: {
        backgroundColor: colors.green
    }, 
    buttonRed: {
        backgroundColor: colors.red
    },
    buttonGray: {
        backgroundColor: colors.gray_dark
    },
    buttonDisabled: {
        backgroundColor: colors.gray_dark,
        width: '50%',
        height: 40,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBottomText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: fonts.md,
        fontFamily: fonts.bold
    },
    buttonTop: {
        paddingTop: padding.sm,
        alignItems: 'center'
    },

    cameraButtons: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
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
    imgSizeLandscapeSmallRadius: {
        width: 120,
        height: 90, 
        borderRadius: 5
    },
    imgSizeLandscapeMediumRadius: {
        width: 130,
        height: 110, 
        borderRadius: 5
    },
    imgSizeLandscapeFullBleed: {
        width: '100%',
        height: '45%'
    }, 
    imgSizeBikePopup: {
        width: 160,
        height: 140,
        borderRadius: 5,
        marginBottom: margins.sm
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 40,
    },
    titleNamesContainer: {
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
      },
    titleLogo: {
        width: 240,
        height: 240
    },

    // Modal for report damages
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        flex: 1,
        maxHeight: '25%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: colors.red,
    },
    buttonClose: {
        backgroundColor: colors.red,
    },
    textStyle: {
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
    },
    dropdownWrapperModal: {
        zIndex: 100, 
        padding: 10
    },
    issueReportedText: {
        fontSize: 14,
        fontWeight: 'bold',
        alignItems: 'center', 
        color: colors.red
    },
    subHeaderAlert: {
        width: 296,
        height: 30,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 30,
        textAlign: 'justify',
        color: colors.red,
        flex: 0.8,
        flexDirection: 'row',
        marginLeft: 15,
    },
    componentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'justify',
        paddingVertical: 10,
    },
    buttonTextAlert: {
        color: colors.blue_dark,
        fontWeight: '700',
        fontSize: 16,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15,
    },
})