import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function EcranChargement({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>DevSeekr</Text>
      <Text style={styles.sousTitre}>Trouve ton premier job développeur</Text>
      <ActivityIndicator size="large" color="rgba(167, 139, 250, 0.7)" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0e0830',
    paddingHorizontal: 32,
  },
  titre: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ede8ff',
    marginBottom: 12,
    letterSpacing: 1,
  },
  sousTitre: {
    fontSize: 16,
    color: 'rgba(196, 181, 253, 0.85)',
    textAlign: 'center',
    marginBottom: 48,
  },
  loader: {
    marginTop: 16,
  },
});
