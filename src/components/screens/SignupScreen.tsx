import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const LEGAL_CONTENT = {
  terms: {
    title: "Conditions d'utilisation",
    sections: [
      { heading: "1. Acceptation des conditions", body: "En utilisant DevSeekr, vous acceptez les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application." },
      { heading: "2. Description du service", body: "DevSeekr est une plateforme de mise en relation entre développeurs et entreprises. Nous facilitons la recherche d'emploi et le recrutement dans le secteur tech." },
      { heading: "3. Compte utilisateur", body: "Vous êtes responsable de la confidentialité de vos identifiants. Toute activité effectuée depuis votre compte est sous votre responsabilité." },
      { heading: "4. Utilisation acceptable", body: "Vous vous engagez à ne pas utiliser DevSeekr à des fins illégales, à ne pas publier de contenu trompeur, et à respecter les autres utilisateurs." },
      { heading: "5. Propriété intellectuelle", body: "Tout le contenu de DevSeekr est protégé par le droit d'auteur. Vous ne pouvez pas reproduire ou distribuer ce contenu sans autorisation écrite." },
      { heading: "6. Modification des conditions", body: "Nous nous réservons le droit de modifier ces conditions à tout moment. L'utilisation continue du service vaut acceptation." },
    ],
  },
  privacy: {
    title: 'Politique de confidentialité',
    sections: [
      { heading: "1. Données collectées", body: "Nous collectons les données que vous nous fournissez (nom, email, CV) ainsi que des données d'utilisation pour améliorer notre service." },
      { heading: "2. Utilisation des données", body: "Vos données sont utilisées pour personnaliser votre expérience et améliorer nos algorithmes de matching. Nous ne vendons jamais vos données." },
      { heading: "3. Partage des données", body: "Vos informations peuvent être partagées avec les entreprises uniquement avec votre consentement explicite lors de la candidature." },
      { heading: "4. Vos droits (RGPD)", body: "Conformément au RGPD, vous avez le droit d'accéder, rectifier, supprimer vos données. Contactez-nous à privacy@devseekr.com." },
      { heading: "5. Sécurité", body: "Nous utilisons le chiffrement SSL/TLS pour protéger vos données. En cas de violation, vous serez notifié dans les 72 heures." },
    ],
  },
} as const;

type ViewType = 'inscription' | 'terms' | 'privacy';

