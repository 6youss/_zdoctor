import { StyleSheet } from "react-native";
import { Colors } from "../../utils/globalStyles";

const styles = StyleSheet.create({
  defaultInputStyles: {
    fontSize: 30,
    fontWeight: "bold",
    borderBottomColor: Colors.whiteTransparent,
    borderBottomWidth: 1.5,
    width: "100%",
    color: Colors.primaryDark,
    maxWidth: 400,
    marginVertical: 20,
  },
  defaultErrorStyle: {
    marginTop: -15,
    color: Colors.red,
  },
});
export default styles;
