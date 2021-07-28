import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { ActivityIndicator, Dimensions, Text, View,FlatList,ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';

const {width:windowWidth} = Dimensions.get('window');

export const HomeScreen = () => {

    
    const {peliculasEnCine, isLoading,peliculasPopulares,peliculasTop} = useMovies();
    const {top}  = useSafeAreaInsets();


    if(isLoading){
        return (
            <View style ={{flex:1, justifyContent:'center', alignContent:'center'}}>
                <ActivityIndicator color="red" size={100}/>
            </View>
        )
    }

    return (
        <ScrollView>
        <View style={{marginTop:top+20}}>
            {/* Carousel Principal */}
            <View style={{height:440}}>

            <Carousel
                data={peliculasEnCine}
                renderItem={({item}:any)=><MoviePoster movie={item}/>}
                sliderWidth={windowWidth}
                itemWidth={300}
                inactiveSlideOpacity={0.6}
            />
            </View>
            <HorizontalSlider title={'Top'} movies={peliculasTop}/>
            <HorizontalSlider title={'En cine'} movies={peliculasEnCine}/>
            <HorizontalSlider title={'Populares'} movies={peliculasPopulares}/>
            <HorizontalSlider movies={peliculasEnCine}/>
        </View>
        </ScrollView>
    )
}
