// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Modal,
//   Image,
//   Alert,
//   Linking,
//   Platform,
// } from 'react-native';
// import {
//   Text,
//   Card,
//   Button,
//   FAB,
//   ActivityIndicator,
//   Snackbar,
//   TextInput,
// } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import ImagePicker from 'react-native-image-crop-picker';
// import { PermissionsAndroid } from 'react-native';

// interface Service {
//   id: number;
//   title: string;
//   description: string;
//   duration: string;
//   imageUrl: string;
// }

// export default function ServicesManagement(): any {
//   const [services, setServices] = useState<Service[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const [editingService, setEditingService] = useState<Service | null>(null);

//   const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
//   const [snackbarMessage, setSnackbarMessage] = useState<string>('');

//   // form states
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [duration, setDuration] = useState('');
//   const [imageUrl, setImageUrl] = useState('');

//   useEffect(() => {
//     loadServices();
//   }, []);

//   const loadServices = async () => {
//     await new Promise((res:any) => setTimeout(res, 800));

//     const mock: Service[] = [
//       {
//         id: 1,
//         title: 'Hair Cutting',
//         description: 'Professional haircut with styling',
//         duration: '30 min',
//         imageUrl: 'https://cdn-icons-png.flaticon.com/512/2920/2920247.png',
//       },
//       {
//         id: 2,
//         title: 'Facial Treatment',
//         description: 'Glow facial for skin refresh',
//         duration: '60 min',
//         imageUrl: 'https://cdn-icons-png.flaticon.com/512/2922/2922562.png',
//       },
//     ];

//     setServices(mock);
//     setLoading(false);
//   };

//   const handleAdd = () => {
//     setEditingService(null);
//     setTitle('');
//     setDescription('');
//     setDuration('');
//     setImageUrl('');
//     setModalVisible(true);
//   };

//   const handleEdit = (item: Service) => {
//     setEditingService(item);
//     setTitle(item.title);
//     setDescription(item.description);
//     setDuration(item.duration);
//     setImageUrl(item.imageUrl);
//     setModalVisible(true);
//   };

//   const handleSave = () => {
//     if (!title || !description || !duration) {
//       setSnackbarMessage('Please fill all required fields');
//       setSnackbarVisible(true);
//       return;
//     }

//     if (editingService) {
//       setServices(prev =>
//         prev.map(s =>
//           s.id === editingService.id
//             ? { ...s, title, description, duration, imageUrl }
//             : s,
//         ),
//       );
//       setSnackbarMessage('Service updated');
//     } else {
//       const newService: Service = {
//         id: services.length + 1,
//         title,
//         description,
//         duration,
//         imageUrl:
//           imageUrl || 'https://cdn-icons-png.flaticon.com/512/2920/2920247.png',
//       };

//       setServices([...services, newService]);
//       setSnackbarMessage('Service added');
//     }

//     setModalVisible(false);
//     setSnackbarVisible(true);
//   };

//   const handleDelete = (id: number) => {
//     setServices(prev => prev.filter(s => s.id !== id));
//     setSnackbarMessage('Service deleted');
//     setSnackbarVisible(true);
//   };

//   // ✅ WITHOUT PERMISSION - Gallery selection only
//   const selectImageFromGallery = () => {
//     ImagePicker.openPicker({
//       width: 500,
//       height: 500,
//       cropping: true,
//       cropperCircleOverlay: true,
//       compressImageQuality: 0.8,
//       includeBase64: false,
//     })
//       .then(image => {
//         setImageUrl(image.path);
//         setSnackbarMessage('Image selected from gallery');
//         setSnackbarVisible(true);
//       })
//       .catch(error => {
//         if (error.code !== 'E_PICKER_CANCELLED') {
//           console.log(error);
//           setSnackbarMessage('Error selecting image');
//           setSnackbarVisible(true);
//         }
//       });
//   };

//   // ✅ WITH PERMISSION - Camera (permission required)
//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: 'Camera Permission',
//             message: 'App needs access to your camera to take photos',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const takePhotoFromCamera = async () => {
//     const hasPermission = await requestCameraPermission();

//     if (!hasPermission) {
//       Alert.alert(
//         'Permission Required',
//         'Camera permission is needed to take photos. Please grant permission in settings.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Open Settings', onPress: () => Linking.openSettings() },
//         ],
//       );
//       return;
//     }

//     ImagePicker.openCamera({
//       width: 500,
//       height: 500,
//       cropping: true,
//       cropperCircleOverlay: true,
//       compressImageQuality: 0.8,
//     })
//       .then(image => {
//         setImageUrl(image.path);
//         setSnackbarMessage('Photo captured successfully');
//         setSnackbarVisible(true);
//       })
//       .catch(error => {
//         if (error.code !== 'E_PICKER_CANCELLED') {
//           console.log(error);
//           setSnackbarMessage('Error capturing photo');
//           setSnackbarVisible(true);
//         }
//       });
//   };

