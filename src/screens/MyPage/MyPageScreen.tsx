import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const MyPageScreen = () => {
  // 사용자 정보 예시 (변수로 처리)
  const userName = '눈송이';  // 실제로는 사용자의 이름을 상태나 props로 받아야 합니다.
  const userEmail = 'noonsong@sookmyung.ac.kr';  // 마찬가지로 이메일도 변수로 받아야 합니다.
  const selectedJob = '백엔드 개발자';  // 선택한 직무도 변수로 처리

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
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 15,
    color: 'black',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',  // 회색 가로선
    marginVertical: 15,
  },
  settingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888888',  // 회색 텍스트
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