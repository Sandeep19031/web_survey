import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../utils';


export default StyleSheet.create({
    wrapStyle:{
        flex:1,
        backgroundColor:Colors.headerBgLight,  
                          
    },
    wrapScreen:{
        flex:1,
        paddingTop:25,
        paddingHorizontal:16,
    },
    charcterLimit:{
        fontFamily:Fonts.regular,
        fontSize:12,
    },
    pagerView:{
        flex:1,
    },
    assetsHeader:{
        flexDirection:'row',
        paddingHorizontal:30,
        marginBottom:16,
    },
    idStyle:{
      width:25,
      alignItems:'center',
      justifyContent:'center'
    },
    idTextStyle:{
        fontFamily:Fonts.regular,
        fontSize:12,
        color:Colors.textlight,
    },
    nameStyle:{
        flex:1,
        marginLeft: 10
    },
    nameTextStyle:{
        fontFamily:Fonts.regular,
        fontSize:12,
        color:Colors.textlight,
    },
    typeStyle:{
        width:110,
    },
    typeTextStyle:{
        fontFamily:Fonts.regular,
        fontSize:12,
        color:Colors.textlight,
    },


})