import React, { useState, useEffect } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Accelerometer } from "expo-sensors";

import { GlobalStyles } from "../../components/UI/styles";
import PedometerProgressRing from "../../components/pedometer/PedometerProgressRing";
import PedometerDailyCircles from "../../components/pedometer/PedometerDailyCheck";
import CongratulationsMessage from "../../components/pedometer/CongratulationsMessage";
import DistanceCaloriesBox from "../../components/pedometer/DistanceCaloriesBox";
import GoalInput from "../../components/pedometer/GoalInput";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function PedometerScreen() {
  const [steps, setSteps] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [goal, setGoal] = useState(100);
  const [newGoal, setNewGoal] = useState("");
  const [congratulationsVisible, setCongratulationsVisible] = useState(false);
  const congratulationsOpacity = new Animated.Value(0);

  const [daysAchieved, setDaysAchieved] = useState([
    true,
    true,
    false,
    true,
    false,
    false,
    true,
  ]);

  useEffect(() => {
    const accelerometerSubscription = Accelerometer.addListener(
      (accelerometerData) => {
        const accelerationMagnitude = Math.sqrt(
          accelerometerData.x ** 2 +
            accelerometerData.y ** 2 +
            accelerometerData.z ** 2
        );

        if (accelerationMagnitude > 1.2) {
          setIsWalking(true);
        } else if (accelerationMagnitude < 0.8) {
          setIsWalking(false);
        }

        if (isWalking && accelerationMagnitude < 1.2) {
          setSteps((prevSteps) => prevSteps + 1);
          setIsWalking(false);

          if (steps + 1 === goal) {
            showCongratulations();
          }
        }
      }
    );

    return () => {
      accelerometerSubscription.remove();
    };
  }, [isWalking, steps, goal]);

  useEffect(() => {
    if (congratulationsVisible) {
      Animated.timing(congratulationsOpacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(congratulationsOpacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  }, [congratulationsVisible]);

  const stepsToKilometers = (steps) => {
    const meters = steps * 0.7;
    const kilometers = meters / 1000;
    return kilometers.toFixed(2);
  };

  const updateGoal = () => {
    setGoal(parseInt(newGoal) || 0);
    setNewGoal("");
  };

  const showCongratulations = () => {
    setCongratulationsVisible(true);
    setTimeout(() => {
      setCongratulationsVisible(false);
    }, 3000); //
  };

  const calculateCaloriesBurned = () => {
    // const weightInKg = 70; // User's Weight
    const caloriesPerStep = 0.035;
    const totalCaloriesBurned = steps * caloriesPerStep;

    return totalCaloriesBurned.toFixed(2);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.dayContainerWrapper}>
            <View style={styles.daysContainer}>
              {daysOfWeek.map((day, index) => (
                <PedometerDailyCircles
                  key={index}
                  day={day}
                  isAchieved={daysAchieved[index]}
                />
              ))}
            </View>
          </View>

          {/* progress ring */}
          <PedometerProgressRing steps={steps} goal={goal} />

          <View style={styles.bottomTextContainer}>
            <DistanceCaloriesBox
              iconSource={require("../../assets/distance-icon.png")}
              title="Distance"
              value={`${stepsToKilometers(steps)} km`}
            />

            <DistanceCaloriesBox
              iconSource={require("../../assets/calories-burned-icon.png")}
              title="Calories Burned"
              value={`${calculateCaloriesBurned()} kcal`}
            />
          </View>

          {/* User Input Area */}
          <GoalInput
            newGoal={newGoal}
            onGoalChange={setNewGoal}
            onUpdateGoal={updateGoal}
          />

          {/* Congratulations Message */}
          <CongratulationsMessage isVisible={congratulationsVisible} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalStyles.colors.primary50,
  },
  dayContainerWrapper: {
    flexDirection: "row",
  },
  daysContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    marginHorizontal: 24,
  },
  bottomTextContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "tomato",
  },
});

export default PedometerScreen;
