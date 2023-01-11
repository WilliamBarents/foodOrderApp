import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useCallback, useEffect, useState } from "react";

const AvailableMeals = () => {
  const [mealList, setMealList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const fetchMealMenu = useCallback(async () => {
    try {
      const response = await fetch(
        "https://food-order-application-d6240-default-rtdb.firebaseio.com/Meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();

      const loadedMeals = [];

      for (const meal in data) {
        loadedMeals.push({
          id: meal,
          description: data[meal].description,
          name: data[meal].name,
          price: data[meal].price,
        });
      }

      setMealList(loadedMeals);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setHttpError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchMealMenu();
  }, [fetchMealMenu]);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = mealList.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
