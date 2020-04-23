import { StyleSheet } from "react-native";
import { Colors, mediumShadow } from "../../utils/globalStyles";

const styles = StyleSheet.create({
  searchButton: {
    borderRadius: 80,
    margin: 30,
    ...mediumShadow,
    width: 80,
    height: 80,
    backgroundColor: Colors.primaryLight,
    justifyContent: "center",
    alignContent: "center",
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 20,
  },
});
export default styles;