export default function SignupScreen({ navigation }: Props) {
  const [view, setView]                       = useState<ViewType>('inscription');
  const [name, setName]                       = useState('');
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms]     = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [googleLoading, setGoogleLoading]     = useState(false);
  const [error, setError]                     = useState('');

  function switchView(v: ViewType) { setError(''); setView(v); }

  async function handleRegister() {
    setError('');
    if (!name || !email || !password || !confirmPassword) { setError('Veuillez remplir tous les champs'); return; }
    if (password !== confirmPassword) { setError('Les mots de passe ne correspondent pas'); return; }
    if (!acceptedTerms) { setError("Veuillez accepter les conditions d'utilisation"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // TODO: API
    setLoading(false);
  }

  async function handleGoogle() {
    setError(''); setGoogleLoading(true);
    await new Promise((r) => setTimeout(r, 800)); // TODO: Google OAuth
    setGoogleLoading(false);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        {/* ── INSCRIPTION ── */}
        {view === 'inscription' && (
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.appName}>DevSeekr</Text>
              <Text style={styles.title}>Créer un compte</Text>
              <Text style={styles.subtitle}>Rejoignez des milliers de devs 🧑‍💻</Text>
            </View>

            {!!error && <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View>}

            <View style={styles.fields}>
              <View>
                <Text style={styles.label}>Nom complet</Text>
                <View style={styles.inputRow}>
                  <Text style={styles.inputIcon}>👤</Text>
                  <TextInput style={styles.input} placeholder="Alex Martin" placeholderTextColor="#9ca3af" value={name} onChangeText={setName} autoCapitalize="words" editable={!loading} />
                </View>
              </View>
              <View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputRow}>
                  <Text style={styles.inputIcon}>✉️</Text>
                  <TextInput style={styles.input} placeholder="votre@email.com" placeholderTextColor="#9ca3af" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" editable={!loading} />
                </View>
              </View>
              <View>
                <Text style={styles.label}>Mot de passe</Text>
                <View style={styles.inputRow}>
                  <Text style={styles.inputIcon}>🔒</Text>
                  <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#9ca3af" value={password} onChangeText={setPassword} secureTextEntry editable={!loading} />
                </View>
              </View>
              <View>
                <Text style={styles.label}>Confirmer le mot de passe</Text>
                <View style={styles.inputRow}>
                  <Text style={styles.inputIcon}>🔒</Text>
                  <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor="#9ca3af" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry editable={!loading} />
                </View>
              </View>

              {/* Checkbox CGU */}
              <TouchableOpacity style={styles.termsRow} onPress={() => setAcceptedTerms(v => !v)} activeOpacity={0.7}>
                <View style={[styles.checkbox, acceptedTerms && styles.checkboxOn]}>
                  {acceptedTerms && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  J'accepte les{' '}
                  <Text style={styles.link} onPress={() => switchView('terms')}>conditions d'utilisation</Text>
                  {' '}et la{' '}
                  <Text style={styles.link} onPress={() => switchView('privacy')}>politique de confidentialité</Text>
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, (loading || googleLoading) && styles.disabled]}
              onPress={handleRegister} disabled={loading || googleLoading} activeOpacity={0.85}
            >
              {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.primaryBtnText}>S'inscrire</Text>}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={[styles.googleBtn, (loading || googleLoading) && styles.disabled]}
              onPress={handleGoogle} disabled={loading || googleLoading} activeOpacity={0.85}
            >
              {googleLoading ? <ActivityIndicator color="#7c3aed" size="small" /> : <Text style={styles.googleIcon}>G</Text>}
              <Text style={styles.googleBtnText}>Continuer avec Google</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Déjà un compte ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Se connecter</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {/* ── LEGAL ── */}
        {(view === 'terms' || view === 'privacy') && (
          <View style={styles.flex}>
            <View style={styles.legalHeader}>
              <TouchableOpacity onPress={() => switchView('inscription')} style={styles.legalBackBtn}>
                <Text style={styles.legalBackArrow}>←</Text>
              </TouchableOpacity>
              <Text style={styles.legalTitle}>{LEGAL_CONTENT[view].title}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.legalContent} showsVerticalScrollIndicator={false}>
              {LEGAL_CONTENT[view].sections.map((s) => (
                <View key={s.heading} style={styles.legalSection}>
                  <Text style={styles.legalHeading}>{s.heading}</Text>
                  <Text style={styles.legalBody}>{s.body}</Text>
                </View>
              ))}
              <Text style={styles.legalDate}>Dernière mise à jour : janvier 2025</Text>
            </ScrollView>
          </View>
        )}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: '#ffffff' },
  flex:           { flex: 1 },
  content:        { flexGrow: 1, paddingHorizontal: 24, paddingTop: 48, paddingBottom: 40 },

  header:         { marginBottom: 36 },
  appName:        { fontSize: 15, fontWeight: '700', color: '#7c3aed', marginBottom: 16, letterSpacing: 0.5 },
  title:          { fontSize: 28, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 },
  subtitle:       { fontSize: 15, color: '#6b7280', lineHeight: 22 },

  errorBox:       { backgroundColor: 'rgba(212,24,61,0.08)', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 20 },
  errorText:      { fontSize: 13, color: '#d4183d' },

  fields:         { gap: 16, marginBottom: 28 },
  label:          { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 8 },
  inputRow:       { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#f9fafb', borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14 },
  inputIcon:      { fontSize: 16 },
  input:          { flex: 1, fontSize: 15, color: '#1f2937', padding: 0 },

  termsRow:       { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingTop: 4 },
  checkbox:       { width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: '#d1d5db', backgroundColor: '#f9fafb', alignItems: 'center', justifyContent: 'center', marginTop: 1, flexShrink: 0 },
  checkboxOn:     { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  checkmark:      { color: '#fff', fontSize: 12, fontWeight: '700' },
  termsText:      { flex: 1, fontSize: 13, color: '#6b7280', lineHeight: 20 },

  primaryBtn:     { backgroundColor: '#7c3aed', borderRadius: 14, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  disabled:       { opacity: 0.6 },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  divider:        { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  dividerLine:    { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
  dividerText:    { fontSize: 13, color: '#9ca3af' },

  googleBtn:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderWidth: 1.5, borderColor: '#e5e7eb', borderRadius: 14, paddingVertical: 14, marginBottom: 36, backgroundColor: '#fff' },
  googleIcon:     { fontSize: 16, fontWeight: '800', color: '#4285F4' },
  googleBtnText:  { fontSize: 15, fontWeight: '600', color: '#1f2937' },

  footer:         { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText:     { fontSize: 14, color: '#6b7280' },
  link:           { fontSize: 14, fontWeight: '700', color: '#7c3aed' },

  legalHeader:    { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  legalBackBtn:   { padding: 8, borderRadius: 10, backgroundColor: '#f9fafb' },
  legalBackArrow: { fontSize: 18, color: '#1f2937' },
  legalTitle:     { fontSize: 16, fontWeight: '700', color: '#1f2937' },
  legalContent:   { paddingHorizontal: 24, paddingVertical: 24, gap: 24 },
  legalSection:   { gap: 8 },
  legalHeading:   { fontSize: 14, fontWeight: '700', color: '#1f2937' },
  legalBody:      { fontSize: 14, color: '#6b7280', lineHeight: 22 },
  legalDate:      { fontSize: 12, color: '#9ca3af', paddingTop: 8 },
});
