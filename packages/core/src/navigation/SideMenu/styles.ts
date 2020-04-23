import { StyleSheet } from "react-native";
import { Colors, smallShadow, mediumShadow } from "../../utils/globalStyles";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    overflow: "hidden",
    ...mediumShadow,
  },

  headerCont: {
    height: 80,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    ...smallShadow,
  },
  headerText: { fontSize: 22, color: "#fffA", fontWeight: "100" },
  headerText2: { color: Colors.white },
  logoCont: {
    backgroundColor: Colors.primaryDark,
    padding: 0,
    borderRadius: 30,
    marginEnd: 20,
  },
  logo: {
    width: 30,
    height: 30,
  },
});
export default styles;
