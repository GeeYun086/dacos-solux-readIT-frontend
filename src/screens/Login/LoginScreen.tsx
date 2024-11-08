import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../../navigator/AppNavigator';

const logoTitle = require('../../img/logo.png'); // 로고 아이콘

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext); // AuthContext에서 login 함수 사용

  return (
    <View style={styles.container}>
      <Image source={logoTitle} style={styles.logo} />
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signUpText}>회원가입하러 가기</Text>
        </TouchableOpacity>
      </View>
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
