import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>;

const FILTERS = ['React', 'Node.js', 'Python', 'JavaScript', 'Remote'];

const JOBS = [
  {
    id: '1',
    title: 'Junior React Developer',
    company: 'TechStartup Paris',
    location: 'Paris',
    salary: '28k – 32k €',
    skills: ['React', 'JavaScript', 'CSS'],
  },
  {
    id: '2',
    title: 'Node.js Backend Junior',
    company: 'DataCorp',
    location: 'Lyon',
    salary: '30k – 35k €',
    skills: ['Node.js', 'MongoDB', 'API'],
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

export default function HomeScreen({ navigation }: Props) {
  const [activeFilter, setActiveFilter] = useState(0);
  const [search, setSearch] = useState('');

  const filteredJobs = JOBS.filter((job) => {
    const matchFilter =
      activeFilter === 0 ||
      job.skills.some((s) => s.toLowerCase() === FILTERS[activeFilter].toLowerCase()) ||
      job.location.toLowerCase() === FILTERS[activeFilter].toLowerCase();

    const matchSearch =
      search.trim() === '' ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    return matchFilter && matchSearch;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <View style={styles.searchRow}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un emploi…"
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Filtres */}
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {FILTERS.map((filter, index) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, index === activeFilter && styles.filterChipActive]}
              onPress={() => setActiveFilter(index)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, index === activeFilter && styles.filterTextActive]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Liste des offres */}
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultsCount}>{filteredJobs.length} offre{filteredJobs.length !== 1 ? 's' : ''} disponible{filteredJobs.length !== 1 ? 's' : ''}</Text>

        {filteredJobs.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>Aucune offre pour ce filtre</Text>
          </View>
        )}

        {filteredJobs.map((job) => (
          <TouchableOpacity
            key={job.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}
          >
            {/* Titre + like */}
            <View style={styles.cardTop}>
              <Text style={styles.cardTitle} numberOfLines={2}>{job.title}</Text>
              <TouchableOpacity style={styles.likeBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={styles.likeIcon}>👍</Text>
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

            {/* Skills + bouton */}
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
              <TouchableOpacity
                style={styles.voirBtn}
                onPress={() => navigation.navigate('JobDetail', { jobId: job.id })}
              >
                <Text style={styles.voirBtnText}>Voir</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:               { flex: 1, backgroundColor: '#f9fafb' },

  // Recherche
  searchContainer:    { backgroundColor: '#ffffff', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 12 },
  searchRow:          { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#f3f4f6', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11 },
  searchIcon:         { fontSize: 15 },
  searchInput:        { flex: 1, fontSize: 14, color: '#1f2937', padding: 0 },

  // Filtres
  filtersWrapper:     { backgroundColor: '#ffffff', paddingBottom: 12 },
  filters:            { paddingHorizontal: 16, gap: 8 },
  filterChip:         { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 99, backgroundColor: '#f3f4f6', borderWidth: 1, borderColor: '#e5e7eb' },
  filterChipActive:   { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  filterText:         { fontSize: 12, fontWeight: '500', color: '#6b7280' },
  filterTextActive:   { color: '#ffffff', fontWeight: '700' },

  // Liste
  list:               { flex: 1 },
  listContent:        { paddingHorizontal: 16, paddingTop: 14 },
  resultsCount:       { fontSize: 12, color: '#9ca3af', marginBottom: 12 },

  // Card
  card:               { backgroundColor: '#ffffff', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#e5e7eb', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2 },
  cardTop:            { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  cardTitle:          { flex: 1, fontSize: 13, fontWeight: '700', color: '#1f2937', paddingRight: 8 },
  likeBtn:            { padding: 2 },
  likeIcon:           { fontSize: 14, opacity: 0.4 },
  cardCompany:        { fontSize: 11, color: '#6b7280', marginBottom: 8 },
  cardMeta:           { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  locationRow:        { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaIcon:           { fontSize: 10 },
  cardLocation:       { fontSize: 11, color: '#6b7280' },
  cardSalary:         { fontSize: 12, fontWeight: '700', color: '#7c3aed' },
  cardBottom:         { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  skillsRow:          { flexDirection: 'row', gap: 6, alignItems: 'center' },
  skillTag:           { backgroundColor: '#ede9fe', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  skillText:          { fontSize: 10, color: '#7c3aed', fontWeight: '500' },
  skillMore:          { fontSize: 10, color: '#9ca3af' },
  empty:              { alignItems: 'center', paddingTop: 48, gap: 12 },
  emptyIcon:          { fontSize: 36 },
  emptyText:          { fontSize: 14, color: '#9ca3af' },
  voirBtn:            { backgroundColor: '#7c3aed', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 6 },
  voirBtnText:        { fontSize: 11, fontWeight: '700', color: '#ffffff' },
});
