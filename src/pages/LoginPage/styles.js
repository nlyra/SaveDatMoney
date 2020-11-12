import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "center",
        width: '100%',
        ...Platform.select({
            ios: {
                width: '100%'
            },
            android: {
                width: '100%'
            },
            default: {
              // other platforms, web for example
              width: '25%'
            }
          }),
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
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#2ea44f',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    modalButton: {
        backgroundColor: '#2ea44f',
        paddingLeft: 30,
        paddingRight: 30,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        margin: 5
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 10
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
    modalView: {
        alignSelf: "center",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 9,
        ...Platform.select({
            ios: {
                width: '100%'
            },
            android: {
                width: '100%'
            },
            default: {
              // other platforms, web for example
              width: '25%'
            }
          })
      },
    modalButtonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    messageText: {
        fontSize: 16,
        color: "black",
        paddingLeft: 20
    },
    insideModalView: {
        ...Platform.select({
            ios: {
                width: '100%'
            },
            android: {
                width: '100%'
            },
            default: {
              // other platforms, web for example
              width: '100%'
            }
          }),
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 30,
          paddingRight: 30,
          marginTop: 20
    }
})
