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
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

const ShowPromptsScreen = () => {
  const navigation = useNavigation();
  const [prompts, setPrompts] = useState([]);
  const [option, setOption] = useState("About me");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const promptss = [
    {
      id: "0",
      name: "About me",
      questions: [
        { id: "10", question: "A random fact I love is" },
        { id: "11", question: "Typical Sunday" },
        { id: "12", question: "I go crazy for" },
        { id: "13", question: "Unusual Skills" },
        { id: "14", question: "My greatest strenght" },
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
    setModalVisible(true);
    setQuestion(item?.question);
  };

  const addPrompt = () => {
    const newPrompt = { question, answer };
    const updatedPrompts = [...prompts, newPrompt];
    setPrompts(updatedPrompts);
    setQuestion("");
    setAnswer("");
    setModalVisible(false);

    if (updatedPrompts.length === 3) {
      navigation.navigate("Prompts", { prompts: updatedPrompts });
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        {/* Header */}
        {/* <View style={styles.header}>
          <Text style={styles.link}></Text>
          <Text style={styles.title}></Text>
          <Entypo name="cross" size={22} color="black" />
        </View> */}

        {/* Categories */}
        <View style={{marginTop: 80, marginHorizontal: 20}}>
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
            <MaterialIcons name="location-enter" size={23} color="black" />
          </View>
          <Image
            style={{width: 100, height: 40}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
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
          {promptss.map((item, index) => (
            <View key={index}>
              {option === item.name && (
                <View>
                  {item.questions.map((q, qIndex) => (
                    <Pressable
                      key={qIndex}
                      onPress={() => openModal(q)}
                      style={{ marginVertical: 12 }}
                    >
                      <Text style={{ fontSize: 15, fontWeight: "500" }}>
                        {q.question}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
         <TouchableOpacity
            onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          style={{marginTop: 30, alignSelf: "center"}}>
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
        animationIn="slideInUp"   // ✅ équivalent de SlideAnimation bottom
        animationOut="slideOutDown"
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Answer your question</Text>
          <Text style={styles.question}>{question}</Text>
          <View style={styles.inputBox}>
            <TextInput
              value={answer}
              onChangeText={setAnswer}
              style={styles.input}
              placeholder="Enter Your Answer"
            />
          </View>
          <Button onPress={addPrompt} title="Addrrrrrr" />
        </View>
      </Modal>
      
    </>

    
    
  );
};

export default ShowPromptsScreen;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  link: { fontSize: 15, fontWeight: "500", color: "#581845" },
  title: { fontSize: 16, fontWeight: "bold", color: "#581845" },
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
    justifyContent: "flex-end", // ✅ simule BottomModal
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