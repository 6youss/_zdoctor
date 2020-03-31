import { StyleSheet } from "react-native";
import { Colors } from "../../utils/values";
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGray,
    flex: 1
  },
  hoursContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: Colors.lightGray,
    flexGrow: 1
  }
});

export const dayColStyles = StyleSheet.create({
  container: {
    width: "20%",
    alignItems: "center"
  },
  day: {
    color: Colors.darkGray,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15
  },
  month: {
    color: Colors.secondary,
    textAlign: "center",
    fontSize: 17
  },
  hour: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white
  },
  takenHour: {
    backgroundColor: Colors.primary
  },
  hourText: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: "bold"
  },
  takenHourText: {
    color: Colors.white
  },
  dot: {
    position: "absolute",
    backgroundColor: Colors.secondary,
    width: 10,
    height: 10,
    borderRadius: 10,
    right: 5,
    bottom: 5
  }
});

export default styles;
