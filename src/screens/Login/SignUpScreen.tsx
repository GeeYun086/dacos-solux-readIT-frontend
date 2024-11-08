import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const logoTitle = require('../../img/logo.png');

const SignUpScreen = ({navigation}) => {
  const handleSignUp = () => {
    // 회원가입 처리 후 직무 선택 화면으로 이동
    navigation.navigate('ChooseInterestScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={logoTitle} style={styles.logo} />
      <Text style={styles.welcomeText}>리딧에 오신 것을 환영해요!</Text>
      <Text style={styles.infoText}>
        관심 가는 IT 산업 트렌드를{'\n'}빠르게 모아 요약해드립니다
      </Text>
      <TextInput
        style={styles.input}
        placeholder="이름"
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="gray"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        placeholderTextColor="gray"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.linkText}>로그인하러 가기</Text>
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
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  logo: {
    marginBottom: 10,
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 5,
    textAlign: 'left',
    paddingLeft: 5,
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
  linkText: {
    color: 'black',
    marginTop: 15,
    fontSize: 14,
  },
});

export default SignUpScreen;
