import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import navigation

const TrendScreen = () => {
  const [articles, setArticles] = useState([]);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [wordCloudUrl, setWordCloudUrl] = useState(null);
  const [popularArticles, setPopularArticles] = useState([]);
  const [timePeriod, setTimePeriod] = useState('day');
  const navigation = useNavigation(); // Access navigation

  const getJobArticles = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await fetch(`http://43.200.64.115:8081/api/v1/articles/job`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const data = await response.json();
        if (data.success) {
          setArticles(data.data);
        } else {
          Alert.alert('오류', '기사 데이터를 가져오는 데 실패했습니다.');
        }
      } else {
        Alert.alert('오류', '로그인이 필요합니다.');
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      Alert.alert('서버 오류', '직무 기사 데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const getWordCloudImage = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await fetch(`http://43.200.64.115:8081/api/v1/keyword/img`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const data = await response.json();
        if (data.success) {
          setWordCloudUrl(data.data);
        } else {
          Alert.alert('오류', '워드 클라우드 이미지를 가져오는 데 실패했습니다.');
        }
      } else {
        Alert.alert('오류', '로그인이 필요합니다.');
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      Alert.alert('서버 오류', '워드 클라우드 이미지를 불러오는 데 실패했습니다.');
    }
  };

  const getPopularArticles = async (timePeriod) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await fetch(`http://43.200.64.115:8081/api/v1/articles/popular?time=${timePeriod}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        const data = await response.json();
        console.log(data);
        if (data.success) {
          setPopularArticles(data.data.slice(0, 5));  // Display top 5 popular articles
        } else {
          Alert.alert('오류', '인기 기사를 가져오는 데 실패했습니다.');
        }
      } else {
        Alert.alert('오류', '로그인이 필요합니다.');
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      Alert.alert('서버 오류', '인기 IT 기사를 불러오는 데 실패했습니다.');
    }
  };

  const handleTimePeriodChange = (newTimePeriod) => {
    setTimePeriod(newTimePeriod);
    getPopularArticles(newTimePeriod);
  };

  useEffect(() => {
    getJobArticles();
    getWordCloudImage();
    getPopularArticles(timePeriod);
  }, [timePeriod]);

  const handleArticleChange = (index) => {
    setCurrentArticleIndex(index);
  };

  // Navigate to ArticleDetailScreen when an article is clicked
  const navigateToArticleDetail = (article) => {
    navigation.navigate('ArticleDetailScreen', {
      articleId: article.id,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subTitle}>주목해야 할 관심 직무 소식</Text>
      {articles.length > 0 ? (
        <View style={styles.featuredArticleContainer}>
          <Image
            source={{ uri: articles[currentArticleIndex].imgUrl }}
            style={styles.featuredThumbnail}
          />
          <View style={styles.indicatorContainer}>
            {articles.slice(0, 3).map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleArticleChange(index)}
                style={[
                  styles.indicatorDot,
                  index === currentArticleIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>
      ) : (
        <Text>직무 관련 기사를 불러오는 중...</Text>
      )}

      <Text style={styles.subTitle}>이번 주 IT 키워드 클라우드</Text>
      {wordCloudUrl ? (
        <Image source={{ uri: wordCloudUrl }} style={styles.wordCloudImage} />
      ) : (
        <Text>워드 클라우드 이미지를 불러오는 중...</Text>
      )}

      <View style={styles.periodButtons}>
        {['day', 'week', 'month'].map((period) => (
          <TouchableOpacity
            key={period}
            onPress={() => handleTimePeriodChange(period)}
            style={[
              styles.button,
              timePeriod === period && styles.activeButton,
            ]}
          >
            <Text style={styles.buttonText}>
              {period === 'day' ? '오늘' : period === 'week' ? '이번 주' : '이번 달'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subTitle}>Hot한 IT 콘텐츠</Text>
      {popularArticles.length > 0 ? (
        popularArticles.map((article) => (
          <TouchableOpacity
            key={article.id}
            onPress={() => navigateToArticleDetail(article)} // Navigate on press
            style={styles.articleItem}
          >
            <Image source={{ uri: article.imgUrl }} style={styles.articleThumbnail} />
            <View style={styles.articleTextContainer}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articlePublisher}>{article.source}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text>인기 기사를 불러오는 중...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingVertical: 20 },
  subTitle: { fontSize: 20, marginBottom: 20, fontWeight: '600' },
  featuredArticleContainer: { alignItems: 'center', marginBottom: 20 },
  featuredThumbnail: { width: '100%', height: 200, borderRadius: 10, resizeMode: 'cover' },
  indicatorContainer: { flexDirection: 'row', marginTop: 10 },
  indicatorDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ccc', marginHorizontal: 5 },
  activeDot: { backgroundColor: '#007BFF' },
  wordCloudImage: { width: '100%', height: 200, marginBottom: 20, resizeMode: 'contain' },
  periodButtons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, marginBottom: 20 },
  button: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  activeButton: { backgroundColor: '#007BFF' },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  articleItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  articleThumbnail: { width: 60, height: 60, borderRadius: 5, marginRight: 10 },
  articleTextContainer: { flex: 1, justifyContent: 'center' },
  articleTitle: { fontSize: 16, fontWeight: 'bold' },
  articlePublisher: { fontSize: 14, color: '#555' },
});

export default TrendScreen;