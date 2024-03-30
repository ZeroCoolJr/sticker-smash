import { useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import domtoimage from "dom-to-image";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSicker from "./components/EmojiSicker";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const [isStickerVisible, setIsStickerVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showAppOptions, setShowAppOptions] = useState(false);
  const imageRef = useRef(null);

  const addSticker = () => {
    setIsStickerVisible(true);
  };

  const closeSticker = () => {
    setIsStickerVisible(false);
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      alert("You did not select any image.");
    } else {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }
  };

  const reset = () => {
    setShowAppOptions(false);
  };

  const saveImageAsync = async () => {
    if (Platform.OS === "web") {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current!, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji && (
            <EmojiSicker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={reset} />
            <CircleButton onPress={addSticker} />
            <IconButton icon="save-alt" label="Save" onPress={saveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isStickerVisible} onClose={closeSticker}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={closeSticker} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
