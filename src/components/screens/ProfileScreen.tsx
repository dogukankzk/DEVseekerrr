import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar, Switch,
} from 'react-native';

const SKILLS = ['React', 'JavaScript', 'Node.js'];
const CONTRACT_TYPES = ['CDI', 'CDD', 'Stage'];

export default function ProfileScreen() {
  const [remote, setRemote]           = useState(true);
  const [contracts, setContracts]     = useState<string[]>(['CDI', 'Stage']);

  function toggleContract(type: string) {
    setContracts((prev) =>
      prev.includes(type) ? prev.filter((c) => c !== type) : [...prev, type]
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#080618" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <Text style={styles.name}>Alex Martin</Text>
          <Text style={styles.role}>Développeur Junior</Text>
        </View>

        {/* Compétences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compétences favorites</Text>
          <View style={styles.tagsRow}>
            {SKILLS.map((skill) => (
              <View key={skill} style={styles.tag}>
                <Text style={styles.tagText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Préférences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences</Text>

          {/* Remote toggle */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Remote</Text>
            <Switch
              value={remote}
              onValueChange={setRemote}
              trackColor={{ false: '#2d2550', true: '#7c3aed' }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Type de contrat */}
          <View style={[styles.card, { flexDirection: 'column', alignItems: 'flex-start', gap: 12 }]}>
            <Text style={styles.cardLabel}>Type de contrat</Text>
            <View style={styles.tagsRow}>
              {CONTRACT_TYPES.map((type) => {
                const active = contracts.includes(type);
                return (
                  <TouchableOpacity
                    key={type}
                    style={[styles.contractChip, active && styles.contractChipActive]}
                    onPress={() => toggleContract(type)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.contractChipText, active && styles.contractChipTextActive]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:                   { flex: 1, backgroundColor: '#080618' },
  scroll:                 { flex: 1 },
  content:                { paddingHorizontal: 16, paddingBottom: 24 },

  // Header
  header:                 { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(124,58,237,0.15)' },
  headerTitle:            { fontSize: 20, fontWeight: '800', color: '#ede8ff' },
  settingsIcon:           { fontSize: 20 },

  // Avatar
  avatarSection:          { alignItems: 'center', paddingVertical: 32 },
  avatarCircle:           { width: 96, height: 96, borderRadius: 48, backgroundColor: 'rgba(124,58,237,0.15)', borderWidth: 2, borderColor: 'rgba(124,58,237,0.35)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  avatarIcon:             { fontSize: 46 },
  name:                   { fontSize: 20, fontWeight: '800', color: '#ede8ff', marginBottom: 4 },
  role:                   { fontSize: 14, color: '#9284c0' },

  // Sections
  section:                { marginBottom: 28 },
  sectionTitle:           { fontSize: 13, fontWeight: '700', color: '#ede8ff', marginBottom: 12 },

  // Tags
  tagsRow:                { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag:                    { backgroundColor: 'rgba(124,58,237,0.18)', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 8 },
  tagText:                { fontSize: 13, fontWeight: '600', color: '#c4b5fd' },

  // Cards
  card:                   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#110d2b', borderWidth: 1, borderColor: 'rgba(124,58,237,0.18)', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 12 },
  cardLabel:              { fontSize: 14, fontWeight: '600', color: '#c4b5fd' },

  // Contract chips
  contractChip:           { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)' },
  contractChipActive:     { borderWidth: 1.5, borderColor: '#7c3aed', backgroundColor: 'rgba(124,58,237,0.12)' },
  contractChipText:       { fontSize: 13, color: '#6b5a9e' },
  contractChipTextActive: { color: '#a78bfa', fontWeight: '700' },
});
