import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../utils';


export default StyleSheet.create({
    wrapStyle:{
        flex:1,
        backgroundColor:Colors.white,                  
    },
    responseSuccess:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal: 20
    },
    titleTextStyle:{
        fontFamily:Fonts.medium,
        fontSize:24,
        color:Colors.textcolor
    },
    textStyle:{
        fontFamily:Fonts.regular,
        fontSize:16,
        color:Colors.textlight,
        textAlign: 'center'
    },
    doneButtonStyle:{
        paddingHorizontal:16,
        marginBottom:40,
    }
    


})