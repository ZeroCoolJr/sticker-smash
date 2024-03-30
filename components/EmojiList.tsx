import { useState } from "react";
import { FlatList, Image, Platform, Pressable, StyleSheet } from "react-native";

type EmojiListProps = {
  onCloseModal: () => void;
  onSelect: (item: any) => void;
};

export default function EmojiList(props: EmojiListProps) {
  const [emoji] = useState([
    require("../assets/images/emoji1.png"),
    require("../assets/images/emoji2.png"),
    require("../assets/images/emoji3.png"),
    require("../assets/images/emoji4.png"),
    require("../assets/images/emoji5.png"),
    require("../assets/images/emoji6.png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS == "web"}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            props.onSelect(item);
            props.onCloseModal();
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
