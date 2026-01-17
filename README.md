# Intelligentes IQ Test Platform v2

A premium, professional IQ assessment platform with comprehensive results.

## What's New in v2

- ✨ **Premium Dark Theme** - Black/silver/platinum with cyan accents
- 📊 **Enhanced Results** - Career recommendations, cognitive strengths, real-world insights
- 🎨 **Visual Questions** - Clocks, shapes, patterns for spatial reasoning questions
- 📈 **Population Comparisons** - Compare against graduates, professionals
- 💼 **Career Insights** - Job recommendations based on IQ range

## Quick Start

### 1. Install Node.js
Download from [nodejs.org](https://nodejs.org) (LTS version)

### 2. Navigate to project
```bash
cd intelligentes-v2
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start locally
```bash
npm start
```
Opens at http://localhost:3000

## Deploy to Vercel

### Option 1: GitHub (Recommended)
1. Create GitHub repo
2. Push code to GitHub
3. Go to [vercel.com](https://vercel.com)
4. Import your GitHub repo
5. Done!

### Option 2: Vercel CLI
```bash
npm i -g vercel
vercel
vercel --prod
```

### Add Your Domain
1. Vercel Dashboard → Settings → Domains
2. Add `intelligentes.org`
3. Update DNS: CNAME → cname.vercel-dns.com

## Features

| Feature | Description |
|---------|-------------|
| 60 Questions | Across 4 cognitive domains |
| 60 Minutes | Timed assessment with countdown |
| Visual Questions | Clocks, shapes, patterns |
| IQ Score | 70-145 standardized scale |
| Percentile | Population ranking |
| Career Insights | Job recommendations |
| Cognitive Strengths | Domain breakdown |
| Comparisons | vs. grads, professionals |

## Project Structure

```
intelligentes-v2/
├── src/
│   ├── components/     # Visual question components
│   ├── data/           # Test JSON files (A-E)
│   ├── pages/          # Page components
│   ├── utils/          # Helper functions
│   ├── App.js
│   └── index.css       # Premium theme
├── public/
└── package.json
```

## Results Include

1. **IQ Score** - Standardized 70-145 scale
2. **Classification** - Genius, Superior, Average, etc.
3. **Percentile** - Where you rank
4. **What It Means** - Learning, work, education insights
5. **Cognitive Strengths** - Your top domains ranked
6. **Career Recommendations** - Jobs that match your profile
7. **Population Comparison** - vs. different groups

---

© 2025 Intelligentes
