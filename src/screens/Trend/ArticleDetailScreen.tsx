import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArticleDetailScreen = ({ route }) => {
  const { articleId } = route.params;
  const [article, setArticle] = useState(null);
  const [highlight, setHighlight] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const navigation = useNavigation();

  const getArticleDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await fetch(`http://43.200.64.115:8081/api/v1/articles/${articleId}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setArticle(data.data.article);
          setHighlight(data.data.highlight);
          setIsBookmarked(data.data.article.isScrapped);
          setViewCount(data.data.article.viewCount);
        } else {
          Alert.alert('오류', '기사 상세 데이터를 가져오는 데 실패했습니다.');
        }
      } else {
        Alert.alert('오류', '로그인이 필요합니다.');
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      Alert.alert('서버 오류', '기사 상세 데이터를 불러오는 데 실패했습니다.');
    }
  };

  const getRecommendedArticles = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await fetch(`http://43.200.64.115:8081/api/v1/articles/${articleId}/similar`, {
          method: 'GET',
          headers: { 'Authorization' : `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          setRecommendedArticles(data.data);
        } else {
          Alert.alert('오류', '추천 기사를 불러오는 데 실패했습니다.');
        }
      } else {
        Alert.alert('오류', '로그인이 필요합니다.');
      }
    } catch (error) {
      console.error('추천 기사 요청 오류:', error);
      Alert.alert('서버 오류', '추천 기사를 불러오는 데 실패했습니다.');
    }
  };

  const toggleBookmark = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const newBookmarkStatus = !isBookmarked;
        const response = await fetch(`http://43.200.64.115:8081/api/v1/articles/${articleId}/bookmark`, {
          method: newBookmarkStatus ? 'POST' : 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success) {
          setIsBookmarked(newBookmarkStatus);
        } else {
          Alert.alert('오류', '북마크 상태를 변경하는 데 실패했습니다.');
        }
      } else {
        Alert.alert('오류', '로그인이 필요합니다.');
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      Alert.alert('서버 오류', '북마크 상태 변경에 실패했습니다.');
    }
  };

  useEffect(() => {
    getArticleDetails();
    getRecommendedArticles();
  }, [articleId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
        <Image source={require('../../img/arrow-left.png')} style={styles.image} />
        <Text style={styles.headerText}>기사 보기</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {article ? (
          <>
            <Text style={styles.title}>{article.title}</Text>
            <View style={styles.publisherContainer}>
              <Text style={styles.publisher}>{article.source}</Text>
              <Text style={styles.date}>{article.pubDate}</Text>
              <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={toggleBookmark}>
                  <Image
                    source={isBookmarked ? require('../../img/Bookmark.png') : require('../../img/NoBookmark.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <Text style={styles.iconText}>{isBookmarked ? 1 : 0}</Text>
                <Image source={require('../../img/watchNumber.png')} style={styles.icon} />
                <Text style={styles.iconText}>{viewCount}</Text>
              </View>
            </View>

            <Image source={{ uri: article.imgUrl }} style={styles.thumbnailImage} />

            <Text style={styles.mindmap}>리딧 AI의 요약</Text>
            <Text style={styles.summary}>{article.summary}</Text>

            <Text style={styles.mindmap}>MY 마인드맵</Text>
            <Text style={styles.summary}>
              아직 등록된 MY 마인드맵이 없습니다. 새로 등록하시겠습니까?
            </Text>

            <TouchableOpacity style={styles.makeMindMapButton}>
              <Image source={require('../../img/MakeMindMap.png')} style={styles.makeMindMapImage} />
            </TouchableOpacity>

            {/* Recommended Articles Section */}
            <Text style={styles.recommendationTitle}>이 기사와 관련된 추천 기사</Text>
            {recommendedArticles.map((recArticle) => (
              <TouchableOpacity
                key={recArticle.id}
                style={styles.recommendationItem}
                onPress={() => navigation.push('ArticleDetailScreen', { articleId: recArticle.id })}
              >
                <Image source={{ uri: recArticle.thumbnail }} style={styles.recommendationThumbnail} />
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationText}>{recArticle.title}</Text>
                  <Text style={styles.recommendationPublisher}>{recArticle.source}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <Text>로딩 중...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  image: { width: 24, height: 24, marginRight: 10 },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  content: { paddingBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 12 },
  publisherContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  publisher: { fontSize: 15, color: 'black', marginRight: 10 },
  date: { fontSize: 15, color: 'gray', marginRight: 120 },
  iconsContainer: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 20, height: 20, marginHorizontal: 4 },
  iconText: { fontSize: 15, color: 'black', marginHorizontal: 4 },
  thumbnailImage: { width: '100%', height: 200, marginBottom: 20 },
  mindmap: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  summary: { fontSize: 16, color: 'black', marginBottom: 20 },
  makeMindMapButton: { alignSelf: 'flex-end' },
  makeMindMapImage: { width: 124, height: 30 },
  recommendationTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  recommendationThumbnail: { width: 60, height: 60, borderRadius: 8 },
  recommendationContent: { flex: 1, marginLeft: 10 },
  recommendationText: { fontSize: 16, color: 'black' },
  recommendationPublisher: { fontSize: 14, color: 'gray' },
});

export default ArticleDetailScreen;