import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import {useState,useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';

const GenderScreen = () => {
  const [gender, setGender] = useState('');
  const navigation = useNavigation();  
  useEffect(() => {
    getRegistrationProgress('Gender').then(progressData => {
      if(progressData){
        setGender(progressData.gender || '');
      }
    })
  },[]) 
  const handleNext = () => {
    if(gender.trim() != ''){
      saveRegistrationProgress('Gender',{gender});
    }
    navigation.navigate("Dating");
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
          Which gender describes you the best
        </Text>

        <Text style={{fontSize: 15, marginTop: 20, color: 'gray'}}>
          Hinge users are matched based on these gender groups. You can add more
          about gender after registering
        </Text>

        <View style={{marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Men</Text>
            <Pressable onPress={() => setGender('Men')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Men' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 12,
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Women</Text>
            <Pressable onPress={() => setGender('Women')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Women' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Non Binary</Text>
            <Pressable onPress={() => setGender('Non Binary')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Non Binary' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          disabled={gender.trim() === ''}
          style={{
            marginTop: 30, 
            marginLeft: 'auto',
            opacity: gender.trim() === '' ? 0.3 : 1,
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

export default GenderScreen;

const styles = StyleSheet.create({});