/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "./libs/vector-icons";
class App extends React.Component {
    render() {
        return (<View style={styles.box}>
        <Text style={styles.text}>Hello, worldy shiiium!</Text>
        <MaterialIcons name="search"/>
      </View>);
    }
}
const styles = StyleSheet.create({
    box: { padding: 10 },
    text: { fontWeight: "bold" }
});
export default App;
//# sourceMappingURL=App.jsx.map