//   // Show image picker options
//   const showImagePickerOptions = () => {
//     Alert.alert(
//       'Select Image',
//       'Choose an option',
//       [
//         { text: '📸 Camera', onPress: takePhotoFromCamera },
//         { text: '🖼️ Gallery (No Permission)', onPress: selectImageFromGallery },
//         { text: 'Cancel', style: 'cancel' },
//       ],
//       { cancelable: true },
//     );
//   };

//   const ServiceCard = ({ item }: { item: Service }) => (
//     <Card style={styles.card}>
//       <Card.Content>
//         <View style={styles.header}>
//           <Image source={{ uri: item.imageUrl }} style={styles.serviceImage} />

//           <View style={{ flex: 1 }}>
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.desc}>{item.description}</Text>

//             <View style={styles.timeBox}>
//               <Icon name="clock-outline" size={16} color="#666" />
//               <Text style={styles.timeText}>{item.duration}</Text>
//             </View>
//           </View>

//           <View style={styles.actions}>
//             <TouchableOpacity onPress={() => handleEdit(item)}>
//               <Icon name="pencil" size={20} color="#FF6B35" />
//             </TouchableOpacity>

//             <TouchableOpacity onPress={() => handleDelete(item.id)}>
//               <Icon name="delete" size={20} color="red" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Card.Content>
//     </Card>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loading}>
//         <ActivityIndicator size="large" color="#FF6B35" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={services}
//         renderItem={({ item }) => <ServiceCard item={item} />}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={{ padding: 15 }}
//       />

//       <FAB icon="plus" style={styles.fab} onPress={handleAdd} color="#fff" />

//       {/* MODAL */}
//       <Modal visible={modalVisible} transparent animationType="slide">
//         <View style={styles.modalBg}>
//           <View style={styles.modal}>
//             <Text style={styles.modalTitle}>
//               {editingService ? 'Edit Service' : 'Add Service'}
//             </Text>

//             {/* Title Field */}
//             <TextInput
//               label="Title"
//               mode="outlined"
//               value={title}
//               onChangeText={setTitle}
//               style={styles.input}
//               placeholder="Enter service title"
//             />

//             {/* Description Field */}
//             <TextInput
//               label="Description"
//               mode="outlined"
//               value={description}
//               onChangeText={setDescription}
//               style={styles.input}
//               multiline
//               numberOfLines={3}
//               placeholder="Enter service description"
//             />

//             {/* Duration Field */}
//             <TextInput
//               label="Duration"
//               mode="outlined"
//               value={duration}
//               onChangeText={setDuration}
//               style={styles.input}
//               placeholder="e.g., 30 min, 1 hour"
//             />

//             {/* Image Selection - Gallery without permission, Camera with permission */}
//             <Text style={styles.imagePickerLabel}>Service Image</Text>
//             <TouchableOpacity
//               onPress={showImagePickerOptions}
//               style={styles.imagePickerButton}
//             >
//               {imageUrl ? (
//                 <View style={styles.selectedImageContainer}>
//                   <Image
//                     source={{ uri: imageUrl }}
//                     style={styles.selectedImage}
//                   />
//                   <Text style={styles.changeImageText}>
//                     Tap to change image
//                   </Text>
//                 </View>
//               ) : (
//                 <View style={styles.uploadContainer}>
//                   <Icon name="cloud-upload" size={40} color="#FF6B35" />
//                   <Text style={styles.uploadText}>Tap to select image</Text>
//                   <Text style={styles.uploadSubtext}>
//                     Choose from Gallery or Camera
//                   </Text>
//                 </View>
//               )}
//             </TouchableOpacity>

//             <View style={styles.row}>
//               <Button onPress={() => setModalVisible(false)}>Cancel</Button>
//               <Button
//                 mode="contained"
//                 onPress={handleSave}
//                 buttonColor="#FF6B35"
//               >
//                 Save
//               </Button>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Snackbar
//         visible={snackbarVisible}
//         onDismiss={() => setSnackbarVisible(false)}
//         duration={2000}
//       >
//         {snackbarMessage}
//       </Snackbar>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f5f5f5' },
//   loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },

//   card: {
//     marginBottom: 12,
//     borderRadius: 12,
//     elevation: 2,
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   serviceImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 12,
//     backgroundColor: '#f0f0f0',
//   },

//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

//   desc: {
//     fontSize: 13,
//     color: '#666',
//     marginTop: 2,
//   },

//   timeBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5,
//   },

//   timeText: {
//     marginLeft: 5,
//     fontSize: 13,
//     color: '#444',
//   },

//   actions: {
//     flexDirection: 'row',
//     gap: 10,
//   },

