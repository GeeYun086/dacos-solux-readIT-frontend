import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // 전체 기사 목록 데이터 호출 함수
  const getArticles = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      if (token) {
        const response = await fetch(`http://43.200.64.115:8081/api/v1/articles`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          setArticles(data.data); // 기사 데이터 상태 업데이트
        } else {
          Alert.alert('오류', '전체 기사 데이터를 가져오는 데 실패했습니다.');
        }
      } else {
        Alert.alert('오류', '로그인이 필요합니다.');
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      Alert.alert('서버 오류', '전체 기사 데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 호출
  useEffect(() => {
    getArticles();
  }, []);

  // 기사 아이템을 클릭했을 때 ArticleDetailScreen으로 이동
  const handleArticlePress = (article) => {
    navigation.navigate('ArticleDetailScreen', {
      articleId: article.id,
    });
  };

  return (
    <View style={styles.container}>
      {/* IT 관련 콘텐츠 모두 확인하기 텍스트 */}
      <Text style={styles.subTitle}>IT 관련 콘텐츠 모두 확인하기</Text>

      {/* 전체 기사 목록 */}
      {loading ? (
        <Text>로딩 중...</Text>
      ) : (
        <ScrollView style={styles.articleList}>
          {articles.length > 0 ? (
            articles.map((article) => (
              <TouchableOpacity key={article.id} onPress={() => handleArticlePress(article)}>
                <View style={styles.articleItem}>
                  <Image source={{ uri: article.imgUrl }} style={styles.articleThumbnail} />
                  <View style={styles.articleTextContainer}>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                    <Text style={styles.articlePublisher}>{article.source}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text>기사를 불러오는 중...</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  articleList: {
    marginTop: 20,
  },
  articleItem: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // 각 항목 구분선
    paddingBottom: 10,
  },
  articleThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5, // 썸네일의 작은 원형 이미지
    marginRight: 10,
  },
  articleTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  articlePublisher: {
    fontSize: 14,
    color: '#555',
  },
});

export default AllScreen;