import React, {useState, createContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// 로그인 화면 import
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/Login/SignUpScreen';
import ChooseInterestScreen from '../screens/Login/ChooseInterestScreen'; // 직무 선택 화면
import JobSelectionScreen from '../screens/Login/JobSelectionScreen';

// 홈 화면 import
import AllScreen from '../screens/All/AllScreen';
import MyPageScreen from '../screens/MyPage/MyPageScreen';
import ScrapScreen from '../screens/Scrap/ScrapScreen';
import TrendScreen from '../screens/Trend/TrendScreen';
import ArticleDetailScreen from '../screens/Trend/ArticleDetailScreen';

// ScrapDetailScreen 추가 import
import ScrapDetailScreen from '../screens/Scrap/ScrapDetailScreen'; // ScrapDetailScreen 추가

import BottomTabNavigator from './BottomTabNavigator'; // 하단 탭 네비게이션

const AuthContext = createContext({
  isLoggedIn: false,
  signedUp: false,
  login: () => {},
  logout: () => {},
  completeSignUp: () => {},
});

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    setSignedUp(false); // Optional: reset on logout if needed
  };
  const completeSignUp = () => {
    setSignedUp(true);
    setIsLoggedIn(true); // Automatically log in after sign-up
  };

  return (
    <AuthContext.Provider
      value={{isLoggedIn, signedUp, login, logout, completeSignUp}}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoggedIn || signedUp ? (
            // 로그인 또는 회원가입 완료 후, 메인 화면으로 이동
            <Stack.Screen
              name="Main"
              component={BottomTabNavigator}
              options={{headerShown: false}}
            />
          ) : (
            <>
              {/* 로그인 화면 */}
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
              />

              {/* 회원가입 화면 */}
              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ChooseInterestScreen"
                component={ChooseInterestScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="JobSelectionScreen"
                component={JobSelectionScreen}
                options={{headerShown: false}}
              />
            </>
          )}

          {/* 추가된 화면들 */}
          <Stack.Screen
            name="AllScreen"
            component={AllScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MyPageScreen"
            component={MyPageScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ScrapScreen"
            component={ScrapScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TrendScreen"
            component={TrendScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ArticleDetailScreen"
            component={ArticleDetailScreen}
            options={{headerShown: false}}
          />

          {/* ScrapDetailScreen 추가 */}
          <Stack.Screen
            name="ScrapDetail"
            component={ScrapDetailScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export {AppNavigator, AuthContext};
export default AppNavigator;
