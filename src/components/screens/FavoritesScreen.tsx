import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainTabParamList, 'Favorites'>;

const COLORS = {
  primary:   '#7c3aed',
  appBg:     '#f9fafb',
  white:     '#ffffff',
  border:    '#e5e7eb',
  textDark:  '#1f2937',
  textGray:  '#6b7280',
  textLight: '#9ca3af',
};

const FAVORITE_JOBS = [
  {
    id: '1',
    title: 'Junior React Developer',
    company: 'TechStartup Paris',
    location: 'Paris',
    salary: '28k – 32k €',
    skills: ['React', 'JavaScript', 'CSS'],
  },
  {
    id: '3',
    title: 'Développeur Full Stack Junior',
    company: 'WebAgency',
    location: 'Remote',
    salary: '26k – 30k €',
    skills: ['React', 'Node.js', 'SQL'],
  },
];

export default function FavoritesScreen({ navigation }: Props) {
  const [favorites, setFavorites] = useState<string[]>(FAVORITE_JOBS.map((j) => j.id));

  const toggleFavorite = (jobId: string) => {
    setFavorites((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const visibleJobs = FAVORITE_JOBS.filter((j) => favorites.includes(j.id));

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerLogo}>DS</Text>
        <Text style={styles.headerTitle}>Mes Favoris</Text>
      </View>

      {/* Liste */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {visibleJobs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🤍</Text>
            <Text style={styles.emptyText}>Aucun favori pour l'instant</Text>
            <Text style={styles.emptySubText}>
              Ajoutez des offres à vos favoris pour les retrouver ici.
            </Text>
          </View>
        ) : (
          visibleJobs.map((job) => (
            <View key={job.id} style={styles.card}>
              {/* Titre + bouton favori */}
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle} numberOfLines={2}>{job.title}</Text>
                <TouchableOpacity
                  onPress={() => toggleFavorite(job.id)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.heartIcon}>
                    {favorites.includes(job.id) ? '❤️' : '🤍'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Entreprise */}
              <Text style={styles.cardCompany}>{job.company}</Text>

              {/* Lieu + salaire */}
              <View style={styles.cardMeta}>
                <View style={styles.locationRow}>
                  <Text style={styles.metaIcon}>📍</Text>
                  <Text style={styles.cardLocation}>{job.location}</Text>
                </View>
                <Text style={styles.cardSalary}>{job.salary}</Text>
              </View>

              {/* Skills + bouton voir */}
              <View style={styles.cardBottom}>
                <View style={styles.skillsRow}>
                  {job.skills.slice(0, 2).map((skill) => (
                    <View key={skill} style={styles.skillTag}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                  {job.skills.length > 2 && (
                    <Text style={styles.skillMore}>+{job.skills.length - 2}</Text>
                  )}
                </View>
              </View>
            </View>
          ))
        )}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: COLORS.appBg },

  // Header
  header:         { backgroundColor: COLORS.white, paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border, flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerLogo:     { fontSize: 14, fontWeight: '800', color: COLORS.primary, backgroundColor: '#ede9fe', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  headerTitle:    { fontSize: 20, fontWeight: '700', color: COLORS.textDark },

  // Liste
  list:           { flex: 1 },
  listContent:    { padding: 16 },

  // Empty
  emptyContainer: { alignItems: 'center', paddingTop: 80 },
  emptyIcon:      { fontSize: 48, marginBottom: 16 },
  emptyText:      { fontSize: 16, fontWeight: '600', color: COLORS.textGray },
  emptySubText:   { fontSize: 13, color: COLORS.textLight, textAlign: 'center', marginTop: 6, paddingHorizontal: 32 },

  // Card
  card:           { backgroundColor: COLORS.white, borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2 },
  cardTop:        { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  cardTitle:      { flex: 1, fontSize: 13, fontWeight: '700', color: COLORS.textDark, paddingRight: 8 },
  heartIcon:      { fontSize: 18 },
  cardCompany:    { fontSize: 11, color: COLORS.textGray, marginBottom: 8 },
  cardMeta:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  locationRow:    { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaIcon:       { fontSize: 10 },
  cardLocation:   { fontSize: 11, color: COLORS.textGray },
  cardSalary:     { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  cardBottom:     { flexDirection: 'row', alignItems: 'center' },
  skillsRow:      { flexDirection: 'row', gap: 6, alignItems: 'center' },
  skillTag:       { backgroundColor: '#ede9fe', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  skillText:      { fontSize: 10, color: COLORS.primary, fontWeight: '500' },
  skillMore:      { fontSize: 10, color: COLORS.textLight },
});
