import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

// 임시 이미지와 데이터 (로컬 이미지)
const thumbnailImage = require('../../img/thumbnail.png'); // 로컬 이미지 파일

const articles = [
  {
    thumbnail: thumbnailImage, // 로컬 이미지 사용
    title: '기사 제목 1',
    publisher: '출판사 1',
  },
  {
    thumbnail: thumbnailImage, // 로컬 이미지 사용
    title: '기사 제목 2',
    publisher: '출판사 2',
  },
  {
    thumbnail: thumbnailImage, // 로컬 이미지 사용
    title: '기사 제목 3',
    publisher: '출판사 3',
  },
  {
    thumbnail: thumbnailImage, // 로컬 이미지 사용
    title: '기사 제목 4',
    publisher: '출판사 4',
  },
  {
    thumbnail: thumbnailImage, // 로컬 이미지 사용
    title: '기사 제목 5',
    publisher: '출판사 5',
  },
  // 추가적인 기사들
];

const AllScreen = () => {
  return (
    <View style={styles.container}>
      {/* IT 관련 콘텐츠 모두 확인하기 텍스트 */}
      <Text style={styles.subTitle}>IT 관련 콘텐츠 모두 확인하기</Text>

      {/* 모든 기사 목록 */}
      <ScrollView style={styles.articleList}>
        {articles.map((article, index) => (
          <View key={index} style={styles.articleItem}>
            <Image source={article.thumbnail} style={styles.articleThumbnail} />
            <View style={styles.articleTextContainer}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articlePublisher}>{article.publisher}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 20,
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
