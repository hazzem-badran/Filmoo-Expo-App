import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const LoadingState = () => {
  return (
    <ActivityIndicator
      size="large"
      color="#f0be44"
      className="mt-10 self-center"
    />
  );
};

export default LoadingState;
