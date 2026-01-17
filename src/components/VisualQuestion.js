import React from 'react';
import './VisualQuestion.css';

// Clock visualization component
export function ClockVisual({ time, size = 120 }) {
  // time is a number 1-12
  const hourAngle = (time % 12) * 30 - 90; // 30 degrees per hour, starting from 12
  
  return (
    <div className="clock-visual" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100">
        {/* Clock face */}
        <circle cx="50" cy="50" r="48" fill="#141419" stroke="#c0c0c8" strokeWidth="2"/>
        
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = 50 + 40 * Math.cos(angle);
          const y1 = 50 + 40 * Math.sin(angle);
          const x2 = 50 + 45 * Math.cos(angle);
          const y2 = 50 + 45 * Math.sin(angle);
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c0c0c8" strokeWidth="2"/>
          );
        })}
        
        {/* Hour hand */}
        <line 
          x1="50" y1="50" 
          x2={50 + 25 * Math.cos(hourAngle * Math.PI / 180)} 
          y2={50 + 25 * Math.sin(hourAngle * Math.PI / 180)}
          stroke="#00d4ff" 
          strokeWidth="4"
          strokeLinecap="round"
        />
        
        {/* Center dot */}
        <circle cx="50" cy="50" r="4" fill="#00d4ff"/>
        
        {/* 12 marker */}
        <text x="50" y="18" textAnchor="middle" fill="#e5e5eb" fontSize="10" fontWeight="bold">12</text>
        <text x="85" y="54" textAnchor="middle" fill="#e5e5eb" fontSize="10" fontWeight="bold">3</text>
        <text x="50" y="92" textAnchor="middle" fill="#e5e5eb" fontSize="10" fontWeight="bold">6</text>
        <text x="15" y="54" textAnchor="middle" fill="#e5e5eb" fontSize="10" fontWeight="bold">9</text>
      </svg>
    </div>
  );
}

// Shape rotation visualization
export function RotationVisual({ shape = 'arrow', rotation = 0, size = 100 }) {
  const getShapePath = () => {
    switch(shape) {
      case 'arrow-up':
        return "M50,15 L80,60 L60,60 L60,85 L40,85 L40,60 L20,60 Z";
      case 'arrow-right':
        return "M85,50 L40,20 L40,40 L15,40 L15,60 L40,60 L40,80 Z";
      case 'arrow-down':
        return "M50,85 L80,40 L60,40 L60,15 L40,15 L40,40 L20,40 Z";
      case 'arrow-left':
        return "M15,50 L60,20 L60,40 L85,40 L85,60 L60,60 L60,80 Z";
      case 'L-shape':
        return "M20,20 L40,20 L40,60 L80,60 L80,80 L20,80 Z";
      case 'T-shape':
        return "M20,20 L80,20 L80,40 L60,40 L60,80 L40,80 L40,40 L20,40 Z";
      case 'triangle':
        return "M50,15 L85,80 L15,80 Z";
      default:
        return "M50,15 L80,60 L60,60 L60,85 L40,85 L40,60 L20,60 Z";
    }
  };

  return (
    <div className="shape-visual" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100">
        <g transform={`rotate(${rotation}, 50, 50)`}>
          <path d={getShapePath()} fill="#00d4ff" stroke="#0099bb" strokeWidth="2"/>
        </g>
      </svg>
    </div>
  );
}

