import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../navigator/AppNavigator';

const JobSelectionScreen = () => {
  const { completeSignUp, userData } = useContext(AuthContext); // 유저 데이터 가져오기
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigation = useNavigation();

  const jobs = {
    개발: [
      '백엔드 개발자',
      '프론트엔드 개발자',
      '웹개발자',
      '앱개발자',
      '시스템엔지니어',
      '네트워크엔지니어',
      'DBA (데이터베이스 관리자)',
      '데이터엔지니어',
      '데이터사이언티스트',
      '보안엔지니어',
      '소프트웨어개발자',
      '게임개발자',
      '하드웨어개발자',
      '머신러닝엔지니어',
      '블록체인개발자',
      '클라우드엔지니어',
    ],
    디자인: ['일러스트레이터', 'UI/UX 디자이너', '웹퍼블리셔'],
    기획: [
      '서비스 기획자',
      'PM(프로덕트 매니저)',
      'IT컨설팅',
      'QA (품질 보증)',
    ],
    비즈니스: [
      '경영전략/사업기회 전문가',
      '마케팅/홍보 전문가',
      '컨설턴트 전문가',
    ],
  };

  // 직무 이름에 대한 고유 아이디 매핑
  const jobIdMap = {
    '백엔드 개발자': 5,
    '프론트엔드 개발자': 6,
    '웹개발자': 7,
    '앱개발자': 8,
    '시스템엔지니어': 9,
    '네트워크엔지니어': 10,
    'DBA (데이터베이스 관리자)': 11,
    '데이터엔지니어': 12,
    '데이터사이언티스트': 13,
    '보안엔지니어': 14,
    '소프트웨어개발자': 15,
    '게임개발자': 16,
    '하드웨어개발자': 17,
    '머신러닝엔지니어': 18,
    '블록체인개발자': 19,
    '클라우드엔지니어': 20,
    '일러스트레이터': 21,
    'UI/UX 디자이너': 22,
    '웹퍼블리셔': 23,
    '서비스 기획자': 24,
    'PM(프로덕트 매니저)': 25,
    'IT컨설팅': 26,
    'QA (품질 보증)': 27,
    '경영전략/사업기회 전문가': 28,
    '마케팅/홍보 전문가': 29,
    '컨설턴트 전문가': 30,
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  const handleCompleteSignUp = async () => {
    // 선택된 직무가 있을 때만 처리
    if (selectedJob) {
      const jobId = jobIdMap[selectedJob]; // 직무의 고유 아이디 가져오기
      const { name, email, password } = userData; // 이전 화면에서 전달된 유저 데이터 사용

      try {
        const response = await fetch(`http://43.200.64.115:8081/api/v1/auth/signup`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({
            name,
            email,
            password,
            jobId,
          }),
        });

        const data = await response.json();

        if (response.ok) { // Ensure response is successful
          // 회원가입 성공 후 토큰과 사용자 정보 받아오기
          const { token, userInfo } = data.data;

          // 로그인 성공 후 AuthContext에 사용자 정보와 토큰 저장
          completeSignUp(token, userInfo); // 'completeSignUp' should be a function in your context
        } else {
          // 이미 가입된 이메일일 경우 처리
          Alert.alert('회원가입 실패', data.message);
        }
      } catch (error) {
        console.error('회원가입 오류:', error);
        Alert.alert('오류', '서버와 연결할 수 없습니다.');
      }
    } else {
      Alert.alert('직무를 선택해주세요');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>관심 직무를 선택해주세요!</Text>
      <Text style={styles.subText}>리딧은 맞춤형 IT 콘텐츠를 추천합니다</Text>

      <View style={styles.dividerContainer}>
        <View style={styles.categoriesContainer}>
          {['개발', '디자인', '기획', '비즈니스'].map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.jobsContainer}>
          {selectedCategory && (
            <ScrollView style={styles.scrollView}>
              {jobs[selectedCategory].map((job) => (
                <View key={job} style={styles.jobItem}>
                  <TouchableOpacity
                    style={[styles.radioButton, selectedJob === job && styles.selectedRadioButton]}
                    onPress={() => handleJobSelect(job)}
                  >
                    {selectedJob === job && <View style={styles.radioButtonInner} />}
                  </TouchableOpacity>
                  <Text style={styles.jobText}>{job}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.subText}>*선택한 직무를 중심으로 IT 기사가 추천됩니다</Text>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleCompleteSignUp}
        >
          <Text style={styles.completeButtonText}>선택 완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingHorizontal: 20, paddingVertical: 80 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subText: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
  dividerContainer: { flexDirection: 'row', alignItems: 'flex-start' },
  categoriesContainer: {
    width: '30%',
    borderRightWidth: 1,
    borderRightColor: 'gray',
    paddingRight: 20,
    alignItems: 'flex-start',
    height: '80%',
  },
  categoryButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedCategory: { backgroundColor: '#007BFF', borderRadius: 20 },
  categoryText: { fontSize: 16, color: 'black' },
  jobsContainer: { width: '70%', paddingLeft: 20 },
  scrollView: { maxHeight: '70%' },
  jobItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  jobText: { marginLeft: 10, fontSize: 16 },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  completeButton: {
    width: '80%',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    borderColor: '#007BFF',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007BFF',
  },
});

export default JobSelectionScreen;