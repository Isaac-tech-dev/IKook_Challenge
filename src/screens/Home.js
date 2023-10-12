import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet from "react-native-simple-bottom-sheet";
import { XCircleIcon } from "react-native-heroicons/solid";
import { RadioButton } from "react-native-paper";
import Pop from "../component/pop";

const screenHeight = Dimensions.get("window").height;
const sheetMaxHeight = screenHeight - 100;
const sheetMinHeight = 20;

const MAX_Y = sheetMinHeight - sheetMaxHeight;
const MID_Y = MAX_Y / 2;
const MIN_Y = 0;

const THRESHOLD = 60;

const Home = () => {
  const lastRef = useRef(0);
  const sheetRef = useRef(new Animated.Value(0)).current;
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => {
    setIsSheetOpen((prevIsSheetOpen) => !prevIsSheetOpen);
  };
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        sheetRef.setOffset(lastRef.current);
      },
      onPanResponderMove: (_, gesture) => {
        sheetRef.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        sheetRef.flattenOffset();

        if (gesture.dy > 0) {
          //dragging down
          if (gesture.dy <= THRESHOLD) {
            lastRef.current === MAX_Y ? autoSpring(MAX_Y) : autoSpring(MID_Y);
          } else if (lastRef.current === MAX_Y) {
            autoSpring(MID_Y);
          } else {
            autoSpring(MIN_Y);
          }
        } else {
          //dragging up
          if (gesture.dy >= -THRESHOLD) {
            lastRef.current === MIN_Y ? autoSpring(MIN_Y) : autoSpring(MID_Y);
          } else {
            lastRef.current === MIN_Y ? autoSpring(MID_Y) : autoSpring(MAX_Y);
          }
        }
      },
    })
  ).current;

  const autoSpring = (value) => {
    lastRef.current = value;
    Animated.spring(sheetRef, {
      toValue: lastRef.current,
      useNativeDriver: false,
    }).start();
  };
  //   const animatedStyles = {
  //     height: sheetRef.interpolate({
  //       inputRange: [MAX_Y, MIN_Y],
  //       outputRange: [sheetMaxHeight, sheetMinHeight],
  //       extrapolate: "clamp",
  //     }),
  //   };

  const animatedStyles = {
    height: isSheetOpen ? sheetMaxHeight : sheetMinHeight,
    backgroundColor: isSheetOpen ? "transparent" : "#fff", // Toggle the background color
  };

  const containerStyles = {
    backgroundColor: isSheetOpen ? "#2a2a2a" : "#fff",
  };
  
  return (
    <View style={[styles.container, containerStyles]}>
      <TouchableOpacity onPress={toggleSheet} className="px-4 py-3 bg-neutral-800 w-4/5 justify-center items-center rounded-xl">
        <Text className="text-white text-base font-bold">Touch</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.sheetContainer, animatedStyles]}>
        <View style={styles.dragbarContainer} {...panResponder.panHandlers}>
          {/* <View style={styles.dragBar} /> */}
          <Pop onClose={toggleSheet}/>
        </View>
      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  sheetContainer: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dragbarContainer: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  dragBar: {
    width: 50,
    height: 6,
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
  },
});
