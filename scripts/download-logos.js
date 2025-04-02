const fs = require('fs');
const path = require('path');
const https = require('https');

const techLogos = {
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  java: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  cpp: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  html5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  css3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  typescript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  blender: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg',
  photoshop: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg',
  illustrator: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg',
  unreal: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg',
  assemblyscript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  lua: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg',
  apache: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg'
};

const alternativeSources = {
  photoshop: [
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/adobe/adobe-photoshop.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/adobe/adobe-premiere-pro.svg'
  ],
  illustrator: [
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/adobe/adobe-illustrator.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/adobe/adobe-photoshop.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/adobe/adobe-premiere-pro.svg'
  ],
  tailwind: [
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original-wordmark.svg'
  ],
  assemblyscript: [
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/assemblyscript/assemblyscript-original.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/assemblyscript/assemblyscript-original-wordmark.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/assemblyscript/assemblyscript-plain.svg',
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/assemblyscript/assemblyscript-plain-wordmark.svg'
  ]
};

const outputDir = path.join(__dirname, '../public/assets/tech');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to try downloading from multiple sources
async function tryDownloadFromSources(name, sources) {
  for (const url of sources) {
    try {
      const response = await new Promise((resolve, reject) => {
        https.get(url, resolve).on('error', reject);
      });
      
      if (response.statusCode === 200) {
        const filePath = path.join(outputDir, `${name}.svg`);
        response.pipe(fs.createWriteStream(filePath));
        console.log(`Downloaded ${name} logo from alternative source: ${url}`);
        return true;
      }
    } catch (error) {
      console.error(`Failed to download ${name} logo from ${url}:`, error.message);
    }
  }
  return false;
}

// Download each logo
Object.entries(techLogos).forEach(async ([name, url]) => {
  const filePath = path.join(outputDir, `${name}.svg`);
  
  try {
    const response = await new Promise((resolve, reject) => {
      https.get(url, resolve).on('error', reject);
    });
    
    if (response.statusCode === 200) {
      response.pipe(fs.createWriteStream(filePath));
      console.log(`Downloaded ${name} logo`);
    } else {
      console.error(`Failed to download ${name} logo: ${response.statusCode}`);
      
      // Try alternative sources if available
      if (alternativeSources[name]) {
        const success = await tryDownloadFromSources(name, alternativeSources[name]);
        if (!success) {
          console.error(`Failed to download ${name} logo from all sources`);
        }
      }
    }
  } catch (error) {
    console.error(`Error downloading ${name} logo:`, error.message);
    
    // Try alternative sources if available
    if (alternativeSources[name]) {
      const success = await tryDownloadFromSources(name, alternativeSources[name]);
      if (!success) {
        console.error(`Failed to download ${name} logo from all sources`);
      }
    }
  }
}); 