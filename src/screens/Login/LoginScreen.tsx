import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../navigator/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logoTitle = require('../../img/logo.png'); // 로고 아이콘

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext); // AuthContext에서 login 함수 사용
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTyping, setIsTyping] = useState(false); // 입력 중 여부 상태

  const isValidEmail = (email) => {
    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("오류", "이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("오류", "유효한 이메일 형식을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch('http://43.200.64.115:8081/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공 시 토큰과 사용자 정보 받아오기
        const { token, userInfo } = data.data;
        console.log(token);

        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

        // 로그인 성공 후 AuthContext에 사용자 정보와 토큰 저장
        login(token, userInfo); // Assumed that your context has a method to handle this

        // MainScreen으로 이동하지 않고 login() 함수만 호출
      } else {
        Alert.alert("로그인 실패", data.message);
      }
    } catch (error) {
      Alert.alert("오류", "서버와 연결할 수 없습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logoTitle} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        placeholderTextColor="gray"
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="gray"
        secureTextEntry
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
        onChangeText={setPassword}
        value={password}
      />
      {/* 입력 중이 아닐 때만 버튼 표시 */}
      {!isTyping && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signUpText}>회원가입하러 가기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: 'white',
  },
  logo: {
    marginBottom: 40,
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
  loginButton: {
    width: '80%',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    color: 'black',
    marginTop: 15,
    fontSize: 14,
  },
});

export default LoginScreen;