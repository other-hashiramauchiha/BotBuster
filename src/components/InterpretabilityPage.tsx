import React, { useRef, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { TwitterProfile, PredictionResult } from '../types';

interface InterpretabilityPageProps {
  profile: TwitterProfile | null;
  result: PredictionResult | null;
}

const InterpretabilityPage: React.FC<InterpretabilityPageProps> = ({ profile, result }) => {
  const shapCanvasRef = useRef<HTMLCanvasElement>(null);
  const limeCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (result && shapCanvasRef.current) {
      drawShapChart(shapCanvasRef.current, result.shapValues);
    }
  }, [result]);

  useEffect(() => {
    if (result && limeCanvasRef.current) {
      drawLimeChart(limeCanvasRef.current, result.limeExplanation);
    }
  }, [result]);

  const drawShapChart = (canvas: HTMLCanvasElement, shapValues: Record<string, number>) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 500;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const features = Object.keys(shapValues);
    const values = Object.values(shapValues);
    const maxValue = Math.max(...values.map(Math.abs));
    
    const barHeight = 40;
    const barSpacing = 70;
    const startY = 80;
    const chartWidth = 300;
    const startX = 350; // Moved further right to accommodate longer feature names
    const featureNameWidth = 300; // Space for feature names
    
    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('SHAP Feature Importance', 20, 40);
    
    // Draw subtitle
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px Arial';
    ctx.fillText('Red bars indicate bot-like features, green bars indicate human-like features', 20, 65);
    
    features.forEach((feature, index) => {
      const value = values[index];
      const y = startY + index * barSpacing;
      const barWidth = Math.abs(value) / maxValue * chartWidth;
      
      // Draw feature name with better positioning
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(feature, startX - 20, y + barHeight / 2 + 5);
      
      // Draw bar with appropriate color
      if (value > 0) {
        ctx.fillStyle = '#ef4444'; // Red for positive (bot-indicating)
        ctx.fillRect(startX, y, barWidth, barHeight);
      } else {
        ctx.fillStyle = '#10b981'; // Green for negative (human-indicating)
        ctx.fillRect(startX - barWidth, y, barWidth, barHeight);
      }
      
      // Add subtle border to bars
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      if (value > 0) {
        ctx.strokeRect(startX, y, barWidth, barHeight);
      } else {
        ctx.strokeRect(startX - barWidth, y, barWidth, barHeight);
      }
      
      // Draw value - ALWAYS on the right side of the bar
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 13px Arial';
      ctx.textAlign = 'left';
      // For positive values: right edge of bar + 10px
      // For negative values: right edge of negative bar (which is startX) + 10px
      const valueX = value > 0 ? startX + barWidth + 10 : startX + 10;
      ctx.fillText(value.toFixed(3), valueX, y + barHeight / 2 + 5);
    });
    
    // Draw zero line
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, startY - 20);
    ctx.lineTo(startX, startY + features.length * barSpacing - 30);
    ctx.stroke();
    
    // Add legend at the bottom
    const legendY = canvas.height - 50;
    const legendX = 50;
    
    // Red legend
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(legendX, legendY, 20, 15);
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Positive (Bot-indicating)', legendX + 30, legendY + 12);
    
    // Green legend
    ctx.fillStyle = '#10b981';
    ctx.fillRect(legendX + 200, legendY, 20, 15);
    ctx.fillStyle = '#1f2937';
    ctx.fillText('Negative (Human-indicating)', legendX + 230, legendY + 12);
  };

  const drawLimeChart = (canvas: HTMLCanvasElement, limeData: any[]) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 450;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const maxWeight = Math.max(...limeData.map(d => Math.abs(d.weight)));
    
    const barHeight = 40;
    const barSpacing = 70;
    const startY = 80;
    const chartWidth = 300;
    const startX = 350; // Moved further right to accommodate longer feature names
    
    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('LIME Local Explanations', 20, 40);
    
    // Draw subtitle
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px Arial';
    ctx.fillText('Local feature importance for this specific prediction', 20, 65);
    
    limeData.forEach((item, index) => {
      const y = startY + index * barSpacing;
      const barWidth = Math.abs(item.weight) / maxWeight * chartWidth;
      
      // Draw feature name with better positioning
      ctx.fillStyle = '#374151';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(item.feature, startX - 20, y + barHeight / 2 + 5);
      
      // Draw bar with appropriate color
      if (item.weight > 0) {
        ctx.fillStyle = '#ef4444'; // Red for positive (bot-indicating)
        ctx.fillRect(startX, y, barWidth, barHeight);
      } else {
        ctx.fillStyle = '#10b981'; // Green for negative (human-indicating)
        ctx.fillRect(startX - barWidth, y, barWidth, barHeight);
      }
      
      // Add subtle border to bars
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      if (item.weight > 0) {
        ctx.strokeRect(startX, y, barWidth, barHeight);
      } else {
        ctx.strokeRect(startX - barWidth, y, barWidth, barHeight);
      }
      
      // Draw weight - ALWAYS on the right side of the bar
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 13px Arial';
      ctx.textAlign = 'left';
      // For positive values: right edge of bar + 10px
      // For negative values: right edge of negative bar (which is startX) + 10px
      const valueX = item.weight > 0 ? startX + barWidth + 10 : startX + 10;
      ctx.fillText(item.weight.toFixed(3), valueX, y + barHeight / 2 + 5);
    });
    
    // Draw zero line
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(startX, startY - 20);
    ctx.lineTo(startX, startY + limeData.length * barSpacing - 30);
    ctx.stroke();
    
    // Add legend at the bottom
    const legendY = canvas.height - 40;
    const legendX = 50;
    
    // Red legend
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(legendX, legendY, 20, 15);
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Positive (Risk Factor)', legendX + 30, legendY + 12);
    
    // Green legend
    ctx.fillStyle = '#10b981';
    ctx.fillRect(legendX + 200, legendY, 20, 15);
    ctx.fillStyle = '#1f2937';
    ctx.fillText('Negative (Trust Factor)', legendX + 230, legendY + 12);
  };

  const formatFeatureValue = (feature: string, value: any): string => {
    switch (feature) {
      case 'Bio Sentiment Score':
      case 'Profile Completeness':
        return `${(value * 100).toFixed(1)}%`;
      case 'Account Age (days)':
        return Math.round(value).toString();
      case 'Verification Status':
        return value > 0.5 ? 'Yes' : 'No';
      default:
        return typeof value === 'number' ? value.toFixed(3) : value;
    }
  };

  if (!result || !profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Data</h2>
          <p className="text-gray-600">
            Please run a bot detection analysis first to view interpretability results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Model Interpretability</h1>
        <p className="text-lg text-gray-600">
          Detailed analysis of how our AI model made its prediction for @{profile.username}
        </p>
      </div>

      {/* Prediction Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Prediction Summary</h2>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
            result.prediction === 'Bot' 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {result.prediction === 'Bot' ? (
              <AlertTriangle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <span>{result.prediction}</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Confidence Score</h3>
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${
                    result.prediction === 'Bot' ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${result.confidence * 100}%` }}
                ></div>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Risk Assessment</h3>
            <div className={`text-lg font-semibold ${
              result.confidence > 0.8 ? 'text-red-600' : 
              result.confidence > 0.6 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {result.confidence > 0.8 ? 'High Risk' : 
               result.confidence > 0.6 ? 'Medium Risk' : 'Low Risk'}
            </div>
          </div>
        </div>
      </div>

      {/* SHAP Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">SHAP Analysis</h2>
        </div>
        <p className="text-gray-600 mb-6">
          SHAP (SHapley Additive exPlanations) values show how each feature contributes to the final prediction. 
          Red bars indicate bot-like features, green bars indicate human-like features.
        </p>
        <div className="flex justify-center overflow-x-auto">
          <canvas ref={shapCanvasRef} className="border border-gray-200 rounded-lg max-w-full"></canvas>
        </div>
      </div>

      {/* LIME Analysis */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="h-5 w-5 text-orange-600" />
          <h2 className="text-xl font-semibold text-gray-900">LIME Analysis</h2>
        </div>
        <p className="text-gray-600 mb-6">
          LIME (Local Interpretable Model-agnostic Explanations) provides local explanations by learning 
          a simple model around the specific prediction to understand feature importance.
        </p>
        <div className="flex justify-center overflow-x-auto">
          <canvas ref={limeCanvasRef} className="border border-gray-200 rounded-lg max-w-full"></canvas>
        </div>
      </div>

      {/* Feature Details */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Feature Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Extracted Features</h3>
            <div className="space-y-2">
              {Object.entries(result.features).map(([feature, value]) => (
                <div key={feature} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">{feature}:</span>
                  <span className="font-medium text-gray-900">
                    {formatFeatureValue(feature, value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Model Insights</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                <strong>High follower/following ratio</strong> often indicates automated following behavior
              </p>
              <p>
                <strong>Excessive posting frequency</strong> may suggest automated content generation
              </p>
              <p>
                <strong>Incomplete profiles</strong> are common among bot accounts
              </p>
              <p>
                <strong>Suspicious bio content</strong> with excessive emojis or promotional language
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterpretabilityPage;