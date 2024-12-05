import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Link } from 'expo-router';

type HeaderProps = {
    title: string;
    modalContent: string;  // محتوای داینامیک برای هر صفحه
    openSheet: () => void;  // تابع برای باز کردن bottom sheet
};

const Header: React.FC<HeaderProps> = ({ title, modalContent, openSheet }) => {
    return (

            <View className="p-4 flex justify-between items-center flex-row bg-main ">
                <TouchableOpacity className="bg-primary rounded-md shadow-md" onPress={openSheet}>
                    <Ionicons name="help-outline" size={20} color="black" className="p-2" />
                </TouchableOpacity>
                <Text className="text-blu text-lg text-center font-Bold">{title}</Text>
                <TouchableOpacity className="bg-primary rounded-md shadow-md">
                    <Ionicons name="calendar-outline" size={20} color="black" className="p-2" />
                </TouchableOpacity>
            </View>

    );
};

export default Header;
