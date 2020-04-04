import { StyleSheet } from "react-native";
import { screenWidth, screenHeight } from "../../utils/dimentions";
import { Colors, mediumShadow } from "../../utils/values";
const styles = StyleSheet.create({
  alertContainer: {
    position: "absolute",
    width: screenWidth(100),
    height: screenHeight(100),
    backgroundColor: Colors.black + "8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alertTextContainer: { ...mediumShadow, width: 330, padding: 15, backgroundColor: Colors.white, borderRadius: 3 },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 6,
  },
  desc: {
    fontSize: 15,
  },
  choise: {
    fontWeight: "500",
    fontSize: 15,
  },
});
export default styles;
