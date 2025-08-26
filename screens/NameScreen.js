import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useState, useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../utils/registrationUtils';


const NameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    getRegistrationProgress('Name').then(progressData => {
      if (progressData) {
        setFirstName(progressData.firstName || '');
      }
    });
  }, []);

  const handleNext = () => {
    const trimmedName = firstName.trim();
    if (trimmedName.length < 3) {
      setErrorMessage("⚠️ First name must be at least 3 characters!");
      return;
    }
    if (trimmedName.length >18) {
      setErrorMessage("⚠️ First name must contain 18 letters maximum");
      return;
    }
    const nameRegex = /^[A-Za-z0-9-]+$/;
    if (!nameRegex.test(trimmedName)) {
      setErrorMessage("⚠️ First name can only contain letters, numbers, or hyphens (-).");
      return;
    }
    saveRegistrationProgress('Name', {firstName});
    navigation.navigate('Email');
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? 35 : 0,
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Text style={{marginTop: 50, textAlign: 'center', color: 'gray'}}>
        {/* NO BACKGROUND CHECKS ARE CONDUCTED */}
      </Text>

      <View style={{marginTop: 30, marginHorizontal: 20}}>
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
            <Ionicons name="newspaper-outline" size={26} color="black" />
          </View>
          <Image
            style={{width: 100, height: 40}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>

        <View style={{marginTop: 30}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              fontFamily: 'GeezaPro-Bold',
            }}>
            What's your name?
          </Text>
          <TextInput
            value={firstName}
            onChangeText={text => {
              setFirstName(text);
              if (errorMessage) {
                setErrorMessage("");
              }
            }}
            autoFocus={true}
            keyboardType="default"
            autoCapitalize="words"
            placeholder="First name (required)"
            placeholderTextColor={'#BEBEBE'}
            style={{
              width: 340,
              marginVertical: 10,
              marginTop: 25,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingBottom: 10,
              fontFamily: 'GeezaPro-Bold',
              fontSize: firstName ? 22 : 22,
            }}
          />
          {errorMessage ? (
            <Text style={{ 
              color: 'red', 
              marginTop: 5, 
              fontSize: 16,
              fontWeight: 'bold',
            }}>
              {errorMessage}
            </Text>
            ) : null
          }
          <TextInput
            placeholder="Last Name"
            placeholderTextColor={'#BEBEBE'}
            keyboardType="default"
            autoCapitalize="words"
            style={{
              width: 340,
              marginVertical: 10,
              marginTop: 25,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              paddingBottom: 10,
              fontFamily: 'GeezaPro-Bold',
              fontSize: firstName ? 22 : 22,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          disabled={firstName.trim() === ''}
          style={{
            marginTop: 30, 
            marginLeft: 'auto',
            opacity: firstName.trim() === '' ? 0.3 : 1,
          }}>
          <Ionicons
            name="chevron-forward-circle-outline"
            size={45}
            color="#581845"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NameScreen;

const styles = StyleSheet.create({});