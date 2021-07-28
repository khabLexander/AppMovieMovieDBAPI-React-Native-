import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Image, StyleSheet, Text, View, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackParams } from '../navigation/Navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';
import { useNavigation } from '@react-navigation/native';
const screenHeigth= Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams,'DetailScreen'>{};

export const DetailScreen = ({route}:Props) => {

    //Asi sin tener un control solo tratar la información
    //enviada como una interface que creamos
    // const movie =  route.params as Movie;

    //Asi cuand ya se tiene un control desde el navigation
    // de la información que se envia a los componentes
    // asi sabemos que argumentos se reciben como funciona 
    // la navegación
    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const {isLoading, movieFull, cast} = useMovieDetails(movie.id);

    const navigation = useNavigation();

    return (

        <ScrollView>

            <View style={styles.imagesContainer}>

                     <Image
                        style={styles.posterImage}
                        source={{uri}}
                    />

            </View>
            <View style={styles.marginContainer}>
                <Text style={styles.subTitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>
                {
                    isLoading?
                    <ActivityIndicator size={30} color={'green'} style={{marginTop:20}}/>
                    :
                    <MovieDetails movieFull={movieFull!} cast={cast}/>
                }
                {/* <Icon name="star-outline" size={30} color="#900"/> */}
                <View style={styles.arrowBack}>
                <TouchableOpacity
                    onPress={()=>navigation.goBack()}    
                >
                    <Icon 
                        name="arrow-back-outline" 
                        size={50} 
                        color='#e0dada'
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    imagesContainer:{
        width:'100%',
        height: screenHeigth*0.75
    },
    posterImage:{
        flex:1,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
    },
    marginContainer:{
        marginHorizontal:20,
        marginTop:20
    },
    subTitle:{
        fontSize:16,
        opacity:0.8
    },
    title:{
        fontSize:20,
        fontWeight:'bold' 
    },
    arrowBack:{
        position:'absolute',
        top:20,
        left:10
    }
});
