import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import axios from 'axios';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../../components/Categories";
import Recipes from "../../components/Recipes";
import { images } from "../../constants";

const Home = () => {
  const [activeCategory,setActiveCategory] = useState('Beef')
  const [recipes,setrecipes] = useState([])
  const [categories,setcategories] = useState([])
   
  useEffect(() => {
    getCategories();
    getRecipes();
   
   
  }, [])
   const getCategories = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
     // console.log(response.data)
      if(response && response.data){
        setcategories(response.data.categories)
      }
      
    } catch (error) {
      console.log('error',error.messege)
    }
   }

   const getRecipes = async (category='Beef') => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c='+category);
      //console.log(response.data)
      if(response && response.data){
        setrecipes(response.data.meals)
      }
      
    } catch (error) {
      console.log('error',error.messege)
    }
   }

   const handleChangeCategory = (category) => {
    setrecipes([])
    setActiveCategory(category)
    getRecipes(category)

   }

  return (
    <View className="flex-1 bg-primary">
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={images.avatar}
            style={{ width: hp(6), height: hp(6) }}
            className="rounded-full"
          />
        </View>

        <View className="mx-4 space-y-2 mb-2">
          <Text
            style={{ fontSize: hp(2) }}
            className="text-white font-pregular "
          >
            Hello, John
          </Text>
          {/* <View>
        <Text  style={{fontSize:hp(4)}} className="text-white font-medium ">Make Your Own Food</Text>
        </View> */}
          <View>
            <Text
              style={{ fontSize: hp(4) }}
              className="text-white font-psemibold "
            >
              What would you like to cook today?
            </Text>
          </View>

          <View className="mx-4 flex-row items-center rounded-full bg-white p-[6px]">
            <TextInput
              placeholder="Search..."
              placeholderTextColor="gray"
              className="text-black font-pregular text-[16px] flex-1 pl-3 mb-1 tracking-wide"
            />
          </View>

          <View>
            {categories.length === 0 ? (
              <Text className="text-white text-center text-lg">Loading Categories Data...</Text>
            ) : (
              <Categories
              categories={categories}
             activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}
             />
            )}
          
          </View>

          <View className="">
            <Recipes recipes={recipes}/>

          </View>


        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
