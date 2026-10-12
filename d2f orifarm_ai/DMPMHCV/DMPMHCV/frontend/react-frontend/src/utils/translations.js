// Translation files for Farmer Digital Twin
const translations = {
  en: {
    // Header
    title: "Agri-Intelligence Anchor",
    subtitle: "Calm guidance. Institutional precision.",

    // Language selector
    selectLanguage: "Language",

    // Current State
    currentState: "Your Current State",
    emotionalState: "Emotional State",
    stress: "Stress",
    decisionReadiness: "Decision Readiness",
    confidenceTrend: "Confidence Trend",
    evidence: "Evidence",
    moderate: "Moderate",
    stable: "Stable",
    declining: "Declining",
    improving: "Improving",
    low: "Low",
    high: "High",
    needsCaution: "Needs Caution",
    unclear: "Unclear",

    // Decision Selection
    whatPlanning: "What are you planning to do?",
    sellCrop: "Sell Crop Now",
    buyFertilizer: "Buy Fertilizer / Inputs",
    waitObserve: "Wait & Observe",
    aiFarmer: "AI Farmer Assistant",
    aiSubtitle: "Your intelligent farming companion with expert knowledge and personalized advice",

    // AI Farmer Topics
    selectTopic: "Select a Topic",
    topics: {
      general: "General Farming",
      crops: "Crop Management",
      soil: "Soil Health",
      weather: "Weather Impact",
      market: "Market Prices",
      pests: "Pest Control",
      irrigation: "Irrigation",
      equipment: "Equipment"
    },

    // Modules
    modules: {
      aiFarmer: "Farm Assistant",
      aiFarmerSub: "AI Advice",
      aiFarmerDesc: "Get personalized advice for your farm and crops.",
      cropAnalyzer: "Crop Scanner",
      cropAnalyzerSub: "Disease Detection",
      cropAnalyzerDesc: "Take a photo to identify crop diseases and get treatment.",
      voiceAssistant: "Voice Assistant",
      voiceAssistantSub: "Speak to App",
      voiceAssistantDesc: "Control the app and get answers using your voice.",
      safetyTwin: "Safety Monitor",
      safetyTwinSub: "Alerts & Security",
      safetyTwinDesc: "Monitor farm safety and get alerts for intruders or fire.",
      smartWorkspace: "Smart Workspace",
      smartWorkspaceSub: "Farm Map",
      smartWorkspaceDesc: "View your farm on the map and check weather conditions.",
      expertSystem: "Expert System",
      expertSystemSub: "Decision Support",
      expertSystemDesc: "Get help with important farming decisions.",
      marketIntel: "Market Prices",
      marketIntelSub: "Price Trends",
      marketIntelDesc: "Check current market prices and price forecasts."
    },

    // AI Farmer UI
    askQuestion: "Ask Your Question",
    askPlaceholder: "Ask me anything about",
    thinking: "Thinking...",
    askBtn: "Ask AI Farmer",
    quickQTitle: "Quick Questions:",
    aiResponse: "AI Farmer Response",
    aiCapabilities: "AI Capabilities",
    backToMain: "Back To Dashboard",
    listening: "Listening...",
    tapToSpeak: "Tap to Speak",

    // Capabilities
    capTitle: {
      expert: "Expert Knowledge",
      regional: "Regional Adaptation",
      data: "Data-Driven",
      chat: "Conversational",
      learn: "Continuous Learning",
      realtime: "Real-time Support"
    },
    capDesc: {
      expert: "Access to comprehensive farming database and best practices",
      regional: "Advice tailored to your location, climate, and crop types",
      data: "Recommendations based on scientific research and real data",
      chat: "Natural language interface for easy communication",
      learn: "AI improves with each interaction and new research",
      realtime: "24/7 availability for urgent farming questions"
    },

    // Quick Questions (Arrays will need key lookup)
    quickQ: {
      general: [
        'What are general farming practices?',
        'How to manage crops?',
        'How to improve soil health?',
        'Is it going to rain?',
        'What are the market prices?',
        'How to control pests?',
        'Best irrigation practices?'
      ],
      crops: [
        'How to increase yield for Basmati rice?',
        'Advice for Rice/Paddy farming?',
        'Growing Tomato guide?',
        'Safety of Mango trees?',
        'Soil for Coconut?',
        'Fertilizer for Banana?'
      ],
      soil: [
        'How to improve red soil for banana crops?',
        'What nutrients does my soil need?',
        'How to test soil pH?',
        'How to improve soil fertility?'
      ],
      weather: [
        'Preparing for heavy rainfall?',
        'How does drought affect my crops?',
        'Frost protection methods?',
        'Weather-based farming decisions?'
      ],
      market: [
        'When is the best time to sell crops?',
        'Current market prices?',
        'Storage options for crops?',
        'Government farming subsidies?'
      ],
      pests: [
        'Pest control for Alphonso mango during flowering?',
        'Natural pest control methods?',
        'When to use pesticides?',
        'Common pests in my region?'
      ],
      irrigation: [
        'Water frequency for clay soil in high humidity?',
        'Best irrigation methods?',
        'Water conservation techniques?',
        'Drip irrigation setup?'
      ],
      equipment: [
        'Essential farming equipment?',
        'Equipment maintenance tips?',
        'Cost-effective machinery?',
        'Modern farming technology?'
      ]
    },

    // Advisory
    suggestedGuidance: "Suggested Guidance",
    iUnderstand: "I Understand",

    // Twin Clarification
    farmerDigitalTwin: "Intelligence Anchor",
    understandSituation: "Let me understand your situation better before you decide.",
    mainReason: "What is the main reason for this decision?",
    selectReason: "Select a reason",
    financialPressure: "Financial pressure",
    marketNews: "Market news or rumors",
    weatherConcerns: "Weather concerns",
    loanDebt: "Loan or debt obligation",
    notSure: "Not fully sure",
    howConfident: "How confident do you feel right now?",
    helpClarify: "Help Me Clarify",

    // Doubt Card
    askYourTwin: "Consult Wisdom Core",
    askAnything: "You can ask me anything about your decision. I will explain calmly.",
    typeDoubt: "Type your doubt here (e.g., Is it risky to sell now?)",
    askDigitalTwin: "Ask Digital Twin",
    digitalTwinWisdom: "Digital Twin Wisdom",
    decisionConfidence: "Decision Confidence",
    recommendedToday: "Recommended Today",
    betterToAvoid: "Better to Avoid",
    emotionAwareAnalysis: "Emotion-Aware Analysis",
    stressAlert: "Stress-Alert",
    feeling: "Feeling",

    // What-If Future View
    whatif: {
      title: "Two Possible Futures",
      pathNow: "If you act now",
      pathWait: "If you wait a little",
      continue: "Continue with Decision",
      seeWhatIf: "See What-If View"
    },

    // Common
    common: {
      back: "Back"
    },

    // Smart Actions
    smartActions: {
      title: "Choose Your Next Action",
      subtitle: "Select a module to command your digital farm",
      enterWorld: "Enter Smart World",
      enterWorldDesc: "Interactive Farm Visualization",
      sellCrop: "Sell Crop Now",
      sellCropDesc: "Get cash from harvest",
      buyFertilizer: "Buy Fertilizer",
      buyFertilizerDesc: "Invest in your farm",
      waitObserve: "Wait & Observe",
      waitObserveDesc: "Monitor and plan",
      aiAssistant: "AI Assistant",
      aiAssistantDesc: "Chat with Farmer AI",
      askTwin: "Ask Digital Twin",
      askTwinDesc: "Get expert advice",
      whatIfView: "What-If View"
    },

    // Simulations
    simulations: {
      title: "AI-Powered Future Simulation",
      proceed: "Proceed with Action",
      marketPeaking: "Market Prices Peaking",
      timingOptimal: "Optimal Input Timing",
      weatherRisk: "Weather Risk Approaching",
      immediateCash: "High Immediate Cashflow",
      yieldBoost: "Long-term Yield Boost",
      riskMitigation: "Risk Mitigation",
      confidence: "Confidence",
      impact: "Impact",
      prediction: "Core Prediction"
    },

    // Overlay
    pauseMoment: "Let's pause for a moment",
    highStress: "You appear to be under high stress.",
    calmStep: "Let's take one calm step at a time.",
    continueCalmly: "Continue Calmly",

    // Global Voice Assistant
    voiceSystem: {
      greet: "Hello Farmer. I am your voice assistant. You can ask me farming questions or tell me to open dashboard modules.",
      listening: "Listening...",
      processing: "Processing...",
      notUnderstood: "I didn't quite catch that. Could you please repeat?",
      navigatingTo: "Opening [module] now.",
      repeatLast: "Repeating the last response.",
      slowDown: "I will speak more slowly now.",
      languageLocked: "Language set to English. Please speak in English.",
      modules: {
        aiFarmer: "Farm Assistant",
        cropAnalyzer: "Crop Scanner",
        marketPrices: "Market Prices",
        safetyTwin: "Safety Monitor",
        smartWorkspace: "Smart Workspace",
        expertSystem: "Expert System"
      },
      explanations: {
        aiFarmer: "The Farm Assistant is your AI companion for farming advice.",
        cropAnalyzer: "The Crop Scanner uses your camera to detect diseases.",
        marketPrices: "Market Prices shows current prices for your crops.",
        safetyTwin: "The Safety Monitor alerts you to intruders or fire.",
        smartWorkspace: "The Smart Workspace shows your farm map and weather.",
        expertSystem: "The Expert System helps with complex farming decisions."
      }
    },

    header: {
      systemOnline: "System: Online",
      accuracy: "Accuracy: 99%",
      statusGood: "Status: Good",
      signOut: "Sign Out",
      viewSettings: "View Settings",
      faceVerification: "Face Verification",
      verifiedFarmer: "Verified Farmer",
      login: "Login",
      register: "Register"
    },

    auth: {
      portalActive: "Institutional Portal Active",
      neuralEntrance: "Neural Entrance",
      identityCore: "Identity Core",
      registry: "Registry",
      linkVerification: "Link Verification",
      identifyEnrollment: "Institutional Identity Enrollment",
      initializeAccess: "Initialize Access Protocol",
      legalName: "Legal Name Registry",
      uplink: "Communication Uplink",
      passcode: "Secure Passcode",
      verifyPasscode: "Verify Passcode",
      simpleFarmerVoice: "Simple Farmer Voice Access",
      newProfile: "Initialize New Standard Profile",
      verifyIdentity: "Identity Verification",
      tokenTransmitted: "Enter 6-digit secure token transmitted to your registered terminal.",
      verifyUplink: "Verify Uplink",
      abortProtocol: "Abort Access Protocol",
      trustMatrix: "Establishing Field Uplink...",
      resendSequence: "Resend Encryption Sequence",
      retryIn: "Retry Transmission in [s]s",
      biometricLayer: "Secure your identity baseline with biological heuristic enrollment.",
      enrollId: "Enroll ID",
      establishLink: "Establish Link",
      baselineTrust: "Establishing Baseline Trust..."
    },

    security: {
      title: "Safety Monitor",
      subtitle: "Alerts & Security",
      intruderAlert: "Intruder Alert",
      fireAlert: "Fire Detection",
      motionDetected: "Motion Detected",
      systemArmed: "System Armed",
      allSafe: "All Systems Normal"
    },

    cropScanner: {
      title: "Crop Scanner",
      subtitle: "Disease Detection",
      analyzeLeaf: "Analyze Leaf",
      detected: "Detected Disease",
      treatment: "Recommended Treatment",
      takePhoto: "Take a Photo",
      uploadPhoto: "Upload Photo",
      scanning: "Scanning Crop Health..."
    },

    // Farmer Insight Hub
    featureHub: {
      iconLabel: "Farmer Insight",
      seasonGuardian: "Season Guardian Mode",
      seasonGuardianDesc: "Real-time analysis of crop risk & actions based on verified institutional rules.",
      fieldMemory: "Field Memory Replay",
      fieldMemoryDesc: "Recall lessons from your past seasons to improve current choices.",
      decisionConfidence: "Decision Confidence",
      decisionConfidenceDesc: "Truth-based signals showing if a choice is safe or risky.",
      noData: "Reliable data is currently unavailable for this context.",
      riskLevel: {
        safe: "Safe",
        caution: "Caution",
        highRisk: "High Risk"
      },
      selectDistrict: "Select District",
      weatherTitle: "Real-Time Weather",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      temp: "Temperature",
      condition: "Condition",
      districts: {
        ariyalur: "Ariyalur",
        chengalpattu: "Chengalpattu",
        chennai: "Chennai",
        coimbatore: "Coimbatore",
        cuddalore: "Cuddalore",
        dharmapuri: "Dharmapuri",
        dindigul: "Dindigul",
        erode: "Erode",
        kallakurichi: "Kallakurichi",
        kanchipuram: "Kanchipuram",
        kanyakumari: "Kanyakumari",
        karur: "Karur",
        krishnagiri: "Krishnagiri",
        madurai: "Madurai",
        mayiladuthurai: "Mayiladuthurai",
        nagapattinam: "Nagapattinam",
        namakkal: "Namakkal",
        nilgiris: "Nilgiris",
        perambalur: "Perambalur",
        pudukkottai: "Pudukkottai",
        ramanathapuram: "Ramanathapuram",
        ranipet: "Ranipet",
        salem: "Salem",
        sivaganga: "Sivaganga",
        tenkasi: "Tenkasi",
        thanjavur: "Thanjavur",
        theni: "Theni",
        thoothukudi: "Thoothukudi",
        tiruchirappalli: "Tiruchirappalli",
        tirunelveli: "Tirunelveli",
        tirupathur: "Tirupathur",
        tiruppur: "Tiruppur",
        tiruvallur: "Tuvallur",
        tiruvannamalai: "Tiruvannamalai",
        tiruvarur: "Tiruvarur",
        vellore: "Vellore",
        viluppuram: "Viluppuram",
        virudhunagar: "Virudhunagar"
      },
      selectTown: "Select Town",
      towns: {
        ariyalur: "Ariyalur", udayarpalayam: "Udayarpalayam", sendurai: "Sendurai", andimadam: "Andimadam", jayankondam: "Jayankondam",
        chengalpattu: "Chengalpattu", maduranthakam: "Madhurantakam", tambaram: "Tambaram", pallavaram: "Pallavaram", vandalur: "Vandalur", tirukalukundram: "Tirukalukundram", chengalpattu_rural: "Chengalpattu Rural", seiyur: "Seiyur",
        adyar: "Adyar", ambattur: "Ambattur", annanagar: "Anna Nagar", teynampet: "Teynampet", mylapore: "Mylapore", perambur: "Perambur", guindy: "Guindy", velachery: "Velachery", egmore: "Egmore", royapuram: "Royapuram", tondiarpet: "Tondiarpet",
        coimbatore_north: "Coimbatore North", coimbatore_south: "Coimbatore South", pollachi: "Pollachi", mettupalayam: "Mettupalayam", valparai: "Valparai", sulur: "Sulur", perur: "Perur", annur: "Annur", madukkarai: "Madukkarai", kinathukadavu: "Kinathukadavu",
        cuddalore: "Cuddalore", chidambaram: "Chidambaram", panruti: "Panruti", vriddhachalam: "Vriddhachalam", neyveli: "Neyveli", kurinjipadi: "Kurinjipadi", titakudi: "Titakudi", kattumannarkoil: "Kattumannarkoil", bhuvanagiri: "Bhuvanagiri",
        dharmapuri: "Dharmapuri", harur: "Harur", palacode: "Palacode", pennagaram: "Pennagaram", pappireddipatti: "Pappireddipatti", nallampalli: "Nallampalli", karimangalam: "Karimangalam",
        dindigul: "Dindigul", palani: "Palani", kodaikanal: "Kodaikanal", oddanchatram: "Oddanchatram", vedasandur: "Vedasandur", natham: "Natham", atloor: "Atloor", nilakottai: "Nilakottai", kodai_road: "Kodai Road",
        erode: "Erode", bhavani: "Bhavani", gobichettipalayam: "Gobichettipalayam", perundurai: "Perundurai", sathyamangalam: "Sathyamangalam", kodumudi: "Kodumudi", modakkurichi: "Modakkurichi", anthiyur: "Anthiyur", nambiyur: "Nambiyur",
        kallakurichi: "Kallakurichi", tirukkoyilur: "Tirukkoyilur", sankarapuram: "Sankarapuram", ulundurpet: "Ulundurpet", kalrayan_hills: "Kalrayan Hills", chinnasalem: "Chinnasalem",
        kanchipuram: "Kanchipuram", sriperumbudur: "Sriperumbudur", walajabad: "Walajabad", kundrathur: "Kundrathur", uthiramerur: "Uthiramerur",
        nagercoil: "Nagercoil", padmanabhapuram: "Padmanabhapuram", kuzhithurai: "Kuzhithurai", colachel: "Colachel", thovalai: "Thovalai", agastheeswaram: "Agastheeswaram", killiyoor: "Killiyoor", vilavancode: "Vilavancode",
        karur: "Karur", kulithalai: "Kulithalai", aravakurichi: "Aravakurichi", krishnarayapuram: "Krishnarayapuram", manmangalam: "Manmangalam", pugalur: "Pugalur",
        krishnagiri: "Krishnagiri", hosur: "Hosur", denkanikottai: "Denkanikottai", pochampalli: "Pochampalli", uthangarai: "Uthangarai", shoolagiri: "Shoolagiri", bargur: "Bargur", kelamangalam: "Kelamangalam",
        madurai_north: "Madurai North", madurai_south: "Madurai South", madurai_central: "Madurai Central", madurai_east: "Madurai East", madurai_west: "Madurai West", melur: "Melur", thirumangalam: "Thirumangalam", usilampatti: "Usilampatti", vadipatti: "Vadipatti", thiruparankundram: "Thiruparankundram", peraiyur: "Peraiyur",
        mayiladuthurai: "Mayiladuthurai", sirkazhi: "Sirkazhi", kuthalam: "Kuthalam", tharangambadi: "Tharangambadi",
        nagapattinam: "Nagapattinam", vedaranyam: "Vedaranyam", kilvelur: "Kilvelur", thiruvenkadu: "Thiruvenkadu", nagore: "Nagore", thirumarugal: "Thirumarugal",
        namakkal: "Namakkal", tiruchengode: "Tiruchengode", rasipuram: "Rasipuram", paramathi_velur: "Paramathi Velur", kumarapalayam: "Kumarapalayam", senthamangalam: "Senthamangalam", kolli_hills: "Kolli Hills", mohanur: "Mohanur",
        ooty: "Ooty", coonoor: "Coonoor", gudalur: "Gudalur", kotagiri: "Kotagiri", kundah: "Kundah", pandalur: "Pandalur",
        perambalur: "Perambalur", veppanthattai: "Veppanthattai", kunnam: "Kunnam", alathur: "Alathur",
        pudukkottai: "Pudukkottai", aranthangi: "Aranthangi", illuppur: "Illuppur", gandarvakottai: "Gandarvakottai", viralimalai: "Viralimalai", avudaiyarkoil: "Avudaiyarkoil", karambakudi: "Karambakudi", kulathur: "Kulathur", ponnamaravathi: "Ponnamaravathi", tirumayam: "Tirumayam",
        ramanathapuram: "Ramanathapuram", rameshwaram: "Rameshwaram", paramakudi: "Paramakudi", mudukulathur: "Mudukulathur", tiruvadanai: "Tiruvadanai", kadaladi: "Kadaladi", kamuthi: "Kamuthi", keelakarai: "Keelakarai", rajasingamangalam: "Rajasingamangalam",
        ranipet: "Ranipet", arakkonam: "Arakkonam", arcot: "Arcot", walajah: "Walajah", nemili: "Nemili", sholinghur: "Sholinghur",
        salem: "Salem", attur: "Attur", mettur: "Mettur", omalur: "Omalur", sankari: "Sankari", edappadi: "Edappadi", gangavalli: "Gangavalli", kadaiyampatti: "Kadaiyampatti", pethanaickenpalayam: "Pethanaickenpalayam", valapady: "Valapady", yercaud: "Yercaud",
        sivaganga: "Sivaganga", karaikudi: "Karaikudi", manamadurai: "Manamadurai", devakottai: "Devakottai", kalayarkoil: "Kalayarkoil", ilayangudi: "Ilayangudi", singampunari: "Singampunari", thiruppuvanam: "Thiruppuvanam", tirupathur_sivaganga: "Tirupathur",
        tenkasi: "Tenkasi", sankarankovil: "Sankarankovil", shenkottai: "Shenkottai", alangulam: "Alangulam", kadayanallur: "Kadayanallur", sivagiri: "Sivagiri", thiruvengadam: "Thiruvengadam", veorakeralampudur: "Veerakeralampudur",
        thanjavur: "Thanjavur", kumbakonam: "Kumbakonam", pattukkottai: "Pattukkottai", orathanadu: "Orathanadu", thiruvaiyaru: "Thiruvaiyaru", budalur: "Budalur", peravurani: "Peravurani", thiruvidaimarudur: "Thiruvidaimarudur", thiruvonam: "Thiruvonam",
        theni: "Theni", periyakulam: "Periyakulam", bodinayakanur: "Bodinayakanur", cumbum: "Cumbum", uthamapalayam: "Uthamapalayam", andipatti: "Andipatti",
        thoothukudi: "Thoothukudi", kovilpatti: "Kovilpatti", tiruchendur: "Tiruchendur", ettayapuram: "Ettayapuram", vilathikulam: "Vilathikulam", kayathar: "Kayathar", othapidaram: "Othapidaram", srivaikuntam: "Srivaikuntam", tiruchendur_rural: "Tiruchendur Rural", sattankulam: "Sattankulam",
        trichy: "Trichy", manapparai: "Manapparai", lalgudi: "Lalgudi", musiri: "Musiri", thuraiyur: "Thuraiyur", manachanallur: "Manachanallur", srirangam: "Srirangam", thiruverumbur: "Thiruverumbur", marungapuri: "Marungapuri", thottiyam: "Thottiyam",
        tirunelveli: "Tirunelveli", ambasamudram: "Ambasamudram", nanguneri: "Nanguneri", palayamkottai: "Palayamkottai", radhapuram: "Radhapuram", cheranmahadevi: "Cheranmahadevi", manur: "Manur", tisayanvilai: "Tisayanvilai",
        tirupathur: "Tirupathur", vaniyambadi: "Vaniyambadi", ambur: "Ambur", natrampalli: "Natrampalli",
        tiruppur: "Tiruppur", dharapuram: "Dharapuram", kangeyam: "Kangeyam", udumalaipettai: "Udumalaipettai", palladam: "Palladam", avinashi: "Avinashi", madathukulam: "Madathukulam", uthukuli: "Uthukuli",
        tiruvallur: "Tiruvallur", avadi: "Avadi", poonamallee: "Poonamallee", ponneri: "Ponneri", gummidipoondi: "Gummidipoondi", tiruttani: "Tiruttani", ambattur_tiruvallur: "Ambattur", madhavaram: "Madhavaram", maduravoyal: "Maduravoyal",
        tiruvannamalai: "Tiruvannamalai", arani: "Arani", cheyyar: "Cheyyar", polur: "Polur", chengam: "Chengam", kalasapakkam: "Kalasapakkam", kilpennathur: "Kilpennathur", thandarampattu: "Thandarampattu", vandavasi: "Vandavasi",
        tiruvarur: "Tiruvarur", mannargudi: "Mannargudi", thiruthuraipoondi: "Thiruthuraipoondi", nannilam: "Nannilam", kodavasal: "Kodavasal", needamangalam: "Needamangalam", thiruvidavasal: "Thiruvidavasal", valangaiman: "Valangaiman",
        vellore: "Vellore", katpadi: "Katpadi", gudiyatham: "Gudiyatham", pernambut: "Pernambut", anaicut: "Anaicut", vaniyambadi_vellore: "Vaniyambadi",
        viluppuram: "Viluppuram", tindivanam: "Tindivanam", vikravandi: "Vikravandi", gingee: "Gingee", kandamangalam: "Kandamangalam", marakkanam: "Marakkanam", mugaiyur: "Mugaiyur", thiruvennainallur: "Thiruvennainallur", vanur: "Vanur",
        virudhunagar: "Virudhunagar", sivakasi: "Sivakasi", rajapalayam: "Rajapalayam", aruppukkottai: "Aruppukkottai", sattur: "Sattur", kariyapatti: "Kariyapatti", tiruchuli: "Tiruchuli", watrap: "Watrap", vembakottai: "Vembakottai"
      }
    }
  },

  hi: {
    // Header
    title: "किसान डिजिटल ट्विन",
    subtitle: "शांत मार्गदर्शन। सुरक्षित निर्णय।",

    // Language selector
    selectLanguage: "भाषा",

    // Current State
    currentState: "आपकी वर्तमान स्थिति",
    emotionalState: "भावनात्मक स्थिति",
    stress: "तनाव",
    decisionReadiness: "निर्णय तत्परता",
    confidenceTrend: "आत्मविश्वास प्रवृत्ति",
    evidence: "साक्ष्य",
    moderate: "मध्यम",
    stable: "स्थिर",
    declining: "गिर रहा",
    improving: "सुधर रहा",
    low: "कम",
    high: "उच्च",
    needsCaution: "सावधानी की आवश्यकता",
    unclear: "अस्पष्ट",

    // Decision Selection
    whatPlanning: "आप क्या करने की योजना बना रहे हैं?",
    sellCrop: "अभी फसल बेचें",
    buyFertilizer: "उर्वरक / इनपुट खरीदें",
    waitObserve: "प्रतीक्षा करें और देखें",
    aiFarmer: "एआई किसान सहायक",
    aiFarmerDesc: "विशेषज्ञ खेती सलाह",
    aiSubtitle: "विशेषज्ञ ज्ञान और व्यक्तिगत सलाह के साथ आपका बुद्धिमान खेती साथी",

    // AI Farmer Topics
    selectTopic: "एक विषय चुनें",
    quickQ: {
      general: [
        'सामान्य खेती के तरीके क्या हैं?',
        'फसल प्रबंधन कैसे करें?',
        'मिट्टी की सेहत कैसे सुधारें?',
        'क्या आज बारिश होगी?',
        'बाजार भाव क्या हैं?',
        'कीट नियंत्रण कैसे करें?',
        'सिंचाई के सर्वोत्तम तरीके?'
      ],
      crops: [
        'बासमती चावल की पैदावार कैसे बढ़ाएं?',
        'धान की खेती के लिए सलाह?',
        'टमाटर उगाने की गाइड?',
        'आम के पेड़ की सुरक्षा?',
        'नारियल के लिए मिट्टी?',
        'केले के लिए उर्वरक?'
      ],
      soil: [
        'केले की फसल के लिए लाल मिट्टी में सुधार कैसे करें?',
        'मेरी मिट्टी को किन पोषक तत्वों की आवश्यकता है?',
        'मिट्टी के पीएच का परीक्षण कैसे करें?',
        'मिट्टी की उर्वरता में कैसे सुधार करें?'
      ],
      weather: [
        'भारी वर्षा की तैयारी?',
        'सूखा मेरी फसलों को कैसे प्रभावित करता है?',
        'पाले से सुरक्षा के तरीके?',
        'मौसम आधारित कृषि निर्णय?'
      ],
      market: [
        'फसल बेचने का सबसे अच्छा समय कब है?',
        'वर्तमान बाजार भाव?',
        'फसलों के लिए भंडारण विकल्प?',
        'सरकारी खेती सब्सिडी?'
      ],
      pests: [
        'फूल आने के दौरान अल्फांसो आम के लिए कीट नियंत्रण?',
        'प्राकृतिक कीट नियंत्रण के तरीके?',
        'कीटनाशकों का उपयोग कब करें?',
        'मेरे क्षेत्र में आम कीट?'
      ],
      irrigation: [
        'उच्च आर्द्रता में मिट्टी के लिए पानी की आवृत्ति?',
        'सिंचाई के सर्वोत्तम तरीके?',
        'जल संरक्षण तकनीक?',
        'ड्रिप सिंचाई सेटअप?'
      ],
      equipment: [
        'आवश्यक कृषि उपकरण?',
        'उपकरण रखरखाव युक्तियाँ?',
        'लागत प्रभावी मशीनरी?',
        'आधुनिक कृषि तकनीक?'
      ]
    },

    // AI Farmer UI
    askQuestion: "अपना प्रश्न पूछें",
    askPlaceholder: "मुझसे कुछ भी पूछें",
    thinking: "सोच रहा हूँ...",
    askBtn: "एआई किसान से पूछें",
    quickQTitle: "त्वरित प्रश्न:",
    aiResponse: "एआई किसान उत्तर",
    aiCapabilities: "एआई क्षमताएं",
    backToMain: "← मुख्य पृष्ठ पर वापस जाएं",
    listening: "सुन रहा हूँ...",
    tapToSpeak: "बोलने के लिए टैप करें",

    // Capabilities
    capTitle: {
      expert: "विशेषज्ञ ज्ञान",
      regional: "क्षेत्रीय अनुकूलन",
      data: "डेटा-संचालित",
      chat: "संवादी",
      learn: "निरंतर सीखना",
      realtime: "वास्तविक समय समर्थन"
    },
    capDesc: {
      expert: "व्यापक खेती डेटाबेस और सर्वोत्तम प्रथाओं तक पहुंच",
      regional: "आपके स्थान, जलवायु और फसल प्रकारों के अनुरूप सलाह",
      data: "वैज्ञानिक अनुसंधान और वास्तविक डेटा पर आधारित सिफारिशें",
      chat: "आसान संचार के लिए प्राकृतिक भाषा इंटरफ़ेस",
      learn: "एआई प्रत्येक बातचीत और नए शोध के साथ सुधार करता है",
      realtime: "तत्काल खेती प्रश्नों के लिए 24/7 उपलब्धता"
    },

    // Storage Finder
    findStorage: "निकटतम भंडारण खोजें",
    storageDesc: "अपनी फसलों को स्टोर करने के लिए अपने पास सत्यापित कोल्ड स्टोरेज और गोदामों का पता लगाएं।",
    useMyLocation: "भंडारण खोजने के लिए मेरे स्थान का उपयोग करें",
    closeMap: "मानचित्र बंद करें",
    getDirections: "दिशा-निर्देश और मार्ग प्राप्त करें",
    digitalTwinWisdom: "डिजिटल ट्विन ज्ञान",
    decisionConfidence: "निर्णय आत्मविश्वास",
    recommendedToday: "आज के लिए अनुशंसित",
    betterToAvoid: "बचने के लिए बेहतर",
    emotionAwareAnalysis: "भावनात्मक विश्लेषण",
    stressAlert: "तनाव-अलर्ट",
    // Smart Actions
    smartActions: {
      title: "अपनी अगली कार्रवाई चुनें",
      subtitle: "अपने डिजिटल फार्म को प्रबंधित करने के लिए एक मॉड्यूल चुनें",
      enterWorld: "स्मार्ट वर्ल्ड में प्रवेश करें",
      enterWorldDesc: "इंटरैक्टिव फार्म विज़ुअलाइज़ेशन",
      sellCrop: "अभी फसल बेचें",
      sellCropDesc: "कटाई से नकद प्राप्त करें",
      buyFertilizer: "उर्वरक खरीदें",
      buyFertilizerDesc: "अपने फार्म में निवेश करें",
      waitObserve: "प्रतीक्षा करें और देखें",
      waitObserveDesc: "निगरानी और योजना",
      aiAssistant: "एआई सहायक",
      aiAssistantDesc: "किसान एआई के साथ चैट करें",
      askTwin: "डिजिटल ट्विन से पूछें",
      askTwinDesc: "विशेषज्ञ सलाह लें",
      whatIfView: "व्हाट-इफ (What-If) दृश्य"
    },

    // Simulations
    simulations: {
      title: "एआई-संचालित भविष्य सिमुलेशन",
      proceed: "कार्रवाई के ساتھ आगे बढ़ें",
      marketPeaking: "बाजार कीमतें चरम पर हैं",
      timingOptimal: "इनपुट के लिए इष्टतम समय",
      weatherRisk: "मौसम का जोखिम निकट है",
      immediateCash: "उच्च तत्काल नकदी प्रवाह",
      yieldBoost: "दीर्घकालिक पैदावार में वृद्धि",
      riskMitigation: "जोखिम शमन",
      confidence: "आत्मविश्वास",
      impact: "प्रभाव",
      prediction: "मुख्य भविष्यवाणी"
    },

    feeling: "महसूस कर रहा हूँ",
  },

  es: {
    // Header
    title: "Gemelo Digital del Agricultor",
    subtitle: "Orientación tranquila. Decisiones más seguras.",

    // Language selector
    selectLanguage: "Idioma",

    // Current State
    currentState: "Tu Estado Actual",
    emotionalState: "Estado Emocional",
    stress: "Estrés",
    decisionReadiness: "Preparación para Decidir",
    confidenceTrend: "Tendencia de Confianza",
    evidence: "Evidencia",
    moderate: "Moderado",
    stable: "Estable",
    declining: "En Declive",
    improving: "Mejorando",
    low: "Bajo",
    high: "Alto",
    needsCaution: "Necesita Precaución",
    unclear: "Poco Claro",

    // Decision Selection
    whatPlanning: "¿Qué estás planeando hacer?",
    sellCrop: "Vender Cultivo Ahora",
    buyFertilizer: "Comprar Fertilizante / Insumos",
    waitObserve: "Esperar y Observar",

    // Advisory
    suggestedGuidance: "Orientación Sugerida",
    iUnderstand: "Entiendo",

    // Twin Clarification
    farmerDigitalTwin: "Gemelo Digital del Agricultor",
    understandSituation: "Déjame entender mejor tu situación antes de que decidas.",
    mainReason: "¿Cuál es la razón principal de esta decisión?",
    selectReason: "Selecciona una razón",
    financialPressure: "Presión financiera",
    marketNews: "Noticias o rumores del mercado",
    weatherConcerns: "Preocupaciones climáticas",
    loanDebt: "Obligación de préstamo o deuda",
    notSure: "No estoy completamente seguro",
    howConfident: "¿Qué tan seguro te sientes ahora?",
    helpClarify: "Ayúdame a Aclarar",

    // Doubt Card
    askYourTwin: "Pregunta a Tu Gemelo Digital",
    askAnything: "Puedes preguntarme cualquier cosa sobre tu decisión. Te explicaré con calma.",
    typeDoubt: "Escribe tu duda aquí (ej: ¿Es riesgoso vender ahora?)",
    askDigitalTwin: "Preguntar al Gemelo Digital",

    // Overlay
    pauseMoment: "Hagamos una pausa por un momento",
    highStress: "Pareces estar bajo mucho estrés.",
    calmStep: "Demos un paso tranquilo a la vez.",
    continueCalmly: "Continuar con Calma"
  },

  fr: {
    // Header
    title: "Jumeau Numérique de l'Agriculteur",
    subtitle: "Conseil calme. Décisions plus sûres.",

    // Language selector
    selectLanguage: "Langue",

    // Current State
    currentState: "Votre État Actuel",
    emotionalState: "État Émotionnel",
    stress: "Stress",
    decisionReadiness: "Préparation à la Décision",
    confidenceTrend: "Tendance de Confiance",
    evidence: "Preuve",
    moderate: "Modéré",
    stable: "Stable",
    declining: "En Baisse",
    improving: "En Amélioration",
    low: "Faible",
    high: "Élevé",
    needsCaution: "Nécessite de la Prudence",
    unclear: "Peu Claire",

    // Decision Selection
    whatPlanning: "Que prévoyez-vous de faire?",
    sellCrop: "Vendre la Récolte Maintenant",
    buyFertilizer: "Acheter des Engrais / Intrants",
    waitObserve: "Attendre et Observer",

    // Advisory
    suggestedGuidance: "Conseil Suggéré",
    iUnderstand: "Je Comprends",

    // Twin Clarification
    farmerDigitalTwin: "Jumeau Numérique de l'Agriculteur",
    understandSituation: "Laissez-moi mieux comprendre votre situation avant que vous ne décidiez.",
    mainReason: "Quelle est la raison principale de cette décision?",
    selectReason: "Sélectionnez une raison",
    financialPressure: "Pression financière",
    marketNews: "Nouvelles ou rumeurs du marché",
    weatherConcerns: "Préoccupations météorologiques",
    loanDebt: "Obligation de prêt ou de dette",
    notSure: "Pas tout à fait sûr",
    howConfident: "À quel point vous sentez-vous confiant maintenant?",
    helpClarify: "Aidez-moi à Clarifier",

    // Doubt Card
    askYourTwin: "Demandez à Votre Jumeau Numérique",
    askAnything: "Vous pouvez me demander n'importe quoi sur votre décision. Je vais expliquer calmement.",
    typeDoubt: "Tapez votre doute ici (ex: Est-il risqué de vendre maintenant?)",
    askDigitalTwin: "Demander au Jumeau Numérique",

    // Overlay
    pauseMoment: "Faisons une pause un instant",
    highStress: "Vous semblez être sous un stress élevé.",
    calmStep: "Prenons une étape calme à la fois.",
    continueCalmly: "Continuer Calmement"
  },

  ta: {
    // Header
    title: "விவசாய அறிவு மையம்",
    subtitle: "அமைதியான வழிகாட்டுதல். நிறுவன துல்லியம்.",

    // Language selector
    selectLanguage: "மொழி",

    // Current State
    currentState: "உங்கள் தற்போதைய நிலை",
    emotionalState: "உணர்ச்சி நிலை",
    stress: "மன அழுத்தம்",
    decisionReadiness: "முடிவெடுக்கும் தயார்நிலை",
    confidenceTrend: "நம்பிக்கை போக்கு",
    evidence: "சான்று",
    moderate: "மிதமான",
    stable: "நிலையான",
    declining: "குறைந்து வருகிறது",
    improving: "மேம்படுகிறது",
    low: "குறைந்த",
    high: "உயர்ந்த",
    needsCaution: "கவனம் தேவை",
    unclear: "தெளிவற்ற",

    // Decision Selection
    whatPlanning: "நீங்கள் என்ன செய்ய திட்டமிடுகிறீர்கள்?",
    sellCrop: "இப்போது பயிரை விற்க",
    buyFertilizer: "உரம் / உள்ளீடுகள் வாங்க",
    waitObserve: "காத்திரு மற்றும் கவனி",
    aiFarmer: "AI விவசாய உதவியாளர்",
    aiSubtitle: "நிபுணர் அறிவு மற்றும் தனிப்பயனாக்கப்பட்ட ஆலோசனையுடன் உங்கள் புத்திசாலி விவசாயத் தோழன்",
    aiFarmerDesc: "நிபுணர் விவசாய ஆலோசனை",

    // AI Farmer Topics
    selectTopic: "ஒரு தலைப்பைத் தேர்ந்தெடுக்கவும்",
    quickQ: {
      general: [
        'பொதுவான விவசாய முறைகள்?',
        'பயிர் மேலாண்மை வழிகாட்டுதல்?',
        'மண் ஆரோக்கியத்தை மேம்படுத்துவது எப்படி?',
        'இன்று மழை பெய்யுமா?',
        'சந்தை விலை நிலவரம் என்ன?',
        'பூச்சி கட்டுப்பாடு முறைகள்?',
        'சிறந்த நீர்ப்பாசன முறைகள்?'
      ],
      crops: [
        'பாசுமதி நெல்லின் மகசூலை அதிகரிப்பது எப்படி?',
        'நெல் விவசாயத்திற்கான ஆலோசனை?',
        'தக்காளி வளர்க்கும் வழிகாட்டி?',
        'மா மரங்களின் பாதுகாப்பு?',
        'தென்னைக்கு ஏற்ற மண்?',
        'வாழைக்கு உரம்?',
        'எனது பயிர்களை எப்போது அறுவடை செய்ய வேண்டும் என்று எனக்கு எப்படித் தெரியும்?',
        'பயிர் நோய்களின் அறிகுறிகள் என்ன?',
        'பயிர் விளைச்சலை எவ்வாறு மேம்படுத்துவது?'
      ],
      soil: [
        'வாழைப் பயிருக்கு செம்மண்ணை மேம்படுத்துவது எப்படி?',
        'எனது மண்ணுக்கு என்ன ஊட்டச்சத்துக்கள் தேவை?',
        'மண் pH-ஐ எவ்வாறு சோதிப்பது?',
        'மண் வளத்தை எவ்வாறு மேம்படுத்துவது?'
      ],
      weather: [
        'கனமழைக்குத் தயாராகுதல்?',
        'வறட்சி எனது பயிர்களை எவ்வாறு பாதிக்கிறது?',
        'பனி பாதுகாப்பு முறைகள்?',
        'வானிலை சார்ந்த விவசாய முடிவுகள்?'
      ],
      market: [
        'பயிர்களை விற்க சிறந்த நேரம் எது?',
        'தற்போதைய சந்தை விலைகள்?',
        'பயிர்களுக்கான சேமிப்பு விருப்பங்கள்?',
        'அரசு விவசாய மானியங்கள்?'
      ],
      pests: [
        'பூக்கும் காலத்தில் அல்போன்சா மாம்பழத்திற்கான பூச்சி கட்டுப்பாடு?',
        'இயற்கை பூச்சி கட்டுப்பாடு முறைகள்?',
        'பூச்சிக்கொல்லிகளை எப்போது பயன்படுத்த வேண்டும்?',
        'எனது பகுதியில் பொதுவான பூச்சிகள்?'
      ],
      irrigation: [
        'அதிக ஈரப்பதத்தில் களிமண்ணிற்கான நீர் அதிவெண்?',
        'சிறந்த நீர்ப்பாசன முறைகள்?',
        'நீர் பாதுகாப்பு நுட்பங்கள்?',
        'சொட்டு நீர் பாசன அமைப்பு?'
      ],
      equipment: [
        'அத்தியாவசிய விவசாய உபகரணங்கள்?',
        'உபகரணங்கள் பராமரிப்பு குறிப்புகள்?',
        'சிக்கனமான இயந்திரங்கள்?',
        'நவீன விவசாய தொழில்நுட்பம்?'
      ]
    },

    // AI Farmer UI
    askQuestion: "உங்கள் கேள்வியைக் கேளுங்கள்",
    askPlaceholder: "எது பற்றியும் என்னிடம் கேட்கலாம்",
    thinking: "சிந்திக்கிறது...",
    askBtn: "AI விவசாயியிடம் கேளுங்கள்",
    quickQTitle: "விரைவு கேள்விகள்:",
    aiResponse: "AI விவசாயி பதில்",
    aiCapabilities: "AI திறன்கள்",
    backToMain: "முதன்மை பக்கத்திற்கு",
    listening: "கேட்கிறது...",
    tapToSpeak: "பேச தட்டவும்",

    // Capabilities
    capTitle: {
      expert: "நிபுணர் அறிவு",
      regional: "பிராந்திய தழுவல்",
      data: "தரவு சார்ந்த",
      chat: "உரையாடல்",
      learn: "தொடர் கற்றல்",
      realtime: "நிகழ்நேர ஆதரவு"
    },
    capDesc: {
      expert: "விரிவான விவசாய தரவுத்தளம் மற்றும் சிறந்த நடைமுறைகளுக்கான அணுகல்",
      regional: "உங்கள் இடம், காலநிலை மற்றும் பயிர் வகைகளுக்கு ஏற்ப ஆலோசனை",
      data: "அறிவியல் ஆராய்ச்சி மற்றும் உண்மைத் தரவுகளின் அடிப்படையில் பரிந்துரைகள்",
      chat: "எளிதான தகவல்தொடர்புக்கான இயற்கை மொழி இடைமுகம்",
      learn: "ஒவ்வொரு தொடர்பு மற்றும் புதிய ஆராய்ச்சியுடன் AI மேம்படுகிறது",
      realtime: "அவசர விவசாயக் கேள்விகளுக்கு 24/7 கிடைக்கும்"
    },

    // Modules
    modules: {
      aiFarmer: "பண்ணை உதவியாளர்",
      aiFarmerSub: "AI ஆலோசனை",
      aiFarmerDesc: "உங்கள் பண்ணை மற்றும் பயிர்களுக்கான தனிப்பயனாக்கப்பட்ட ஆலோசனையைப் பெறுங்கள்.",
      cropAnalyzer: "பயிர் ஸ்கேனர்",
      cropAnalyzerSub: "நோய் கண்டறிதல்",
      cropAnalyzerDesc: "பயிர் நோய்களைக் கண்டறிந்து சிகிச்சை பெற புகைப்படத்தை எடுக்கவும்.",
      voiceAssistant: "குரல் உதவியாளர்",
      voiceAssistantSub: "செயலியுடன் பேசுங்கள்",
      voiceAssistantDesc: "உங்கள் குரலைப் பயன்படுத்தி செயலியை கட்டுப்படுத்தவும் மற்றும் பதில்களைப் பெறவும்.",
      safetyTwin: "பாதுகாப்பு கண்காணிப்பு",
      safetyTwinSub: "எச்சரிக்கைகள் & பாதுகாப்பு",
      safetyTwinDesc: "பண்ணை பாதுகாப்பை கண்காணிக்கவும் மற்றும் ஊடுருவல் அல்லது தீ விபத்துக்கான எச்சரிக்கைகளைப் பெறவும்.",
      smartWorkspace: "ஸ்மார்ட் பணியிடம்",
      smartWorkspaceSub: "பண்ணை வரைபடம்",
      smartWorkspaceDesc: "வரைபடத்தில் உங்கள் பண்ணையைப் பார்க்கவும் மற்றும் வானிலை நிலவரங்களைச் சரிபார்க்கவும்.",
      expertSystem: "நிபுணர் அமைப்பு",
      expertSystemSub: "முடிவு ஆதரவு",
      expertSystemDesc: "முக்கியமான விவசாய முடிவுகளுக்கு உதவி பெறுங்கள்.",
      marketIntel: "சந்தை விலை",
      marketIntelSub: "விலை போக்குகள்",
      marketIntelDesc: "தற்போதைய சந்தை விலைகள் மற்றும் விலை முன்னறிவிப்புகளைச் சரிபார்க்கவும்."
    },

    // Smart Actions
    smartActions: {
      title: "உங்களின் அடுத்த நடவடிக்கையைத் தேர்ந்தெடுக்கவும்",
      subtitle: "உங்கள் டிஜிட்டல் பண்ணையை நிர்வகிக்க ஒரு தொகுதியைத் தேர்ந்தெடுக்கவும்",
      enterWorld: "ஸ்மார்ட் உலகிற்குள் நுழையுங்கள்",
      enterWorldDesc: "ஊடாடும் பண்ணை காட்சிப்படுத்தல்",
      sellCrop: "இப்போது பயிரை விற்க",
      sellCropDesc: "அறுவடையிலிருந்து பணம் பெறுங்கள்",
      buyFertilizer: "உரம் வாங்க",
      buyFertilizerDesc: "உங்கள் பண்ணையில் முதலீடு செய்யுங்கள்",
      waitObserve: "காத்திரு மற்றும் கவனி",
      waitObserveDesc: "கண்காணிக்கவும் மற்றும் திட்டமிடவும்",
      aiAssistant: "AI உதவியாளர்",
      aiAssistantDesc: "விவசாய AI உடன் அரட்டையடிக்கவும்",
      askTwin: "டிஜிட்டல் இரட்டையிடம் கேளுங்கள்",
      askTwinDesc: "நிபுணர் ஆலோசனையைப் பெறுங்கள்",
      whatIfView: "என்ன நடக்கும் (What-If) பார்வை"
    },

    // Simulations
    simulations: {
      title: "AI-இயக்கப்படும் எதிர்கால உருவகப்படுத்துதல்",
      proceed: "நடவடிக்கையைத் தொடரவும்",
      marketPeaking: "சந்தை விலைகள் உச்சத்தில் உள்ளன",
      timingOptimal: "உள்ளீட்டிற்கான உகந்த நேரம்",
      weatherRisk: "வானிலை அபாயம் நெருங்குகிறது",
      immediateCash: "உடனடி பணப்புழக்கம்",
      yieldBoost: "நீண்ட கால விளைச்சல் அதிகரிப்பு",
      riskMitigation: "இடர் தணிப்பு",
      confidence: "நம்பிக்கை",
      impact: "தாக்கம்",
      prediction: "முக்கிய கணிப்பு"
    },

    // What-If Future View
    whatif: {
      title: "இரண்டு சாத்தியமான எதிர்காலங்கள்",
      pathNow: "நீங்கள் இப்போது முடிவு எடுத்தால்",
      pathWait: "நீங்கள் சிறிது காலம் காத்திருந்தால்",
      continue: "முடிவுடன் தொடரவும்",
      seeWhatIf: "என்ன நடக்கும் என்று பார்க்கவும்",
      intro: "உங்கள் முடிவின் முடிவுகளை இங்கே காணலாம்:"
    },

    // Common
    common: {
      back: "திரும்பு"
    },

    // Advisory
    suggestedGuidance: "பரிந்துரைக்கப்பட்ட வழிகாட்டுதல்",
    iUnderstand: "எனக்கு புரிகிறது",

    // Doubt Card
    askYourTwin: "அறிவு மையத்திடம் ஆலோசிக்கவும்",
    askAnything: "உங்கள் முடிவு பற்றி எதையும் என்னிடம் கேட்கலாம். நான் அமைதியாக விளக்குவேன்.",
    typeDoubt: "உங்கள் சந்தேகத்தை இங்கே தட்டச்சு செய்யவும்",
    askDigitalTwin: "டிஜிட்டல் இரட்டையிடம் கேளுங்கள்",
    digitalTwinWisdom: "அறிவு மையத்தின் ஞானம்",
    decisionConfidence: "முடிவு நம்பிக்கை",
    recommendedToday: "இன்று பரிந்துரைக்கப்படுகிறது",
    betterToAvoid: "தவிர்ப்பது நல்லது",
    emotionAwareAnalysis: "உணர்ச்சி சார்ந்த பகுப்பாய்வு",
    stressAlert: "மன அழுத்த எச்சரிக்கை",
    feeling: "உணர்வு",

    // Overlay
    pauseMoment: "ஒரு கணம் நிறுத்துவோம்",
    highStress: "நீங்கள் அதிக மன அழுத்தத்தில் இருப்பதாகத் தெரிகிறது.",
    calmStep: "ஒரு நேரத்தில் ஒரு அமைதியான படி எடுப்போம்.",
    continueCalmly: "அமைதியாக தொடரவும்",

    // Global Voice Assistant
    voiceSystem: {
      greet: "வணக்கம் விவசாயியே. நான் உங்கள் குரல் உதவியாளர். நீங்கள் என்னிடம் விவசாயக் கேள்விகளைக் கேட்கலாம் அல்லது தொகுப்புகளைத் திறக்கச் சொல்லலாம்.",
      listening: "கேட்கிறது...",
      processing: "செயலாக்குகிறது...",
      notUnderstood: "மன்னிக்கவும், எனக்குப் புரியவில்லை. மீண்டும் சொல்ல முடியுமா?",
      navigatingTo: "[module] இப்போது திறக்கப்படுகிறது.",
      repeatLast: "கடைசிப் பதிலை மீண்டும் சொல்கிறேன்.",
      slowDown: "இப்போது நான் மெதுவாகப் பேசுவேன்.",
      languageLocked: "மொழி தமிழுக்கு மாற்றப்பட்டுள்ளது. தயவுசெய்து தமிழில் பேசவும்.",
      modules: {
        aiFarmer: "விவசாய உதவியாளர்",
        cropAnalyzer: "பயிர் ஸ்கேனர்",
        marketPrices: "சந்தை விலை",
        safetyTwin: "பண்ணை பாதுகாப்பு",
        smartWorkspace: "பண்ணை வரைபடம்",
        expertSystem: "நிபுணர் அமைப்பு"
      },
      explanations: {
        aiFarmer: "விவசாய உதவியாளர் என்பது விவசாய ஆலோசனைகளுக்கான உங்கள் AI துணை.",
        cropAnalyzer: "பயிர் ஸ்கேனர் நோய்களைக் கண்டறிய உங்கள் கேமராவைப் பயன்படுத்துகிறது.",
        marketPrices: "சந்தை விலை உங்கள் பயிர்களின் தற்போதைய விலையைக் காட்டுகிறது.",
        safetyTwin: "பாதுகாப்பு கண்காணிப்பு ஊடுருவல் அல்லது நெருப்பு பற்றி உங்களை எச்சரிக்கிறது.",
        smartWorkspace: "ஸ்மார்ட் பணியிடம் உங்கள் பண்ணை வரைபடம் மற்றும் வானிலையைக் காட்டுகிறது.",
        expertSystem: "நிபுணர் அமைப்பு சிக்கலான விவசாய முடிவுகளுக்கு உதவுகிறது."
      }
    },

    header: {
      systemOnline: "அமைப்பு: இயங்குகிறது",
      accuracy: "துல்லியம்: 99%",
      statusGood: "நிலை: நன்று",
      signOut: "வெளியேறு",
      viewSettings: "காட்சி அமைப்புகள்",
      faceVerification: "முக சரிபார்ப்பு",
      verifiedFarmer: "சரிபார்க்கப்பட்ட விவசாயி",
      login: "உள்நுழை",
      register: "பதிவு"
    },

    auth: {
      portalActive: "நிறுவன போர்டல் செயலில் உள்ளது",
      neuralEntrance: "அணுகல் நுழைவாயில்",
      identityCore: "அடையாள மையம்",
      registry: "பதிவேடு",
      linkVerification: "இணைப்பு சரிபார்ப்பு",
      identifyEnrollment: "நிறுவன அடையாளப் பதிவு",
      initializeAccess: "அணுகல் நெறிமுறையைத் தொடங்கு",
      legalName: "சட்டப்பூர்வ பெயர் பதிவு",
      uplink: "தொடர்பு இணைப்பு",
      passcode: "பாதுகாப்பான கடவுச்சொல்",
      verifyPasscode: "கடவுச்சொல்லைச் சரிபார்",
      simpleFarmerVoice: "எளிமையான விவசாயி குரல் அணுகல்",
      newProfile: "புதிய தரநிலை சுயவிவரத்தைத் தொடங்கு",
      verifyIdentity: "அடையாள சரிபார்ப்பு",
      tokenTransmitted: "உங்கள் பதிவு செய்யப்பட்ட மொபைலுக்கு அனுப்பப்பட்ட 6 இலக்க டோக்கனை உள்ளிடவும்.",
      verifyUplink: "இணைப்பைச் சரிபார்",
      abortProtocol: "அணுகல் நெறிமுறையை நிறுத்து",
      trustMatrix: "புல இணைப்பை நிறுவுகிறது...",
      resendSequence: "குறியாக்க வரிசையை மீண்டும் அனுப்பு",
      retryIn: "[s] விநாடிகளில் மீண்டும் முயற்சிக்கவும்",
      biometricLayer: "உயிரியல் அடையாளப் பதிவு மூலம் உங்கள் பாதுகாப்பை உறுதிப்படுத்தவும்.",
      enrollId: "அடையாளத்தைப் பதிவு செய்",
      establishLink: "இணைப்பை நிறுவு",
      baselineTrust: "அடிப்படை நம்பிக்கையை நிறுவுகிறது..."
    },

    security: {
      title: "பாதுகாப்பு கண்காணிப்பு",
      subtitle: "எச்சரிக்கைகள் மற்றும் பாதுகாப்பு",
      intruderAlert: "ஊடுருவல் எச்சரிக்கை",
      fireAlert: "தீ கண்டறிதல்",
      motionDetected: "இயக்கம் கண்டறியப்பட்டது",
      systemArmed: "அமைப்பு தயார் நிலையில் உள்ளது",
      allSafe: "அனைத்து அமைப்புகளும் சாதாரணமாக உள்ளன"
    },

    cropScanner: {
      title: "பயிர் ஸ்கேனர்",
      subtitle: "நோய் கண்டறிதல்",
      analyzeLeaf: "இலையை ஆய்வு செய்",
      detected: "கண்டறியப்பட்ட நோய்",
      treatment: "பரிந்துரைக்கப்பட்ட சிகிச்சை",
      takePhoto: "புகைப்படம் எடுக்கவும்",
      scanning: "பயிர் ஆரோக்கியத்தை ஆய்வு செய்கிறது..."
    },

    // Farmer Insight Hub
    featureHub: {
      iconLabel: "விவசாய நுண்ணறிவு",
      seasonGuardian: "பருவ பாதுகாப்பாளி முறை",
      seasonGuardianDesc: "நிறுவன விதிகள் அடிப்படையில் பயிர் அபாயம் மற்றும் செயல்களின் நிகழ்நேர பகுப்பாய்வு.",
      fieldMemory: "கள நினைவு மீள்வாசிப்பு",
      fieldMemoryDesc: "தற்போதைய தேர்வுகளை மேம்படுத்த உங்கள் கடந்த கால பாடங்களை நினைவுபடுத்துங்கள்.",
      decisionConfidence: "முடிவு நம்பிக்கை",
      decisionConfidenceDesc: "ஒரு தேர்வு பாதுகாப்பானதா அல்லது அபாயகரமானதா என்பதைக் காட்டும் உண்மை சார்ந்த சமிக்ஞைகள்.",
      noData: "இந்த சூழலுக்கு நம்பகமான தரவு தற்போது கிடைக்கவில்லை.",
      riskLevel: {
        safe: "பாதுகாப்பானது",
        caution: "எச்சரிக்கை",
        highRisk: "அதிக அபாயம்"
      },
      selectDistrict: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
      weatherTitle: "நிகழ்நேர வானிலை",
      humidity: "ஈரப்பதம்",
      windSpeed: "காற்றின் வேகம்",
      temp: "வெப்பநிலை",
      condition: "நிலை",
      districts: {
        ariyalur: "அரியலூர்",
        chengalpattu: "செங்கல்பட்டு",
        chennai: "சென்னை",
        coimbatore: "கோயம்புத்தூர்",
        cuddalore: "கடலூர்",
        dharmapuri: "தருமபுரி",
        dindigul: "திண்டுக்கல்",
        erode: "ஈரோடு",
        kallakurichi: "கள்ளக்குறிச்சி",
        kanchipuram: "காஞ்சிபுரம்",
        kanyakumari: "கன்னியாகுமரி",
        karur: "கரூர்",
        krishnagiri: "கிருஷ்ணகிரி",
        madurai: "மதுரை",
        mayiladuthurai: "மயிலாடுதுறை",
        nagapattinam: "நாகப்பட்டினம்",
        namakkal: "நாமக்கல்",
        nilgiris: "நீலகிரி",
        perambalur: "பெரம்பலூர்",
        pudukkottai: "புதுக்கோட்டை",
        ramanathapuram: "இராமநாதபுரம்",
        ranipet: "இராணிப்பேட்டை",
        salem: "சேலம்",
        sivaganga: "சிவகங்கை",
        tenkasi: "தென்காசி",
        thanjavur: "தஞ்சாவூர்",
        theni: "தேனி",
        thoothukudi: "தூத்துக்குடி",
        tiruchirappalli: "திருச்சிராப்பள்ளி",
        tirunelveli: "திருநெல்வேலி",
        tirupathur: "திருப்பத்தூர்",
        tiruppur: "திருப்பூர்",
        tiruvallur: "திருவள்ளூர்",
        tiruvannamalai: "திருவண்ணாமலை",
        tiruvarur: "திருவாரூர்",
        vellore: "வேலூர்",
        viluppuram: "விழுப்புரம்",
        virudhunagar: "விருதுநகர்"
      },
      selectTown: "நகரத்தைத் தேர்ந்தெடுக்கவும்",
      towns: {
        ariyalur: "அரியலூர்", udayarpalayam: "உடையார்பாளையம்", sendurai: "செந்துறை", andimadam: "ஆண்டிமடம்", jayankondam: "ஜெயங்கொண்டம்",
        chengalpattu: "செங்கல்பட்டு", maduranthakam: "மதுராந்தகம்", tambaram: "தாம்பரம்", pallavaram: "பல்லாவரம்", vandalur: "வண்டலூர்", tirukalukundram: "திருகழுகுன்றம்", chengalpattu_rural: "செங்கல்பட்டு ஊரக", seiyur: "செய்யூர்",
        adyar: "அடையார்", ambattur: "அம்பத்தூர்", annanagar: "அண்ணா நகர்", teynampet: "தேனாம்பேட்டை", mylapore: "மயிலாப்பூர்", perambur: "பெரம்பூர்", guindy: "கிண்டி", velachery: "வேளச்சேரி", egmore: "எழும்பூர்", royapuram: "ராயபுரம்", tondiarpet: "தண்டையார்பேட்டை",
        coimbatore_north: "கோயம்புத்தூர் வடக்கு", coimbatore_south: "கோயம்புத்தூர் தெற்கு", pollachi: "பொள்ளாச்சி", mettupalayam: "மேட்டுப்பாளையம்", valparai: "வால்பாறை", sulur: "சூலூர்", perur: "பேரூர்", annur: "அன்னூர்", madukkarai: "மதுக்கரை", kinathukadavu: "கிணத்துக்கடவு",
        cuddalore: "கடலூர்", chidambaram: "சிதம்பரம்", panruti: "பண்ருட்டி", vriddhachalam: "விருத்தாசலம்", neyveli: "நெய்வேலி", kurinjipadi: "குறிஞ்சிப்பாடி", titakudi: "திட்டக்குடி", kattumannarkoil: "காட்டுமன்னார்கோவில்", bhuvanagiri: "புவனகிரி",
        dharmapuri: "தருமபுரி", harur: "அரூர்", palacode: "பாலக்கோடு", pennagaram: "பெண்ணாகரம்", pappireddipatti: "பாப்பிரெட்டிப்பட்டி", nallampalli: "நல்லம்பள்ளி", karimangalam: "காரிமங்கலம்",
        dindigul: "திண்டுக்கல்", palani: "பழனி", kodaikanal: "கொடைக்கானல்", oddanchatram: "ஒட்டன்சத்திரம்", vedasandur: "வேடசந்தூர்", natham: "நத்தம்", atloor: "அட்லூர்", nilakottai: "நிலக்கோட்டை", kodai_road: "கொடை ரோடு",
        erode: "ஈரோடு", bhavani: "பவானி", gobichettipalayam: "கோபிச்செட்டிப்பாளையம்", perundurai: "பெருந்துறை", sathyamangalam: "சத்தியமங்கலம்", kodumudi: "கொடுமுடி", modakkurichi: "மொடக்குறிச்சி", anthiyur: "அந்தியூர்", nambiyur: "நம்பியூர்",
        kallakurichi: "கள்ளக்குறிச்சி", tirukkoyilur: "திருக்கோவிலூர்", sankarapuram: "சங்கராபுரம்", ulundurpet: "உளுந்தூர்ப்பேட்டை", kalrayan_hills: "கல்வராயன் மலை", chinnasalem: "சின்னசேலம்",
        kanchipuram: "காஞ்சிபுரம்", sriperumbudur: "ஸ்ரீபெரும்புதூர்", walajabad: "வாலாஜாபாத்", kundrathur: "குன்றத்தூர்", uthiramerur: "உத்திரமேரூர்",
        nagercoil: "நாகர்கோவில்", padmanabhapuram: "பத்மநாபபுரம்", kuzhithurai: "குழித்துறை", colachel: "குளச்சல்", thovalai: "தோவாளை", agastheeswaram: "அகஸ்தீஸ்வரம்", killiyoor: "கிள்ளியூர்", vilavancode: "விளவங்கோடு",
        karur: "கரூர்", kulithalai: "குளித்தலை", aravakurichi: "அரவக்குறிச்சி", krishnarayapuram: "கிருஷ்ணராயபுரம்", manmangalam: "மண்மங்கலம்", pugalur: "புகலூர்",
        krishnagiri: "கிருஷ்ணகிரி", hosur: "ஓசூர்", denkanikottai: "தேன்கனிக்கோட்டை", pochampalli: "போச்சம்பள்ளி", uthangarai: "ஊத்தங்கரை", shoolagiri: "சூளகிரி", bargur: "பர்கூர்", kelamangalam: "கேளமங்கலம்",
        madurai_north: "மதுரை வடக்கு", madurai_south: "மதுரை தெற்கு", madurai_central: "மதுரை மையம்", madurai_east: "மதுரை கிழக்கு", madurai_west: "மதுரை மேற்கு", melur: "மேலூர்", thirumangalam: "திருமங்கலம்", usilampatti: "உசிலம்பட்டி", vadipatti: "வாடிப்பட்டி", thiruparankundram: "திருப்பரங்குன்றம்", peraiyur: "பேரையூர்",
        mayiladuthurai: "மயிலாடுதுறை", sirkazhi: "சீர்காழி", kuthalam: "குத்தாலம்", tharangambadi: "தரங்கம்பாடி",
        nagapattinam: "நாகப்பட்டினம்", vedaranyam: "வேதாரண்யம்", kilvelur: "கீழ்வேளூர்", thiruvenkadu: "திருவெண்காடு", nagore: "நாகூர்", thirumarugal: "திருமருகல்",
        namakkal: "நாமக்கல்", tiruchengode: "திருச்செங்கோடு", rasipuram: "ராசிபுரம்", paramathi_velur: "பரமத்தி வேலூர்", kumarapalayam: "குமாரபாளையம்", senthamangalam: "சேந்தமங்கலம்", kolli_hills: "கொல்லி மலை", mohanur: "மோகனூர்",
        ooty: "ஊட்டி", coonoor: "குன்னூர்", gudalur: "கூடலூர்", kotagiri: "கோத்தகிரி", kundah: "குந்தா", pandalur: "பந்தலூர்",
        perambalur: "பெரம்பலூர்", veppanthattai: "வேப்பந்தட்டை", kunnam: "குன்னம்", alathur: "ஆலத்தூர்",
        pudukkottai: "புதுக்கோட்டை", aranthangi: "அறந்தாங்கி", illuppur: "இலுப்பூர்", gandarvakottai: "கந்தர்வகோட்டை", viralimalai: "விராலிமலை", avudaiyarkoil: "ஆவுடையார்கோவில்", karambakudi: "கரம்பக்குடி", kulathur: "குளத்தூர்", ponnamaravathi: "பொன்னமராவதி", tirumayam: "திருமயம்",
        ramanathapuram: "இராமநாதபுரம்", rameshwaram: "இராமேஸ்வரம்", paramakudi: "பரமக்குடி", mudukulathur: "முதுகுளத்தூர்", tiruvadanai: "திருவாடானை", kadaladi: "கடலாடி", kamuthi: "கமுதி", keelakarai: "கீழக்கரை", rajasingamangalam: "ராஜசிங்கமங்கலம்",
        ranipet: "இராணிப்பேட்டை", arakkonam: "அரக்கோணம்", arcot: "ஆற்காடு", walajah: "வாலாஜா", nemili: "நெமிலி", sholinghur: "சோளிங்கர்",
        salem: "சேலம்", attur: "ஆத்தூர்", mettur: "மேட்டூர்", omalur: "ஓமலூர்", sankari: "சங்ககிரி", edappadi: "எடப்பாடி", gangavalli: "கங்கவள்ளி", kadaiyampatti: "காடையாம்பட்டி", pethanaickenpalayam: "பெத்தநாயக்கன்பாளையம்", valapady: "வாழப்பாடி", yercaud: "ஏற்காடு",
        sivaganga: "சிவகங்கை", karaikudi: "காரைக்குடி", manamadurai: "மானாமதுரை", devakottai: "தேவகோட்டை", kalayarkoil: "காளையார்கோவில்", ilayangudi: "இளையான்குடி", singampunari: "சிங்கம்புணரி", thiruppuvanam: "திருப்புவனம்", tirupathur_sivaganga: "திருப்பத்தூர்",
        tenkasi: "தென்காசி", sankarankovil: "சங்கரன்கோவில்", shenkottai: "செங்கோட்டை", alangulam: "ஆலங்குளம்", kadayanallur: "கடையநல்லூர்", sivagiri: "சிவிகிரி", thiruvengadam: "திருவேங்கடம்", veorakeralampudur: "வீரகேரளம்புதூர்",
        thanjavur: "தஞ்சாவூர்", kumbakonam: "கும்பகோணம்", pattukkottai: "பட்டுக்கோட்டை", orathanadu: "ஒரத்தநாடு", thiruvaiyaru: "திருவையாறு", budalur: "பூதலூர்", peravurani: "பேராவூரணி", thiruvidaimarudur: "திருவிடைமருதூர்", thiruvonam: "திருவோணம்",
        theni: "தேனி", periyakulam: "பெரியகுளம்", bodinayakanur: "போடிநாயக்கனூர்", cumbum: "கம்பம்", uthamapalayam: "உத்தமபாளையம்", andipatti: "ஆண்டிபட்டி",
        thoothukudi: "தூத்துக்குடி", kovilpatti: "கோவில்பட்டி", tiruchendur: "திருச்செந்தூர்", ettayapuram: "எட்டயபுரம்", vilathikulam: "விளாத்திகுளம்", kayathar: "கயத்தாறு", othapidaram: "ஒட்டப்பிடாரம்", srivaikuntam: "ஸ்ரீவைகுண்டம்", tiruchendur_rural: "திருச்செந்தூர் ஊரக", sattankulam: "சாத்தான்குளம்",
        trichy: "திருச்சி", manapparai: "மணப்பாறை", lalgudi: "லால்குடி", musiri: "முசிறி", thuraiyur: "துறையூர்", manachanallur: "மண்ணச்சநல்லூர்", srirangam: "ஸ்ரீரங்கம்", thiruverumbur: "திருவெறும்பூர்", marungapuri: "மருங்காபுரி", thottiyam: "தொட்டியம்",
        tirunelveli: "திருநெல்வேலி", ambasamudram: "அம்பாசமுத்திரம்", nanguneri: "நாங்குநேரி", palayamkottai: "பாளையம் கோட்டை", radhapuram: "ராதாபுரம்", cheranmahadevi: "சேரன்மகாதேவி", manur: "மானூர்", tisayanvilai: "திசையன்விளை",
        tirupathur: "திருப்பத்தூர்", vaniyambadi: "வாணியம்பாடி", ambur: "ஆம்பூர்", natrampalli: "நாட்றம்பள்ளி",
        tiruppur: "திருப்பூர்", dharapuram: "தாராபுரம்", kangeyam: "காங்கேயம்", udumalaipettai: "உடுமலைப்பேட்டை", palladam: "பல்லடம்", avinashi: "அவிநாசி", madathukulam: "மடத்துக்குளம்", uthukuli: "ஊத்துக்குளி",
        tiruvallur: "திருவள்ளூர்", avadi: "ஆவடி", poonamallee: "பூந்தமல்லி", ponneri: "பொன்னேரி", gummidipoondi: "கும்மிடிப்பூண்டி", tiruttani: "திருத்தணி", ambattur_tiruvallur: "அம்பத்தூர்", madhavaram: "மாதவரம்", maduravoyal: "மதுரவாயல்",
        tiruvannamalai: "திருவண்ணாமலை", arani: "ஆரணி", cheyyar: "செய்யாறு", polur: "போளூர்", chengam: "செங்கம்", kalasapakkam: "கலசப்பாக்கம்", kilpennathur: "கீழ்பெண்ணாத்தூர்", thandarampattu: "தண்டராம்பட்டு", vandavasi: "வந்தவாசி",
        tiruvarur: "திருவாரூர்", mannargudi: "மன்னார்குடி", thiruthuraipoondi: "திருத்துறைப்பூண்டி", nannilam: "நன்னிலம்", kodavasal: "குடவாசல்", needamangalam: "நீடாமங்கலம்", thiruvidavasal: "திருவிடைவாசல்", valangaiman: "வலங்கைமான்",
        vellore: "வேலூர்", katpadi: "காட்பாடி", gudiyatham: "குடியாத்தம்", pernambut: "பேர்ணாம்பட்டு", anaicut: "அணைக்கட்டு", vaniyambadi_vellore: "வாணியம்பாடி",
        viluppuram: "விழுப்புரம்", tindivanam: "திண்டிவனம்", vikravandi: "விக்கிரவாண்டி", gingee: "செஞ்சி", kandamangalam: "கண்டமங்கலம்", marakkanam: "மரக்காணம்", mugaiyur: "முகையூர்", thiruvennainallur: "திருவெண்ணெய்நல்லூர்", vanur: "வானூர்",
        virudhunagar: "விருதுநகர்", sivakasi: "சிவகாசி", rajapalayam: "ராஜபாளையம்", aruppukkottai: "அருப்புக்கோட்டை", sattur: "சாத்தூர்", kariyapatti: "காரியாபட்டி", tiruchuli: "திருச்சுழி", watrap: "வத்ராப்", vembakottai: "வெம்பக்கோட்டை"
      }
    }
  },

  te: {
    title: "రైతు డిజిటల్ ట్విన్",
    subtitle: "ప్రశాంతమైన మార్గదర్శకత్వం. సురక్షితమైన నిర్ణయాలు.",
    selectLanguage: "భాష",
    whatPlanning: "మీరు ఏమి చేయాలని యోచిస్తున్నారు?",
    sellCrop: "పంటను ఇప్పుడు అమ్మండి",
    buyFertilizer: "ఎరువులు / విత్తనాలు కొనండి",
    waitObserve: "వేచి ఉండి గమనించండి",

    // AI Farmer
    aiFarmer: "AI రైతు సహాయకుడు",
    aiSubtitle: "నిపుణుల పరిజ్ఞానం మరియు వ్యక్తిగతీకరించిన సలహాతో మీ తెలివైన వ్యవసాయ సహచరుడు",
    aiFarmerDesc: "నిపుణులైన వ్యవసాయ సలహా",
    selectTopic: "ఒక అంశాన్ని ఎంచుకోండి",
    topics: {
      general: "సాధారణ వ్యవసాయం",
      crops: "పంట నిర్వహణ",
      soil: "నేల ఆరోగ్యం",
      weather: "వాతావరణ ప్రభావం",
      market: "మార్కెట్ ధరలు",
      pests: "చీడపీడల నివారణ",
      irrigation: "నీటిపారుదల",
      equipment: "వ్యవసాయ పరికరాలు"
    },
    askQuestion: "మీ ప్రశ్న అడగండి",
    askPlaceholder: "దీని గురించి ఏదైనా అడగండి",
    thinking: "ఆలోచిస్తోంది...",
    askBtn: "AI రైతును అడగండి",
    quickQTitle: "త్వరిత ప్రశ్నలు:",
    aiResponse: "AI రైతు సమాధానం",
    aiCapabilities: "AI సామర్థ్యాలు",
    backToMain: "← ప్రధాన పేజీకి వెనుకకు",
    listening: "వింటున్నాను...",
    tapToSpeak: "మాట్లాడటానికి నొక్కండి",
    capTitle: {
      expert: "నిపుణుల జ్ఞానం",
      regional: "ప్రాంతీయ అనుకూలత",
      data: "డేటా ఆధారిత",
      chat: "సంభాషణ",
      learn: "నిరంతర అభ్యాసం",
      realtime: "రియల్ టైమ్ సపోర్ట్"
    },
    capDesc: {
      expert: "సమగ్ర వ్యవసాయ డేటాబేస్ మరియు ఉత్తమ పద్ధతులకు ప్రాప్యత",
      regional: "మీ స్థానం, వాతావరణం మరియు పంట రకాలను బట్టి సలహా",
      data: "శాస్త్రీయ పరిశోధన మరియు వాస్తవ డేటా ఆధారంగా సిఫార్సులు",
      chat: "సులభమైన కమ్యూనికేషన్ కోసం సహజ భాషా ఇంటర్‌ఫేస్",
      learn: "ప్రతి పరస్పర చర్య మరియు కొత్త పరిశోధనతో AI మెరుగుపడుతుంది",
      realtime: "అత్యవసర వ్యవసాయ ప్రశ్నలకు 24/7 లభ్యత"
    },

    suggestedGuidance: "సూచించిన మార్గదర్శకత్వం",
    iUnderstand: "నాకు అర్థమైంది",
    askYourTwin: "మీ డిజిటల్ ట్విన్‌ని అడగండి",
    typeDoubt: "మీ సందేహాన్ని ఇక్కడ టైప్ చేయండి...",
    askDigitalTwin: "డిజిటల్ ట్విన్‌ని అడగండి"
  },

  kn: {
    title: "ರೈತ ಡಿಜಿಟಲ್ ಟ್ವಿನ್",
    subtitle: "ಶಾಂತ ಮಾರ್ಗದರ್ಶನ. ಸುರಕ್ಷಿತ ನಿರ್ಧಾರಗಳು.",
    selectLanguage: "ಭಾಷೆ",
    whatPlanning: "ನೀವು ಏನು ಮಾಡಲು ಯೋಜಿಸುತ್ತಿದ್ದೀರಿ?",
    sellCrop: "ಬೆಳೆಯನ್ನು ಈಗಲೇ ಮಾರಾಟ ಮಾಡಿ",
    buyFertilizer: "ಗೊಬ್ಬರ / ಒಳಹರಿವು ಖರೀದಿಸಿ",
    waitObserve: "ಕಾದು ನೋಡಿ",

    // AI Farmer
    aiFarmer: "AI ರೈತ ಸಹಾಯಕ",
    aiSubtitle: "ತಜ್ಞ ಜ್ಞಾನ ಮತ್ತು ವೈಯಕ್ತಿಕ ಸಲಹೆಯೊಂದಿಗೆ ನಿಮ್ಮ ಬುದ್ಧಿವಂತ ಕೃಷಿ ಒಡನಾಡಿ",
    aiFarmerDesc: "ತಜ್ಞ ಕೃಷಿ ಸಲಹೆ",
    selectTopic: "ಒಂದು ವಿಷಯವನ್ನು ಆರಿಸಿ",
    topics: {
      general: "ಸಾಮಾನ್ಯ ಕೃಷಿ",
      crops: "ಬೆಳೆ ನಿರ್ವಹಣೆ",
      soil: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ",
      weather: "ಹವಾಮಾನ ಪರಿಣಾಮ",
      market: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
      pests: "ಕೀಟ ನಿಯಂತ್ರಣ",
      irrigation: "ನೀರಾವರಿ",
      equipment: "ಕೃಷಿ ಉಪಕರಣಗಳು"
    },
    askQuestion: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ",
    askPlaceholder: "ಇದರ ಬಗ್ಗೆ ಏನೇ ಆದರೂ ಕೇಳಿ",
    thinking: "ಯೋಚಿಸುತ್ತಿದೆ...",
    askBtn: "AI ರೈತನನ್ನು ಕೇಳಿ",
    quickQTitle: "ತ್ವರಿತ ಪ್ರಶ್ನೆಗಳು:",
    aiResponse: "AI ರೈತ ಪ್ರತಿಕ್ರಿಯೆ",
    aiCapabilities: "AI ಸಾಮರ್ಥ್ಯಗಳು",
    backToMain: "← ಮುಖ್ಯ ಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    listening: "ಕೇಳುತ್ತಿದೆ...",
    tapToSpeak: "ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
    capTitle: {
      expert: "ತಜ್ಞ ಜ್ಞಾನ",
      regional: "ಪ್ರಾದೇಶಿಕ ಹೊಂದಾಣಿಕೆ",
      data: "ಡೇಟಾ ಆಧಾರಿತ",
      chat: "ಸಂಭಾಷಣೆ",
      learn: "ನಿರಂತರ ಕಲಿಕೆ",
      realtime: "ರಿಯಲ್ ಟೈಮ್ ಬೆಂಬಲ"
    },
    capDesc: {
      expert: "ವ್ಯಾಪಕ ಕೃಷಿ ಡೇಟಾಬೇಸ್ ಮತ್ತು ಉತ್ತಮ ಅಭ್ಯಾಸಗಳಿಗೆ ಪ್ರವೇಶ",
      regional: "ನಿಮ್ಮ ಸ್ಥಳ, ಹವಾಮಾನ ಮತ್ತು ಬೆಳೆ ಪ್ರಕಾರಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಸಲಹೆ",
      data: "ವೈಜ್ಞಾನಿಕ ಸಂಶೋಧನೆ ಮತ್ತು ನೈಜ ಡೇಟಾವನ್ನು ಆಧರಿಸಿದ ಶಿಫಾರಸುಗಳು",
      chat: "ಸುಲಭ ಸಂವಹನಕ್ಕಾಗಿ ನೈಸರ್ಗಿಕ ಭಾಷಾ ಇಂಟರ್ಫೇಸ್",
      learn: "ಪ್ರತೀ ಸಂವಹನ ಮತ್ತು ಹೊಸ ಸಂಶೋಧನೆಯೊಂದಿಗೆ AI ಸುಧಾರಿಸುತ್ತದೆ",
      realtime: "ತುರ್ತು ಕೃಷಿ ಪ್ರಶ್ನೆಗಳಿಗೆ 24/7 ಲಭ್ಯತೆ"
    },

    suggestedGuidance: "ಸೂಚಿಸಲಾದ ಮಾರ್ಗದರ್ಶನ",
    iUnderstand: "ನನಗೆ ಅರ್ಥವಾಯಿತು",
    askYourTwin: "ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಟ್ವಿನ್ ಅನ್ನು ಕೇಳಿ",
    typeDoubt: "ನಿಮ್ಮ ಅನುಮಾನವನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...",
    askDigitalTwin: "ಡಿಜಿಲ್ ಟ್ವಿನ್ ಅನ್ನು ಕೇಳಿ"
  },

  ml: {
    title: "കർഷക ഡിജിറ്റൽ ട്വിൻ",
    subtitle: "ശാന്തമായ മാർഗ്ഗനിർദ്ദേശം. സുരക്ഷിതമായ തീരുമാനങ്ങൾ.",
    selectLanguage: "ഭാഷ",
    whatPlanning: "നിങ്ങൾ എന്താണ് ചെയ്യാൻ പദ്ധതിയിടുന്നത്?",
    sellCrop: "വിള ഇപ്പോൾ വിൽക്കുക",
    buyFertilizer: "വളം / വിത്തുകൾ വാങ്ങുക",
    waitObserve: "കാത്തിരുന്ന് കാണുക",

    // AI Farmer
    aiFarmer: "AI കർഷക സഹായി",
    aiSubtitle: "വിദഗ്ദ്ധ അറിവും വ്യക്തിഗത ഉപദേശവും നൽകുന്ന നിങ്ങളുടെ ബുദ്ധിമാൻ കാർഷിക കൂട്ടാളി",
    aiFarmerDesc: "വിദഗ്ദ്ധ കാർഷിക ഉപദേശം",
    selectTopic: "ഒരു വിഷയം തിരഞ്ഞെടുക്കുക",
    topics: {
      general: "പൊതു കൃഷി",
      crops: "വിള പരിപാലനം",
      soil: "മണ്ണ് ആരോഗ്യം",
      weather: "കാലാവസ്ഥാ ആഘാതം",
      market: "വിപണി വിലകൾ",
      pests: " കീട നിയന്ത്രണം",
      irrigation: "ജലസേചനം",
      equipment: "കാർഷിക ഉപകരണങ്ങൾ"
    },
    askQuestion: "നിങ്ങളുടെ ചോദ്യം ചോദിക്കുക",
    askPlaceholder: "എന്തും ചോദിക്കാം",
    thinking: "ചിന്തിക്കുന്നു...",
    askBtn: "AI കർഷകനോട് ചോദിക്കുക",
    quickQTitle: "പെട്ടെന്നുള്ള ചോദ്യങ്ങൾ:",
    aiResponse: "AI കർഷക പ്രതികരണം",
    aiCapabilities: "AI കഴിവുകൾ",
    backToMain: "← പ്രധാന പേജിലേക്ക് മടങ്ങുക",
    listening: "കേൾക്കുന്നു...",
    tapToSpeak: "സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക",
    capTitle: {
      expert: "വിദഗ്ദ്ധ അറിവ്",
      regional: "പ്രാദേശിക പൊരുത്തപ്പെടുത്തൽ",
      data: "ഡാറ്റാ അധിഷ്ഠിതം",
      chat: "സംഭാഷണം",
      learn: "തുടർച്ചയായ പഠനം",
      realtime: "തത്സമയ പിന്തുണ"
    },
    capDesc: {
      expert: "വിപുലമായ കാർഷിക ഡാറ്റാബേസും മികച്ച രീതികളും ലഭ്യമാണ്",
      regional: "നിങ്ങളുടെ സ്ഥലം, കാലാവസ്ഥ, വിള എന്നിവയ്ക്ക് അനുയോജ്യമായ ഉപദേശം",
      data: "ശാസ്ത്രീയ ഗവേഷണവും യഥാർത്ഥ ഡാറ്റയും അടിസ്ഥാനമാക്കിയുള്ള ശുപാർശകൾ",
      chat: "എളുപ്പമുള്ള ആശയവിനിമയത്തിനായി സ്വാഭാവിക ഭാഷാ ഇന്റർഫേസ്",
      learn: "ഓരോ ആശയവിനിമയത്തിലൂടെയും പുതിയ ഗവേഷണത്തിലൂടെയും AI മെച്ചപ്പെടുന്നു",
      realtime: "അടിയന്തിര കാർഷിക ചോദ്യങ്ങൾക്ക് 24/7 ലഭ്യത"
    },

    suggestedGuidance: "നിർദ്ദേശിച്ച മാർഗ്ഗനിർദ്ദേശം",
    iUnderstand: "എനിക്ക് മനസ്സിലായി",
    askYourTwin: "നിങ്ങളുടെ ഡിജിറ്റൽ ട്വിന്നിനോട് ചോദിക്കുക",
    typeDoubt: "നിങ്ങളുടെ സംശയം ഇവിടെ ടൈപ്പ് ചെയ്യുക...",
    askDigitalTwin: "ഡിജിറ്റൽ ട്വിന്നിനോട് ചോദിക്കുക"
  },

  ur: {
    title: "کسان ڈیجیٹل ٹوئن",
    subtitle: "پرسکون رہنمائی۔ محفوظ فیصلہ۔",
    selectLanguage: "زبان",
    whatPlanning: "آپ کیا کرنے کا ارادہ رکھتے ہیں؟",
    sellCrop: "فصل ابھی بیچیں",
    buyFertilizer: "کھاد / زرعی سامان خریدیں",
    waitObserve: "انتظار کریں اور مشاہدہ کریں",

    // AI Farmer
    aiFarmer: "اے آئی کسان اسسٹنٹ",
    aiSubtitle: "ماہرانہ علم اور ذاتی مشورے کے ساتھ آپ کا ذہین کاشتکاری ساتھی",
    aiFarmerDesc: "ماہرانہ کاشتکاری کا مشورہ",
    selectTopic: "ایک موضوع منتخب کریں",
    topics: {
      general: "عام کاشتکاری",
      crops: "فصل کا انتظام",
      soil: "مٹی کی صحت",
      weather: "موسم کا اثر",
      market: "مارکیٹ کی قیمتیں",
      pests: "کیڑوں کا کنٹرول",
      irrigation: "آبپاشی",
      equipment: "کاشتکاری کا سامان"
    },
    askQuestion: "اپنا سوال پوچھیں",
    askPlaceholder: "کاشتکاری کے بارے میں کچھ بھی پوچھیں",
    thinking: "سوچ رہا ہے...",
    askBtn: "اے آئی کسان سے پوچھیں",
    quickQTitle: "فوری سوالات:",
    aiResponse: "اے آئی کسان کا جواب",
    aiCapabilities: "اے آئی کی صلاحیتیں",
    backToMain: "← مرکزی صفحہ پر واپس جائیں",
    listening: "سن رہا ہوں...",
    tapToSpeak: "بولنے کے لیے دبائیں",
    capTitle: {
      expert: "ماہرانہ علم",
      regional: "علاقائی موافقت",
      data: "ڈیٹا پر مبنی",
      chat: "بات چیت",
      learn: "مستقل سیکھنا",
      realtime: "ریئل ٹائم سپورٹ"
    },
    capDesc: {
      expert: "جامع کاشتکاری ڈیٹا بیس اور بہترین طریقوں تک رسائی",
      regional: "آپ کے مقام، آب و ہوا اور فصل کی اقسام کے مطابق مشورہ",
      data: "سائنسی تحقیق اور حقیقی ڈیٹا پر مبنی سفارشات",
      chat: "آسان مواصلات کے لیے قدرتی زبان کا انٹرفیس",
      learn: "ہر تعامل اور نئی تحقیق کے ساتھ اے آئی بہتر ہوتا ہے",
      realtime: "فوری کاشتکاری کے سوالات کے لیے 24/7 دستیابی"
    },

    suggestedGuidance: "تجویز کردہ رہنمائی",
    iUnderstand: "میں سمجھ گیا",
    askYourTwin: "اپنے ڈیجیٹل ٹوئن سے پوچھیں",
    typeDoubt: "اپنا سوال یہاں لکھیں...",
    askDigitalTwin: "ڈیجیٹل ٹوئن سے پوچھیں"
  },
  ja: {
    // Header
    title: "ファーマー・デジタルツイン",
    subtitle: "穏やかなガイダンス。より安全な決断。",
    selectLanguage: "言語",

    // Current State
    currentState: "現在の状態",
    emotionalState: "感情状態",
    stress: "ストレス",
    decisionReadiness: "意思決定の準備",
    confidenceTrend: "自信の傾向",
    evidence: "根拠",
    moderate: "中程度",
    stable: "安定",
    declining: "低下中",
    improving: "改善中",
    low: "低い",
    high: "高い",
    needsCaution: "注意が必要",
    unclear: "不明",

    // Decision Selection
    whatPlanning: "何を計画していますか？",
    sellCrop: "今すぐ作物を売る",
    buyFertilizer: "肥料・資材を購入する",
    waitObserve: "待機して観察する",
    aiFarmer: "AIファーマー・アシスタント",
    aiSubtitle: "専門知識とパーソナライズされたアドバイスを提供する知的な農業コンパニオン",

    // Doubt Card
    askYourTwin: "デジタルツインに尋ねる",
    askAnything: "決断について何でも聞いてください。穏やかに説明します。",
    typeDoubt: "ここに疑問を入力してください（例：今売るのはリスクがありますか？）",
    askDigitalTwin: "デジタルツインに尋ねる",
    digitalTwinWisdom: "デジタルツインの知恵",
    decisionConfidence: "意思決定の自信",
    recommendedToday: "今日の推奨事項",
    betterToAvoid: "避けるべきこと",
    emotionAwareAnalysis: "感情に配慮した分析",
    stressAlert: "ストレス・アラート",
    feeling: "気分",

    // Common
    common: {
      back: "戻る"
    },

    // AI Farmer Topics
    topics: {
      general: "一般農業",
      crops: "作物管理",
      soil: "土壌の健康",
      weather: "天候の影響",
      market: "市場価格",
      pests: "害虫管理",
      irrigation: "灌漑",
      equipment: "設備"
    },
    thinking: "考え中...",
    askBtn: "AIファーマーに尋ねる",
    quickQTitle: "よくある質問:",
    aiResponse: "AIファーマーの回答",
    backToMain: "← メインに戻る",
    listening: "聞き取り中...",
    tapToSpeak: "タップして話す",
    selectTopic: "トピックを選択",
    askQuestion: "質問する",
    askPlaceholder: "こちらについて何でも聞いてください",

    suggestedGuidance: "推奨されるガイダンス",
    iUnderstand: "わかりました",

    header: {
      systemOnline: "システム: オンライン",
      accuracy: "精度: 99%",
      statusGood: "状態: 良好",
      signOut: "サインアウト",
      viewSettings: "表示設定",
      faceVerification: "顔認証",
      verifiedFarmer: "認証済み農家",
      login: "ログイン",
      register: "登録"
    },

    voiceSystem: {
      greet: "こんにちは。音声アシスタントです。農業の質問をしたり、ダッシュボードを開くように指示したりできます。",
      listening: "聞き取り中...",
      processing: "処理中...",
      notUnderstood: "よく聞き取れませんでした。もう一度言っていただけますか？",
      navigatingTo: "[module] を開いています。",
      repeatLast: "最後の回答を繰り返します。",
      slowDown: "ゆっくり話します。",
      languageLocked: "言語は日本語に設定されています。日本語で話してください。",
      modules: {
        aiFarmer: "ファームアシスタント",
        cropAnalyzer: "作物スキャナー",
        marketPrices: "市場価格",
        safetyTwin: "セーフティモニター",
        smartWorkspace: "スマートワークスペース",
        expertSystem: "エキスパートシステム"
      },
      explanations: {
        aiFarmer: "ファームアシスタントは、農業のアドバイスを提供するAIコンパニオンです。",
        cropAnalyzer: "作物スキャナーは、カメラを使用して病気を検出します。",
        marketPrices: "市場価格は、作物の現在の価格を表示します。",
        safetyTwin: "セーフティモニターは、侵入者や火災を警告します。",
        smartWorkspace: "スマートワークスペースは、農場マップと天気を表示します。",
        expertSystem: "エキスパートシステムは、複雑な農業の意思決定を支援します。"
      }
    },

    featureHub: {
      iconLabel: "農業インサイト",
      seasonGuardian: "シーズン・ガーディアン・モード",
      seasonGuardianDesc: "検証済みの機関ルールに基づいて、作物のリスクとアクションをリアルタイムで分析します。",
      fieldMemory: "フィールド・メモリ・リプレイ",
      fieldMemoryDesc: "過去のシーズンの教訓を思い出し、現在の選択を改善します。",
      decisionConfidence: "意思決定の自信",
      decisionConfidenceDesc: "選択が安全かリスクがあるかを示す、真実に基づいたシグナル。",
      noData: "このコンテキストでは信頼できるデータが利用できません。",
      riskLevel: {
        safe: "安全",
        caution: "注意",
        highRisk: "高いリスク"
      },
      selectDistrict: "地区を選択",
      selectTown: "町を選択",
      weatherTitle: "リアルタイム天気",
      humidity: "湿度",
      windSpeed: "風速",
      districts: {
        ariyalur: "アリアルール", chengalpattu: "チェンガルパットゥ", chennai: "チェンナイ", coimbatore: "コインバトール", cuddalore: "クッダロール", dharmapuri: "ダルマプリ", dindigul: "ディンディグル", erode: "イロード", kallakurichi: "カッラクリーチ", kanchipuram: "カンチープラム", kanyakumari: "カニヤクマリ", karur: "カルール", krishnagiri: "クリシュナギリ", madurai: "マドゥライ", mayiladuthurai: "マイラドゥトゥライ", nagapattinam: "ナガパッティナム", namakkal: "ナマッカル", nilgiris: "ニルギリ", perambalur: "ペランバルール", pudukkottai: "プドゥコッタイ", ramanathapuram: "ラーマナータプラム", raneepet: "ラニペット", salem: "セーラム", sivaganga: "シバガンガ", tenkasi: "テンカシ", thanjavur: "タンジャーヴール", theni: "テーニ", thoothukudi: "トゥーチュクディ", tiruchirappalli: "ティルチラーパッリ", tirunelveli: "ティルネルヴェーリ", tirupathur: "ティルパトゥール", tiruppur: "ティルップール", tiruvallur: "ティルヴァッルール", tiruvannamalai: "ティルヴァンナーマライ", tiruvarur: "ティルヴァールール", vellore: "ヴェールール", viluppuram: "ヴィルップラム", virudhunagar: "ヴィルドゥナガル"
      },
      towns: {
        ariyalur: "アリアルール", sendurai: "センドゥライ", udayarpalayam: "ウダイヤルパラヤム", chengalpattu: "チェンガルパットゥ", maduranthakam: "マドゥランサカム", tambaram: "タムバラム", chennai: "チェンナイ", coimbatore: "コインバトール", pollachi: "ポラッチ", mettupalayam: "メットゥパラヤム", cuddalore: "クッダロール", chidambaram: "チダムバラム", panruti: "パンルティ", dharmapuri: "ダルマプリ", palacode: "パラコード", pennagaram: "ペンナガラム", dindigul: "ディンディグル", palani: "パラニ", kodaikanal: "コダイカナル", erode: "イロード", gobi: "ゴビ", bhavani: "ババニ", kallakurichi: "カッラクリーチ", sankarapuram: "サンカラプラム", kanchipuram: "カンチープラム", sriperumbudur: "スリペルムブドゥール", nagercoil: "ナガルコイル", karur: "カルール", krishnagiri: "クリシュナギリ", madurai: "マドゥライ", mayiladuthurai: "マイラドゥトゥライ", nagapattinam: "ナガパッティナム", namakkal: "ナマッカル", ooty: "ウーティ", perambalur: "ペランバルール", pudukkottai: "プドゥコッタイ", ramanathapuram: "ラーマナータプラム", raneepet: "ラニペット", salem: "セーラム", attur: "アトゥール", mettur: "メットゥール", sivaganga: "シバガンガ", tenkasi: "テンカシ", thanjavur: "タンジャーヴール", theni: "テーニ", thoothukudi: "トゥーチュクディ", tiruchirappalli: "ティルチラーパッリ", tirunelveli: "ティルネルヴェーリ", tirupathur: "ティルパトゥール", tiruppur: "ティルップール", tiruvallur: "ティルヴァッルール", tiruvannamalai: "ティルヴァンナーマライ", tiruvarur: "ティルヴァールール", vellore: "ヴェールール", viluppuram: "ヴィルップラム", virudhunagar: "ヴィルドゥナガル"
      }
    },

    security: {
      title: "セーフティモニター",
      subtitle: "アラートとセキュリティ",
      intruderAlert: "侵入者アラート",
      fireAlert: "火災検知",
      motionDetected: "動体検知",
      systemArmed: "システム武装",
      allSafe: "全システム正常"
    },

    cropScanner: {
      title: "作物スキャナー",
      subtitle: "病気検出",
      analyzeLeaf: "葉を分析",
      detected: "検出された病気",
      treatment: "推奨される治療",
      takePhoto: "写真を撮る",
      uploadPhoto: "写真をアップロード",
      scanning: "作物の健康状態をスキャン中..."
    }
  }
};

export { translations };