//   fab: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#FF6B35',
//   },

//   modalBg: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   modal: {
//     width: '90%',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 15,
//     maxHeight: '80%',
//   },

//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color: '#333',
//   },

//   input: {
//     marginTop: 10,
//   },

//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },

//   imagePickerLabel: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#333',
//     marginTop: 15,
//     marginBottom: 8,
//   },

//   imagePickerButton: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//     overflow: 'hidden',
//   },

//   uploadContainer: {
//     padding: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   uploadText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#333',
//     fontWeight: '500',
//   },

//   uploadSubtext: {
//     marginTop: 5,
//     fontSize: 12,
//     color: '#999',
//   },

//   selectedImageContainer: {
//     alignItems: 'center',
//     padding: 15,
//   },

//   selectedImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#f0f0f0',
//   },

//   changeImageText: {
//     marginTop: 10,
//     fontSize: 14,
//     color: '#FF6B35',
//   },
// });





import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  FAB,
  ActivityIndicator,
  Snackbar,
  TextInput,
  Portal,
  Dialog,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import { PermissionsAndroid } from 'react-native';

interface Service {
  id: number;
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
}

export default function ServicesManagement(): any {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [imagePickerVisible, setImagePickerVisible] = useState<boolean>(false);

  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  // form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    await new Promise((res: any) => setTimeout(res, 800));

    const mock: Service[] = [
      {
        id: 1,
        title: 'Hair Cutting',
        description: 'Professional haircut with styling',
        duration: '30 min',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/2920/2920247.png',
      },
      {
        id: 2,
        title: 'Facial Treatment',
        description: 'Glow facial for skin refresh',
        duration: '60 min',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/2922/2922562.png',
      },
    ];

    setServices(mock);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingService(null);
    setTitle('');
    setDescription('');
    setDuration('');
    setImageUrl('');
    setModalVisible(true);
  };

  const handleEdit = (item: Service) => {
    setEditingService(item);
    setTitle(item.title);
    setDescription(item.description);
    setDuration(item.duration);
    setImageUrl(item.imageUrl);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!title || !description || !duration) {
      setSnackbarMessage('Please fill all required fields');
      setSnackbarVisible(true);
      return;
    }

    if (editingService) {
      setServices(prev =>
        prev.map(s =>
          s.id === editingService.id
            ? { ...s, title, description, duration, imageUrl }
            : s,
        ),
      );
      setSnackbarMessage('Service updated');
    } else {
      const newService: Service = {
        id: services.length + 1,
        title,
        description,
        duration,
        imageUrl:
          imageUrl || 'https://cdn-icons-png.flaticon.com/512/2920/2920247.png',
      };

      setServices([...services, newService]);
      setSnackbarMessage('Service added');
    }

    setModalVisible(false);
    setSnackbarVisible(true);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Delete Service',
      'Are you sure you want to delete this service?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setServices(prev => prev.filter(s => s.id !== id));
            setSnackbarMessage('Service deleted');
            setSnackbarVisible(true);
          },
        },
      ]
    );
  };

  const selectImageFromGallery = () => {
    setImagePickerVisible(false);
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.8,
      includeBase64: false,
    })
      .then(image => {
        setImageUrl(image.path);
        setSnackbarMessage('Image selected from gallery');
        setSnackbarVisible(true);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log(error);
          setSnackbarMessage('Error selecting image');
          setSnackbarVisible(true);
        }
      });
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera to take photos',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const takePhotoFromCamera = async () => {
    setImagePickerVisible(false);
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission Required',
        'Camera permission is needed to take photos. Please grant permission in settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ],
      );
      return;
    }

    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.8,
    })
      .then(image => {
        setImageUrl(image.path);
        setSnackbarMessage('Photo captured successfully');
        setSnackbarVisible(true);
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          console.log(error);
          setSnackbarMessage('Error capturing photo');
          setSnackbarVisible(true);
        }
      });
  };

  const removeImage = () => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setImageUrl('');
            setSnackbarMessage('Image removed');
            setSnackbarVisible(true);
          },
        },
      ]
    );
  };

  const ServiceCard = ({ item }: { item: Service }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Image source={{ uri: item.imageUrl }} style={styles.serviceImage} />

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.description}</Text>

            <View style={styles.timeBox}>
              <Icon name="clock-outline" size={16} color="#666" />
              <Text style={styles.timeText}>{item.duration}</Text>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Icon name="pencil" size={20} color="#FF6B35" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Icon name="delete" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        renderItem={({ item }) => <ServiceCard item={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 15 }}
      />

      <FAB icon="plus" style={styles.fab} onPress={handleAdd} color="#fff" />

      {/* Main Add/Edit Service Modal */}
      <Modal 
        visible={modalVisible} 
        transparent 
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingService ? 'Edit Service' : 'Add Service'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <TextInput
              label="Title"
              mode="outlined"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              placeholder="Enter service title"
              left={<TextInput.Icon icon="format-title" />}
            />

            <TextInput
              label="Description"
              mode="outlined"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              multiline
              numberOfLines={3}
              placeholder="Enter service description"
              left={<TextInput.Icon icon="text" />}
            />

            <TextInput
              label="Duration"
              mode="outlined"
              value={duration}
              onChangeText={setDuration}
              style={styles.input}
              placeholder="e.g., 30 min, 1 hour"
              left={<TextInput.Icon icon="clock-outline" />}
            />

            {/* Image Selection Section */}
            <View style={styles.imageSection}>
              <Text style={styles.imageSectionLabel}>Service Image</Text>
              
              {imageUrl ? (
                <View style={styles.imagePreviewContainer}>
                  <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
                  <View style={styles.imageActions}>
                    <TouchableOpacity
                      style={styles.imageActionButton}
                      onPress={() => setImagePickerVisible(true)}
                    >
                      <Icon name="camera" size={20} color="#FF6B35" />
                      <Text style={styles.imageActionText}>Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.imageActionButton, styles.removeButton]}
                      onPress={removeImage}
                    >
                      <Icon name="delete" size={20} color="#dc2626" />
                      <Text style={[styles.imageActionText, styles.removeText]}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.imagePickerBox}
                  onPress={() => setImagePickerVisible(true)}
                  activeOpacity={0.7}
                >
                  <Icon name="image-plus" size={50} color="#FF6B35" />
                  <Text style={styles.imagePickerTitle}>Add Service Image</Text>
                  <Text style={styles.imagePickerSubtitle}>
                    Tap to add image from gallery or camera
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.modalActions}>
              <Button
                mode="outlined"
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
                labelStyle={styles.cancelButtonLabel}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSave}
                buttonColor="#FF6B35"
                style={styles.saveButton}
                labelStyle={styles.saveButtonLabel}
              >
                {editingService ? 'Update' : 'Add'} Service
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/* Image Picker Modal - Now using a separate Modal that will appear on top */}
      <Modal
        visible={imagePickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setImagePickerVisible(false)}
      >
        <TouchableOpacity 
          style={styles.imagePickerOverlay} 
          activeOpacity={1}
          onPress={() => setImagePickerVisible(false)}
        >
          <TouchableOpacity 
            style={styles.imagePickerDialog} 
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.imagePickerHeader}>
              <Icon name="image" size={24} color="#FF6B35" />
              <Text style={styles.imagePickerDialogTitle}>Choose Image Source</Text>
            </View>
            
            <TouchableOpacity
              style={styles.imageSourceOption}
              onPress={takePhotoFromCamera}
            >
              <View style={styles.optionIconContainer}>
                <Icon name="camera" size={28} color="#FF6B35" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Camera</Text>
                <Text style={styles.optionDescription}>Take a new photo</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.imageSourceOption}
              onPress={selectImageFromGallery}
            >
              <View style={styles.optionIconContainer}>
                <Icon name="image-multiple" size={28} color="#FF6B35" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Gallery</Text>
                <Text style={styles.optionDescription}>Choose from existing images</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#ccc" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelOption}
              onPress={() => setImagePickerVisible(false)}
            >
              <Text style={styles.cancelOptionText}>Cancel</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        action={{
          label: 'Close',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  card: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  desc: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  timeText: {
    marginLeft: 5,
    fontSize: 13,
    color: '#444',
  },

  actions: {
    flexDirection: 'row',
    gap: 10,
  },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF6B35',
  },

  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    maxHeight: '85%',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },

  input: {
    marginTop: 12,
  },

  imageSection: {
    marginTop: 20,
  },

  imageSectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },

  imagePickerBox: {
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderStyle: 'dashed',
    borderRadius: 12,
    backgroundColor: '#fff7f0',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagePickerTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  imagePickerSubtitle: {
    marginTop: 5,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },

  imagePreviewContainer: {
    alignItems: 'center',
  },

  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
  },

  imageActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },

  imageActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    gap: 5,
  },

  imageActionText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },

  removeButton: {
    backgroundColor: '#fee',
  },

  removeText: {
    color: '#dc2626',
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    gap: 10,
  },

  cancelButton: {
    flex: 1,
    borderColor: '#ddd',
  },

  cancelButtonLabel: {
    color: '#666',
  },

  saveButton: {
    flex: 1,
  },

  saveButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Image Picker Modal Styles
  imagePickerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagePickerDialog: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  imagePickerHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },

  imagePickerDialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },

  imageSourceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  optionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff7f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  optionTextContainer: {
    flex: 1,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },

  optionDescription: {
    fontSize: 13,
    color: '#999',
  },

  cancelOption: {
    marginTop: 15,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
});