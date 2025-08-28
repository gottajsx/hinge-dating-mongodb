import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Pressable,
  TextInput,
  Image,
  Button,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

const ShowPromptsScreen = () => {
  const navigation = useNavigation();
  const [prompts, setPrompts] = useState([]);
  const [option, setOption] = useState("About me");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const MAX_LENGTH = 100;

  const promptss = [
    {
      id: "0",
      name: "About me",
      questions: [
        { id: "10", question: "A random fact I love is" },
        { id: "11", question: "Typical Sunday" },
        { id: "12", question: "I go crazy for" },
        { id: "13", question: "Unusual Skills" },
        { id: "14", question: "My greatest strength" },
        { id: "15", question: "My simple pleasures" },
        { id: "16", question: "A life goal of mine" },
      ],
    },
    {
      id: "2",
      name: "Self Care",
      questions: [
        { id: "10", question: "I unwind by" },
        { id: "11", question: "A boundary of mine is" },
        { id: "12", question: "I feel most supported when" },
        { id: "13", question: "I hype myself up by" },
        { id: "14", question: "To me, relaxation is" },
        { id: "15", question: "I beat my blues by" },
        { id: "16", question: "My skin care routine" },
      ],
    },
  ];

  const openModal = (item) => {
    const alreadyAnswered = prompts.find(p => p.question === item.question);
    if (alreadyAnswered) {
      setErrorMessage("You have already answered this question.");
      return;
    }
    setErrorMessage("");
    setQuestion(item.question);
    setModalVisible(true);
  };

  const addPrompt = () => {
    if (answer.trim() === "") return; // ignore empty answer
    const newPrompt = { question, answer };
    const updatedPrompts = [...prompts, newPrompt];
    setPrompts(updatedPrompts);
    setQuestion("");
    setAnswer("");
    setModalVisible(false);

    if (updatedPrompts.length === 3) {
      navigation.navigate("Prompts", { prompts: JSON.parse(JSON.stringify(updatedPrompts)) });
    }
  };

  return (
    <>
      <SafeAreaView 
        style={{ 
          paddingTop: Platform.OS === 'android' ? 35 : 0,
          flex: 1, 
          backgroundColor: "white" 
      }}>

        {/* Categories */}
        <View style={{marginTop: 80, marginHorizontal: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                borderWidth: 2,
                borderColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons name="location-enter" size={23} color="black" />
            </View>
            <Image
              style={{width: 100, height: 40}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
              }}
            />
          </View>
        <View 
          style={[
            styles.categories,
            { paddingTop: Platform.OS === "android" ? 35 : 0 },
          ]}
        >
          {promptss.map((item, index) => (
            <Pressable
              key={index}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: option === item.name ? "#581845" : "white",
                },
              ]}
              onPress={() => setOption(item.name)}
            >
              <Text
                style={{
                  color: option === item.name ? "white" : "black",
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Questions */}
        <View style={{ marginTop: 20, marginHorizontal: 12 }}>
          {errorMessage.length > 0 && (
            <Text style={{ color: "red", marginBottom: 10 }}>{errorMessage}</Text>
          )}

          {promptss.map((item, index) => (
            option === item.name && (
              <View key={index}>
                {item.questions.map((q, qIndex) => {
                  const isAnswered = prompts.find(p => p.question === q.question);
                  return (
                    <Pressable
                      key={qIndex}
                      onPress={() => openModal(q)}
                      style={{ marginVertical: 12 }}
                      disabled={!!isAnswered} // empêche la modale
                    >
                      <Text style={{
                        fontSize: 15,
                        fontWeight: "500",
                        color: isAnswered ? "gray" : "black"
                      }}>
                        {q.question}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )
          ))}
        </View>

        {prompts.length < 3 && (
          <Text style={{ textAlign: "center", color: "red", marginTop: 20 }}>
            {3 - prompts.length} question{3 - prompts.length > 1 ? "s" : ""} restante{3 - prompts.length > 1 ? "s" : ""}
          </Text>
        )}

         <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            style={{marginTop: 30, alignSelf: "center"}}
          >
          <Ionicons
            name="chevron-back-circle-outline"
            size={45}
            color="#581845"
          />
        </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={["down"]}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Answer your question</Text>
          <Text style={styles.question}>{question}</Text>
          <View style={styles.inputBox}>
            <TextInput
              value={answer}
              onChangeText={(text) => setAnswer(text)}
              style={styles.input}
              placeholder="Enter Your Answer"
              maxLength={MAX_LENGTH} 
              multiline
            />
          </View>
          <Text style={{ textAlign: "center", color: "gray", marginTop: 4, marginBottom: 8 }}>
            {MAX_LENGTH - answer.length} characters remaining
          </Text>
          <Button onPress={addPrompt} title="Add Answer" />
        </View>
      </Modal>
    </>
  );
};

export default ShowPromptsScreen;

const styles = StyleSheet.create({
  categories: {
    marginHorizontal: 10,
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 20,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 10,
  },
  question: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "600",
  },
  inputBox: {
    borderColor: "#202020",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    height: 100,
    marginVertical: 12,
    borderStyle: "dashed",
  },
  input: {
    color: "gray",
    width: "100%",
    fontSize: 18,
  },
});