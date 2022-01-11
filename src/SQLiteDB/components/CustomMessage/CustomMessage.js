import React from 'react'
import { View, Text, Modal, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const CustomMessage = ({message, visible}) => {
    return (
        <Modal transparent={true} visible={visible}>
            <View style={styles.modalbg}>
                <View style={styles.messagebg}>
                    <ActivityIndicator size={30} color='green' animating={true}/>
                    <Text style={styles.messagetxt}>{message}</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalbg:{backgroundColor:"#000000aa", flex:1},
    messagebg:{alignItems :'center',backgroundColor:"#fff", marginVertical:260, marginHorizontal: 60, padding:20, flex:1, borderRadius:10, flexDirection:'row',alignSelf:'center'},
    messagetxt:{fontSize: 20, marginLeft:14}
})

export default CustomMessage
