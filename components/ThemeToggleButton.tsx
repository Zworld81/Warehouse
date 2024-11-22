// components/ThemeToggleButton.tsx
import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const ThemeToggleButton = () => {
  const { theme, setTheme, colorScheme } = useContext(ThemeContext);

  const handleToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIconName = () => {
    if (theme === 'light') return 'moon';
    if (theme === 'dark') return 'sunny';
    return 'color-palette';
  };

  const getButtonText = () => {
    if (theme === 'light') return 'تغییر به تم تاریک';
    if (theme === 'dark') return 'تغییر به تم سیستم';
    return 'تغییر به تم روشن';
  };

  const isDarkMode = theme === 'dark' || (theme === 'system' && colorScheme === 'dark');

  console.log('Current theme:', theme); // اضافه کردن لاگ برای بررسی

  return (
    <TouchableOpacity
      onPress={handleToggle}
      className="flex-row items-center p-3 bg-gray-200 dark:bg-gray-700 rounded mt-4"
    >
      <Ionicons
        name={getIconName()}
        size={20}
        color={isDarkMode ? 'yellow' : 'black'}
        style={{ marginRight: 8 }}
      />
      <Text className="text-black dark:text-white">{getButtonText()}</Text>
    </TouchableOpacity>
  );
};

export default ThemeToggleButton;
