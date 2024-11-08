import React from 'react';
import { Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Trend from '../screens/Trend/TrendScreen';  // 트렌드 화면
import All from '../screens/All/AllScreen';        // 전체 화면
import Scrap from '../screens/Scrap/ScrapScreen';  // 스크랩 화면
import MyPage from '../screens/MyPage/MyPageScreen';  // 마이페이지(MY) 화면

const trendIcon = require('../img/trend.png');   // 트렌드 아이콘
const allIcon = require('../img/all.png');       // 전체 아이콘
const scrapIcon = require('../img/scrap.png');   // 스크랩 아이콘
const myPageIcon = require('../img/myPage.png'); // 마이페이지 아이콘

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconSource;

          if (route.name === 'Trend') {
            iconSource = trendIcon;
          } else if (route.name === 'All') {
            iconSource = allIcon;
          } else if (route.name === 'Scrap') {
            iconSource = scrapIcon;
          } else if (route.name === 'MyPage') {
            iconSource = myPageIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{ width: size, height: size, tintColor: color }}
            />
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        headerTitle: () => (
          <Text style={{ fontSize: 20, color: '#007BFF' }}>
            ReadIT
           </Text>
          ),
          headerTitleAlign: 'left',  // 왼쪽 정렬
          headerStyle: {
          height: 50,  // 헤더 높이 줄이기
          },
      })}
    >
      <Tab.Screen name="Trend" component={Trend} />
      <Tab.Screen name="All" component={All} />
      <Tab.Screen name="Scrap" component={Scrap} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;