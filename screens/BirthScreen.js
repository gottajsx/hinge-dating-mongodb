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
import {useRef, useState,useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';


const DateOfBirthScreen = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const navigation = useNavigation();
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');

  const onlyDigits = (t) => t.replace(/\D/g, '');

  const handleDayChange = text => {
    const v = onlyDigits(text).slice(0, 2);
    setDay(v);
    if (errorMessage) setErrorMessage('');
    if (text.length == 2) {
      monthRef.current.focus();
    }
  };

  const handleMonthChange = text => {
    const v = onlyDigits(text).slice(0, 2);
    setMonth(v);
    if (errorMessage) setErrorMessage('');
    if (text.length == 2) {
      yearRef.current.focus();
    }
  };

  const handleyearChange = text => {
    const v = onlyDigits(text).slice(0, 4);
    if (errorMessage) setErrorMessage('');
    setYear(v);
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

  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleNext = () => {
    const birthDate = new Date(`${year}-${month}-${day}`);
    if (isNaN(birthDate.getTime())) {
      setErrorMessage("⚠️ Invalid date. Please check again.");
      return;
    }
    const age = calculateAge(birthDate)
    if (age < 18) {
      setErrorMessage("⚠️ You must be at least 18 years old.");
      return
    }
    if (age > 90) {
      setErrorMessage("⚠️ Please enter your real birthdate.");
      return
    }
    setErrorMessage('');
    const dateOfBirth = `${day}/${month}/${year}`;
    saveRegistrationProgress('Birth',{dateOfBirth})
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
            <MaterialCommunityIcons
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

        {errorMessage ? (
          <Text style={{color: 'red', marginTop: 15, fontWeight: 'bold', textAlign: 'center'}}>
            {errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{
            marginTop: 30, 
            marginLeft: 'auto',
            opacity: (day && month && year) ? 1 : 0.3,
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

export default DateOfBirthScreen;

const styles = StyleSheet.create({});