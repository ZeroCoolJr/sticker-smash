import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type EmojiStickerProps = {
  imageSize: number;
  stickerSource: any;
};

export default function EmojiSicker(props: EmojiStickerProps) {
  const scaleImage = useSharedValue(props.imageSize);
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== props.imageSize * 2) {
        scaleImage.value *= 2;
      }
    });
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={props.stickerSource}
            resizeMode="contain"
            style={[
              imageStyle,
              { width: props.imageSize, height: props.imageSize },
            ]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
