import { StyleSheet } from "react-native";
import { Colors } from "../../utils/globalStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  loginLogo: {
    width: 30,
    height: 30,
    position: "absolute",
    left: "50%",
    transform: [
      {
        translateX: -15,
      },
    ],
  },
  loginInput: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "100",
  },
  activeUserType: {
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 50,
  },
});
export default styles;
