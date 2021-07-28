import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import { useNavigation } from '@react-navigation/native';

interface Props{
    movie: Movie,
    height?: number,
    width?: number
}

export const MoviePoster = ({movie, height=420, width=300}:Props) => {

    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            style={{
                width, 
                height, 
                marginHorizontal:2,
                paddingBottom: 20,
                paddingHorizontal:7
                }}
            onPress={()=>navigation.navigate('DetailScreen', movie)}
            >
                
            <View style={styles.imagesContainer}>
                <Image
                    style={styles.image}
                    source={{uri}}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image:{
        flex:1,
        borderRadius: 18,

    },
    imagesContainer:{
        flex:1,
        borderRadius:18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        elevation:9
    }
});