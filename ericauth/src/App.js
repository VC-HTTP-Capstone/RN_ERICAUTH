import React, { useEffect, useState } from "react";
import { StatusBar, Image } from "react-native";
import Navigation from "./navigations";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import styled, { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { Fonts } from "./Fonts";

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const cacheFonts = (fonts) => {
  return fonts.map((font) => Font.loadAsync(font));
};

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

export default function App() {
  const [IsReady, setIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // 리소스를 가져오는 동안 스플래시 화면 표시
        await cacheImages([require("../assets/splash.png")]);
        // 글꼴을 미리 로드하고 필요한 API 호출을 여기서 수행
        await cacheFonts([]);
        // 느린 로딩을 시뮬레이션 하기 위해 2초간 인위적으로 지연
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // 렌더링할 응용 프로그램 지정
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </ThemeProvider>
  );
}
