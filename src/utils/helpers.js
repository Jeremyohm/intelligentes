// IQ Calculation based on specification document
// Formula: IQ = 100 + (1.5 × (Raw Score - 30))

export function calculateIQ(rawScore) {
  const iq = 100 + (1.5 * (rawScore - 30));
  return Math.round(Math.min(145, Math.max(70, iq)));
}

export function getIQClassification(iq) {
  if (iq >= 145) return { 
    label: 'Genius', 
    description: 'Exceptional cognitive abilities',
    tier: 'genius'
  };
  if (iq >= 130) return { 
    label: 'Very Superior', 
    description: 'Top 2% of the population',
    tier: 'very-superior'
  };
  if (iq >= 120) return { 
    label: 'Superior', 
    description: 'Top 9% of the population',
    tier: 'superior'
  };
  if (iq >= 110) return { 
    label: 'High Average', 
    description: 'Top 25% of the population',
    tier: 'high-average'
  };
  if (iq >= 90) return { 
    label: 'Average', 
    description: 'Middle 50% of the population',
    tier: 'average'
  };
  if (iq >= 80) return { 
    label: 'Low Average', 
    description: 'May require additional time for complex tasks',
    tier: 'low-average'
  };
  if (iq >= 70) return { 
    label: 'Borderline', 
    description: 'May benefit from additional support',
    tier: 'borderline'
  };
  return { 
    label: 'Below Average', 
    description: 'Significant cognitive challenges',
    tier: 'below-average'
  };
}

export function getPercentile(iq) {
  // Accurate percentiles based on normal distribution
  const percentiles = {
    145: 99.9,
    140: 99.6,
    135: 99,
    130: 98,
    125: 95,
    120: 91,
    115: 84,
    110: 75,
    105: 63,
    100: 50,
    95: 37,
    90: 25,
    85: 16,
    80: 9,
    75: 5,
    70: 2
  };
  
  const iqRounded = Math.round(iq / 5) * 5;
  return percentiles[iqRounded] || (iq > 100 ? 50 + (iq - 100) : 50 - (100 - iq));
}

// Career recommendations by IQ range
export function getCareerRecommendations(iq) {
  if (iq >= 130) {
    return {
      title: "Elite Professional Careers",
      careers: [
        { name: "Research Scientist", icon: "🔬", match: 98 },
        { name: "Neurosurgeon / Physician", icon: "🏥", match: 96 },
        { name: "Aerospace Engineer", icon: "🚀", match: 95 },
        { name: "Data Scientist / AI Researcher", icon: "🤖", match: 97 },
        { name: "Investment Banking / Quant", icon: "📈", match: 94 },
        { name: "Patent Attorney", icon: "⚖️", match: 92 },
        { name: "University Professor", icon: "🎓", match: 93 },
        { name: "Software Architect", icon: "💻", match: 96 }
      ],
      insight: "Your cognitive abilities place you among the top 2% of the population. You're well-suited for careers requiring complex problem-solving, abstract thinking, and innovation."
    };
  }
  if (iq >= 120) {
    return {
      title: "Advanced Professional Careers",
      careers: [
        { name: "Software Engineer", icon: "💻", match: 95 },
        { name: "Physician / Dentist", icon: "🏥", match: 93 },
        { name: "Attorney / Lawyer", icon: "⚖️", match: 92 },
        { name: "Financial Analyst", icon: "📊", match: 94 },
        { name: "Mechanical Engineer", icon: "⚙️", match: 91 },
        { name: "Pharmacist", icon: "💊", match: 90 },
        { name: "Management Consultant", icon: "📋", match: 93 },
        { name: "Architect", icon: "🏛️", match: 89 }
      ],
      insight: "You have superior cognitive abilities that qualify you for demanding professional roles. Your analytical skills and learning capacity are exceptional."
    };
  }
  if (iq >= 110) {
    return {
      title: "Professional & Skilled Careers",
      careers: [
        { name: "Accountant / CPA", icon: "📒", match: 92 },
        { name: "Registered Nurse", icon: "👩‍⚕️", match: 90 },
        { name: "Marketing Manager", icon: "📣", match: 91 },
        { name: "IT Project Manager", icon: "🖥️", match: 93 },
        { name: "Teacher / Educator", icon: "📚", match: 89 },
        { name: "Business Analyst", icon: "📈", match: 92 },
        { name: "Sales Director", icon: "🤝", match: 88 },
        { name: "Electrical Technician", icon: "⚡", match: 87 }
      ],
      insight: "Your above-average cognitive abilities position you well for professional careers requiring good analytical thinking and problem-solving skills."
    };
  }
  if (iq >= 90) {
    return {
      title: "Skilled & Trade Careers",
      careers: [
        { name: "Sales Representative", icon: "🤝", match: 90 },
        { name: "Administrative Manager", icon: "📁", match: 88 },
        { name: "Skilled Tradesperson", icon: "🔧", match: 92 },
        { name: "Customer Service Manager", icon: "📞", match: 87 },
        { name: "Real Estate Agent", icon: "🏠", match: 89 },
        { name: "Police Officer", icon: "👮", match: 86 },
        { name: "Paralegal", icon: "📜", match: 85 },
        { name: "Small Business Owner", icon: "🏪", match: 91 }
      ],
      insight: "Your cognitive profile is well-suited for careers that combine practical skills with customer interaction and moderate problem-solving."
    };
  }
  return {
    title: "Practical & Hands-On Careers",
    careers: [
      { name: "Skilled Laborer", icon: "🔨", match: 90 },
      { name: "Service Industry", icon: "🍽️", match: 88 },
      { name: "Retail Associate", icon: "🛒", match: 87 },
      { name: "Warehouse Operations", icon: "📦", match: 89 },
      { name: "Food Service", icon: "👨‍🍳", match: 86 },
      { name: "Maintenance Worker", icon: "🧰", match: 88 }
    ],
    insight: "Your strengths lie in practical, hands-on work. Focus on careers that value reliability, physical skills, and interpersonal abilities."
  };
}

