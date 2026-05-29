import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<HomeStackParamList, 'JobDetail'>;

const SKILLS = ['React', 'JavaScript', 'TypeScript', 'CSS', 'Git'];

export default function JobDetailScreen({ navigation }: Props) {
  const [liked, setLiked] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Détail de l'offre</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Bannière */}
        <View style={styles.banner}>
          <View style={styles.bannerAvatar}>
            <Text style={styles.bannerAvatarText}>T</Text>
          </View>
        </View>

        {/* Infos principales */}
        <View style={styles.section}>
          <Text style={styles.jobTitle}>Junior React Developer</Text>
          <Text style={styles.company}>TechStartup Paris</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📍</Text>
              <Text style={styles.metaText}>Paris</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>💼</Text>
              <Text style={styles.metaText}>CDI</Text>
            </View>
          </View>

          <Text style={styles.salary}>28k – 32k €/an</Text>
        </View>

        {/* Compétences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compétences requises</Text>
          <View style={styles.skillsWrap}>
            {SKILLS.map((skill) => (
              <View key={skill} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.body}>
            Nous recherchons un développeur React junior motivé pour rejoindre notre équipe dynamique.
            Vous travaillerez sur des projets innovants et aurez l'opportunité d'apprendre auprès de
            développeurs expérimentés. Une première expérience en React est appréciée.
          </Text>
        </View>

        {/* Entreprise */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos de l'entreprise</Text>
          <Text style={styles.body}>
            TechStartup Paris est une startup innovante spécialisée dans le développement
            d'applications web modernes. Notre équipe de 15 personnes travaille dans un
            environnement agile et bienveillant.
          </Text>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Boutons bas */}
      <View style={styles.cta}>
        <TouchableOpacity style={styles.applyBtn}>
          <Text style={styles.applyBtnText}>Postuler</Text>
        </TouchableOpacity>
        <View style={styles.ctaRow}>
          <TouchableOpacity
            style={styles.backHomeBtn}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={styles.backHomeBtnText}>← Accueil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.likeBtn, liked && styles.likeBtnActive]}
            onPress={() => setLiked(v => !v)}
          >
            <Text style={styles.likeBtnIcon}>👍</Text>
            <Text style={[styles.likeBtnText, liked && styles.likeBtnTextActive]}>
              {liked ? 'Sauvegardé' : 'Favoris'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:             { flex: 1, backgroundColor: '#ffffff' },

  // Header
  header:           { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  backBtn:          { width: 36, height: 36, borderRadius: 10, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  backArrow:        { fontSize: 18, color: '#7c3aed', fontWeight: '700' },
  headerTitle:      { fontSize: 15, fontWeight: '700', color: '#1f2937' },

  // Bannière
  banner:           { height: 112, backgroundColor: '#7c3aed', alignItems: 'center', justifyContent: 'center' },
  bannerAvatar:     { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.25)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center' },
  bannerAvatarText: { fontSize: 26, fontWeight: '800', color: '#ffffff' },

  // Sections
  scroll:           { flex: 1 },
  section:          { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 4 },
  sectionTitle:     { fontSize: 13, fontWeight: '700', color: '#1f2937', marginBottom: 12 },

  // Infos
  jobTitle:         { fontSize: 20, fontWeight: '800', color: '#1f2937', marginBottom: 4 },
  company:          { fontSize: 14, color: '#6b7280', marginBottom: 14 },
  metaRow:          { flexDirection: 'row', gap: 20, marginBottom: 14 },
  metaItem:         { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaIcon:         { fontSize: 13 },
  metaText:         { fontSize: 13, color: '#6b7280' },
  salary:           { fontSize: 18, fontWeight: '800', color: '#7c3aed' },

  // Skills
  skillsWrap:       { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillTag:         { backgroundColor: '#ede9fe', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  skillText:        { fontSize: 13, color: '#7c3aed', fontWeight: '600' },

  // Body text
  body:             { fontSize: 14, color: '#6b7280', lineHeight: 22 },

  // CTA
  cta:              { paddingHorizontal: 16, paddingVertical: 14, borderTopWidth: 1, borderTopColor: '#e5e7eb', gap: 10, backgroundColor: '#ffffff' },
  ctaRow:           { flexDirection: 'row', gap: 10 },
  applyBtn:         { backgroundColor: '#7c3aed', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  applyBtnText:     { color: '#ffffff', fontSize: 15, fontWeight: '700' },
  backHomeBtn:      { flex: 1, borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 12, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
  backHomeBtnText:  { fontSize: 13, fontWeight: '600', color: '#6b7280' },
  likeBtn:          { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 12, paddingVertical: 12 },
  likeBtnActive:    { borderColor: '#7c3aed', backgroundColor: '#faf5ff' },
  likeBtnIcon:      { fontSize: 14 },
  likeBtnText:      { fontSize: 13, fontWeight: '600', color: '#7c3aed' },
  likeBtnTextActive:{ color: '#7c3aed' },
});
