import { StyleSheet } from "react-native";
import { Colors } from "../../utils/globalStyles";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 40,
  },
  loginLogo: {
    width: 60,
    height: 60,
    marginBottom: 40,
  },
  loginInput: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "100",
    marginVertical: 20,
  },
  signupText: {
    textAlign: "center",
    marginTop: 30,
    color: Colors.white,
  },
});
export default styles;
