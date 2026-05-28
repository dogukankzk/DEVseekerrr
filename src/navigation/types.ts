export type RootStackParamList = {
  Splash:     undefined;
  Onboarding: undefined;
  Auth:       undefined;
  Main:       undefined;
};

export type AuthStackParamList = {
  Login:  undefined;
  Signup: undefined;
};

export type MainTabParamList = {
  Home:      undefined;
  Favorites: undefined;
  Profile:   undefined;
};

export type HomeStackParamList = {
  HomeScreen:    undefined;
  JobDetail:     { jobId: string };
};
