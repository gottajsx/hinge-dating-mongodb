import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useState,useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';


const LookingForGender = () => {
  const [type, setType] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Dating').then(progressData => {
      if(progressData){
        setType(progressData.type || '');
      }
    })
  },[])

  const handleNext = () => {
    if(type.trim() != ''){
      saveRegistrationProgress('Dating',{type})
    }
    navigation.navigate("LookingFor");
  }

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
            <MaterialCommunityIcons name="gender-male" size={23} color="black" />
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
          Who do you want to date?
        </Text>

        <Text style={{fontSize: 15, marginTop: 20, color: 'gray'}}>
          Select all people you're open to meeting
        </Text>

        <View style={{marginTop: 30, flexDirection: 'column', gap: 12}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Men</Text>
            <Pressable onPress={() => setType('Men')}>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  type === 'Men' ? '#581845' : '#F0F0F0'
                }
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Women</Text>
            <Pressable onPress={() => setType('Women')}>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  type === 'Women' ? '#581845' : '#F0F0F0'
                }
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Everyone</Text>
            <Pressable onPress={() => setType('Everyone')}>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  type === 'Everyone' ? '#581845' : '#F0F0F0'
                }
              />
            </Pressable>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          disabled={type.trim() === ''}
          style={{
            marginTop: 30, 
            marginLeft: 'auto',
            opacity: type.trim() === '' ? 0.3 : 1,
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

export default LookingForGender;

const styles = StyleSheet.create({});