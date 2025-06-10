import React, { useRef, useEffect } from 'react';
import { BarChart3, PieChart, TrendingUp, Target, Award, Zap } from 'lucide-react';
import { getModelMetrics } from '../utils/mockData';

const ResultsPage: React.FC = () => {
  const metricsCanvasRef = useRef<HTMLCanvasElement>(null);
  const confusionCanvasRef = useRef<HTMLCanvasElement>(null);
  const rocCanvasRef = useRef<HTMLCanvasElement>(null);

  const metrics = getModelMetrics();

  useEffect(() => {
    if (metricsCanvasRef.current) {
      drawMetricsChart(metricsCanvasRef.current, metrics);
    }
    if (confusionCanvasRef.current) {
      drawConfusionMatrix(confusionCanvasRef.current);
    }
    if (rocCanvasRef.current) {
      drawROCCurve(rocCanvasRef.current);
    }
  }, [metrics]);

  const drawMetricsChart = (canvas: HTMLCanvasElement, metrics: any) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 500;
    canvas.height = 300;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const metricNames = Object.keys(metrics);
    const metricValues = Object.values(metrics) as number[];
    
    const barWidth = 60;
    const barSpacing = 20;
    const startX = 50;
    const startY = 250;
    const maxHeight = 200;
    
    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('Model Performance Metrics', 20, 30);
    
    metricNames.forEach((name, index) => {
      const value = metricValues[index];
      const x = startX + index * (barWidth + barSpacing);
      const barHeight = value * maxHeight;
      
      // Draw bar
      const gradient = ctx.createLinearGradient(0, startY - barHeight, 0, startY);
      gradient.addColorStop(0, '#3b82f6');
      gradient.addColorStop(1, '#1d4ed8');
      ctx.fillStyle = gradient;
      ctx.fillRect(x, startY - barHeight, barWidth, barHeight);
      
      // Draw value on top
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText((value * 100).toFixed(1) + '%', x + barWidth / 2, startY - barHeight - 10);
      
      // Draw metric name
      ctx.font = '11px Arial';
      ctx.save();
      ctx.translate(x + barWidth / 2, startY + 15);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(name, 0, 0);
      ctx.restore();
    });
  };

  const drawConfusionMatrix = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const cellSize = 80;
    const startX = 80;
    const startY = 80;
    
    // Mock confusion matrix data
    const matrix = [[1847, 123], [89, 1641]];
    const labels = ['Human', 'Bot'];
    
    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Confusion Matrix', canvas.width / 2, 30);
    
    // Draw matrix
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        const x = startX + j * cellSize;
        const y = startY + i * cellSize;
        const value = matrix[i][j];
        
        // Cell color based on value
        const intensity = value / Math.max(...matrix.flat());
        ctx.fillStyle = `rgba(59, 130, 246, ${intensity})`;
        ctx.fillRect(x, y, cellSize, cellSize);
        
        // Cell border
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, cellSize, cellSize);
        
        // Cell value
        ctx.fillStyle = intensity > 0.5 ? '#ffffff' : '#1f2937';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + cellSize / 2, y + cellSize / 2 + 5);
      }
    }
    
    // Labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    labels.forEach((label, i) => {
      // Top labels (predicted)
      ctx.fillText(label, startX + i * cellSize + cellSize / 2, startY - 10);
      // Left labels (actual)
      ctx.save();
      ctx.translate(startX - 20, startY + i * cellSize + cellSize / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(label, 0, 0);
      ctx.restore();
    });
    
    // Axis labels
    ctx.font = 'bold 11px Arial';
    ctx.fillText('Predicted', startX + cellSize, startY - 30);
    ctx.save();
    ctx.translate(20, startY + cellSize);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Actual', 0, 0);
    ctx.restore();
  };

  const drawROCCurve = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 40;
    const chartSize = 220;
    
    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('ROC Curve', canvas.width / 2, 25);
    
    // Draw axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, padding + chartSize);
    ctx.lineTo(padding + chartSize, padding + chartSize);
    ctx.stroke();
    
    // Draw diagonal line (random classifier)
    ctx.strokeStyle = '#9ca3af';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, padding + chartSize);
    ctx.lineTo(padding + chartSize, padding);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw ROC curve (mock data)
    const rocPoints = [
      [0, 1], [0.05, 0.92], [0.12, 0.87], [0.18, 0.82], [0.25, 0.76],
      [0.32, 0.68], [0.41, 0.58], [0.52, 0.45], [0.68, 0.32], [0.85, 0.18], [1, 0]
    ];
    
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    rocPoints.forEach((point, index) => {
      const x = padding + point[0] * chartSize;
      const y = padding + (1 - point[1]) * chartSize;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    
    // Labels
    ctx.fillStyle = '#374151';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('False Positive Rate', padding + chartSize / 2, canvas.height - 5);
    
    ctx.save();
    ctx.translate(15, padding + chartSize / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('True Positive Rate', 0, 0);
    ctx.restore();
    
    // AUC text
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#3b82f6';
    ctx.textAlign = 'left';
    ctx.fillText(`AUC = ${metrics.auc.toFixed(3)}`, padding + 10, padding + 20);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Model Performance Results</h1>
        <p className="text-lg text-gray-600">
          Comprehensive evaluation metrics and performance analysis of our bot detection models
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          { 
            label: 'Accuracy', 
            value: `${(metrics.accuracy * 100).toFixed(1)}%`, 
            icon: Target,
            color: 'blue',
            description: 'Overall prediction accuracy'
          },
          { 
            label: 'Precision', 
            value: `${(metrics.precision * 100).toFixed(1)}%`, 
            icon: Award,
            color: 'green',
            description: 'Correct bot predictions'
          },
          { 
            label: 'Recall', 
            value: `${(metrics.recall * 100).toFixed(1)}%`, 
            icon: Zap,
            color: 'yellow',
            description: 'Bot detection rate'
          },
          { 
            label: 'F1 Score', 
            value: `${(metrics.f1Score * 100).toFixed(1)}%`, 
            icon: TrendingUp,
            color: 'purple',
            description: 'Harmonic mean of precision and recall'
          }
        ].map((metric, index) => {
          const Icon = metric.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-800',
            green: 'bg-green-100 text-green-800',
            yellow: 'bg-yellow-100 text-yellow-800',
            purple: 'bg-purple-100 text-purple-800'
          };
          
          return (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className={`inline-flex p-2 rounded-lg mb-3 ${colorClasses[metric.color as keyof typeof colorClasses]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                {metric.label}
              </div>
              <div className="text-xs text-gray-500">
                {metric.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Metrics Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Performance Metrics</h2>
          </div>
          <div className="flex justify-center">
            <canvas ref={metricsCanvasRef} className="border border-gray-200 rounded-lg"></canvas>
          </div>
        </div>

        {/* Model Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Model Comparison</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: 'LightGBM', accuracy: 0.923, color: 'bg-blue-500' },
              { name: 'XGBoost', accuracy: 0.918, color: 'bg-green-500' },
              { name: 'Random Forest', accuracy: 0.905, color: 'bg-yellow-500' },
              { name: 'Logistic Regression', accuracy: 0.887, color: 'bg-purple-500' }
            ].map((model, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${model.color}`}></div>
                  <span className="font-medium text-gray-900">{model.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${model.color}`}
                      style={{ width: `${model.accuracy * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-12">
                    {(model.accuracy * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Analytics */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Confusion Matrix */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <PieChart className="h-5 w-5 text-orange-600" />
            <h2 className="text-xl font-semibold text-gray-900">Confusion Matrix</h2>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Detailed breakdown of correct and incorrect predictions
          </p>
          <div className="flex justify-center">
            <canvas ref={confusionCanvasRef} className="border border-gray-200 rounded-lg"></canvas>
          </div>
        </div>

        {/* ROC Curve */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">ROC Curve</h2>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Receiver Operating Characteristic curve showing model performance
          </p>
          <div className="flex justify-center">
            <canvas ref={rocCanvasRef} className="border border-gray-200 rounded-lg"></canvas>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Insights</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Model Strengths</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                <span>High accuracy (92.3%) across diverse bot types</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                <span>Excellent AUC score (0.945) indicating strong discrimination</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                <span>Balanced precision and recall for production use</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                <span>Robust performance across different time periods</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Areas for Improvement</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></div>
                <span>False positives on verified accounts with unusual patterns</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></div>
                <span>Challenges with sophisticated bot networks</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></div>
                <span>Need for more diverse training data</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></div>
                <span>Adaptation to evolving bot behaviors</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;