import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../navigator/AppNavigator';

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

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("오류", "이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("오류", "유효한 이메일 형식을 입력해주세요.");
      return;
    }
    login(); // 모든 조건이 만족되면 로그인 함수 호출
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