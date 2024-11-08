import React, { useEffect } from 'react';
import { AppNavigator } from './src/navigator/AppNavigator';  // AppNavigator import

const App = () => {
  useEffect(() => {
    // 앱 초기화 시 필요한 작업을 여기에 추가할 수 있습니다 (예: 카카오 로그인 초기화 등)
  }, []);

  return <AppNavigator />;  // AppNavigator 렌더링
};

export default App;
