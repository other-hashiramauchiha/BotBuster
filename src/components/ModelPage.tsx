import React, { useState } from 'react';
import { Twitter, Upload, Search, AlertCircle, CheckCircle, Bot, User, TrendingUp } from 'lucide-react';
import { generateMockProfile, generatePrediction } from '../utils/mockData';
import { TwitterProfile, PredictionResult } from '../types';

interface ModelPageProps {
  onAnalysisComplete: (profile: TwitterProfile, result: PredictionResult) => void;
}

const ModelPage: React.FC<ModelPageProps> = ({ onAnalysisComplete }) => {
  const [inputType, setInputType] = useState<'url' | 'file'>('url');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ profile: TwitterProfile; prediction: PredictionResult } | null>(null);

  const extractUsernameFromUrl = (url: string): string => {
    const match = url.match(/twitter\.com\/([a-zA-Z0-9_]+)/);
    return match ? match[1] : url.replace(/[^a-zA-Z0-9_]/g, '');
  };

  const handleAnalyze = async () => {
    if (inputType === 'url' && !twitterUrl.trim()) {
      return;
    }
    if (inputType === 'file' && !file) {
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const username = inputType === 'url' 
      ? extractUsernameFromUrl(twitterUrl)
      : file!.name.replace(/\.[^/.]+$/, "");
    
    const profile = generateMockProfile(username);
    const prediction = generatePrediction(profile);
    
    setResult({ profile, prediction });
    onAnalysisComplete(profile, prediction);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Twitter Bot Detection</h1>
        <p className="text-lg text-gray-600">
          Analyze Twitter profiles using advanced machine learning to detect bots and fake accounts
        </p>
      </div>

      {/* Input Selection */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-6">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setInputType('url')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                inputType === 'url'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Twitter className="h-4 w-4" />
              <span>Twitter URL</span>
            </button>
            <button
              onClick={() => setInputType('file')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                inputType === 'file'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload className="h-4 w-4" />
              <span>Upload Data</span>
            </button>
          </div>
        </div>

        {inputType === 'url' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Twitter Profile URL
            </label>
            <div className="relative">
              <Twitter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://twitter.com/username or just username"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Enter a Twitter profile URL or just the username
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Profile Data
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </span>
                  <span className="mt-1 block text-xs text-gray-500">
                    JSON or CSV files supported
                  </span>
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".json,.csv"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading || (inputType === 'url' && !twitterUrl.trim()) || (inputType === 'file' && !file)}
          className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              <span>Analyze Profile</span>
            </>
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Profile Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Summary</h2>
            <div className="flex items-start space-x-4">
              <img
                src={result.profile.profileImage}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {result.profile.displayName} (@{result.profile.username})
                </h3>
                <p className="text-gray-600 mb-3">{result.profile.bio}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Followers:</span>
                    <span className="ml-1 font-medium">{result.profile.followers.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Following:</span>
                    <span className="ml-1 font-medium">{result.profile.following.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Tweets:</span>
                    <span className="ml-1 font-medium">{result.profile.tweets.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Verified:</span>
                    <span className="ml-1 font-medium">{result.profile.verified ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Prediction Result */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Detection Result</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {result.prediction.prediction === 'Bot' ? (
                  <Bot className="h-8 w-8 text-red-500" />
                ) : (
                  <User className="h-8 w-8 text-green-500" />
                )}
                <div>
                  <div className={`text-2xl font-bold ${
                    result.prediction.prediction === 'Bot' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {result.prediction.prediction}
                  </div>
                  <div className="text-sm text-gray-500">
                    {(result.prediction.confidence * 100).toFixed(1)}% confidence
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Confidence Score</span>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      result.prediction.prediction === 'Bot' ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${result.prediction.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Factors</h2>
            <div className="space-y-3">
              {result.prediction.limeExplanation.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-900">{factor.feature}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      factor.weight > 0 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {factor.weight > 0 ? 'Risk Factor' : 'Trust Factor'}
                    </div>
                    <span className="text-sm text-gray-600">
                      {Math.abs(factor.weight).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelPage;