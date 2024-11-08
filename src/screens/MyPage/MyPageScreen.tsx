import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPageScreen = () => {
  // 사용자 정보 상태 변수
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [selectedJob, setSelectedJob] = useState('');
  const [loading, setLoading] = useState(true); // 데이터를 불러오는 중 표시

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // AsyncStorage에서 토큰 가져오기
        const token = await AsyncStorage.getItem('userToken');
        console.log(token);

        if (token) {
          // 사용자 정보 API 요청
          const response = await fetch(`http://43.200.64.115:8081/api/v1/user/info`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              //'Content-Type': 'application/json',
            },
          });

          const data = await response.json();
          console.log(data);
          if (response.ok) {
            // 사용자 정보 업데이트
            setUserName(data.data.name);
            setUserEmail(data.data.email);
            setSelectedJob(data.data.jobName);
          } else {
            Alert.alert('오류', data.message);
          }
        } else {
          Alert.alert('오류', '로그인 정보가 없습니다.');
        }
      } catch (error) {
        Alert.alert('오류', '사용자 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };

    fetchUserData();
  }, []);

  // 로딩 중일 때 표시할 UI
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 회원 이름 표시 */}
      <Text style={styles.userInfoText}>{userName} 님</Text>

      {/* 이메일 주소 표시 */}
      <Text style={styles.userInfoText}>{userEmail}</Text>

      {/* 선택한 직무 표시 */}
      <Text style={styles.userInfoText}>현재 선택한 직무: {selectedJob}</Text>

      {/* 회색 가로선 추가 */}
      <View style={styles.separator} />

      {/* 설정 텍스트 추가 */}
      <Text style={styles.settingText}>설정</Text>

      {/* 직무 변경하기 텍스트 추가 */}
      <TouchableOpacity>
        <Text style={styles.changeJobText}>직무 변경하기</Text>
      </TouchableOpacity>

      {/* 회색 가로선 추가 */}
      <View style={styles.separator} />

      {/* 도움말 텍스트 추가 */}
      <Text style={styles.settingText}>도움말</Text>

      {/* 도움말 항목들 */}
      <TouchableOpacity>
        <Text style={styles.helpText}>자주 묻는 질문</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.helpText}>개인정보 처리방침</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.helpText}>서비스 이용약관</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.helpText}>버전 정보</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.helpText}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.helpText}>회원탈퇴</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 15,
    color: 'black',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3', // 회색 가로선
    marginVertical: 15,
  },
  settingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888888', // 회색 텍스트
    marginBottom: 10,
  },
  changeJobText: {
    fontSize: 16,
    marginBottom: 10,
  },
  helpText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default MyPageScreen;