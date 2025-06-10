export interface User {
  id: string;
  username: string;
  email: string;
  isAuthenticated: boolean;
}

export interface TwitterProfile {
  username: string;
  displayName: string;
  bio: string;
  followers: number;
  following: number;
  tweets: number;
  verified: boolean;
  createdAt: string;
  profileImage: string;
  location: string;
}

export interface PredictionResult {
  prediction: 'Bot' | 'Human';
  confidence: number;
  features: Record<string, number>;
  shapValues: Record<string, number>;
  limeExplanation: LimeFeature[];
}

export interface LimeFeature {
  feature: string;
  value: number;
  weight: number;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
}

export interface NetworkNode {
  id: string;
  name: string;
  type: 'user' | 'follower' | 'following';
  x: number;
  y: number;
}

export interface NetworkEdge {
  source: string;
  target: string;
}