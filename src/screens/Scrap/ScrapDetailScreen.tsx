import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ScrapDetailScreen = ({route}) => {
  const {articleTitle, articlePublisher} = route.params;
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [highlightedText, setHighlightedText] = useState([]);
  const [isHighlightMode, setHighlightMode] = useState(false); // 형광펜 모드 상태

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleTextPress = text => {
    if (isHighlightMode) {
      // 형광펜 모드일 때만 텍스트 하이라이트
      if (highlightedText.includes(text)) {
        setHighlightedText(highlightedText.filter(item => item !== text));
      } else {
        setHighlightedText([...highlightedText, text]);
      }
    }
  };

  const renderHighlightedText = (text, isHighlighted) => {
    return isHighlighted ? (
      <Text style={[styles.highlightedText, styles.summaryText]}>{text}</Text>
    ) : (
      <Text style={styles.summaryText}>{text}</Text>
    );
  };

  const splitSummaryText = text => {
    return text.split('.').map((sentence, index) => {
      const trimmedSentence = sentence.trim();
      if (trimmedSentence.length > 0) {
        const isHighlighted = highlightedText.includes(trimmedSentence);
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleTextPress(trimmedSentence)}>
            {renderHighlightedText(trimmedSentence + '.', isHighlighted)}
          </TouchableOpacity>
        );
      }
      return null;
    });
  };

  const handleHighlightMode = () => {
    setHighlightMode(!isHighlightMode); // 형광펜 모드 토글
    toggleModal(); // 모달 닫기
  };

  return (
    <View style={styles.container}>
      {/* Header with "내 스크랩" and "More" button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}>
          <Image
            source={require('../../img/arrow-left.png')}
            style={styles.image}
          />
          <Text style={styles.headerText}>내 스크랩</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleModal} style={styles.moreButton}>
          <Image
            source={require('../../img/more.png')}
            style={styles.moreImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{articleTitle}</Text>
        {/* Publisher, Date, Bookmark and Views */}
        <View style={styles.publisherContainer}>
          <Text style={styles.publisher}>{articlePublisher}</Text>
          <Text style={styles.date}>2024.11.08</Text>
          <View style={styles.iconsContainer}>
            <Image
              source={require('../../img/Bookmark.png')}
              style={styles.icon}
            />
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
        {/* Button to Go to Article */}
        <TouchableOpacity style={styles.gotoArticleButton}>
          <Image
            source={require('../../img/gotoArticle.png')}
            style={styles.gotoArticleImage}
          />
        </TouchableOpacity>
        {/* Summaries */}
        <Text style={styles.mindmap}>리딧 AI의 요약</Text>
        <Text style={styles.summary}>
          {splitSummaryText(
            '오픈AI의 스웜(Swarm)은 자율적으로 협력하는 AI 에이전트 네트워크를 구축할 수 있는 실험적 프레임워크입니다. 이 프레임워크는 다중 에이전트가 복잡한 작업을 인간의 개입 없이 수행할 수 있도록 설계되었습니다. 스웜은 오픈소스 프로젝트로, Python 개발자들이 사용할 수 있습니다. 또한, 에이전트 간 작업을 넘기는 핸드오프 기능과 작업 지침을 제공하는 루틴 기능을 지원합니다. 스웜은 여러 가지 가능성을 제시하지만, 동시에 사이버보안 위험을 증가시킬 수 있는 잠재력도 가지고 있습니다. 이러한 위험에 대응하기 위해서는 에이전틱 AI 스웜 기술을 활용한 방어 기술이 필요할 것으로 보입니다.',
          )}
        </Text>
        <Text style={styles.mindmap}>MY 마인드맵</Text>
        <Text style={styles.summary}>
          {splitSummaryText(
            '아직 등록된 MY 마인드맵이 없습니다. 새로 등록하시겠습니까?',
          )}
        </Text>
        {/* Button to Create Mind Map */}
        <TouchableOpacity style={styles.makeMindMapButton}>
          <Image
            source={require('../../img/MakeMindMap.png')}
            style={styles.makeMindMapImage}
          />
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for More Options */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleModal}>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={handleHighlightMode}>
                  <Text style={styles.modalOptionText}>형광펜</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption} onPress={() => {}}>
                  <Text style={styles.modalOptionText}>메모 추가</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  moreButton: {
    padding: 8,
  },
  moreImage: {
    width: 24,
    height: 24,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 250,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalOption: {
    padding: 10,
    marginVertical: 5,
  },
  modalOptionText: {
    fontSize: 16,
    color: 'black',
  },
  highlightedText: {
    backgroundColor: 'yellow',
  },
  summaryText: {
    fontSize: 16,
  },
});

export default ScrapDetailScreen;
