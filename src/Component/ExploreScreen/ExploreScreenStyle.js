import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../utils';


export default StyleSheet.create({
    wrapStyle: {
        flex: 1,
        backgroundColor: Colors.white,
        
    },
    wrapScreen: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingVertical: 25,
        paddingHorizontal: 16,
    },
    charcterLimit: {
        fontFamily: Fonts.regular,
        fontSize: 12,
    },
    pagerView: {
        flex: 1,
    },
    assetSingleHeader: {
        position: 'relative',
        paddingBottom: 0,
        marginBottom: 0,
        marginTop: 8,
        marginRight: 8,
        alignItems: 'flex-end',
        overflow: 'hidden'
    },
    assetSingleTextStyle: {
        fontFamily: Fonts.medium,
        fontSize: 18,
        color: Colors.textcolor,
    },
    hashBtn: {
        // position: 'absolute',
        // right: 0,
        // bottom: 0,
        marginVertical:2,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    addressTextStyle: {
        maxWidth: 120,
        fontSize: 13,
        color: Colors.addressColor,
        textDecorationLine: 'underline',
    },
    vwMedia: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 8,
        height: 300
    },
    indicatorStyle: {
        position: 'absolute',
        alignSelf: 'center',
        width: 30,
        height: 30
    },
    digitStyle: {
        backgroundColor: '#F6F6F6',
        borderWidth: 0
    },
    digitTextStyle: {
        color: '#606060',
        fontSize: 22,
        fontWeight: '400',
        fontFamily: Fonts.regular,
    },
    timeLabel: {
        color: '#9F9F9F',
        fontFamily: Fonts.regular,
        fontSize: 12,
    },
    separatorStyle: {
        color: '#606060',
        marginHorizontal: 8,
        fontWeight: '400',
        fontFamily: Fonts.regular,
        top: -13,
    },
})