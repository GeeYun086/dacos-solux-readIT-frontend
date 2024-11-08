import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ArticleDetailScreen = ({ route }) => {
  const { articleTitle, articlePublisher } = route.params; // Retrieve the params
  const navigation = useNavigation();

  // State to manage the bookmark status (empty or filled)
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Toggle bookmark status
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <View style={styles.container}>
      {/* Header with title "기사 보기" */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.header}>
        <Image
          source={require('../../img/arrow-left.png')}
          style={styles.image}
        />
        <Text style={styles.headerText}>기사 보기</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{articleTitle}</Text>

        {/* Publisher and date */}
        <View style={styles.publisherContainer}>
          <Text style={styles.publisher}>{articlePublisher}</Text>
          <Text style={styles.date}>2024.11.08</Text>
          <View style={styles.iconsContainer}>
            {/* Toggle Bookmark Icon */}
            <TouchableOpacity onPress={toggleBookmark}>
              <Image
                source={
                  isBookmarked
                    ? require('../../img/Bookmark.png')  // Filled bookmark
                    : require('../../img/NoBookmark.png')   // Empty bookmark
                }
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.iconText}>8</Text>
            <Image
              source={require('../../img/watchNumber.png')}
              style={styles.icon}
            />
            <Text style={styles.iconText}>16</Text>
          </View>
        </View>

        {/* Thumbnail Image */}
        <Image
          source={require('../../img/thumbnail.png')}
          style={styles.thumbnailImage}
        />

        {/* Button to go to the article */}
        <TouchableOpacity style={styles.gotoArticleButton}>
          <Image
            source={require('../../img/gotoArticle.png')}
            style={styles.gotoArticleImage}
          />
        </TouchableOpacity>

        {/* AI Summary */}
        <Text style={styles.mindmap}>리딧 AI의 요약</Text>
        <Text style={styles.summary}>
          오픈AI의 스웜(Swarm)은 자율적으로 협력하는 AI 에이전트를 구성해 복잡한
          작업을 자동 수행하는 실험적 프레임워크이다. 파이썬 기반의 오픈소스로,
          핸드오프와 루틴 기능을 지원하며, 보안 위험을 증가시킬 수 있어 이에
          대한 대응이 필요하다.
        </Text>

        {/* MY Mindmap */}
        <Text style={styles.mindmap}>MY 마인드맵</Text>
        <Text style={styles.summary}>
          아직 등록된 MY 마인드맵이 없습니다. 새로 등록하시겠습니까?
        </Text>

        {/* Button to create a new Mindmap */}
        <TouchableOpacity style={styles.makeMindMapButton}>
          <Image
            source={require('../../img/MakeMindMap.png')}
            style={styles.makeMindMapImage}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', // Set background color to white
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  publisherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  publisher: {
    fontSize: 15,
    color: 'black',
    marginRight: 10,
  },
  date: {
    fontSize: 15,
    color: 'gray',
    marginRight: 120,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 4,
  },
  iconText: {
    fontSize: 15,
    color: 'black',
    marginHorizontal: 4,
  },
  thumbnailImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  gotoArticleButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  gotoArticleImage: {
    width: 108,
    height: 34,
  },
  mindmap: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  summary: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
  makeMindMapButton: {
    alignSelf: 'flex-end',
  },
  makeMindMapImage: {
    width: 124,
    height: 30,
  },
});

export default ArticleDetailScreen;