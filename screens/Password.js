import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import { saveRegistrationProgress } from '../utils/registrationUtils';


const PasswordScreen = () => {
  const [password, setPassword] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const email = route?.params?.email;
  const [errorMessage, setErrorMessage] = useState('');
 
  const handleNext = () => {
    const trimmedPassword = password.trim();
    if (trimmedPassword.length < 6) {
      setErrorMessage("⚠️ Password must be at least 6 characters!");
      return;
    }
    if (trimmedPassword.length > 12) {
      setErrorMessage("⚠️ Password must contain 12 characters maximum!");
      return;
    }
    saveRegistrationProgress('Password',{password});
    navigation.navigate("Birth"); 
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? 35 : 0,
        flex: 1,
        backgroundColor: 'white',
      }}>
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
            {/* <MaterialDesignIcons name="lock" size={26} color="black" /> */}
            <MaterialIcons name="lock" size={26} color="black" />
          </View>
          <Image
            style={{width: 100, height: 40}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
          }}>
          Please choose a password
        </Text>

        <TextInput
          value={password}
          onChangeText={text => {
            setPassword(text);
              if (errorMessage) {
                setErrorMessage("");
              }
          }}
          autoFocus={true}
          keyboardType="default"
          placeholder="Enter your Password"
          secureTextEntry={true}
          placeholderTextColor={'#BEBEBE'}
          style={{
            width: 340,
            marginVertical: 10,
            marginTop: 25,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            fontFamily: 'GeezaPro-Bold',
            fontSize: password ? 22 : 22,
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

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          disabled={password.trim() === ''}
          style={{
            marginTop: 30, 
            marginLeft: 'auto',
            opacity: password.trim() === '' ? 0.3 : 1,
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

export default PasswordScreen;

const styles = StyleSheet.create({});