import { StyleSheet } from "react-native";
import { Colors, bigShadow } from "../../utils/globalStyles";
import { screenHeight } from "../../utils/dimentions";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 20,
    color: Colors.whiteTransparent,
    marginTop: 7,
    marginBottom: 40,
  },
  pushToBottomCenter: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  doctorIllustration: {
    resizeMode: "contain",
    width: "100%",
    height: screenHeight(40),
  },
});

export const foundStyles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    backgroundColor: Colors.white,
    margin: 30,
    // ...bigShadow,
  },
  descContainer: {
    padding: 20,
    alignItems: "center",
  },
  descText: {
    fontSize: 20,
    marginBottom: 20,
  },
});
export default styles;
