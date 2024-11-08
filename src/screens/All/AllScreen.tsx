import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const thumbnailImage = require('../../img/thumbnail.png');

const articles = [
  {
    thumbnail: thumbnailImage,
    title: '기사 제목 1',
    publisher: '출판사 1',
  },
  {
    thumbnail: thumbnailImage,
    title: '기사 제목 2',
    publisher: '출판사 2',
  },
  {
    thumbnail: thumbnailImage,
    title: '기사 제목 3',
    publisher: '출판사 3',
  },
  {
    thumbnail: thumbnailImage,
    title: '기사 제목 4',
    publisher: '출판사 4',
  },
  {
    thumbnail: thumbnailImage,
    title: '기사 제목 5',
    publisher: '출판사 5',
  },
];

const AllScreen = () => {
  const navigation = useNavigation(); // Hook to get the navigation object

  // Function to handle article selection and navigate to ArticleDetailScreen
  const handleArticlePress = (title, publisher) => {
    navigation.navigate('ArticleDetailScreen', {
      articleTitle: title, // Use the title directly
      articlePublisher: publisher, // Use the publisher directly
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>IT 관련 콘텐츠 모두 확인하기</Text>
      <ScrollView style={styles.articleList}>
        {articles.map((article, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleArticlePress(article.title, article.publisher)} // Pass title and publisher directly
          >
            <View style={styles.articleItem}>
              <Image source={article.thumbnail} style={styles.articleThumbnail} />
              <View style={styles.articleTextContainer}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articlePublisher}>{article.publisher}</Text>
              </View>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'white',
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

export default AllScreen;