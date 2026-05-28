import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function EcranAccueil({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Logo / Titre */}
      <View style={styles.header}>
        <Text style={styles.titre}>DevSeekr</Text>
        <Text style={styles.sousTitre}>Trouve ton premier job développeur en quelques clics</Text>
      </View>

      {/* Features */}
      <View style={styles.features}>
        {[
          { emoji: '🔍', titre: 'Recherche simplifiée', desc: 'Filtre les offres par compétences et localisation' },
          { emoji: '👍', titre: 'Sauvegarde tes favoris', desc: "Garde une trace des offres qui t'intéressent" },
          { emoji: '📈', titre: 'Offres pour juniors', desc: 'Des opportunités adaptées à ton niveau' },
        ].map((f) => (
          <View key={f.titre} style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>{f.emoji}</Text>
            </View>
            <View style={styles.featureTexte}>
              <Text style={styles.featureTitre}>{f.titre}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Boutons */}
      <View style={styles.boutons}>
        <TouchableOpacity
          style={styles.boutonPrimaire}
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={styles.boutonPrimaireTexte}>Créer un compte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.boutonSecondaire}
          onPress={() => navigation.navigate('Auth')}
        >
          <Text style={styles.boutonSecondaireTexte}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  titre: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  sousTitre: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  features: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureEmoji: {
    fontSize: 20,
  },
  featureTexte: {
    flex: 1,
  },
  featureTitre: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 18,
  },
  boutons: {
    gap: 12,
  },
  boutonPrimaire: {
    backgroundColor: '#7c3aed',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  boutonPrimaireTexte: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  boutonSecondaire: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  boutonSecondaireTexte: {
    color: '#7c3aed',
    fontWeight: '600',
    fontSize: 16,
  },
});
