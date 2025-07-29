import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState,useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import axios from 'axios';
import {BASE_URL} from '../urls/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';

const LoginScreen = () => {
  const [option, setOption] = useState('Sign In');
  const navigation = useNavigation();
  const [word, setWord] = useState('');
  const [password, setPassword] = useState('');
  const {token,setToken} = useContext(AuthContext);

  const createAccount = () => {
    setOption('Create account');

    navigation.navigate('Basic');
  };
  const handleLogin = async () => {
    setOption('Sign In');

    if (!word || !password) {
      return;
    }

    console.log("Hi");

    const user = {
      email: word,
      password: password,
    };

    const response = await axios.post(`${BASE_URL}/login`, user);

    const {token, IdToken, AccessToken} = response.data;


    console.log("token",token);

    await AsyncStorage.setItem('token', token);
    setToken(token)
    await AsyncStorage.setItem('idToken', IdToken);
    await AsyncStorage.setItem('accessToken', AccessToken);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{height: 200, backgroundColor: '#581845', width: '100%'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
          }}>
          <Image
            style={{width: 150, height: 80, resizeMode: 'contain'}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/4207/4207268.png',
            }}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
            fontSize: 24,
            fontFamily: 'GeezaPro-bold',
            color: 'white',
          }}>
          Hinge
        </Text>
      </View>

      <KeyboardAvoidingView>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 25,
              color: '#581845',
            }}>
            Designed to be deleted
          </Text>
        </View>

        {option == 'Sign In' && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image
              style={{width: 150, height: 80, resizeMode: 'contain'}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/6809/6809493.png',
              }}
            />
          </View>
        )}

        <View style={{marginHorizontal: 20, marginTop: 20}}>
          {option == 'Sign In' ? (
            <>
              <View>
                <View style={{marginTop: 14}}>
                  <View
                    style={{
                      padding: 14,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 15,
                      borderColor: '#E0E0E0',
                      borderWidth: 0.6,
                    }}>
                    <Text style={{fontSize: 14, color: '#800080', width: 70}}>
                      Email
                    </Text>

                    <TextInput
                      value={word}
                      onChangeText={text => setWord(text)}
                      placeholder="User@example.com"
                      placeholderTextColor={'gray'}
                    />
                  </View>
                </View>

                <View style={{marginTop: 20}}>
                  <View
                    style={{
                      padding: 14,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 15,
                      borderColor: '#E0E0E0',
                      borderWidth: 0.6,
                    }}>
                    <Text style={{fontSize: 14, color: '#800080', width: 70}}>
                      Password
                    </Text>

                    <TextInput
                      secureTextEntry={true}
                      value={password}
                      onChangeText={text => setPassword(text)}
                      placeholder="Required"
                      placeholderTextColor={'gray'}
                    />
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Keep me logged in</Text>
                  <Text>Forgot Password</Text>
                </View>
              </View>
            </>
          ) : (
            <View>
              <LottieView
                source={require('../assets/login.json')}
                style={{
                  height: 180,
                  width: 300,
                  alignSelf: 'center',
                  marginTop: 40,
                  justifyContent: 'center',
                }}
                autoPlay
                loop={true}
                speed={0.7}
              />
            </View>
          )}

          <View style={{marginTop: 40}} />

          <Pressable
            onPress={createAccount}
            style={{
              width: 300,
              backgroundColor:
                option == 'Create account' ? '#581845' : 'transparent',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
              borderRadius: 30,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: option == 'Create account' ? 'white' : 'black',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Create Account
            </Text>
          </Pressable>
          <Pressable
            onPress={handleLogin}
            style={{
              width: 300,
              backgroundColor: option == 'Sign In' ? '#581845' : 'transparent',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
              borderRadius: 30,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: option == 'Sign In' ? 'white' : 'black',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});