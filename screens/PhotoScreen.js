import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Image,
  Pressable,
  Button,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getRegistrationProgress, saveRegistrationProgress } from '../utils/registrationUtils';
import * as Progress from 'react-native-progress';

const PhotoScreen = () => {
  const CLOUD_NAME = "ddpc0mido";
  const UPLOAD_PRESET = "default";

  const [imageUrls, setImageUrls] = useState(['', '', '', '', '', '']);
  const [uploadProgress, setUploadProgress] = useState([0, 0, 0, 0, 0, 0]);
  const navigation = useNavigation();

  const pickImage = async (index) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission requise", "Accès aux images refusé.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;
    const asset = result.assets[0];

    try {
      const updatedProgress = [...uploadProgress];
      updatedProgress[index] = 0;
      setUploadProgress(updatedProgress);

      const formData = new FormData();
      formData.append("file", {
        uri: asset.uri,
        type: "image/jpeg",
        name: `upload_${Date.now()}.jpg`,
      });
      formData.append("upload_preset", UPLOAD_PRESET);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = event.loaded / event.total;
          const updated = [...uploadProgress];
          updated[index] = progress;
          setUploadProgress(updated);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          if (response.secure_url) {
            const newImages = [...imageUrls];
            newImages[index] = response.secure_url;
            setImageUrls(newImages);

            const updated = [...uploadProgress];
            updated[index] = 1;
            setUploadProgress(updated);
          }
        } else {
          Alert.alert("Erreur", "Upload échoué");
        }
      };

      xhr.onerror = () => {
        Alert.alert("Erreur", "Impossible d’uploader l’image");
      };

      xhr.send(formData);

    } catch (err) {
      Alert.alert("Erreur", "Impossible d’uploader l’image");
      console.error(err);
    }
  };

  const removeImage = (index) => {
    const newImages = [...imageUrls];
    newImages[index] = '';
    setImageUrls(newImages);

    const updated = [...uploadProgress];
    updated[index] = 0;
    setUploadProgress(updated);
  };

  useEffect(() => {
    getRegistrationProgress('Photos').then(progressData => {
      if (progressData) {
        setImageUrls(progressData.imageUrls);
      }
    });
  }, []);

  const handleNext = () => {
    saveRegistrationProgress('Photos', { imageUrls });
    navigation.navigate("Prompts");
  };

  const renderImageBox = (url, index) => (
    <Pressable
      onPress={() => !url && pickImage(index)}
      style={styles.imageBox}
      key={index}
    >
      {url ? (
        <>
          <Image
            source={{ uri: url }}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeImage(index)}
          >
            <MaterialIcons name="close" size={20} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        <EvilIcons name="image" size={60} color="black" />
      )}
      {uploadProgress[index] > 0 && uploadProgress[index] < 1 && (
        <View style={styles.progressOverlay}>
          <Progress.Bar
            progress={uploadProgress[index]}
            width={80}
            color="#581845"
            height={6}
            borderRadius={3}
          />
        </View>
      )}
    </Pressable>
  );

  // calculer le nombre d'images uploadées
  const uploadedCount = imageUrls.filter(url => url).length;
  const imagesNeeded = 4 - uploadedCount;

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === 'android' ? 35 : 0,
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={{ marginTop: 80, marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.headerIcon}>
            <MaterialIcons name="photo-camera-back" size={23} color="black" />
          </View>
          <Image
            style={{ width: 100, height: 40 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>

         

        <Text style={styles.title}>
          Pick your photos and videos
        </Text>

        <Text style={{fontSize: 15, marginTop: 25, color: 'gray'}}>
            Add four to six photos
        </Text>

        <View style={{ marginTop: 20 }}>
          <View style={styles.row}>
            {imageUrls.slice(0, 3).map((url, i) => renderImageBox(url, i))}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={styles.row}>
            {imageUrls.slice(3, 6).map((url, i) => renderImageBox(url, i + 3))}
          </View>

          <View style={{ marginVertical: 10 }}>
            {imagesNeeded > 0 && (
              <Text style={{ color: 'gray', fontSize: 15 }}>
                Add {imagesNeeded} more image{imagesNeeded > 1 ? 's' : ''}
              </Text>
            )}
          </View>

          <View style={{ marginTop: 10 }}>
            <Button
              onPress={handleNext}
              title="Add Images"
              disabled={uploadedCount < 4} // désactivé si <4 images
              color={uploadedCount < 4 ? 'gray' : '#581845'}
            />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  imageBox: {
    borderColor: '#581845',
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderRadius: 10,
    height: 100,
    position: 'relative',
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  progressOverlay: {
    position: 'absolute',
    bottom: 8,
    alignItems: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'GeezaPro-Bold',
    marginTop: 15,
  },
});