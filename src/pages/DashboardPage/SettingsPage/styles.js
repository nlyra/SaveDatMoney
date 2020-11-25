import { Platform, StyleSheet } from 'react-native';
import { colors, padding, fonts, styles } from '../../stdStyles';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,

    },
    topContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 18
    },
    calendar: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    list: {
        flex: 2,
        flexDirection: 'row',
    },
    bodyContainer: {
        flex: 1,
        //width: '100%',
        alignItems: 'stretch'
    },
    bottomContainer: {
        flex: 3,
        width: '100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: '1%',
        marginBottom: '2%'
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    title: {
        alignItems: 'center'
    },
    logo: {
        flex: 1,
        height: 160,
        width: 140,
        alignSelf: "center",
        margin: 30
    },
    transactions: {
        textAlign: "center",
        marginRight: '30%',
        flexDirection: 'row',
        justifyContent: "space-evenly",
    },
    transactionText: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: '2%'
    },
    logoutButton: {
        backgroundColor: 'red',
        height: 48,
        borderRadius: 5,
        justifyContent: "center",
        width: '40%',
        alignItems: 'center',
    },
    date:{
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10
    },
    input: {
        height: 35,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f2f2f2',
        marginTop: 0,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 100,
        paddingLeft: 16,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    button: {
        color: 'red',
        flexDirection: 'row',
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#2ea44f",
        fontWeight: "bold",
        fontSize: 16
    },
    container: {
        padding: 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        padding: 25,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalView: {
      ...Platform.select({
          ios: {
              width: '90%',
              marginTop: 170,
          },
          android: {
              width: '100%',
              marginTop: 170,
          },
          default: {
            // other platforms, web for example
            width: '50%'
          }
      }),
      margin: 30,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: 'stretch',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.75,
      shadowRadius: 4.84,
      elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 25,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "gray",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "left"
    },
    modalText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "left"
    },
    modalButtons: {
        width: '100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: '2%',
        marginBottom: '2%',
        marginTop: '5%',
    },
    tableContainer: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    head:
    {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    text: {
        margin: 6
    },
    addContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '2%'
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        marginVertical: 8,
        flexDirection: 'column'
    },
    description: {
        fontSize: 15,
        fontWeight: "500",
        color: colors.primary,
    },
    category: {
        fontSize: 11,
        marginTop: 4,
    }
});
