import React from 'react'
import BackButton from './BackButton'

const SmartAgricultureWorldPage = ({ onBack }) => {
  const features = [
    {
      icon: '🤖',
      title: 'AI Digital Twin',
      description: 'Your personal farming assistant that understands your emotions and provides calm, evidence-based guidance for better decision making.',
      benefits: ['Emotional intelligence analysis', 'Personalized recommendations', 'Stress-free decision support']
    },
    {
      icon: '🌾',
      title: 'Crop Health Analysis',
      description: 'Advanced AI-powered crop disease detection using computer vision to identify issues before they spread.',
      benefits: ['Early disease detection', 'Treatment recommendations', 'Preventive measures']
    },
    {
      icon: '📊',
      title: 'Smart Analytics',
      description: 'Comprehensive farm data analysis with predictive insights to optimize yields and reduce costs.',
      benefits: ['Yield prediction', 'Cost optimization', 'Weather impact analysis']
    },
    {
      icon: '🎙️',
      title: 'Voice Assistant',
      description: 'Natural language processing for hands-free farming assistance and real-time support.',
      benefits: ['Voice commands', 'Real-time help', 'Accessibility features']
    },
    {
      icon: '🌱',
      title: 'Precision Farming',
      description: 'IoT integration for precise resource management and automated farming operations.',
      benefits: ['Resource optimization', 'Automated irrigation', 'Field monitoring']
    },
    {
      icon: '📱',
      title: 'Mobile Access',
      description: 'Access all farming tools and insights from anywhere using your mobile device.',
      benefits: ['Remote monitoring', 'Mobile alerts', 'Offline capabilities']
    }
  ]

  const stats = [
    { number: '85%', label: 'Accuracy in Disease Detection' },
    { number: '60%', label: 'Reduction in Decision Stress' },
    { number: '30%', label: 'Increase in Farm Productivity' },
    { number: '24/7', label: 'AI Assistant Availability' }
  ]

  // ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 relative">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center py-12">
          <div className="text-7xl mb-6">🌍</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Smart Agriculture World</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing farming with AI, IoT, and data-driven insights for sustainable and profitable agriculture.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center space-x-3">
            <span>🚀</span>
            <span>Our Smart Agriculture Solutions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-gray-700">
                      <span className="text-green-500">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center space-x-3">
            <span>🎯</span>
            <span>Our Mission</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-gray-700 text-lg leading-relaxed">
                To empower farmers worldwide with cutting-edge technology that combines artificial intelligence,
                emotional intelligence, and sustainable farming practices to create a future where farming is
                profitable, stress-free, and environmentally responsible.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We believe that every farmer deserves access to the same level of technological advancement
                that has transformed other industries. Our platform bridges the gap between traditional farming
                wisdom and modern technological innovation.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-12">
                <div className="text-6xl mb-4">🌱</div>
                <div className="text-2xl font-bold text-gray-800">Future of Farming</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of farmers who are already using AI-powered farming solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onBack}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            ← Back to Main
          </button>
        </div>
      </div>
    </div>
  )
}

export default SmartAgricultureWorldPage
