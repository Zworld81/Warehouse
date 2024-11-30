import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';

type HeaderProps = {
    title: string;
    modalContent: string;  // محتوای داینامیک برای هر صفحه
};

const Header: React.FC<HeaderProps> = ({ title, modalContent }) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <>
            <View className="p-4 flex justify-between items-center flex-row bg-dark ">
                <TouchableOpacity className="bg-grayy rounded-md shadow-md" onPress={handlePresentModalPress}>
                    <Ionicons name="help-outline" size={20} color="white" className="p-2" />
                </TouchableOpacity>
                <Text className="text-yellow text-lg text-center font-Bold">{title}</Text>
                <TouchableOpacity className="bg-grayy rounded-md shadow-md">
                    <Ionicons name="calendar-outline" size={20} color="white" className="p-2" />
                </TouchableOpacity>
            </View>


                <BottomSheetModalProvider>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        onChange={handleSheetChanges}
                    >
                        <BottomSheetView className="bg-dark p-4">
                            <Text className="text-xl font-Bold mb-4 text-right">پشتیبانی</Text>
                            <Text className="text-gray-700 font-Regular text-right mb-4">
                                {modalContent}  
                            </Text>
                            <TouchableOpacity
                                className="mt-4 bg-blue-500 p-3 rounded"
                            >
                                <Text className="text-white text-center font-Regular">تماس با پشتیبانی</Text>
                            </TouchableOpacity>
                        </BottomSheetView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>

        </>
    );
};

export default Header;