// Pattern sequence visualization
export function PatternSequence({ pattern, size = 60 }) {
  // pattern is array of { shape: 'filled' | 'empty', type: 'circle' | 'square' | 'triangle' }
  return (
    <div className="pattern-sequence">
      {pattern.map((item, index) => (
        <div key={index} className="pattern-item" style={{ width: size, height: size }}>
          <svg viewBox="0 0 50 50">
            {item.type === 'circle' && (
              <circle 
                cx="25" cy="25" r="20" 
                fill={item.filled ? "#00d4ff" : "none"} 
                stroke="#00d4ff" 
                strokeWidth="2"
              />
            )}
            {item.type === 'square' && (
              <rect 
                x="5" y="5" width="40" height="40" 
                fill={item.filled ? "#00d4ff" : "none"} 
                stroke="#00d4ff" 
                strokeWidth="2"
              />
            )}
            {item.type === 'triangle' && (
              <polygon 
                points="25,5 45,45 5,45" 
                fill={item.filled ? "#00d4ff" : "none"} 
                stroke="#00d4ff" 
                strokeWidth="2"
              />
            )}
          </svg>
        </div>
      ))}
      <div className="pattern-item question-mark" style={{ width: size, height: size }}>
        <span>?</span>
      </div>
    </div>
  );
}

