// app/departments/[id].tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

interface DepartmentDetail {
  id: string;
  name: string;
  description: string;
}

const departmentsDetails: Record<string, DepartmentDetail> = {
  '1': { id: '1', name: 'پارک علم و فناوری', description: 'توضیحات مربوط به پارک علم و فناوری.' },
  '2': { id: '2', name: 'حوزه ریاست', description: 'توضیحات مربوط به حوزه ریاست.' },
  '3': { id: '3', name: 'دانشکده فنی مهندسی', description: 'توضیحات مربوط به دانشکده فنی مهندسی.' },
  '4': { id: '4', name: 'حراست', description: 'توضیحات مربوط به حراست.' },
};

const DepartmentDetailPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const department = departmentsDetails[id];

  if (!department) {
    return (
      <GestureHandlerRootView style={styles.container}>
        <Text style={styles.errorText}>دپارتمان یافت نشد.</Text>
      </GestureHandlerRootView>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => { /* handle back navigation */ }} />
        <Text style={styles.title}>{department.name}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>{department.description}</Text>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default DepartmentDetailPage;