// Cognitive strengths analysis
export function getCognitiveStrengths(sectionScores) {
  const strengths = [];
  
  const sections = {
    verbal: {
      name: "Verbal Intelligence",
      icon: "📖",
      highDesc: "Excellent vocabulary, reading comprehension, and verbal communication skills.",
      abilities: ["Written Communication", "Reading Comprehension", "Vocabulary", "Language Learning"]
    },
    numerical: {
      name: "Mathematical Intelligence", 
      icon: "🔢",
      highDesc: "Strong numerical reasoning, pattern recognition, and mathematical problem-solving.",
      abilities: ["Mental Math", "Data Analysis", "Pattern Recognition", "Logical Sequencing"]
    },
    spatial: {
      name: "Spatial Intelligence",
      icon: "🎨",
      highDesc: "Excellent visualization, mental rotation, and spatial awareness abilities.",
      abilities: ["3D Visualization", "Mental Rotation", "Map Reading", "Design Thinking"]
    },
    logical: {
      name: "Logical Intelligence",
      icon: "🧩",
      highDesc: "Strong deductive reasoning, problem-solving, and analytical thinking.",
      abilities: ["Critical Thinking", "Problem Solving", "Deductive Reasoning", "Strategic Planning"]
    }
  };

  // Calculate percentages and rank them
  const ranked = Object.entries(sectionScores)
    .map(([key, data]) => ({
      key,
      ...sections[key],
      score: data.correct,
      total: data.total,
      percentage: Math.round((data.correct / data.total) * 100)
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return ranked;
}

// Get comparison data
export function getComparisonData(iq) {
  return {
    collegeGraduates: {
      average: 115,
      yourPosition: iq >= 115 ? "above" : iq >= 110 ? "at" : "below"
    },
    generalPopulation: {
      average: 100,
      yourPosition: iq >= 105 ? "above" : iq >= 95 ? "at" : "below"
    },
    professionalWorkers: {
      average: 112,
      yourPosition: iq >= 115 ? "above" : iq >= 108 ? "at" : "below"
    }
  };
}

// Famous people / professions by IQ range
export function getFamousComparisons(iq) {
  if (iq >= 140) {
    return {
      range: "140+",
      people: [
        { name: "Albert Einstein", field: "Physicist", estimatedIQ: "160+" },
        { name: "Stephen Hawking", field: "Physicist", estimatedIQ: "160" },
        { name: "Terence Tao", field: "Mathematician", estimatedIQ: "230" }
      ],
      professionAvg: "Top researchers, Nobel laureates, and chess grandmasters typically score in this range."
    };
  }
  if (iq >= 130) {
    return {
      range: "130-140",
      people: [
        { name: "Bill Gates", field: "Entrepreneur", estimatedIQ: "160" },
        { name: "Elon Musk", field: "Entrepreneur", estimatedIQ: "155" },
        { name: "Most Physicians", field: "Medicine", estimatedIQ: "130" }
      ],
      professionAvg: "Medical doctors, attorneys, and senior engineers typically score in this range."
    };
  }
  if (iq >= 120) {
    return {
      range: "120-130",
      people: [
        { name: "Average PhD Graduate", field: "Academia", estimatedIQ: "125" },
        { name: "Senior Software Engineers", field: "Tech", estimatedIQ: "120-130" }
      ],
      professionAvg: "Graduate students, senior professionals, and skilled specialists typically score in this range."
    };
  }
  if (iq >= 110) {
    return {
      range: "110-120",
      people: [
        { name: "Average College Graduate", field: "Various", estimatedIQ: "115" },
        { name: "School Teachers", field: "Education", estimatedIQ: "110-120" }
      ],
      professionAvg: "College graduates and white-collar professionals typically score in this range."
    };
  }
  if (iq >= 100) {
    return {
      range: "100-110",
      people: [
        { name: "Average High School Graduate", field: "Various", estimatedIQ: "105" }
      ],
      professionAvg: "This is the average range. Most skilled trade workers and service professionals score here."
    };
  }
  return {
    range: "Below 100",
    people: [],
    professionAvg: "About half of the population scores in this range."
  };
}

// What your IQ means in real terms
export function getRealWorldMeaning(iq) {
  if (iq >= 130) {
    return {
      learning: "You can master complex subjects quickly and often without formal instruction.",
      problems: "You can solve novel, abstract problems that most people cannot.",
      work: "You're capable of performing at the highest levels in any intellectual field.",
      education: "Graduate-level education would be easily achievable for you."
    };
  }
  if (iq >= 120) {
    return {
      learning: "You learn new concepts faster than most and can handle advanced material.",
      problems: "You excel at complex problem-solving and strategic thinking.",
      work: "You're well-suited for demanding professional roles.",
      education: "Graduate school is well within your capabilities."
    };
  }
  if (iq >= 110) {
    return {
      learning: "You learn at an above-average pace and handle complexity well.",
      problems: "You're good at analyzing problems and finding effective solutions.",
      work: "Professional careers requiring analytical skills are a good fit.",
      education: "College education should be achievable with moderate effort."
    };
  }
  if (iq >= 90) {
    return {
      learning: "You learn at a typical pace with standard educational methods.",
      problems: "You can solve everyday problems and handle routine complexity.",
      work: "Many career paths are open to you with proper training.",
      education: "Trade schools and some college programs are achievable."
    };
  }
  return {
    learning: "You may benefit from hands-on learning and practical instruction.",
    problems: "You handle concrete, familiar problems well.",
    work: "Focus on careers that value practical skills and reliability.",
    education: "Vocational training may be the best educational path."
  };
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function flattenQuestions(testData) {
  const questions = [];
  const sections = ['verbal_reasoning', 'numerical_reasoning', 'spatial_reasoning', 'logical_reasoning'];
  
  sections.forEach(section => {
    if (testData.sections[section]?.questions) {
      questions.push(...testData.sections[section].questions);
    }
  });
  
  return questions;
}

export function calculateSectionScores(questions, answers) {
  const sectionScores = {
    verbal: { correct: 0, total: 0 },
    numerical: { correct: 0, total: 0 },
    spatial: { correct: 0, total: 0 },
    logical: { correct: 0, total: 0 }
  };
  
  questions.forEach((question, index) => {
    const type = question.type;
    if (sectionScores[type]) {
      sectionScores[type].total++;
      if (answers[index] === question.correct_answer) {
        sectionScores[type].correct++;
      }
    }
  });
  
  return sectionScores;
}

export function generateResultsData(testData, answers, timeSpent, userData) {
  const questions = flattenQuestions(testData);
  const rawScore = questions.reduce((score, question, index) => {
    return score + (answers[index] === question.correct_answer ? 1 : 0);
  }, 0);
  
  const iq = calculateIQ(rawScore);
  const classification = getIQClassification(iq);
  const percentile = getPercentile(iq);
  const sectionScores = calculateSectionScores(questions, answers);
  const careers = getCareerRecommendations(iq);
  const cognitiveStrengths = getCognitiveStrengths(sectionScores);
  const comparisons = getComparisonData(iq);
  const famousComparisons = getFamousComparisons(iq);
  const realWorldMeaning = getRealWorldMeaning(iq);
  
  return {
    testVersion: testData.test_id,
    rawScore,
    totalQuestions: questions.length,
    iq,
    classification,
    percentile,
    sectionScores,
    careers,
    cognitiveStrengths,
    comparisons,
    famousComparisons,
    realWorldMeaning,
    timeSpent,
    completedAt: new Date().toISOString(),
    userData
  };
}

// Regions data for demographics
export const regions = {
  african: [
    'West Africa',
    'East Africa',
    'North Africa',
    'Central Africa',
    'Southern Africa'
  ],
  european: [
    'Western Europe',
    'Eastern Europe',
    'Northern Europe',
    'Southern Europe',
    'Central Europe'
  ],
  asian: [
    'East Asia',
    'Southeast Asia',
    'South Asia',
    'Central Asia',
    'West Asia'
  ],
  indigenous: [
    'North America',
    'Central America',
    'South America'
  ],
  pacificIslander: [
    'Melanesian',
    'Micronesian',
    'Polynesian'
  ],
  middleEastern: [
    'Levant',
    'Arabian Peninsula',
    'North Africa',
    'Persian/Iranian'
  ]
};

export const educationLevels = [
  'Less than High School',
  'High School Diploma/GED',
  'Some College',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctoral Degree',
  'Professional Degree (MD, JD, etc.)'
];

export const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
  'France', 'Japan', 'China', 'India', 'Brazil', 'Mexico', 'South Korea',
  'Italy', 'Spain', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland',
  'Switzerland', 'Austria', 'Belgium', 'Ireland', 'New Zealand', 'Singapore',
  'South Africa', 'Nigeria', 'Kenya', 'Egypt', 'Morocco', 'Argentina',
  'Chile', 'Colombia', 'Peru', 'Philippines', 'Indonesia', 'Malaysia',
  'Thailand', 'Vietnam', 'Pakistan', 'Bangladesh', 'Russia', 'Ukraine',
  'Poland', 'Czech Republic', 'Hungary', 'Romania', 'Greece', 'Portugal',
  'Israel', 'United Arab Emirates', 'Saudi Arabia', 'Turkey', 'Iran',
  'Other'
].sort();
