// components/toastConfig.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

// کامپوننت توست سفارشی
const CustomToast = ({ text1, text2, type }) => (
  <View style={[styles.toastContainer, type === 'success' ? styles.success : type === 'error' ? styles.error : styles.warning]}>
    <Text style={styles.text1}>{text1}</Text>
    {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
  </View>
);

const toastConfig = {
  success: (props) => <CustomToast {...props} type="success" />,
  error: (props) => <CustomToast {...props} type="error" />,
  warning: (props) => <CustomToast {...props} type="warning" />, // افزودن نوع هشدار
};

const styles = StyleSheet.create({
  toastContainer: {
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    alignItems: 'flex-end', // برای راست‌چین کردن محتوا
  },
  success: {
    backgroundColor: '#fff',
    borderRightWidth: 5, // تغییر از borderLeft به borderRight
    borderRightColor: '#388E3C', // رنگ مرز موفقیت
  },
  error: {
    backgroundColor: '#fff',
    borderRightWidth: 5,
    borderRightColor: '#D32F2F',
  },
  warning: {
    backgroundColor: '#fff',
    borderRightWidth: 5,
    borderRightColor: '#F57C00',
  },
  text1: {
    fontFamily: 'YekanBakh-Regular',
    fontSize: 16,

    textAlign: 'right',
  },
  text2: {
    fontFamily: 'YekanBakh-Regular',
    fontSize: 14,

    textAlign: 'right',
    marginTop: 5,
  },
});

export default toastConfig;
