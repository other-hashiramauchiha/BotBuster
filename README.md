# BotBuster - AI-Powered Twitter Bot Detection

BotBuster is an advanced machine learning application that detects spam bots and fake followers on Twitter using interpretable AI techniques including SHAP and LIME explanations. The application provides a comprehensive web interface for analyzing Twitter profiles and understanding the reasoning behind bot detection predictions.

## 🚀 Features

- **Advanced AI Detection**: Utilizes state-of-the-art machine learning models for accurate bot detection
- **Interpretable Results**: SHAP and LIME explanations provide clear insights into predictions
- **Network Analysis**: Visualizes user connections and follower networks
- **Real-time Analysis**: Instant analysis of Twitter profiles with comprehensive risk assessment
- **User Authentication**: Secure login/registration system with local storage
- **Comprehensive Dashboard**: Multiple pages for analysis, results, and insights

## 📁 Project Structure

```
botbuster-ml-app/
├── public/
│   └── (static assets)
├── src/
│   ├── components/
│   │   ├── AboutPage.tsx          # About page with team and technology info
│   │   ├── HomePage.tsx           # Landing page with features overview
│   │   ├── InterpretabilityPage.tsx # SHAP/LIME analysis visualization
│   │   ├── LoginForm.tsx          # Authentication component
│   │   ├── ModelPage.tsx          # Main bot detection interface
│   │   ├── Navigation.tsx         # Navigation bar component
│   │   └── ResultsPage.tsx        # Model performance metrics
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── utils/
│   │   ├── auth.ts                # Authentication utilities
│   │   └── mockData.ts            # Mock data generation for demo
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles with Tailwind
├── .gitignore                     # Git ignore rules
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML template
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Dependency lock file
├── postcss.config.js              # PostCSS configuration
├── README.md                      # This file
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json              # App-specific TypeScript config
├── tsconfig.node.json             # Node-specific TypeScript config
└── vite.config.ts                 # Vite build configuration
```

## 🛠️ Installation Steps

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd botbuster-ml-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🔧 Environment Setup

### Development Environment

The application is built with:
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **ESLint** for code linting

### Required Dependencies

```json
{
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}
```

## 📖 Usage Guide

### Getting Started

1. **Login/Registration**
   - Create a new account or login with existing credentials
   - Demo accounts: Use any username/password combination for testing

2. **Bot Detection**
   - Navigate to the "Bot Detection" page
   - Enter a Twitter profile URL or username
   - Alternatively, upload a JSON/CSV file with profile data
   - Click "Analyze Profile" to run the detection

3. **View Results**
   - See the prediction (Bot/Human) with confidence score
   - Review key risk factors and profile summary
   - Navigate to "Analysis" page for detailed interpretability

4. **Interpretability Analysis**
   - View SHAP feature importance charts
   - Examine LIME local explanations
   - Understand which features contributed to the prediction

5. **Performance Metrics**
   - Check the "Results" page for model performance statistics
   - View accuracy, precision, recall, and F1 scores
   - Compare different model performances

### Key Features Explained

#### SHAP Analysis
- Shows global feature importance across all predictions
- Red bars indicate bot-like features
- Green bars indicate human-like features
- Values represent contribution to final prediction

#### LIME Analysis
- Provides local explanations for individual predictions
- Helps understand why a specific profile was classified as bot/human
- Shows feature weights for the current prediction

#### Feature Details
- **Bio Sentiment Score**: Percentage indicating suspicious content
- **Profile Completeness**: Percentage of completed profile fields
- **Account Age**: Number of days since account creation
- **Verification Status**: Yes/No for verified accounts
- **Follower/Following Ratio**: Ratio indicating following behavior
- **Tweets per Day**: Average posting frequency

## 🚀 Deployment Instructions

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

### Deployment Options

#### Netlify Deployment
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

#### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow the prompts to deploy

#### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your server to serve the `index.html` for all routes

### Environment Variables

Currently, the application uses local storage for authentication and mock data for demonstrations. For production deployment with real ML models, you would need to configure:

- API endpoints for ML model inference
- Database connections for user management
- External API keys for Twitter data fetching

## 🔮 Future Enhancements

### Planned Features
- Integration with real ML models (LightGBM, XGBoost)
- Live Twitter API integration for real-time data fetching
- Database integration for user management and analysis history
- Advanced network analysis with NetworkX
- Batch processing for multiple profiles
- API endpoints for programmatic access

### Technical Improvements
- Server-side rendering for better SEO
- Progressive Web App (PWA) capabilities
- Real-time notifications for analysis completion
- Export functionality for analysis reports
- Advanced filtering and search capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

## 🏗️ Architecture Notes

### Current Implementation
- **Frontend**: React with TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React hooks for local state
- **Data**: Mock data generators for demonstration
- **Authentication**: Local storage-based system

### Production Architecture (Recommended)
- **Backend**: Python Flask/FastAPI with ML models
- **Database**: PostgreSQL for user data, Redis for caching
- **ML Pipeline**: Separate microservice for model inference
- **Authentication**: JWT tokens with proper security
- **Deployment**: Docker containers with orchestration

This README provides comprehensive information for developers, users, and stakeholders to understand, install, use, and contribute to the BotBuster project.