import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        alignItems: 'center'
    },
    bottomNav: {
        backgroundColor: '#2ea44f'
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
                width: '100%'
            },
            android: {
                width: '100%'
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
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalButtonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },

})
