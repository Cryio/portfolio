/**
 * Asset Loader Utility
 * 
 * This utility automatically discovers and loads assets from the src/assets directory.
 * Simply place files in the appropriate folders, and they'll be available for use.
 * 
 * Folder Structure:
 * - src/assets/certificates/ - Certificate badge images
 * - src/assets/projects/ - Project screenshots/thumbnails
 * - src/assets/profile/ - Profile photos
 * 
 * File Naming Convention:
 * - Use kebab-case: my-certificate-name.png
 * - Supported formats: png, jpg, jpeg, webp, svg, gif
 * 
 * Usage:
 * import { getCertificateImage, getProjectImage, getProfileImage, getAllAssets } from '@/lib/assetLoader';
 * 
 * const badge = getCertificateImage('paloalto-cybersecurity'); // Returns the image URL or undefined
 * const allCerts = getAllAssets('certificates'); // Returns all certificate images
 */

// Use Vite's import.meta.glob to auto-discover all assets
// The `eager: true` option loads all assets immediately

// Certificate images
const certificateModules = import.meta.glob<{ default: string }>(
  '/src/assets/certificates/*.{png,jpg,jpeg,webp,svg,gif}',
  { eager: true }
);

// Project images
const projectModules = import.meta.glob<{ default: string }>(
  '/src/assets/projects/*.{png,jpg,jpeg,webp,svg,gif}',
  { eager: true }
);

// Profile images
const profileModules = import.meta.glob<{ default: string }>(
  '/src/assets/profile/*.{png,jpg,jpeg,webp,svg,gif}',
  { eager: true }
);

// Helper to extract filename without extension
const getBaseName = (path: string): string => {
  const fileName = path.split('/').pop() || '';
  return fileName.replace(/\.[^/.]+$/, '');
};

// Helper to create asset registry from modules
const createAssetRegistry = (modules: Record<string, { default: string }>): Map<string, string> => {
  const registry = new Map<string, string>();
  
  Object.entries(modules).forEach(([path, module]) => {
    const baseName = getBaseName(path);
    registry.set(baseName, module.default);
  });
  
  return registry;
};

// Create registries
const certificateRegistry = createAssetRegistry(certificateModules);
const projectRegistry = createAssetRegistry(projectModules);
const profileRegistry = createAssetRegistry(profileModules);

/**
 * Get a certificate image by name (without extension)
 * @param name - The certificate name (e.g., 'paloalto-cybersecurity')
 * @returns The image URL or undefined if not found
 */
export const getCertificateImage = (name: string): string | undefined => {
  return certificateRegistry.get(name);
};

/**
 * Get a project image by name (without extension)
 * @param name - The project name (e.g., 'wifi-csi-recognition')
 * @returns The image URL or undefined if not found
 */
export const getProjectImage = (name: string): string | undefined => {
  return projectRegistry.get(name);
};

/**
 * Get a profile image by name (without extension)
 * @param name - The profile image name (e.g., 'avatar' or 'headshot')
 * @returns The image URL or undefined if not found
 */
export const getProfileImage = (name: string): string | undefined => {
  return profileRegistry.get(name);
};

/**
 * Get all assets of a specific type
 * @param type - The asset type: 'certificates', 'projects', or 'profile'
 * @returns An array of { name: string, url: string } objects
 */
export const getAllAssets = (type: 'certificates' | 'projects' | 'profile'): Array<{ name: string; url: string }> => {
  let registry: Map<string, string>;
  
  switch (type) {
    case 'certificates':
      registry = certificateRegistry;
      break;
    case 'projects':
      registry = projectRegistry;
      break;
    case 'profile':
      registry = profileRegistry;
      break;
    default:
      return [];
  }
  
  return Array.from(registry.entries()).map(([name, url]) => ({ name, url }));
};

/**
 * Check if an asset exists
 * @param type - The asset type
 * @param name - The asset name (without extension)
 * @returns boolean indicating if the asset exists
 */
export const hasAsset = (type: 'certificates' | 'projects' | 'profile', name: string): boolean => {
  switch (type) {
    case 'certificates':
      return certificateRegistry.has(name);
    case 'projects':
      return projectRegistry.has(name);
    case 'profile':
      return profileRegistry.has(name);
    default:
      return false;
  }
};

/**
 * Get asset counts for all types
 * @returns Object with counts for each asset type
 */
export const getAssetCounts = (): { certificates: number; projects: number; profile: number } => {
  return {
    certificates: certificateRegistry.size,
    projects: projectRegistry.size,
    profile: profileRegistry.size,
  };
};

// Export registries for direct access if needed
export const assetRegistries = {
  certificates: certificateRegistry,
  projects: projectRegistry,
  profile: profileRegistry,
};
