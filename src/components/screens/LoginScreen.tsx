import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [view, setView]               = useState<'login' | 'forgot' | 'forgot-sent'>('login');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [loading, setLoading]         = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError]             = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');

  function switchView(v: typeof view) {
    setError('');
    setForgotError('');
    setView(v);
  }

  async function handleLogin() {
    setError('');
    if (!email || !password) { setError('Veuillez remplir tous les champs'); return; }
    setLoading(true);
    // TODO: appel API login
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    // navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
  }

  async function handleGoogle() {
    setError('');
    setGoogleLoading(true);
    // TODO: Google OAuth
    await new Promise((r) => setTimeout(r, 800));
    setGoogleLoading(false);
  }

  async function handleForgot() {
    setForgotError('');
    if (!forgotEmail) { setForgotError('Veuillez entrer votre adresse email'); return; }
    setForgotLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setForgotLoading(false);
    setView('forgot-sent');
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.card}>

        {/* ── LOGIN ── */}
        {view === 'login' && (
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBox}>
                <Text style={styles.logoText}>DS</Text>
              </View>
              <Text style={styles.title}>Bienvenue</Text>
              <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>
            </View>

            {!!error && <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View>}

            <View style={styles.fields}>
              <View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputRow}>
                  <Text style={styles.inputIcon}>✉️</Text>
                  <TextInput
                    style={styles.input} placeholder="votre@email.com" placeholderTextColor="#9ca3af"
                    value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" editable={!loading}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.label}>Mot de passe</Text>
                <View style={styles.inputRow}>
                  <Text style={styles.inputIcon}>🔒</Text>
                  <TextInput
                    style={styles.input} placeholder="••••••••" placeholderTextColor="#9ca3af"
                    value={password} onChangeText={setPassword} secureTextEntry editable={!loading}
                  />
                </View>
              </View>
              <TouchableOpacity onPress={() => switchView('forgot')} style={styles.forgotBtn}>
                <Text style={styles.link}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, (loading || googleLoading) && styles.disabled]}
              onPress={handleLogin} disabled={loading || googleLoading} activeOpacity={0.85}
            >
              {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.primaryBtnText}>Se connecter</Text>}
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
              {googleLoading
                ? <ActivityIndicator color="#7c3aed" size="small" />
                : <Text style={styles.googleIcon}>G</Text>}
              <Text style={styles.googleBtnText}>Continuer avec Google</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Pas encore de compte ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>S'inscrire</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {/* ── FORGOT ── */}
        {view === 'forgot' && (
          <View style={styles.content}>
            <TouchableOpacity onPress={() => switchView('login')} style={styles.backBtn}>
              <Text style={styles.backArrow}>←</Text>
              <Text style={styles.backText}>Retour</Text>
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Text style={styles.title}>Mot de passe oublié</Text>
              <Text style={[styles.subtitle, { textAlign: 'center' }]}>
                Entrez votre email et nous vous enverrons un lien de réinitialisation
              </Text>
            </View>
            {!!forgotError && <View style={styles.errorBox}><Text style={styles.errorText}>{forgotError}</Text></View>}
            <View style={{ marginBottom: 24 }}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                  style={styles.input} placeholder="votre@email.com" placeholderTextColor="#9ca3af"
                  value={forgotEmail} onChangeText={setForgotEmail} keyboardType="email-address" autoCapitalize="none" editable={!forgotLoading}
                />
              </View>
            </View>
            <TouchableOpacity
              style={[styles.primaryBtn, forgotLoading && styles.disabled]}
              onPress={handleForgot} disabled={forgotLoading} activeOpacity={0.85}
            >
              {forgotLoading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.primaryBtnText}>Envoyer le lien</Text>}
            </TouchableOpacity>
          </View>
        )}

        {/* ── FORGOT SENT ── */}
        {view === 'forgot-sent' && (
          <View style={[styles.content, styles.centered]}>
            <View style={styles.successCircle}>
              <Text style={styles.successIcon}>✓</Text>
            </View>
            <Text style={[styles.title, { marginBottom: 8 }]}>Email envoyé !</Text>
            <Text style={[styles.subtitle, { textAlign: 'center', marginBottom: 32 }]}>
              Vérifiez votre boîte mail à{' '}
              <Text style={{ color: '#1a1a2e', fontWeight: '500' }}>{forgotEmail}</Text>
              {' '}et suivez les instructions.
            </Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => switchView('login')} activeOpacity={0.85}>
              <Text style={styles.primaryBtnText}>Retour à la connexion</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen:         { flex: 1, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  card:           { width: 375, minHeight: 600, backgroundColor: '#fff', borderRadius: 24, elevation: 10, overflow: 'hidden' },
  content:        { paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 },
  centered:       { alignItems: 'center', justifyContent: 'center', flex: 1 },
  logoContainer:  { alignItems: 'center', marginBottom: 32 },
  logoBox:        { width: 64, height: 64, borderRadius: 20, backgroundColor: '#ede9fe', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  logoText:       { fontSize: 22, fontWeight: '800', color: '#7c3aed' },
  title:          { fontSize: 24, fontWeight: '700', color: '#1a1a2e', marginBottom: 4 },
  subtitle:       { fontSize: 14, color: '#6b7280' },
  errorBox:       { backgroundColor: 'rgba(212,24,61,0.08)', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16 },
  errorText:      { fontSize: 13, color: '#d4183d' },
  fields:         { gap: 16, marginBottom: 24 },
  label:          { fontSize: 12, fontWeight: '500', color: '#1a1a2e', marginBottom: 6 },
  inputRow:       { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 },
  inputIcon:      { fontSize: 16 },
  input:          { flex: 1, fontSize: 14, color: '#1a1a2e', padding: 0 },
  forgotBtn:      { alignSelf: 'flex-end' },
  primaryBtn:     { backgroundColor: '#7c3aed', borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  disabled:       { opacity: 0.7 },
  primaryBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  divider:        { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  dividerLine:    { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
  dividerText:    { fontSize: 12, color: '#6b7280' },
  googleBtn:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingVertical: 12, marginBottom: 32, backgroundColor: '#fff' },
  googleIcon:     { fontSize: 15, fontWeight: '700', color: '#4285F4' },
  googleBtnText:  { fontSize: 14, fontWeight: '500', color: '#1a1a2e' },
  footer:         { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText:     { fontSize: 14, color: '#6b7280' },
  link:           { fontSize: 12, fontWeight: '600', color: '#7c3aed' },
  backBtn:        { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 32 },
  backArrow:      { fontSize: 18, color: '#6b7280' },
  backText:       { fontSize: 14, color: '#6b7280' },
  successCircle:  { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(124,58,237,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  successIcon:    { fontSize: 28, color: '#7c3aed', fontWeight: '700' },
});
