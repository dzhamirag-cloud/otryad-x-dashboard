// SVG avatars for each agent - sci-fi style with animations
const AVATARS_SVG = {
  main: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-main" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3377ff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#5ac8fa;stop-opacity:1" />
        </linearGradient>
        <filter id="glow-main">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <!-- Head -->
      <circle cx="50" cy="35" r="18" fill="url(#grad-main)" filter="url(#glow-main)"/>
      <!-- Visor/Eyes -->
      <rect x="38" y="30" width="24" height="6" rx="3" fill="#5ac8fa" opacity="0.9">
        <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite"/>
      </rect>
      <!-- Body -->
      <rect x="35" y="53" width="30" height="35" rx="4" fill="url(#grad-main)" filter="url(#glow-main)"/>
      <!-- Shoulders -->
      <circle cx="30" cy="58" r="8" fill="#2860db"/>
      <circle cx="70" cy="58" r="8" fill="#2860db"/>
      <!-- Core light -->
      <circle cx="50" cy="70" r="4" fill="#5ac8fa">
        <animate attributeName="r" values="4;5;4" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <!-- Circuit lines -->
      <line x1="50" y1="70" x2="42" y2="80" stroke="#5ac8fa" stroke-width="1" opacity="0.6"/>
      <line x1="50" y1="70" x2="58" y2="80" stroke="#5ac8fa" stroke-width="1" opacity="0.6"/>
    </svg>
  `,
  
  marketer: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-mark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ff9500;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ffd60a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Head -->
      <circle cx="50" cy="35" r="18" fill="url(#grad-mark)"/>
      <!-- Eyes -->
      <circle cx="43" cy="33" r="3" fill="#fff"/>
      <circle cx="57" cy="33" r="3" fill="#fff"/>
      <!-- Graph on chest -->
      <rect x="35" y="53" width="30" height="35" rx="4" fill="url(#grad-mark)"/>
      <polyline points="40,75 45,70 50,65 55,68 60,60" 
                fill="none" stroke="#fff" stroke-width="2"/>
      <!-- Trending up arrow -->
      <path d="M 58 62 L 62 58 L 62 62 Z" fill="#34c759">
        <animateTransform attributeName="transform" type="translate" 
                          values="0,0; 0,-2; 0,0" dur="1s" repeatCount="indefinite"/>
      </path>
    </svg>
  `,
  
  brandman: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-brand" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ff375f;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ff6b8a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Head -->
      <circle cx="50" cy="35" r="18" fill="url(#grad-brand)"/>
      <!-- Stylish glasses -->
      <rect x="38" y="30" width="10" height="8" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
      <rect x="52" y="30" width="10" height="8" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
      <line x1="48" y1="34" x2="52" y2="34" stroke="#fff" stroke-width="2"/>
      <!-- Body -->
      <rect x="35" y="53" width="30" height="35" rx="4" fill="url(#grad-brand)"/>
      <!-- Target/bullseye on chest -->
      <circle cx="50" cy="70" r="8" fill="none" stroke="#fff" stroke-width="2"/>
      <circle cx="50" cy="70" r="4" fill="none" stroke="#fff" stroke-width="2"/>
      <circle cx="50" cy="70" r="2" fill="#fff">
        <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `,
  
  cfo: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-cfo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ffd60a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ffed4e;stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Head -->
      <circle cx="50" cy="35" r="18" fill="url(#grad-cfo)"/>
      <!-- Professional eyes -->
      <circle cx="43" cy="33" r="2" fill="#333"/>
      <circle cx="57" cy="33" r="2" fill="#333"/>
      <!-- Body -->
      <rect x="35" y="53" width="30" height="35" rx="4" fill="url(#grad-cfo)"/>
      <!-- Dollar sign on chest -->
      <text x="50" y="78" font-size="20" fill="#333" text-anchor="middle" font-weight="bold">$</text>
      <!-- Coins floating -->
      <circle cx="40" cy="60" r="3" fill="#ffed4e" stroke="#333" stroke-width="1">
        <animateTransform attributeName="transform" type="translate" 
                          values="0,0; 0,-3; 0,0" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="60" cy="63" r="3" fill="#ffed4e" stroke="#333" stroke-width="1">
        <animateTransform attributeName="transform" type="translate" 
                          values="0,0; 0,-4; 0,0" dur="2.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `,
  
  techlead: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-tech" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#5ac8fa;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8edcfc;stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Head -->
      <circle cx="50" cy="35" r="18" fill="url(#grad-tech)"/>
      <!-- VR/tech visor -->
      <rect x="36" y="29" width="28" height="8" rx="4" fill="#2a5a7f" opacity="0.8"/>
      <circle cx="44" cy="33" r="2" fill="#5ac8fa">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="56" cy="33" r="2" fill="#5ac8fa">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <!-- Body -->
      <rect x="35" y="53" width="30" height="35" rx="4" fill="url(#grad-tech)"/>
      <!-- Code brackets -->
      <text x="42" y="72" font-size="18" fill="#fff" font-family="monospace">&lt;</text>
      <text x="54" y="72" font-size="18" fill="#fff" font-family="monospace">/&gt;</text>
      <!-- Binary flowing -->
      <text x="38" y="82" font-size="6" fill="#fff" opacity="0.6" font-family="monospace">101010</text>
    </svg>
  `,
  
  strategist: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-strat" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#bf5af2;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d98ff5;stop-opacity:1" />
        </linearGradient>
      </defs>
      <!-- Head -->
      <circle cx="50" cy="35" r="18" fill="url(#grad-strat)"/>
      <!-- Analytical eyes -->
      <circle cx="43" cy="33" r="3" fill="#fff" opacity="0.9"/>
      <circle cx="57" cy="33" r="3" fill="#fff" opacity="0.9"/>
      <!-- Body -->
      <rect x="35" y="53" width="30" height="35" rx="4" fill="url(#grad-strat)"/>
      <!-- Brain/neural network on chest -->
      <circle cx="50" cy="68" r="6" fill="none" stroke="#fff" stroke-width="1.5"/>
      <circle cx="45" cy="72" r="3" fill="none" stroke="#fff" stroke-width="1"/>
      <circle cx="55" cy="72" r="3" fill="none" stroke="#fff" stroke-width="1"/>
      <line x1="47" y1="68" x2="45" y2="72" stroke="#fff" stroke-width="1"/>
      <line x1="53" y1="68" x2="55" y2="72" stroke="#fff" stroke-width="1"/>
      <!-- Thought pulse -->
      <circle cx="50" cy="68" r="2" fill="#fff">
        <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `
};
