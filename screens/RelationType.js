import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useState,useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';

const RelationType = () => {
  const [relationType, setRelationType] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('RelationType').then(progressData => {
      if(progressData){
        setRelationType(progressData.relationType || '');
      }
    })
  },[])
  const handleNext = () => {
    if(relationType.trim() !== ''){
      saveRegistrationProgress('RelationType',{relationType})
    }
    navigation.navigate("Photos")
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
            <MaterialCommunityIcons name="hand-heart" size={23} color="black" />
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
          What's your dating intention?
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
            <Text style={{fontSize: 15, fontWeight: '500'}}>Life Partner</Text>
            <Pressable onPress={() => setRelationType('Life Partner')}>
              <FontAwesome
                name="circle"
                size={26}
                color={relationType == 'Life Partner' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>
              Long-term relationship
            </Text>
            <Pressable onPress={() => setRelationType('Long-term relationship')}>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  relationType == 'Long-term relationship' ? '#581845' : '#F0F0F0'
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
            <Text style={{fontSize: 15, fontWeight: '500'}}>
              Long-term relationship open to short
            </Text>
            <Pressable
              onPress={() =>
                setRelationType('Long-term relationship open to short')
              }>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  relationType == 'Long-term relationship open to short'
                    ? '#581845'
                    : '#F0F0F0'
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
            <Text style={{fontSize: 15, fontWeight: '500'}}>
             Short-term relationship open to long
            </Text>
            <Pressable
              onPress={() =>
                setRelationType('Short-term relationship open to long')
              }>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  relationType == 'Short-term relationship open to long'
                    ? '#581845'
                    : '#F0F0F0'
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
            <Text style={{fontSize: 15, fontWeight: '500'}}>
              Short-term relationship
            </Text>
            <Pressable
              onPress={() =>
                setRelationType('Short-term relationship')
              }>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  relationType == 'Short-term relationship'
                    ? '#581845'
                    : '#F0F0F0'
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
            <Text style={{fontSize: 15, fontWeight: '500'}}>
              Figuring out my dating goals
            </Text>
            <Pressable
              onPress={() =>
                setRelationType('Figuring out my dating goals')
              }>
              <FontAwesome
                name="circle"
                size={26}
                color={
                  relationType == 'Figuring out my dating goals'
                    ? '#581845'
                    : '#F0F0F0'
                }
              />
            </Pressable>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          disabled={relationType.trim() === ''}
          style={{
            marginTop: 30, 
            marginLeft: 'auto',
            opacity: relationType.trim() === '' ? 0.3 : 1,
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

export default RelationType;

const styles = StyleSheet.create({});