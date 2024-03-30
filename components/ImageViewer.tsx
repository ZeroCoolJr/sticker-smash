import { Image, StyleSheet } from "react-native";

type ImageViewerProps = {
  placeholderImageSource: any;
  selectedImage?: string;
};

export default function ImageViewer(props: ImageViewerProps) {
  const imageSource = props.selectedImage
    ? { uri: props.selectedImage }
    : props.placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
