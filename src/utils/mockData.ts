import { TwitterProfile, PredictionResult, ModelMetrics, NetworkNode, NetworkEdge } from '../types';

export const generateMockProfile = (username: string): TwitterProfile => {
  const isBot = Math.random() > 0.7; // 30% chance of being a bot
  
  return {
    username,
    displayName: username.charAt(0).toUpperCase() + username.slice(1),
    bio: isBot 
      ? "🔥 Follow for amazing content! 💎 Crypto expert! 🚀 #Bitcoin #Ethereum #ToTheMoon"
      : "Software engineer passionate about AI and machine learning. Building the future one line of code at a time.",
    followers: isBot ? Math.floor(Math.random() * 50000) + 10000 : Math.floor(Math.random() * 5000) + 100,
    following: isBot ? Math.floor(Math.random() * 10000) + 8000 : Math.floor(Math.random() * 1000) + 50,
    tweets: isBot ? Math.floor(Math.random() * 1000) + 5000 : Math.floor(Math.random() * 2000) + 100,
    verified: Math.random() > 0.9,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 3).toISOString(),
    profileImage: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000) + 1000}/pexels-photo-${Math.floor(Math.random() * 1000) + 1000}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`,
    location: isBot ? "" : "San Francisco, CA"
  };
};

export const generatePrediction = (profile: TwitterProfile): PredictionResult => {
  const followerRatio = profile.following / Math.max(profile.followers, 1);
  const tweetsPerDay = profile.tweets / Math.max(((Date.now() - new Date(profile.createdAt).getTime()) / (1000 * 60 * 60 * 24)), 1);
  const hasDefaultProfileImage = profile.profileImage.includes('default');
  const suspiciousBio = profile.bio.includes('🔥') || profile.bio.includes('💎') || profile.bio.includes('🚀');
  
  let botScore = 0;
  botScore += followerRatio > 2 ? 0.3 : 0;
  botScore += tweetsPerDay > 10 ? 0.2 : 0;
  botScore += hasDefaultProfileImage ? 0.15 : 0;
  botScore += suspiciousBio ? 0.25 : 0;
  botScore += profile.location === "" ? 0.1 : 0;
  
  const confidence = Math.min(0.95, Math.max(0.55, botScore + Math.random() * 0.2));
  const isBot = confidence > 0.75;
  
  const features = {
    'Follower/Following Ratio': followerRatio,
    'Tweets per Day': tweetsPerDay,
    'Bio Sentiment Score': suspiciousBio ? -0.5 : 0.3,
    'Profile Completeness': profile.location ? 0.8 : 0.3,
    'Account Age (days)': (Date.now() - new Date(profile.createdAt).getTime()) / (1000 * 60 * 60 * 24),
    'Verification Status': profile.verified ? 1 : 0
  };
  
  const shapValues = {
    'Follower/Following Ratio': (followerRatio - 1) * 0.4,
    'Tweets per Day': Math.min(tweetsPerDay / 10, 1) * 0.3,
    'Bio Sentiment Score': suspiciousBio ? 0.25 : -0.15,
    'Profile Completeness': profile.location ? -0.2 : 0.15,
    'Account Age (days)': features['Account Age (days)'] < 30 ? 0.2 : -0.1,
    'Verification Status': profile.verified ? -0.3 : 0.1
  };
  
  const limeExplanation = [
    { feature: 'Follower/Following Ratio', value: followerRatio, weight: followerRatio > 2 ? 0.8 : -0.3 },
    { feature: 'Bio Content Analysis', value: suspiciousBio ? 1 : 0, weight: suspiciousBio ? 0.6 : -0.2 },
    { feature: 'Posting Frequency', value: tweetsPerDay, weight: tweetsPerDay > 10 ? 0.7 : -0.1 },
    { feature: 'Profile Completeness', value: profile.location ? 1 : 0, weight: profile.location ? -0.4 : 0.3 }
  ];
  
  return {
    prediction: isBot ? 'Bot' : 'Human',
    confidence,
    features,
    shapValues,
    limeExplanation
  };
};

export const getModelMetrics = (): ModelMetrics => ({
  accuracy: 0.923,
  precision: 0.891,
  recall: 0.876,
  f1Score: 0.883,
  auc: 0.945
});

export const generateNetworkData = (username: string): { nodes: NetworkNode[]; edges: NetworkEdge[] } => {
  const nodes: NetworkNode[] = [
    { id: username, name: username, type: 'user', x: 200, y: 200 }
  ];
  
  const edges: NetworkEdge[] = [];
  
  // Generate followers
  for (let i = 0; i < 8; i++) {
    const followerId = `follower_${i}`;
    const angle = (i / 8) * 2 * Math.PI;
    const radius = 100;
    nodes.push({
      id: followerId,
      name: `Follower ${i + 1}`,
      type: 'follower',
      x: 200 + Math.cos(angle) * radius,
      y: 200 + Math.sin(angle) * radius
    });
    edges.push({ source: followerId, target: username });
  }
  
  // Generate following
  for (let i = 0; i < 6; i++) {
    const followingId = `following_${i}`;
    const angle = (i / 6) * 2 * Math.PI;
    const radius = 150;
    nodes.push({
      id: followingId,
      name: `Following ${i + 1}`,
      type: 'following',
      x: 200 + Math.cos(angle) * radius,
      y: 200 + Math.sin(angle) * radius
    });
    edges.push({ source: username, target: followingId });
  }
  
  return { nodes, edges };
};