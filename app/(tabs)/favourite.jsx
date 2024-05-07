import AsyncStorage from '@react-native-async-storage/async-storage';
import MasonryList from "@react-native-seoul/masonry-list";
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from 'react-native-safe-area-context';

const Favourite = () => {

  const [favArray,setFavArray] = useState([])

  useEffect(() => {
   getFavoriteArray()

  }, []);

  const getFavoriteArray = async () => {
    try {
      const retrievedString = await AsyncStorage.getItem('favoriteRecipes');
      if (retrievedString !== null) {
        const parsedArray = JSON.parse(retrievedString);
       // console.log('Retrieved array:', parsedArray);
       setFavArray(parsedArray)
        // Use the parsedArray as needed in your components
      } else {
        console.log('No array found in storage');
       
      }
    } catch (error) {
      console.error('Error retrieving array:', error);
    }
  };   
  const removeFromFavorite = async (recipeIdMeal) => {
    const favoriteArray = await getFavoriteArray();
    const updatedFavoriteArray = favoriteArray.filter((recipe) => recipe.idMeal !== recipeIdMeal);
    try {
      await AsyncStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteArray));
      console.log('Array saved successfully');
    } catch (error) {
      console.error('Error saving array:', error);
    }
  };


  return (
    <SafeAreaView>
    <ScrollView className="px-2  space-y-3 bg-primary h-full">
    <Text className="text-white font-psemibold" style={{ fontSize: hp(3) }}>
      Favorite:
    </Text>
    <View>
      {favArray.length == 0 ? (
        <Text
          className="text-white font-psemibold text-center"
          style={{ fontSize: hp(2) }}
        >
          Recepies is Lodaing....
        </Text>
      ) : (
        <MasonryList
          data={favArray}
          keyExtractor={(item): string => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => <RecipeCard item={item} index={i} />}
          //   refreshing={isLoadingNext}
          //   onRefresh={() => refetch({ first: ITEM_CNT })}
          onEndReachedThreshold={0.1}
          //   onEndReached={() => loadNext(ITEM_CNT)}
        />
      )}
    </View>
  </ScrollView>
  </SafeAreaView>
  )
}

const RecipeCard = ({ item, index }) => {
  let isEven = index % 2 == 0;
  return (
  
    <View>
         
      <Pressable
        onPress={() => router.push({
            pathname: "/recipe/[recipeId]",
            params: { recipeId: item.idMeal },
        })}
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
       
        className="flex justify-center mb-4 space-y-1"
      >
       
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-gray-100 rounded-3xl"
        />

        <Text
          className="font-semibold ml-2 text-white"
          style={{ fontSize: hp(2) }}
        >
          {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + "..." : item.strMeal}
        </Text>
       
      </Pressable>
       
    </View>
   
  );
};

export default Favourite

const styles = StyleSheet.create({})