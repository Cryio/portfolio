# Assets Directory - Auto-Loading System

This folder uses **automatic asset discovery**. Simply add images to the correct folder, and they'll be automatically available in the app!

## 🚀 Quick Start

### Adding a Certificate Badge
1. Name your file with the certification ID: `paloalto-cybersecurity-practitioner.png`
2. Drop it in `src/assets/certificates/`
3. Done! The badge will auto-appear on the certifications page

### Adding a Project Image
1. Name your file with the project ID: `wifi-csi-recognition.png`
2. Drop it in `src/assets/projects/`
3. Done! The image will auto-appear on the projects page

### Adding a Profile Photo
1. Name your file: `avatar.png` or `headshot.png`
2. Drop it in `src/assets/profile/`
3. Import using: `getProfileImage('avatar')`

## 📁 Directory Structure

```
src/assets/
├── certificates/         # Auto-loaded certificate badges
│   ├── paloalto-cybersecurity-practitioner.png
│   ├── google-cloud-ai.png
│   └── {certification-id}.{png|jpg|webp|svg}
│
├── projects/             # Auto-loaded project images
│   ├── wifi-csi-recognition.png
│   ├── tinylinux.png
│   └── {project-id}.{png|jpg|webp|svg}
│
└── profile/              # Profile photos
    ├── avatar.png
    └── {name}.{png|jpg|webp|svg}
```

## 🔧 How It Works

The `src/lib/assetLoader.ts` utility uses Vite's `import.meta.glob` to automatically discover all images at build time.

### Usage in Code

```tsx
import { 
  getCertificateImage, 
  getProjectImage, 
  getProfileImage,
  getAllAssets,
  hasAsset 
} from '@/lib/assetLoader';

// Get a specific image
const badge = getCertificateImage('paloalto-cybersecurity-practitioner');
const projectImg = getProjectImage('wifi-csi-recognition');
const avatar = getProfileImage('avatar');

// Check if an asset exists
if (hasAsset('certificates', 'my-cert-id')) {
  // ...
}

// Get all assets of a type
const allCerts = getAllAssets('certificates');
// Returns: [{ name: 'paloalto-cybersecurity-practitioner', url: '/src/assets/...' }, ...]
```

### Auto-Linked Data

For certifications, the badge is auto-linked by matching the `id` field:

```ts
// In certifications.ts
{
  id: "paloalto-cybersecurity-practitioner", // ← Must match filename
  title: "Palo Alto Networks Certified...",
  // ...
}

// File: src/assets/certificates/paloalto-cybersecurity-practitioner.png
// ↑ Will automatically be linked!
```

## 📝 Naming Conventions

### Rules
- Use **lowercase** letters only
- Use **hyphens** (-) to separate words
- Match the **id** field in data files exactly
- No spaces or special characters

### Supported Formats
- `.png` - Best for badges with transparency
- `.jpg` / `.jpeg` - Best for photographs
- `.webp` - Best compression
- `.svg` - Best for vector graphics
- `.gif` - For animated images

## 🔍 Debugging

### Check Available Assets
```tsx
import { getAssetCounts, getAllAssets } from '@/lib/assetLoader';

// See how many assets are loaded
console.log(getAssetCounts());
// { certificates: 5, projects: 3, profile: 1 }

// List all certificate assets
console.log(getAllAssets('certificates'));
```

### Common Issues

1. **Image not showing?**
   - Check filename matches the `id` exactly
   - Ensure file is in the correct folder
   - Check file extension is supported

2. **Asset not updating?**
   - Hot reload should work, but try refreshing the page
   - Clear browser cache if needed

## 💡 Tips

- **Compress images** before adding (use TinyPNG or similar)
- **Certificate badges**: Keep under 100KB, 200-400px recommended
- **Project images**: 800-1200px width recommended
- **Profile photos**: At least 400x400px, square aspect ratio
