import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList, RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [view, setView]                     = useState<'login' | 'forgot' | 'forgot-sent'>('login');
  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [loading, setLoading]               = useState(false);
  const [googleLoading, setGoogleLoading]   = useState(false);
  const [error, setError]                   = useState('');
  const [forgotEmail, setForgotEmail]       = useState('');
  const [forgotLoading, setForgotLoading]   = useState(false);
  const [forgotError, setForgotError]       = useState('');

  function switchView(v: typeof view) { setError(''); setForgotError(''); setView(v); }

  function goToMain() {
    navigation.getParent<NativeStackScreenProps<RootStackParamList>['navigation']>()?.navigate('Main');
  }

  async function handleLogin() {
    setError('');
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // TODO: API
    setLoading(false);
    goToMain();
  }

  async function handleGoogle() {
    setError(''); setGoogleLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // TODO: Google OAuth
    setGoogleLoading(false);
    goToMain();
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
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        {/* ── LOGIN ── */}
        {view === 'login' && (
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {/* En-tête */}
            <View style={styles.header}>
              <Text style={styles.appName}>DevSeekr</Text>
              <Text style={styles.title}>Bienvenue 👋</Text>
              <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>
            </View>

            {!!error && <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View>}

            {/* Champs */}
            <View style={styles.fields}>
              <View>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputRow}>
                  <Text style={styles.inputIcon}>✉️</Text>
                  <TextInput
                    style={styles.input} placeholder="votre@email.com" placeholderTextColor="#9ca3af"
                    value={email} onChangeText={setEmail} keyboardType="email-address"
                    autoCapitalize="none" editable={!loading}
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

            {/* Bouton principal */}
            <TouchableOpacity
              style={[styles.primaryBtn, (loading || googleLoading) && styles.disabled]}
              onPress={handleLogin} disabled={loading || googleLoading} activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color="#fff" size="small" />
                : <Text style={styles.primaryBtnText}>Se connecter</Text>}
            </TouchableOpacity>

            {/* Séparateur */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google */}
            <TouchableOpacity
              style={[styles.googleBtn, (loading || googleLoading) && styles.disabled]}
              onPress={handleGoogle} disabled={loading || googleLoading} activeOpacity={0.85}
            >
              {googleLoading
                ? <ActivityIndicator color="#7c3aed" size="small" />
                : <Text style={styles.googleIcon}>G</Text>}
              <Text style={styles.googleBtnText}>Continuer avec Google</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Pas encore de compte ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.link}>S'inscrire</Text>
              </TouchableOpacity>
            </View>

            {/* Mode démo */}
            <TouchableOpacity style={styles.demoBtn} onPress={goToMain} activeOpacity={0.7}>
              <Text style={styles.demoBtnText}>Continuer sans compte →</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {/* ── MOT DE PASSE OUBLIÉ ── */}
        {view === 'forgot' && (
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <TouchableOpacity onPress={() => switchView('login')} style={styles.backBtn}>
              <Text style={styles.backArrow}>←</Text>
              <Text style={styles.backText}>Retour</Text>
            </TouchableOpacity>
            <View style={styles.header}>
              <Text style={styles.title}>Mot de passe oublié</Text>
              <Text style={styles.subtitle}>
                Entrez votre email, nous vous enverrons un lien de réinitialisation.
              </Text>
            </View>
            {!!forgotError && <View style={styles.errorBox}><Text style={styles.errorText}>{forgotError}</Text></View>}
            <View style={{ marginBottom: 24 }}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputRow}>
                <Text style={styles.inputIcon}>✉️</Text>
                <TextInput
                  style={styles.input} placeholder="votre@email.com" placeholderTextColor="#9ca3af"
                  value={forgotEmail} onChangeText={setForgotEmail} keyboardType="email-address"
                  autoCapitalize="none" editable={!forgotLoading}
                />
              </View>
            </View>
            <TouchableOpacity
              style={[styles.primaryBtn, forgotLoading && styles.disabled]}
              onPress={handleForgot} disabled={forgotLoading} activeOpacity={0.85}
            >
              {forgotLoading
                ? <ActivityIndicator color="#fff" size="small" />
                : <Text style={styles.primaryBtnText}>Envoyer le lien</Text>}
            </TouchableOpacity>
          </ScrollView>
        )}

        {/* ── EMAIL ENVOYÉ ── */}
        {view === 'forgot-sent' && (
          <View style={styles.centeredView}>
            <View style={styles.successCircle}>
              <Text style={styles.successIcon}>✓</Text>
            </View>
            <Text style={styles.title}>Email envoyé !</Text>
            <Text style={[styles.subtitle, { textAlign: 'center', marginBottom: 40 }]}>
              Vérifiez votre boîte mail à{' '}
              <Text style={{ color: '#1f2937', fontWeight: '600' }}>{forgotEmail}</Text>
              {' '}et suivez les instructions.
            </Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => switchView('login')} activeOpacity={0.85}>
              <Text style={styles.primaryBtnText}>Retour à la connexion</Text>
            </TouchableOpacity>
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
  centeredView:   { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },

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
  forgotBtn:      { alignSelf: 'flex-end', marginTop: 4 },

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

  backBtn:        { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 40 },
  backArrow:      { fontSize: 20, color: '#6b7280' },
  backText:       { fontSize: 15, color: '#6b7280' },

  successCircle:  { width: 72, height: 72, borderRadius: 36, backgroundColor: '#ede9fe', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  successIcon:    { fontSize: 32, color: '#7c3aed', fontWeight: '700' },
  demoBtn:        { alignItems: 'center', marginTop: 20, paddingVertical: 8 },
  demoBtnText:    { fontSize: 13, color: '#9ca3af', textDecorationLine: 'underline' },
});
