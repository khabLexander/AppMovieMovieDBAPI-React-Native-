import React from 'react'
import { View, Text,FlatList } from 'react-native';
import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import currencyFormatter from 'currency-formatter';
import { CastItem } from './CastItem';

interface Props{
    movieFull: MovieFull,
    cast: Cast[]
}

export const MovieDetails = ({movieFull, cast}:Props) => {
    return (
        <View style={{marginHorizontal:20}}>
            <View style={{flexDirection:'row'}}>

                <Icon
                    name="star-outline"
                    color="grey"
                    size={15}
                    style={{marginRight:10, paddingTop:1.5  }}
                />
                <Text>{movieFull.vote_average}</Text>

                <Text style={{marginLeft:5}}>
                    -{movieFull.genres.map(g => g.name).join(' ,')}
                </Text>
                
            </View>

            {/* Historia de la película */}
            <Text style={{
                fontSize:23,
                marginTop:10,
                fontWeight:'bold'
            }}>
                Historia
            </Text>
            <Text
                style={{fontSize:16}}
            >
                {movieFull.overview}
            </Text>

            <Text style={{
                fontSize:23,
                marginTop:10,
                fontWeight:'bold'
            }}>
                Presupuesto
            </Text>

            <Text style={{fontSize:18}}>
                {currencyFormatter.format(movieFull.budget,{code:'USD'}) }
            </Text>
            {/* Casting */}
            <View style={{marginTop:10, marginBottom:100}}>
            <Text style={{fontSize:23,marginTop:10,fontWeight:'bold',
                         marginHorizontal:5}}>
                Actores
            </Text>
                <FlatList
                    data={cast}
                    renderItem={({item})=>(<CastItem actor={item}/>)}
                    keyExtractor = {(item)=>item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{marginTop:10, height:70}}
                />
            </View>
        </View>
    )
}
