import React, { useState, useEffect } from "react";
import { Animated, Easing, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "../../components/UI/styles";

const CongratulationsMessage = ({ isVisible }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible, opacity]);

  return isVisible ? (
    <Animated.View style={[styles.container, { opacity }]}>
      <LinearGradient
        colors={[
          GlobalStyles.colors.gradientYellow,
          GlobalStyles.colors.gradientGreen,
        ]}
        style={styles.gradientBackground}
      >
        <Text style={styles.text}>Congratulations!</Text>
      </LinearGradient>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  text: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  gradientBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default CongratulationsMessage;
