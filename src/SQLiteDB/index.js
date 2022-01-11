import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ToastAndroid, FlatList, Pressable } from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import CustomInput from './components/CustomInput'
import CustomError from './components/CustomError'
import CustomButton from './components/CustomButton'

const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default'
    },
    () => { },
    error => { console.log('Error: ', error) }
)

const AppScreen = () => {

    const [name, setname] = useState('')
    const [post, setpost] = useState('')
    const [age, setage] = useState(null)
    const [listItems, setlistItems] = useState([])

    const [nameError, setnameError] = useState('')
    const [postError, setpostError] = useState('')
    const [ageError, setageError] = useState('')

    useEffect(() => {
        createTable()
        getUsers()
    }, [])

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Users"
                + "(ID INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT, Post TEXT, Age INTEGER);"
            )
        })
    }

    const getUsers = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM  Users',
                [],
                (tx, results) => {
                    var temp = []
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i))
                    setlistItems(temp)
                }
            )
        })
    }

    const saveUser = () => {
        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO Users (Name, Post, Age) VALUES (?,?,?)",
                [name, post, age],
                (tx, results) => {
                    results.rowsAffected > 0 ? ToastAndroid.show('Saved Successfully', ToastAndroid.LONG) : ToastAndroid.show('Something went wrong', ToastAndroid.LONG)
                }
            )
        })
        setname('')
        setpost('')
        setage('')
        getUsers()
    }

    const deleteUser = (key) => {
        db.transaction(tx=>{
            tx.executeSql(
                "DELETE FROM Users WHERE ID=?",
                [key],
                (tx,results)=>{
                    results.rowsAffected>0? ToastAndroid.show('Deleted user of id '+ key, ToastAndroid.LONG) : ToastAndroid.show('Something went wrong', ToastAndroid.LONG)
                }
            )
        })
        getUsers()
    }

    let listItemView = (item) => {
        return (
            <View key={item.ID} style={{ backgroundColor: '#efefef', padding: 20, marginVertical: 5 }}>
                <Pressable onPress={()=>deleteUser(item.ID)}><Text style={{textAlign: 'right', fontSize: 18, fontWeight: 'bold'}}>x</Text></Pressable>
                <Text>Id: {item.ID}</Text>
                <Text>Name: {item.Name}</Text>
                <Text>Post: {item.Post}</Text>
                <Text>Age: {item.Age}</Text>
            </View>
        );
    };

    return (
        <View>
            <Text style={styles.head}>SQLite DB</Text>
            <CustomInput label="Name" placeholder="Enter your name" value={name}
                setValue={(n) => {
                    n == '' ? setnameError('Name is reqired') : setnameError('')
                    setname(n)
                }} />
            {nameError != '' ? <CustomError message={nameError} /> : null}

            <CustomInput label="Post" placeholder="Enter your post" value={post}
                setValue={(p) => {
                    p == '' ? setpostError('Post is reqired') : setpostError('')
                    setpost(p)
                }} />
            {postError != '' ? <CustomError message={postError} /> : null}

            <CustomInput label="Age" placeholder="Enter your age" value={age} type="numeric"
                setValue={(a) => {
                    a == '' ? setageError('Age is required') : setageError('')
                    setage(a)
                }} />
            {ageError != '' ? <CustomError message={ageError} /> : null}

            <CustomButton text="SAVE" onPress={saveUser} />
            <View style={styles.data}>
                <FlatList
                    data={listItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listItemView(item)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    head: {
        margin: 4,
        fontSize: 24,
        fontWeight: '500',
        color: '#5251b9',
        textAlign: 'center',
    },
    item: {
        backgroundColor: '#eef',
        padding: 8,
        marginTop: 14,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        color: '#000'
    },
    data: {
        height: '40%',
        padding: 10,
        marginTop: 8,
        borderWidth: 1,
        borderColor: 'gray'
    }
})

export default AppScreen
