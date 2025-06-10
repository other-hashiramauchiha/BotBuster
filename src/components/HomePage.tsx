import React from 'react';
import { Shield, Brain, BarChart3, Users, CheckCircle, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Detection',
      description: 'Utilizes state-of-the-art machine learning models including LightGBM and XGBoost for accurate bot detection.'
    },
    {
      icon: BarChart3,
      title: 'Interpretable Results',
      description: 'SHAP and LIME explanations provide clear insights into why a prediction was made, ensuring transparency.'
    },
    {
      icon: Users,
      title: 'Network Analysis',
      description: 'Visualizes user connections and follower networks to identify suspicious patterns and behaviors.'
    },
    {
      icon: Shield,
      title: 'Real-time Protection',
      description: 'Instant analysis of Twitter profiles with comprehensive risk assessment and confidence scoring.'
    }
  ];

  const stats = [
    { label: 'Accuracy', value: '92.3%' },
    { label: 'Models Trained', value: '15+' },
    { label: 'Features Analyzed', value: '50+' },
    { label: 'Profiles Checked', value: '10K+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-4 rounded-full shadow-lg">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            BotBuster
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Advanced AI-powered Twitter bot detection using interpretable machine learning. 
            Identify fake followers and spam accounts with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('model')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Start Detection</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => onPageChange('about')}
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive suite of tools provides deep insights into Twitter account authenticity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  <div className="bg-blue-100 p-3 rounded-lg w-fit mb-6">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and accurate bot detection in three steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Input Twitter Profile',
                description: 'Paste a Twitter URL or upload profile data for analysis',
                icon: Users
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our ML models analyze 50+ features including behavior patterns and network data',
                icon: Brain
              },
              {
                step: '03',
                title: 'Get Results',
                description: 'Receive detailed predictions with SHAP and LIME explanations',
                icon: CheckCircle
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white p-8 rounded-xl shadow-lg mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-4">{item.step}</div>
                    <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to detect bots?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start analyzing Twitter profiles with our advanced AI-powered detection system
          </p>
          <button
            onClick={() => onPageChange('model')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;