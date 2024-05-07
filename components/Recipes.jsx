import MasonryList from "@react-native-seoul/masonry-list";
import { router } from 'expo-router';
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Recipes = ({ recipes }) => {
  return (
    <View className="mx-4 space-y-3">
      <Text className="text-white font-psemibold" style={{ fontSize: hp(3) }}>
        Recipes
      </Text>
      <View>
        {recipes.length == 0 ? (
          <Text
            className="text-white font-psemibold text-center"
            style={{ fontSize: hp(2) }}
          >
            Recepies is Lodaing....
          </Text>
        ) : (
          <MasonryList
            data={recipes}
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
    </View>
  );
};

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

export default Recipes;
