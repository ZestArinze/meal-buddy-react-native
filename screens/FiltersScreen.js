import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { setFilters } from "../store/actions/meals";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        value={props.state}
        onValueChange={props.onChange}
        trackColor={{ true: Colors.colorPrimary }}
        thumbColor={Platform.OS === "android" ? Colors.colorPrimary : ""}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVagetarian, setIsVategarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutonFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vagetarian: isVagetarian,
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVagetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({
      save: saveFilters,
    });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters/Restrictions</Text>
      <FilterSwitch
        label='Gluton-Free'
        state={isGlutenFree}
        onChange={(newValue) => {
          setIsGlutenFree(newValue);
        }}
      />
      <FilterSwitch
        label='Lactose-Free'
        state={isLactoseFree}
        onChange={(newValue) => {
          setIsLactoseFree(newValue);
        }}
      />
      <FilterSwitch
        label='Vegan'
        state={isVegan}
        onChange={(newValue) => {
          setIsVegan(newValue);
        }}
      />
      <FilterSwitch
        label='Vagetarian'
        state={isVagetarian}
        onChange={(newValue) => {
          setIsVategarian(newValue);
        }}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter Meals",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Save'
          iconName='ios-save'
          onPress={navData.navigation.getParam("save")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
});

export default FiltersScreen;
