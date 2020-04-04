import React from "react";
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";

import { Colors, mediumShadow } from "../../utils/values";
import styles from "./styles";

interface Option {
  text: string;
  onPress?: () => void;
}
type toggleAlertFunction = (title: string, desc: string, options?: Array<Option>) => void;

const AlertContext = React.createContext<toggleAlertFunction>(() => {});

export const AlertProvider: React.FC = ({ children }) => {
  const [visible, setVisible] = React.useState(false);
  const [title, setTitle] = React.useState<string>("Title");
  const [desc, setDesc] = React.useState<string>("Alooors");
  const [options, setOptions] = React.useState<Array<Option>>([{ text: "OK" }]);

  const toggle: toggleAlertFunction = (title, desc, options = [{ text: "OK" }]) => {
    setTitle(title);
    setDesc(desc);
    setVisible(!visible);
    setOptions(options);
  };
  return (
    <AlertContext.Provider value={toggle}>
      {children}
      {visible && (
        <TouchableWithoutFeedback
          onPress={() => {
            setVisible(false);
          }}
        >
          <View style={styles.alertContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.alertTextContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.desc}>{desc}</Text>
                <View
                  style={{
                    flexWrap: "wrap",
                    justifyContent: "flex-end",
                    padding: 5,
                    marginTop: 8,
                    flexDirection: "row",
                  }}
                >
                  {options.map(({ text, onPress = () => {} }, index) => {
                    return (
                      <TouchableOpacity
                        style={{ marginStart: 15 }}
                        key={text + index}
                        onPress={() => {
                          setVisible(false);
                          onPress();
                        }}
                      >
                        <Text style={styles.choise}>{text.toUpperCase()}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}
    </AlertContext.Provider>
  );
};

export function useAlert() {
  const alert = React.useContext(AlertContext);
  return alert;
}
