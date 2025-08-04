import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useRef, useState,useEffect} from 'react';
// import Fontisto from '@react-native-vector-icons/fontisto';
// import Ionicons from '@react-native-vector-icons/ionicons';
import { Ionicons } from '@expo/vector-icons';
//import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';

const DateOfBirthScreen = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const navigation = useNavigation();
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const handleDayChange = text => {
    setDay(text);
    if (text.length == 2) {
      monthRef.current.focus();
    }
  };

  const handleMonthChange = text => {
    setMonth(text);
    if (text.length == 2) {
      yearRef.current.focus();
    }
  };

  const handleyearChange = text => {
    setYear(text);
  };

  useEffect(() => {
    getRegistrationProgress('Birth').then(progressData => {
      if(progressData){
        const {dateOfBirth} = progressData;
        const [dayValue,monthValue,yearValue] = dateOfBirth.split("/");
        setDay(dayValue);
        setMonth(monthValue);
        setYear(yearValue);
      }
    })
  },[])

  const handleNext = () => {
    if(day.trim() !== '' && month.trim() !== '' && year.trim() !== ''){
      const dateOfBirth = `${day}/${month}/${year}`;

      saveRegistrationProgress('Birth',{dateOfBirth})
    }
    // navigation.navigate("Location")
    navigation.navigate('Gender');
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
            <MaterialIcons
              name="calendar-blank"
              size={23}
              color="black"
            />
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
          What's your date of birth?
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 80,
            justifyContent: 'center',
          }}>
          <TextInput
            value={day}
            onChangeText={handleDayChange}
            autoFocus={true}
            placeholder="DD"
          
            placeholderTextColor={'#BEBEBE'}
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              padding: 10,
              width: 60,

              fontFamily: 'GeezaPro-Bold',
              fontSize: day ? 22 : 22,
            }}
          />
          <TextInput
            value={month}
            onChangeText={handleMonthChange}
            autoFocus={true}
            keyboardType="numeric"
            ref={monthRef}
            maxLength={2}
            placeholder="MM"
 
            placeholderTextColor={'#BEBEBE'}
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              padding: 10,
              width: 60,
              fontFamily: 'GeezaPro-Bold',
              fontSize: month ? 22 : 22,
            }}
          />
          <TextInput
            ref={yearRef}
            value={year}
            onChangeText={handleyearChange}
            autoFocus={true}
            placeholder="YYYY"

            placeholderTextColor={'#BEBEBE'}
            max={4}
            keyboardType="numeric"
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              padding: 10,
              width: 80,
              fontFamily: 'GeezaPro-Bold',
              fontSize: year ? 22 : 22,
            }}
          />
        </View>

        <TouchableOpacity
            onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
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

export default DateOfBirthScreen;

const styles = StyleSheet.create({});