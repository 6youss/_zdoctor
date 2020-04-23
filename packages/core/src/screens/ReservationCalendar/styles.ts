import { StyleSheet } from "react-native";
import { Colors } from "../../utils/globalStyles";

const styles = StyleSheet.create({
  headerText: {
    color: Colors.darkGray,
    fontSize: 15,
    padding: 15,
    fontWeight: "bold",
  },
  pickerContainer: {
    borderRadius: 20,
    overflow: "hidden",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 8,
    // paddingVertical: 7,
    // marginTop: -20,
    // backgroundColor: 'gray',
  },
});
export default styles;
