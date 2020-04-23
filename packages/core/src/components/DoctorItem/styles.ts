import { StyleSheet } from "react-native";
import { Colors } from "../../utils/globalStyles";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.white,
    borderBottomWidth: 4,
    borderBottomColor: Colors.gray,
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  descContainer: {
    paddingStart: 20,
    flex: 1,
  },
  descText: {
    fontSize: 20,
    marginBottom: 5,
  },
});
export default styles;
