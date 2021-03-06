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
    setting: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 10,
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
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '2%',
        marginBottom: '2%'
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#d3d3d3',
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
        width: '80%',
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: colors.primary,
        height: 48,
        borderRadius: 5,
        justifyContent: "center",
        width: '80%',
        alignItems: 'center',
    },
    switch: {
        marginBottom: 10,
        marginRight: 10,
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
        width: '90%',
        backgroundColor: '#f2f2f2',
        marginTop: 0,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
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
    scrollView: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 10,
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
            width: '20%'
          }
      }),
      margin: 20,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 25,
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
    settingsModal: {
      ...Platform.select({
          ios: {
              width: '90%',
          },
          android: {
              width: '100%',
          },
          default: {
            // other platforms, web for example
            width: '20%'
          }
      }),
      margin: 20,
      backgroundColor: "white",
      borderRadius: 10,
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
        marginBottom: 15,
        textAlign: "right"
    },
    modalText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "left"
    },
    modalText2: {
      color: colors.primary,
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center"
    },
    modalTitle: {
        color: colors.primary,
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: "center"
    },
    modalButtons: {
        width: '100%',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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
    edit: {
        fontSize: 11,
        color: colors.primary,
        textDecorationLine: 'underline',
        marginBottom: 15,
        marginLeft: 20,
        textAlign: "left"
    }
});
