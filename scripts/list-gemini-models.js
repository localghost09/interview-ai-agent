/*
Run this script locally to list available Gemini/Generative AI models for your API key.
Usage (PowerShell):
  $env:GOOGLE_GEMINI_API_KEY = "YOUR_KEY_HERE"
  node .\scripts\list-gemini-models.js

Notes:
- If your key is an API key (not an OAuth token), the script will call the public models list with ?key=API_KEY.
- If you provide an OAuth Bearer token (starts with 'ya29.'), the script will call with Authorization header.
- The script prints JSON to stdout and a short list of model names.
*/

const https = require('https');

async function fetchModelsWithKey(apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(apiKey)}`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => reject(err));
  });
}

async function fetchModelsWithBearer(token) {
  const url = `https://generativelanguage.googleapis.com/v1/models`;
  return new Promise((resolve, reject) => {
    const req = https.request(url, { headers: { Authorization: `Bearer ${token}` } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (err) {
          reject(err);
        }
      });
    });
    req.on('error', (err) => reject(err));
    req.end();
  });
}

(async () => {
  const key = process.env.GOOGLE_GEMINI_API_KEY;
  if (!key) {
    console.error('Please set GOOGLE_GEMINI_API_KEY environment variable before running.');
    process.exit(1);
  }

  try {
    let result;
    if (key.startsWith('ya29.')) {
      console.log('Using Bearer token auth (OAuth).');
      result = await fetchModelsWithBearer(key);
    } else {
      console.log('Using API key auth (key=...).');
      result = await fetchModelsWithKey(key);
    }

    console.log('\nFull response:');
    console.log(JSON.stringify(result, null, 2));

    if (result && result.models && Array.isArray(result.models)) {
      console.log('\nAvailable models:');
      result.models.forEach(m => console.log(' -', m.name));
    } else if (result && result.modelInfo) {
      // some shapes
      console.log('\nModel info:');
      console.log(result.modelInfo);
    } else {
      console.warn('\nNo models array found in response - inspect full response above.');
    }
  } catch (err) {
    console.error('Failed to list models:', err);
    process.exit(1);
  }
})();
