import React, { useRef, useEffect } from 'react';
import { Users, Github, Mail, Award, BookOpen, Target } from 'lucide-react';
import { generateNetworkData } from '../utils/mockData';
import { NetworkNode, NetworkEdge } from '../types';

const AboutPage: React.FC = () => {
  const networkCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (networkCanvasRef.current) {
      const { nodes, edges } = generateNetworkData('sample_user');
      drawNetworkGraph(networkCanvasRef.current, nodes, edges);
    }
  }, []);

  const drawNetworkGraph = (canvas: HTMLCanvasElement, nodes: NetworkNode[], edges: NetworkEdge[]) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 400;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw edges
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 1;
    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      if (sourceNode && targetNode) {
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.stroke();
      }
    });
    
    // Draw nodes
    nodes.forEach(node => {
      ctx.beginPath();
      
      // Set color based on node type
      if (node.type === 'user') {
        ctx.fillStyle = '#3b82f6';
        ctx.arc(node.x, node.y, 12, 0, 2 * Math.PI);
      } else if (node.type === 'follower') {
        ctx.fillStyle = '#10b981';
        ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI);
      } else {
        ctx.fillStyle = '#f59e0b';
        ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI);
      }
      
      ctx.fill();
      
      // Add border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Add label for main user
      if (node.type === 'user') {
        ctx.fillStyle = '#1f2937';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y - 20);
      }
    });
    
    // Add legend
    const legendY = 30;
    const legendItems = [
      { color: '#3b82f6', label: 'Target User', size: 12 },
      { color: '#10b981', label: 'Followers', size: 8 },
      { color: '#f59e0b', label: 'Following', size: 8 }
    ];
    
    legendItems.forEach((item, index) => {
      const y = legendY + index * 25;
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.arc(30, y, item.size, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.fillStyle = '#1f2937';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(item.label, 50, y + 4);
    });
  };

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Lead ML Engineer',
      bio: 'PhD in Machine Learning with 8+ years in AI research. Specializes in interpretable ML and social media analysis.',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      name: 'Alex Rodriguez',
      role: 'Data Scientist',
      bio: 'Expert in feature engineering and model optimization. Former Twitter data scientist with deep domain knowledge.',
      avatar: 'https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      name: 'Emily Zhang',
      role: 'Software Engineer',
      bio: 'Full-stack developer specializing in ML deployment and scalable systems. Expert in Python and cloud infrastructure.',
      avatar: 'https://images.pexels.com/photos/3756675/pexels-photo-3756675.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    },
    {
      name: 'Marcus Johnson',
      role: 'Security Researcher',
      bio: 'Cybersecurity expert focused on social media threats and bot detection. 10+ years in information security.',
      avatar: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About BotBuster</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to make social media safer by providing advanced AI tools 
          for detecting and understanding automated accounts and fake followers.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            To combat the growing threat of social media manipulation by providing transparent, 
            interpretable AI tools that help users, researchers, and platforms identify and 
            understand automated accounts and their behaviors.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-4">
            <Award className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Our Vision</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            A digital world where authentic human interaction thrives, free from the 
            manipulation of automated accounts and coordinated inauthentic behavior. 
            We envision transparent AI that empowers users with knowledge.
          </p>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <div className="flex items-center space-x-3 mb-6">
          <BookOpen className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Technology & Approach</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Machine Learning Stack</h3>
            <div className="space-y-3">
              {[
                { name: 'LightGBM & XGBoost', desc: 'Gradient boosting for high-performance classification' },
                { name: 'Scikit-learn', desc: 'Pipeline orchestration and model evaluation' },
                { name: 'SHAP & LIME', desc: 'Interpretable AI explanations' },
                { name: 'MLflow', desc: 'Experiment tracking and model versioning' }
              ].map((tech, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium text-gray-900">{tech.name}:</span>
                    <span className="text-gray-600 ml-1">{tech.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Features & Analysis</h3>
            <div className="space-y-3">
              {[
                { name: 'Behavioral Patterns', desc: 'Posting frequency, timing, and content analysis' },
                { name: 'Network Analysis', desc: 'Follower/following relationships and graph metrics' },
                { name: 'Content Analysis', desc: 'NLP-based sentiment and authenticity scoring' },
                { name: 'Temporal Features', desc: 'Account age, growth patterns, and activity cycles' }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <span className="font-medium text-gray-900">{feature.name}:</span>
                    <span className="text-gray-600 ml-1">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Network Visualization Demo */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="h-6 w-6 text-orange-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Network Analysis Visualization</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Our system analyzes the social network structure around each user to identify 
          suspicious patterns and coordinated behaviors that may indicate bot activity.
        </p>
        <div className="flex justify-center">
          <canvas ref={networkCanvasRef} className="border border-gray-200 rounded-lg"></canvas>
        </div>
      </div>

      {/* Team */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p className="text-lg text-gray-600">
            Experts in machine learning, cybersecurity, and social media analysis
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-blue-600 font-medium mb-3">
                {member.role}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Research & Publications */}
      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Research & Impact</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-700 font-medium">Research Papers</div>
            <div className="text-sm text-gray-500">Published in top-tier conferences</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
            <div className="text-gray-700 font-medium">Profiles Analyzed</div>
            <div className="text-sm text-gray-500">In our research studies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">92.3%</div>
            <div className="text-gray-700 font-medium">Accuracy Rate</div>
            <div className="text-sm text-gray-500">On diverse bot detection tasks</div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          Interested in collaborating or have questions about our research?
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="mailto:contact@botbuster.ai"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span>contact@botbuster.ai</span>
          </a>
          <a
            href="https://github.com/botbuster"
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;