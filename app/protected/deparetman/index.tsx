// App.tsx

import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  ImageBackground,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

interface Item {
  id: string; // اضافه کردن شناسه برای هر دپارتمان
  title: string;
  image: any;
  color?: string;
}

type SecondSheetMode = "menu" | "rename" | "color" | "deleteConfirm";

const { width, height } = Dimensions.get("window");

const App = () => {
  useEffect(() => {
    secondSheetRef.current?.close();
    addSheetRef.current?.close();
    reportSheetRef.current?.close();
  }, []);

  const router = useRouter();

  const handleDepartmentPress = (id: string) => {
    router.push(`./deparetman/${id}`);
  };
  const handlePress = () => {
    router.push('./deparetman/discrepancies');
  };
  const sheetRef = useRef<BottomSheet>(null);
  const secondSheetRef = useRef<BottomSheet>(null);
  const addSheetRef = useRef<BottomSheet>(null);
  const reportSheetRef = useRef<BottomSheet>(null);
  const colors = [
    "#405093",
    "#2C4B66",
    "#3860FF",
    "#09156e",
    "#292929",
    "#000000",
    "#ffd145",
  ];

  const initialData: Item[] = useMemo(() => {
    const items = [
      { id: '1', title: "پارک علم و فناوری", image: require("../../../assets/building-4.png") },
      { id: '2', title: "حوزه ریاست", image: require("../../../assets/building-4.png") },
      { id: '3', title: "دانشکده فنی مهندسی", image: require("../../../assets/building-4.png") },
      { id: '4', title: "حراست", image: require("../../../assets/building-4.png") },
    ];
    return items.map((item) => ({
      ...item,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, []);

  const [items, setItems] = useState<Item[]>(initialData);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const [secondSheetMode, setSecondSheetMode] = useState<SecondSheetMode>("menu");
  const [renameText, setRenameText] = useState("");

  const snapPoints = useMemo(() => ["60%", "80%"], []);

  const handleSheetChange = useCallback((index: number) => {
    console.log("handleSheetChange", index);
  }, []);

  const handleSecondSheetChange = useCallback((index: number) => {
    if (index === -1) {
      closeSecondSheet();
    }
  }, []);

  const handleOptionsPress = (index: number) => {
    setSelectedItemIndex(index);
    setSecondSheetMode("menu");
    secondSheetRef.current?.expand();
  };

  const closeSecondSheet = () => {
    setSelectedItemIndex(null);
    setSecondSheetMode("menu");
    secondSheetRef.current?.close();
  };

  const handleDelete = () => {
    setSecondSheetMode("deleteConfirm");
  };

  const confirmDelete = () => {
    if (selectedItemIndex === null) return;
    const updated = [...items];
    updated.splice(selectedItemIndex, 1);
    setItems(updated);
    closeSecondSheet();
  };

  const cancelDelete = () => {
    setSecondSheetMode("menu");
    closeSecondSheet();
  };

  const handleRename = () => {
    if (selectedItemIndex === null) return;
    setRenameText(items[selectedItemIndex].title);
    setSecondSheetMode("rename");
  };

  const confirmRename = () => {
    if (selectedItemIndex === null) return;
    const updated = [...items];
    updated[selectedItemIndex].title = renameText;
    setItems(updated);
    setSecondSheetMode("menu");
    closeSecondSheet();
  };

  const cancelRename = () => {
    setSecondSheetMode("menu");
    closeSecondSheet();
  };

  const handleChangeColor = () => {
    setSecondSheetMode("color");
  };

  const confirmChangeColor = (newColor: string) => {
    if (selectedItemIndex === null) return;
    const updated = [...items];
    updated[selectedItemIndex].color = newColor;
    setItems(updated);
    setSecondSheetMode("menu");
    closeSecondSheet();
  };

  const cancelColorChange = () => {
    setSecondSheetMode("menu");
    closeSecondSheet();
  };

  // برای افزودن آیتم جدید
  const handleAddPress = () => {
    addSheetRef.current?.expand();
  };

  const confirmAdd = () => {
    if (renameText.trim() === "") {
      Alert.alert("خطا", "نام آیتم نمی‌تواند خالی باشد.");
      return;
    }
    const newItem: Item = {
      id: (items.length + 1).toString(), // ایجاد شناسه جدید
      title: renameText,
      image: require("../../../assets/building-4.png"), // می‌توانید تصویر پیش‌فرض دیگری انتخاب کنید
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setItems([...items, newItem]);
    setRenameText("");
    addSheetRef.current?.close();
  };

  const cancelAdd = () => {
    setRenameText("");
    addSheetRef.current?.close();
  };

  // برای گزارش گیری
  const handleReportPress = () => {
    reportSheetRef.current?.expand();
  };

  const handleDownloadReport = (date: string) => {
    // اینجا می‌توانید عملکرد دانلود گزارش را پیاده‌سازی کنید
    Alert.alert("دانلود گزارش", `گزارش برای تاریخ ${date} دانلود شد.`);
    reportSheetRef.current?.close();
  };

  const renderItem = useCallback(
    (item: Item, index: number) => {
      const { title, image, color, id } = item;
      return (
        <TouchableOpacity key={id} onPress={() => handleDepartmentPress(id)}>
          <View className="flex items-center justify-start gap-5 flex-row-reverse px-5 py-3">
            <View style={{ backgroundColor: color }} className="rounded-full p-4 justify-center items-center flex">
              <Image source={image} style={{ width: 26, height: 26 }} contentFit="cover" transition={1000} />
            </View>
            <View className="flex-1">
              <Text className="font-Regular text-right text-lg mb-0.5">{title}</Text>
            </View>
            <TouchableOpacity onPress={() => handleOptionsPress(index)} className="px-2">
              <View className="bg-transparent rounded-full flex justify-center items-center">
                <Text className="font-Regular text-center text-xl px-4 py-1">⋮</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    },
    [items]
  );

  const renderSecondSheetContent = () => {
    switch (secondSheetMode) {
      case "menu":
        return (
          <View className="px-5 py-5">
            <TouchableOpacity onPress={handleDelete} className="py-3">
              <Text className="font-Regular text-center text-red-500 text-lg">حذف</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRename} className="py-3">
              <Text className="font-Regular text-center text-lg">تغییر نام</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChangeColor} className="py-3">
              <Text className="font-Regular text-center text-lg">تغییر رنگ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeSecondSheet} className="py-3">
              <Text className="font-Regular text-center text-lg">بستن</Text>
            </TouchableOpacity>
          </View>
        );
      case "rename":
        return (
          <View className="px-5 py-5">
            <Text className="font-Regular text-center mb-5 text-lg">نام جدید را وارد کنید:</Text>
            <TextInput
              value={renameText}
              onChangeText={setRenameText}
              className="border-2 focus:border-blue-500 border-gray-300 rounded-lg p-2 mb-4 text-right font-Regular"
            />
            <View className="flex-row justify-center gap-5  mx-2  items-center">
              <TouchableOpacity onPress={confirmRename} className="px-4 py-3 text-center w-1/2 bg-blue-500 rounded-lg">
                <Text className="font-Regular text-white text-center">ثبت</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelRename} className="px-4 py-3 w-1/2 text-center bg-gray-300 rounded-lg">
                <Text className="font-Regular text-center">انصراف</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "color":
        return (
          <View className="px-5 py-5">
            <Text className="font-Regular text-center mb-2 text-lg">یک رنگ انتخاب کنید</Text>
            <View className="flex-row flex-wrap justify-center mb-2">
              {colors.map((c) => (
                <TouchableOpacity
                  key={c}
                  onPress={() => confirmChangeColor(c)}
                  className="m-2 w-10 h-10 rounded-full"
                  style={{ backgroundColor: c }}
                />
              ))}
            </View>
            <View className="flex-row justify-center">
              <TouchableOpacity onPress={cancelColorChange} className="px-4 py-3 bg-gray-300 rounded-lg w-full">
                <Text className="font-Regular text-center">انصراف</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case "deleteConfirm":
        return (
          <View className="px-5 py-5">
            <Text className="font-Regular text-center mb-5 text-lg">آیا مطمئن هستید؟</Text>
            <View className="flex-row justify-center gap-5 px-3">
              <TouchableOpacity onPress={confirmDelete} className="px-4 py-3 w-1/2 bg-red-500 rounded-lg">
                <Text className="font-Regular text-white text-center">بله</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelDelete} className="px-4 py-3 w-1/2 bg-gray-300 rounded-lg">
                <Text className="font-Regular text-center">خیر</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  // محتویات BottomSheet برای افزودن
  const renderAddSheetContent = () => {
    return (
      <View className="px-5 py-5">
        <Text className="font-Regular text-center mb-5 text-lg">نام دپارتمان جدید را وارد کنید.</Text>
        <TextInput
          value={renameText}
          onChangeText={setRenameText}
          className="border-2 focus:border-blue-500 border-gray-300 rounded-lg p-2 mb-4 text-right font-Regular"
        />
        <View className="flex-row justify-center w-full px-2 gap-5">
          <TouchableOpacity onPress={cancelAdd} className="px-4 py-3 items-center flex w-1/2 bg-gray-300  rounded-lg">
            <Text className="font-Regular text-center">انصراف</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmAdd} className="px-4 py-3  items-center flex  w-1/2 bg-blue-500 rounded-lg">
            <Text className="font-Regular text-center text-white">افزودن</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // محتویات BottomSheet برای گزارش گیری
  const renderReportSheetContent = () => {
    // نمونه تاریخ‌ها
    const reportDates = ["2024-04-25", "2024-04-26", "2024-04-27"];

    return (
      <View className="px-5 py-5">
        <Text className="font-Bold text-center mb-2 text-lg text-blu">گزارش ها</Text>
        <View className="flex items-center justify-center">
          {reportDates.map((date) => (
            <TouchableOpacity
              key={date}
              onPress={() => handleDownloadReport(date)}
              className="m-2 w-full h-20 rounded-lg bg-gray-200 flex items-center justify-between flex-row px-5"
            >
              <Ionicons name="cloud-download" size={30} color="#112D4E" />
              <Text className="font-Regular text-lg">{date}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => reportSheetRef.current?.close()} className="mt-4 px-4 py-3 bg-dark rounded-lg">
          <Text className="font-Regular text-center text-white">بستن</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../../assets/pexels-abdghat-1631677.jpg")} // مسیر تصویر پس‌زمینه را تنظیم کنید
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <GestureHandlerRootView style={styles.container}>
        {/* دکمه‌ها */}
        <View className="flex-row justify-center px-10 mt-14 gap-14">
          {/* دکمه مغایرت ها */}
          <TouchableOpacity onPress={handlePress} className="flex flex-col justify-center items-center">
            <View className="bg-dark px-4 py-2 rounded-full w-[66px] h-[66px] justify-center items-center">
              <Ionicons name="refresh" size={30} color="white" />
            </View>
            <Text className="font-Regular text-[16px] mt-3">مغایرت ها</Text>
          </TouchableOpacity>

          {/* دکمه گزارش گیری */}
          <TouchableOpacity onPress={handleReportPress} className="flex flex-col justify-center items-center">
            <View className="bg-dark px-4 py-2 rounded-full w-[66px] h-[66px] justify-center items-center">
              <Ionicons name="albums" size={30} color="white" />
            </View>
            <Text className="font-Regular mt-3">گزارش گیری</Text>
          </TouchableOpacity>

          {/* دکمه افزودن */}
          <TouchableOpacity onPress={handleAddPress} className="flex flex-col justify-center items-center">
            <View className="bg-dark px-4 py-2 rounded-full w-[66px] h-[66px] justify-center items-center">
              <Ionicons name="add" size={30} color="white" />
            </View>
            <Text className="font-Regular mt-3">افزودن</Text>
          </TouchableOpacity>
        </View>

        {/* Main BottomSheet */}
        <BottomSheet
          ref={sheetRef}
          index={0}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          onChange={handleSheetChange}
          backgroundStyle={styles.mainBg}
        >
          <View>
            <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
              {items.map((item, index) => renderItem(item, index))}
            </BottomSheetScrollView>
          </View>
        </BottomSheet>

        {/* Second BottomSheet */}
        <BottomSheet
          ref={secondSheetRef}
          index={-1} // Initially closed    
          enablePanDownToClose
          onChange={handleSecondSheetChange}
          backgroundStyle={styles.mainBg}
        >
          <View>
            <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              {renderSecondSheetContent()}
            </BottomSheetScrollView>
          </View>
        </BottomSheet>

        {/* BottomSheet برای افزودن آیتم جدید */}
        <BottomSheet
          ref={addSheetRef}
          index={-1}
          enablePanDownToClose
          backgroundStyle={styles.mainBg}
        >
          <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {renderAddSheetContent()}
          </BottomSheetScrollView>
        </BottomSheet>

        {/* BottomSheet برای گزارش گیری */}
        <BottomSheet
          ref={reportSheetRef}
          index={-1}
          enablePanDownToClose
          backgroundStyle={styles.mainBg}
        >
          <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {renderReportSheetContent()}
          </BottomSheetScrollView>
        </BottomSheet>
      </GestureHandlerRootView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#DBE2EF", // حذف شده برای اجازه دادن به ImageBackground
    padding: 10,
    paddingHorizontal: 20,
  },
  contentContainer: {
    // بدون تغییر
  },
  mainBg: {
    backgroundColor: "#F9F7F7", // فرض کنید bg-main همین رنگه
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    // position: 'absolute', // حذف شده
    // top: 0,
    // left: 0,
  },
});

export default App;
