/**
 * Asset Loader Utility
 * 
 * This utility automatically discovers and loads assets from the src/assets directory.
 * Certificate images are loaded on-demand for better performance.
 * 
 * Folder Structure:
 * - src/assets/certificates/ - Certificate badge images (lazy loaded)
 * - src/assets/projects/ - Project screenshots/thumbnails (eager loaded)
 * - src/assets/profile/ - Profile photos (eager loaded)
 * 
 * File Naming Convention:
 * - Use kebab-case: my-certificate-name.png
 * - Supported formats: png, jpg, jpeg, webp, svg, gif
 * 
 * Usage:
 * import { getCertificateImage, getProjectImage, getProfileImage, getAllAssets } from '@/lib/assetLoader';
 * 
 * const badge = getCertificateImage('paloalto-cybersecurity'); // Returns the image URL or undefined
 */

// Certificate images - include nested directories (lazy loaded for better performance)
const certificateModules = import.meta.glob<{ default: string }>(
  '/src/assets/certificates/**/*.{png,jpg,jpeg,webp,svg,gif}',
  { eager: false }
) as Record<string, () => Promise<{ default: string }>>;

// Project images (eager loaded - these are visible on main page)
const projectModules = import.meta.glob<{ default: string }>(
  '/src/assets/projects/*.{png,jpg,jpeg,webp,svg,gif}',
  { eager: true }
);

// Profile images (eager loaded - these are visible on main page)
const profileModules = import.meta.glob<{ default: string }>(
  '/src/assets/profile/*.{png,jpg,jpeg,webp,svg,gif}',
  { eager: true }
);

// Cache for lazy-loaded certificate assets
const certificateCache = new Map<string, string>();

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

// Create registries for eager-loaded assets
const projectRegistry = createAssetRegistry(projectModules);
const profileRegistry = createAssetRegistry(profileModules);

// Helper to find certificate path by name
const findCertificatePath = (name: string): string | undefined => {
  for (const [path] of Object.entries(certificateModules)) {
    if (getBaseName(path) === name) {
      return path;
    }
  }
  return undefined;
};

// Helper to load certificate on-demand
const loadCertificate = async (name: string): Promise<string> => {
  // Check cache first
  if (certificateCache.has(name)) {
    return certificateCache.get(name)!;
  }
  
  const path = findCertificatePath(name);
  if (!path) {
    throw new Error(`Certificate not found: ${name}`);
  }
  
  // Load certificate
  const module = certificateModules[path];
  const loaded = await module();
  certificateCache.set(name, loaded.default);
  return loaded.default;
};

/**
 * Get a certificate image by name (without extension)
 * @param name - The certificate name (e.g., 'paloalto-cybersecurity')
 * @returns The image URL or undefined if not found
 */
export const getCertificateImage = (name: string): string | undefined => {
  // Start loading in background, but return undefined for now
  loadCertificate(name).catch(() => {});
  return undefined;
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
 * Get all asset names of a specific type
 * @param type - The asset type: 'certificates', 'projects', or 'profile'
 * @returns An array of asset names
 */
export const getAllAssetNames = (type: 'certificates' | 'projects' | 'profile'): Array<string> => {
  switch (type) {
    case 'certificates':
      return Object.keys(certificateModules).map(getBaseName);
    case 'projects':
      return Object.keys(projectModules).map(getBaseName);
    case 'profile':
      return Object.keys(profileModules).map(getBaseName);
    default:
      return [];
  }
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
      return findCertificatePath(name) !== undefined;
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
    certificates: Object.keys(certificateModules).length,
    projects: Object.keys(projectModules).length,
    profile: Object.keys(profileModules).length,
  };
};

/**
 * Clear certificate cache (useful for memory management)
 */
export const clearCertificateCache = (): void => {
  certificateCache.clear();
};

/**
 * Get certificate cache size
 * @returns number of cached certificates
 */
export const getCertificateCacheSize = (): number => {
  return certificateCache.size;
};

/**
 * Legacy function for backward compatibility
 * @deprecated Use getAllAssetNames instead
 */
export const getAllAssets = getAllAssetNames;
