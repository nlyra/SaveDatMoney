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
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
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
    }
})
