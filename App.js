import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";

export default function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      const numericWeight = parseFloat(weight);
      const numericHeight = parseFloat(height) / 100; // Convert cm to meters
      setBmi(Math.round(numericWeight / (numericHeight * numericHeight))); // Round to nearest integer
      setHeight("");
      setWeight("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.circle}>
            <Text style={styles.bmiText}>BMI: {bmi || "?"}</Text>
          </View>
          <TextInput
            value={weight}
            onChangeText={setWeight}
            placeholder="Enter weight (kg)"
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            value={height}
            onChangeText={setHeight}
            placeholder="Enter height (cm)"
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={calculateBMI}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00796B", // Teal background
    padding: 20
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75, // Makes the View circular
    backgroundColor: "#fff", // White background for the circle
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5
  },
  bmiText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00796B" // Teal text color
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#fff", // White background for input
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    width: "80%",
    fontSize: 16
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "80%"
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold"
  },
  resultText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff" // White text for the result
  }
});
