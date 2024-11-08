import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Modal,
  TextInput,
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

const ScrapDetailScreen = ({route}) => {
  const {articleTitle, articlePublisher} = route.params;
  const navigation = useNavigation();
  const [isHighlightMode, setHighlightMode] = useState(false); // 형광펜 모드 상태
  const [isMemoMode, setMemoMode] = useState(false); // 메모 모드 상태
  const [highlightedText, setHighlightedText] = useState([]); // 형광펜으로 하이라이트된 텍스트 저장
  const [isModalVisible, setModalVisible] = useState(false); // 모달 상태
  const [selectedText, setSelectedText] = useState(''); // 선택된 텍스트 저장
  const [memoText, setMemoText] = useState(''); // 메모 내용
  const [memoedText, setMemoedText] = useState([]); // 메모가 저장된 텍스트

  const handleHighlightMode = () => {
    setHighlightMode(!isHighlightMode); // 형광펜 모드 토글
  };

  const handleMemoMode = () => {
    setMemoMode(!isMemoMode); // 메모 모드 토글
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

    if (isMemoMode) {
      // 메모 모드일 때 텍스트를 선택하고 모달 띄우기
      setSelectedText(text);
      setModalVisible(true);
    }
  };

  const renderHighlightedText = (text, isHighlighted, hasMemo) => {
    const textStyle = [
      isHighlighted && styles.highlightedText,
      hasMemo && styles.memoedText,
      styles.summaryText,
    ];

    return <Text style={textStyle}>{text}</Text>;
  };

  const splitSummaryText = text => {
    return text.split('.').map((sentence, index) => {
      const trimmedSentence = sentence.trim();
      if (trimmedSentence.length > 0) {
        const isHighlighted = highlightedText.includes(trimmedSentence);
        const hasMemo = memoedText.includes(trimmedSentence);
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleTextPress(trimmedSentence)}>
            {renderHighlightedText(
              trimmedSentence + '.',
              isHighlighted,
              hasMemo,
            )}
          </TouchableOpacity>
        );
      }
      return null;
    });
  };

  const handleSaveMemo = () => {
    // Save memo text and close the modal
    console.log(`Saved memo for "${selectedText}": ${memoText}`);
    setMemoedText([...memoedText, selectedText]);
    setModalVisible(false);
    setMemoText(''); // Clear memo input
  };

  return (
    <View style={styles.container}>
      {/* Header with "내 스크랩" */}
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

        <View style={styles.toggleContainer}>
          <View style={styles.toggleItem}>
            <Switch
              value={isHighlightMode}
              onValueChange={handleHighlightMode}
              trackColor={{false: '#f1f1f1', true: '#4e92f0'}}
              thumbColor={isHighlightMode ? '#ffffff' : '#f4f3f4'}
            />
            <Text style={styles.toggleLabel}>형광펜</Text>
          </View>

          <View style={styles.toggleItem}>
            <Switch
              value={isMemoMode}
              onValueChange={handleMemoMode}
              trackColor={{false: '#f1f1f1', true: '#4e92f0'}}
              thumbColor={isMemoMode ? '#ffffff' : '#f4f3f4'}
            />
            <Text style={styles.toggleLabel}>메모</Text>
          </View>
        </View>
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
        <View style={styles.separator} />
        <Text style={styles.mindmap}>리딧 AI의 요약</Text>
        <Text style={styles.summary}>
          {splitSummaryText(
            '오픈AI의 스웜(Swarm)은 자율적으로 협력하는 AI 에이전트 네트워크를 구축할 수 있는 실험적 프레임워크입니다. 이 프레임워크는 다중 에이전트가 복잡한 작업을 인간의 개입 없이 수행할 수 있도록 설계되었습니다. 스웜은 오픈소스 프로젝트로, Python 개발자들이 사용할 수 있습니다. 또한, 에이전트 간 작업을 넘기는 핸드오프 기능과 작업 지침을 제공하는 루틴 기능을 지원합니다. 스웜은 여러 가지 가능성을 제시하지만, 동시에 사이버보안 위험을 증가시킬 수 있는 잠재력도 가지고 있습니다. 이러한 위험에 대응하기 위해서는 에이전틱 AI 스웜 기술을 활용한 방어 기술이 필요할 것으로 보입니다.',
          )}
        </Text>
        <View style={styles.separator} />
        <Text style={styles.mindmap}>MY 마인드맵</Text>
        <Text style={styles.mindmaptext}>
          아직 등록된 MY 마인드맵이 없습니다. 새로 등록하시겠습니까?
        </Text>
        {/* Button to Create Mind Map */}
        <TouchableOpacity style={styles.makeMindMapButton}>
          <Image
            source={require('../../img/MakeMindMap.png')}
            style={styles.makeMindMapImage}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <Text style={styles.mindmap}>이 스크랩과 관련된 추천 컨텐츠</Text>
        <View style={styles.recommendedArticles}>
          {articles.map((article, index) => (
            <TouchableOpacity
              key={index}
              style={styles.articleContainer}
              onPress={() => {
                // Handle the article press (e.g., navigate to the article's details)
                console.log(`Article pressed: ${article.title}`);
              }}>
              <Image
                source={article.thumbnail}
                style={styles.articleThumbnail}
              />
              <View style={styles.articleTextContainer}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articlePublisher}>{article.publisher}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>문장에 메모 추가하기</Text>
            <Text style={styles.modalText}>{selectedText}</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="메모를 입력하세요..."
              value={memoText}
              onChangeText={setMemoText}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveMemo}>
                <Text style={styles.modalButtonText}>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 16,
    padding: 12,
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
  headerText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleItem: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  publisherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  publisher: {
    fontSize: 14,
    color: '#888',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginRight: 120,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginRight: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  iconText: {
    fontSize: 14,
    color: '#888',
  },
  thumbnailImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  gotoArticleButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  gotoArticleImage: {
    width: 143,
    height: 45,
  },
  summary: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  mindmap: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  mindmaptext: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  makeMindMapButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // 오른쪽 정렬
    marginBottom: 20,
  },
  makeMindMapImage: {
    width: 165,
    height: 40,
  },
  highlightedText: {
    backgroundColor: '#FFFF00', // Highlight color
  },
  memoedText: {
    textDecorationLine: 'underline',
    textDecorationColor: 'red', // 텍스트에 파란색 밑줄 추가
  },
  recommendedArticles: {
    marginTop: 12,
    marginBottom: 20,
  },
  articleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  articleThumbnail: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  articleTextContainer: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  articlePublisher: {
    marginTop: 8,
    fontSize: 14,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: 'blue',
    marginBottom: 16,
    marginTop: 12,
    textAlign: 'left',
  },
  saveButton: {
    backgroundColor: '#4e92f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f4f3f4',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
  },
  modalButtonContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonText: {
    fontSize: 16,
    color: 'black', // 버튼 텍스트 색상을 검정색으로 설정
  },
});

export default ScrapDetailScreen;
