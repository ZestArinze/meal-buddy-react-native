import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import MealItem from "./MealItem";

const MealList = (props) => {
  const gotoMealDetail = (mealId, mealtTitle) => {
    props.navigation.navigate({
      routeName: "MealDetail",
      params: {
        mealId: mealId,
        mealtTitle: mealtTitle,
      },
    });
  };

  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        onSelectMeal={gotoMealDetail.bind(
          this,
          itemData.item.id,
          itemData.item.title
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
