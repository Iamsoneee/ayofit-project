import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MealCard from '../../components/record/MealCard';
import SearchModal from '../../components/record/SearchModal';


function RecordScreen( {route} ) {
  //Modal
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  // recordMain.js 에서 보내는 openModal 요청 받기
  useEffect(() => {
    if (route.params?.shouldOpenModal) {
      openModal();
      route.params.shouldOpenModal = false;
    }
  }, [route.params?.shouldOpenModal]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground source={require('../../images/background-img.png')} style={styles.backgroundImage}>

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}> Diet Record</Text>
            <Text style={styles.headerDate}> 2023.08.29 </Text>
          </View>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardScroll}
          >
            <MealCard mealType="Breakfast" mealTime="10:00" carb="55" protein="16.4" fat="21.5" totalCalories="487" openModal={openModal} />
            <MealCard mealType="Lunch" mealTime="10:00" carb="60" protein="18" fat="20" totalCalories="500" openModal={openModal} />
            <MealCard mealType="Dinner" mealTime="10:00" carb="65" protein="19" fat="23" totalCalories="550" openModal={openModal} />
            <MealCard mealType="Snack" mealTime="10:00" carb="65" protein="19" fat="23" totalCalories="550" openModal={openModal} />
          </ScrollView>

          <SearchModal
            modalVisible={modalVisible}
            closeModal={closeModal}
          />

        </ImageBackground>
      </View >
    </SafeAreaView >
  );
}
export default RecordScreen;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#E46C0A',
  },
  container: {
    backgroundColor: '#FFE9D8',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 350,
    marginVertical: 80,
    marginHorizontal: 35,
  },
  headerTitle: {
    fontWeight: '500',
    fontSize: 25,
    color: 'white',
  },
  headerDate: {
    color: '#CECECE',
    fontSize: 17,
  },
  //카드 디자인
  cardContainer: {
    width: 300,
    height: 430,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageContainer: {
    width: 270,
    height: 270,
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 60,
    color: 'rgba(0, 0, 0, 0.10)',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  mealTime: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 20,
  },
  nutrientText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  nutrientValue: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  TotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});