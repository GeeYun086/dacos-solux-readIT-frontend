import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../navigator/AppNavigator';

const logoTitle = require('../../img/logo.png'); // 로고 아이콘

const ChooseInterestScreen = ({navigation}) => {
  const {completeSignUp} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image source={logoTitle} style={styles.logo} />
      <Text style={styles.headerText}>관심 직무를 선택해주세요!</Text>
      <Text style={styles.subText}>리딧은 맞춤형 IT 콘텐츠를 추천합니다</Text>

      <View style={styles.buttonContainer}>
        <Text style={styles.subText}>
          *선택한 직무를 중심으로 IT 기사가 추천됩니다
        </Text>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('JobSelectionScreen')}>
          <Text style={styles.signupButtonText}>직무보기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={completeSignUp}>
          <Text style={styles.selectLaterText}>다음에 선택하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: 'white',
  },
  logo: {
    marginBottom: 40,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  signupButton: {
    width: '80%',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectLaterText: {
    color: 'black',
    marginTop: 15,
    fontSize: 14,
  },
});

export default ChooseInterestScreen;
