import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  ClockIcon,
  FireIcon,
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import YoutubePlayer from "react-native-youtube-iframe";
import { images } from "../../constants";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Recipe = () => {
  const { recipeId } = useLocalSearchParams();
  const [recipe, setrecipe] = useState(null);
  const [isF,setIsF]=useState(false);


 

  const getRecipeDetails = async (recipeId) => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeId
      );
      //console.log(response.data.meals)
      if (response && response.data) {
        setrecipe(response.data.meals[0]);
        // console.log(recipe)
      }
    } catch (error) {
      console.log("error", error.messege);
    }
  };

  useEffect(() => {
    getRecipeDetails(recipeId);
    isitFavorite(recipeId);

  }, []);

  const getIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe[`strIngredient${i}`]) {
        ingredients.push(
          `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`
        );
      }
    }
    return ingredients;
  };

  const getYoutubeVideoId = (url) => {
    const regExp = /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=)?([^\s&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const getFavoriteArray = async () => {
    try {
      const retrievedString = await AsyncStorage.getItem('favoriteRecipes');
      if (retrievedString !== null) {
        const parsedArray = JSON.parse(retrievedString);
       // console.log('Retrieved array:', parsedArray);
        return parsedArray;
        // Use the parsedArray as needed in your components
      } else {
        console.log('No array found in storage');
        return [];
      }
    } catch (error) {
      console.error('Error retrieving array:', error);
    }
  };    

  const addToFavorite = async (newRecipe) => {
    const favoriteArray = await getFavoriteArray();
    const updatedFavoriteArray = [...favoriteArray, newRecipe];
    try {
      await AsyncStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteArray));
      console.log('Array saved successfully');
    } catch (error) {
      console.error('Error saving array:', error);
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

  const isitFavorite =  async(recipeIdMeal) => {
    //console.log(recipeIdMeal);
    const favoriteArray = await  getFavoriteArray();
    //console.log(favoriteArray)
   //const favorite= [];
    for (let i = 0; i < favoriteArray.length; i++) {
      console.log(i,"     ",favoriteArray[i].idMeal)
      if (favoriteArray[i].idMeal === recipeIdMeal) {
        setIsF(true);
      }
    }
    return false;
  };
  
  if (recipe === null) return null;


  //console.log(await isitFavorite(recipe.idMeal));
  // const isFav =  await isitFavorite(recipe.idMeal); 
  //const isFav =true;
  //console.log(isFav);
  

  return (
   
    <ScrollView
      className="flex-1 bg-primary"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 30 }}
    >
      <StatusBar style="light" />
      <View className="flex-row justify-center">
        <Image
          source={{ uri: recipe.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: hp(2),
          }}
        />
      </View>
      

      <View className="w-full absolute flex flex-row justify-between items-center pt-14">
        <TouchableOpacity
          className="p-1 rounded-full bg-black ml-5"
          onPress={() => router.back()}
        >
          <Image
            source={images.back_button}
            className="w-10 h-10  rounded-full"
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="-mr-7"
          onPress={() => {
            if ( isF) {
              removeFromFavorite(recipe.idMeal);
            } else {
               addToFavorite(recipe);
            }
          }}
        >
          <HeartIcon size={hp(6)} strokeWidth={4.5} color={isF ? "red" : "white" } />
          {console.log(isF)}
        </TouchableOpacity>
      </View>

      <View>
        <View>
          <Text className="text-white font-pbold" style={{ fontSize: hp(3) }}>
            {recipe.strMeal}
          </Text>
          <Text
            className="text-gray-300 font-pbold"
            style={{ fontSize: hp(2) }}
          >
            {recipe.strArea}322v
          </Text>
        </View>

        <View className="flex-row justify-around ">
          <View className="flex rounded-full bg-blue-300 p-4">
            <View className="bg-white rounded-full flex items-center justify-center">
              <ClockIcon size={hp(4)} strokeWidth={2.5} color="black" />
            </View>
            <View className="flex items-center py-2 space-y-1">
              <Text
                style={{ fontSize: hp(2) }}
                className="text-white font-pbold"
              >
                35
              </Text>
              <Text
                style={{ fontSize: hp(1.3) }}
                className="text-white font-pbold"
              >
                Mins
              </Text>
            </View>
          </View>
          <View className="flex rounded-full bg-blue-300 p-4">
            <View className="bg-white rounded-full flex items-center justify-center">
              <FireIcon size={hp(4)} strokeWidth={2.5} color="black" />
            </View>
            <View className="flex items-center py-2 space-y-1">
              <Text
                style={{ fontSize: hp(2) }}
                className="text-white font-pbold"
              >
                120
              </Text>
              <Text
                style={{ fontSize: hp(1.3) }}
                className="text-white font-pbold"
              >
                Cals
              </Text>
            </View>
          </View>
          <View className="flex rounded-full bg-blue-300 p-2">
            <View className="bg-white rounded-full flex items-center justify-center">
              <UsersIcon size={hp(4)} strokeWidth={2.5} color="black" />
            </View>
            <View className="flex items-center py-2 space-y-1">
              <Text
                style={{ fontSize: hp(2) }}
                className="text-white font-pbold"
              >
                03
              </Text>
              <Text
                style={{ fontSize: hp(1.3) }}
                className="text-white font-pbold"
              >
                Servings
              </Text>
            </View>
          </View>
          <View className="flex rounded-full bg-blue-300 p-4">
            <View className="bg-white rounded-full flex items-center justify-center">
              <Square3Stack3DIcon
                size={hp(4)}
                strokeWidth={2.5}
                color="black"
              />
            </View>
            <View className="flex items-center py-2 space-y-1">
              <Text
                style={{ fontSize: hp(2) }}
                className="text-white font-pbold"
              ></Text>
              <Text
                style={{ fontSize: hp(1.3) }}
                className="text-white font-pbold"
              >
                Easy
              </Text>
            </View>
          </View>
        </View>

        <View className="space-y-4">
          <Text style={{ fontSize: hp(2.8) }} className="text-white font-pbold mt-5">
            Ingredients :
          </Text>
          <View className="space-y-2 ml-3">
            {getIngredients(recipe).map((ingredient, index) => {
              return (
                <Text
                key={index}
                  style={{ fontSize: hp(2.3) }}
                  className="text-white font-pregular"
                >
                  {index + 1}. {ingredient}
                </Text>
              );
            })}
          </View>
        </View>

        <View className="space-y-4">
          <Text style={{ fontSize: hp(2.8) }} className="text-white font-pbold mt-5">
            Steps :
          </Text>
          
                <Text
                  style={{ fontSize: hp(2) }}
                  className="text-white font-plight"
                >
                  
                  {recipe.strInstructions.replace(/\n/g, "\n\n  ")}
                  </Text>

        </View>


        {/* video */}
        {
          recipe.strYoutube ? (
            <View className="space-y-4">
              <Text style={{ fontSize: hp(2.8) }} className="text-white font-pbold mt-5">
                Recipe Video :
              </Text>
              <View className="w-full h-60">
                <YoutubePlayer
                videoId={getYoutubeVideoId(recipe.strYoutube)}
                height={300}
                />
              </View>
            </View>) : null
        }


      </View>
    </ScrollView>
  );
};

export default Recipe;