// Cube visualization
export function CubeVisual({ size = 120, painted = false }) {
  return (
    <div className="cube-visual" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100">
        {/* Back face */}
        <polygon 
          points="30,20 80,20 80,70 30,70" 
          fill={painted ? "rgba(0, 212, 255, 0.3)" : "#1a1a21"} 
          stroke="#c0c0c8" 
          strokeWidth="1"
        />
        {/* Left face */}
        <polygon 
          points="10,35 30,20 30,70 10,85" 
          fill={painted ? "rgba(0, 212, 255, 0.5)" : "#141419"} 
          stroke="#c0c0c8" 
          strokeWidth="1"
        />
        {/* Top face */}
        <polygon 
          points="10,35 30,20 80,20 60,35" 
          fill={painted ? "rgba(0, 212, 255, 0.7)" : "#1a1a21"} 
          stroke="#c0c0c8" 
          strokeWidth="1"
        />
        {/* Front face */}
        <polygon 
          points="10,35 60,35 60,85 10,85" 
          fill={painted ? "#00d4ff" : "#0d0d12"} 
          stroke="#c0c0c8" 
          strokeWidth="2"
        />
        {/* Right face */}
        <polygon 
          points="60,35 80,20 80,70 60,85" 
          fill={painted ? "rgba(0, 212, 255, 0.4)" : "#111116"} 
          stroke="#c0c0c8" 
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

// Grid pattern for spatial questions
export function GridPattern({ grid, size = 200 }) {
  // grid is 2D array of booleans (true = filled, false = empty)
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  const cellSize = size / Math.max(rows, cols);

  return (
    <div className="grid-pattern" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`}>
        {grid.map((row, rowIndex) => 
          row.map((cell, colIndex) => (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * cellSize + 2}
              y={rowIndex * cellSize + 2}
              width={cellSize - 4}
              height={cellSize - 4}
              fill={cell ? "#00d4ff" : "#1a1a21"}
              stroke="#c0c0c8"
              strokeWidth="1"
              rx="2"
            />
          ))
        )}
      </svg>
    </div>
  );
}

// Shape with dots (for "which is different" questions)
export function ShapeWithDots({ shape = 'circle', dots = 1, dotPosition = 'center', size = 80 }) {
  const getDotPositions = () => {
    switch(dotPosition) {
      case 'center':
        return [[25, 25]];
      case 'top-left':
        return [[12, 12]];
      case 'corners':
        return [[12, 12], [38, 12], [12, 38], [38, 38]];
      default:
        return [[25, 25]];
    }
  };

  return (
    <div className="shape-with-dots" style={{ width: size, height: size }}>
      <svg viewBox="0 0 50 50">
        {shape === 'circle' && (
          <circle cx="25" cy="25" r="22" fill="none" stroke="#c0c0c8" strokeWidth="2"/>
        )}
        {shape === 'square' && (
          <rect x="3" y="3" width="44" height="44" fill="none" stroke="#c0c0c8" strokeWidth="2"/>
        )}
        {getDotPositions().slice(0, dots).map((pos, i) => (
          <circle key={i} cx={pos[0]} cy={pos[1]} r="4" fill="#00d4ff"/>
        ))}
      </svg>
    </div>
  );
}

// Letter rotation visualization
export function LetterRotation({ letter, rotation = 0, size = 80 }) {
  return (
    <div className="letter-rotation" style={{ width: size, height: size }}>
      <div 
        className="letter-inner"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {letter}
      </div>
    </div>
  );
}

// Hexagon divided into triangles
export function HexagonDivided({ size = 120, highlightSection = -1 }) {
  const centerX = 60;
  const centerY = 60;
  const radius = 50;
  
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 - 30) * (Math.PI / 180);
    points.push({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    });
  }

  return (
    <div className="hexagon-visual" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120">
        {/* Draw 6 triangles */}
        {points.map((point, i) => {
          const nextPoint = points[(i + 1) % 6];
          return (
            <polygon
              key={i}
              points={`${centerX},${centerY} ${point.x},${point.y} ${nextPoint.x},${nextPoint.y}`}
              fill={i === highlightSection ? "#00d4ff" : "#1a1a21"}
              stroke="#c0c0c8"
              strokeWidth="1"
            />
          );
        })}
        {/* Center dot */}
        <circle cx={centerX} cy={centerY} r="3" fill="#00d4ff"/>
      </svg>
    </div>
  );
}

// Main component that renders appropriate visual based on question
export default function VisualQuestion({ question }) {
  // Check if this question needs a visual
  const questionText = question.question.toLowerCase();
  
  // Clock questions
  if (questionText.includes('clock') && questionText.includes('point')) {
    const timeMatch = questionText.match(/points? at (\d+)/);
    if (timeMatch) {
      return (
        <div className="visual-container">
          <ClockVisual time={parseInt(timeMatch[1])} size={150} />
        </div>
      );
    }
  }
  
  // Arrow/rotation questions
  if (questionText.includes('arrow') && (questionText.includes('rotate') || questionText.includes('reflect'))) {
    if (questionText.includes('upward') || questionText.includes('up')) {
      return (
        <div className="visual-container">
          <RotationVisual shape="arrow-up" size={120} />
        </div>
      );
    }
    if (questionText.includes('right')) {
      return (
        <div className="visual-container">
          <RotationVisual shape="arrow-right" size={120} />
        </div>
      );
    }
  }
  
  // Cube questions
  if (questionText.includes('cube') && (questionText.includes('paint') || questionText.includes('faces'))) {
    return (
      <div className="visual-container">
        <CubeVisual size={150} painted={true} />
      </div>
    );
  }
  
  // Pattern alternating questions
  if (questionText.includes('pattern') && (questionText.includes('○') || questionText.includes('●') || questionText.includes('▢') || questionText.includes('▣'))) {
    // Parse the pattern from the question
    const hasFilledCircle = questionText.includes('●');
    const hasEmptyCircle = questionText.includes('○');
    
    if (hasFilledCircle || hasEmptyCircle) {
      const pattern = [
        { type: 'circle', filled: false },
        { type: 'circle', filled: true },
        { type: 'circle', filled: false },
        { type: 'circle', filled: true },
        { type: 'circle', filled: false },
      ];
      return (
        <div className="visual-container">
          <PatternSequence pattern={pattern} size={50} />
        </div>
      );
    }
  }
  
  // Hexagon questions
  if (questionText.includes('hexagon') && questionText.includes('triangle')) {
    return (
      <div className="visual-container">
        <HexagonDivided size={150} />
      </div>
    );
  }
  
  // Letter rotation questions (N, H, Z, etc.)
  if ((questionText.includes('rotate') || questionText.includes('flip')) && questionText.includes('letter')) {
    const letterMatch = questionText.match(/letter ['"]?([A-Z])['"]?/i);
    if (letterMatch) {
      return (
        <div className="visual-container">
          <LetterRotation letter={letterMatch[1].toUpperCase()} size={100} />
        </div>
      );
    }
  }
  
  // No visual needed
  return null;
}
