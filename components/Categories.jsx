import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Categories = ({categories,activeCategory, handleChangeCategory}) => {
   // console.log(categories)

  return (
    <View>
     <ScrollView
     horizontal
     showsHorizontalScrollIndicator={false}
     className="space-x-4"
     contentContainerStyle={{ paddingHorizontal: 15 }}
     >
        {
          categories.map((cat,index) => {
            let isActive = cat.strCategory === activeCategory;
            let activeButtonClass = isActive ? "bg-amber-500" : "bg-gray-100";
            return (
                <TouchableOpacity
                key={index}
                onPress={() => handleChangeCategory(cat.strCategory)}
                className={"flex items-center justify-center rounded-lg "+activeButtonClass}
                >
                    <View className={"rounded-full p-[6px]"+activeButtonClass}>
                        <Image
                        source={{uri:cat.strCategoryThumb}}
                        style = {{width:hp(8), height:hp(8)}}
                        className="rounded-full"
                        />

                    </View>
                    <View>
                        <Text className="text-center font-pmedium text-white">
                            {cat.strCategory}
                        </Text>
                    </View>
                </TouchableOpacity>
            )

          })
        }


     </ScrollView>
    </View>
  )
}

export default Categories