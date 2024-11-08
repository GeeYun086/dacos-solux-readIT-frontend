import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

// 임시 이미지들
const thumbnailImage1 = require('../../img/thumbnail.png'); // 썸네일 이미지 1
const thumbnailImage2 = require('../../img/wordCloud.png'); // 썸네일 이미지 2
const thumbnailImage3 = require('../../img/logo.png'); // 썸네일 이미지 3

const TrendScreen = () => {
  const [selectedTab, setSelectedTab] = useState('today');
  const [currentThumbnail, setCurrentThumbnail] = useState(thumbnailImage1); // 기본 이미지 1 설정

  const hotArticles = {
    today: [
      { title: '오늘의 첫 번째 기사', publisher: '솔룩스 일보', thumbnail: thumbnailImage1 },
      { title: '오늘의 두 번째 기사', publisher: '다코스 일보', thumbnail: thumbnailImage1 },
      { title: '오늘의 세 번째 기사', publisher: '눈송이 일보', thumbnail: thumbnailImage1 },
      { title: '오늘의 네 번째 기사', publisher: '숙대 일보', thumbnail: thumbnailImage1 },
      { title: '오늘의 다섯 번째 기사', publisher: '숙명 일보', thumbnail: thumbnailImage1 },
    ],
    week: [
      { title: '이번 주 첫 번째 기사', publisher: '솔룩스 일보', thumbnail: thumbnailImage1 },
      { title: '이번 주 두 번째 기사', publisher: '다코스 일보', thumbnail: thumbnailImage1 },
      { title: '이번 주 세 번째 기사', publisher: '눈송이 일보', thumbnail: thumbnailImage1 },
      { title: '이번 주 네 번째 기사', publisher: '숙대 일보', thumbnail: thumbnailImage1 },
      { title: '이번 주 다섯 번째 기사', publisher: '숙명 일보', thumbnail: thumbnailImage1 },
    ],
    month: [
      { title: '이번 달 첫 번째 기사', publisher: '솔룩스 일보', thumbnail: thumbnailImage1 },
      { title: '이번 달 두 번째 기사', publisher: '다코스 일보', thumbnail: thumbnailImage1 },
      { title: '이번 달 세 번째 기사', publisher: '눈송이 일보', thumbnail: thumbnailImage1 },
      { title: '이번 달 네 번째 기사', publisher: '숙대 일보', thumbnail: thumbnailImage1 },
      { title: '이번 달 다섯 번째 기사', publisher: '숙명 일보', thumbnail: thumbnailImage1 },
    ],
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleThumbnailChange = (image) => {
    setCurrentThumbnail(image); // 이미지 변경
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.subTitle}>주목해야 할 관심 직무 소식</Text>

        {/* 썸네일 이미지가 들어갈 둥근 사각형 */}
        <View style={styles.thumbnailContainer}>
          <Image
            source={currentThumbnail}  // 선택된 이미지
            style={styles.thumbnail}
          />
        </View>

        {/* 작은 원들 */}
        <View style={styles.dotContainer}>
          {[thumbnailImage1, thumbnailImage2, thumbnailImage3].map((image, index) => (
            <TouchableOpacity key={index} onPress={() => handleThumbnailChange(image)} style={styles.dot}>
              <View style={[styles.dotIndicator, currentThumbnail === image && styles.selectedDot]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* HOT한 IT 콘텐츠 확인하기 */}
        <Text style={styles.hotContentTitle}>HOT한 IT 콘텐츠 확인하기</Text>

        {/* 탭 선택: 오늘, 이번 주, 이번 달 */}
        <View style={styles.tabHeader}>
          {['today', 'week', 'month'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabChange(tab)}
              style={[styles.tabButton, selectedTab === tab && styles.selectedTabButton]}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>
                {tab === 'today' ? '오늘' : tab === 'week' ? '이번 주' : '이번 달'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 해당하는 콘텐츠 목록 표시 */}
        <View style={styles.articleList}>
          {hotArticles[selectedTab].map((article, index) => (
            <View key={index} style={styles.articleItem}>
              <Image source={article.thumbnail} style={styles.articleThumbnail} />
              <View style={styles.articleTextContainer}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articlePublisher}>{article.publisher}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  scrollViewContent: {
    paddingBottom: 80, // Ensure there's enough space at the bottom
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '600',
  },
  thumbnailContainer: {
    width: '100%',
    height: 200,
    borderRadius: 15, // 둥근 사각형
    overflow: 'hidden', // 이미지가 넘칠 경우 잘라냄
    backgroundColor: '#f0f0f0', // 배경 색상
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // 이미지가 박스 크기에 맞게 잘리거나 비율에 맞게 맞춰짐
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    marginHorizontal: 5,
  },
  dotIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5, // 동그란 원
    backgroundColor: '#ccc', // 기본 회색
  },
  selectedDot: {
    backgroundColor: '#007BFF', // 선택된 원 파란색
  },
  hotContentTitle: {
    fontSize: 20,
    marginTop: 40,
    fontWeight: '600',
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  selectedTabButton: {
    backgroundColor: '#007BFF',
  },
  tabText: {
    fontSize: 16,
    color: '#007BFF',
  },
  selectedTabText: {
    color: 'white',
  },
  articleList: {
    marginTop: 20,
  },
  articleItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  articleThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
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

export default TrendScreen;