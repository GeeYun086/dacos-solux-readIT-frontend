import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const thumbnailImage = require('../../img/thumbnail.png'); // 로컬 이미지 예시

const articles = [
  {
    thumbnail: thumbnailImage, // 로컬 이미지 사용
    title: 'IT 트렌드 자소서 직무에 맞는 자소서 쓰는 꿀팁 10가지',
    publisher: '솔룩스 일보',
  },
  {
    thumbnail: thumbnailImage, // 로컬 이미지 사용
    title: '데이터 전문가들이 전하는 최신 비즈니스 인사이트 동향',
    publisher: '다코스 일보',
  },
  {
    thumbnail: thumbnailImage, // 로컬 이미지 사용
    title: '분산 네트워크의 혁명 블록체인 아키텍처의 시각화',
    publisher: '눈송이 일보',
  },
  {
    thumbnail: thumbnailImage, // 로컬 이미지 사용
    title: '에이전틱 AI 간의 협력… "AI 스웜"이라는 새로운 기술에 주목할 때',
    publisher: '중앙 일보',
  },
];

const ScrapScreen = () => {
  const navigation = useNavigation();

  const handleArticlePress = (articleTitle, articlePublisher) => {
    navigation.navigate('ScrapDetail', {articleTitle, articlePublisher}); // title과 publisher 값을 함께 전달
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>내가 스크랩한 컨텐츠 목록</Text>
      <ScrollView style={styles.articleList}>
        {articles.map((article, index) => (
          <TouchableOpacity
            key={index}
            style={styles.articleItem}
            onPress={() => handleArticlePress(article.title, article.publisher)} // publisher 값도 전달
          >
            <Image source={article.thumbnail} style={styles.articleThumbnail} />
            <View style={styles.articleTextContainer}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articlePublisher}>{article.publisher}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  articleList: {
    marginTop: 20,
  },
  articleItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  articleThumbnail: {
    width: 100,
    height: 100,
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
    color: 'gray',
  },
});

export default ScrapScreen;
