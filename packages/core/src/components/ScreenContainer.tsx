import React from "react";
import { SafeAreaView, StatusBar, StatusBarProps, ViewProps } from "react-native";
import { Colors, isWeb } from "../utils/values";
import { screenWidth } from "../utils/dimentions";

interface ScreenContainerProps {
  status?: StatusBarProps;
  safeArea?: ViewProps;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, status, safeArea }) => {
  return (
    <>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" {...status} />
      <SafeAreaView
        {...safeArea}
        style={[{ backgroundColor: Colors.primary, flex: 1 }, isWeb && { paddingHorizontal: "5%" }, safeArea?.style]}
      >
        {children}
      </SafeAreaView>
    </>
  );
};

export default ScreenContainer;
