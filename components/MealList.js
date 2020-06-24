import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { useSelector } from "react-redux";

import MealItem from "./MealItem";

const MealList = (props) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  const gotoMealDetail = (mealId, mealtTitle, isFav) => {
    props.navigation.navigate({
      routeName: "MealDetail",
      params: {
        mealId: mealId,
        mealtTitle: mealtTitle,
        isFav: isFav,
      },
    });
  };

  const renderMealItem = (itemData) => {
    const isFav = favoriteMeals.some((meal) => meal.id === itemData.item.id);

    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        onSelectMeal={gotoMealDetail.bind(
          this,
          itemData.item.id,
          itemData.item.title,
          isFav
        )}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        data={props.listData}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealList;
