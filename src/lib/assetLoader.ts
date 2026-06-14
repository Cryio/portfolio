// Certificate images - eager loaded so badges are available synchronously
const certificateModules = import.meta.glob<{ default: string }>(
  '/src/assets/certificates/**/*.{png,jpg,jpeg,webp,svg,gif}',
  { eager: true }
);

// Project images (eager loaded - visible on main page)
const projectModules = import.meta.glob<{ default: string }>(
  '/src/assets/projects/*.{png,jpg,jpeg,webp,svg,gif}',
  { eager: true }
);

// Profile images (eager loaded - visible on main page)
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
    registry.set(getBaseName(path), module.default);
  });
  return registry;
};

const certificateRegistry = createAssetRegistry(certificateModules);
const projectRegistry = createAssetRegistry(projectModules);
const profileRegistry = createAssetRegistry(profileModules);

export const getCertificateImage = (name: string): string | undefined => {
  return certificateRegistry.get(name);
};

export const getProjectImage = (name: string): string | undefined => {
  return projectRegistry.get(name);
};

export const getProfileImage = (name: string): string | undefined => {
  return profileRegistry.get(name);
};

export const getAllAssetNames = (type: 'certificates' | 'projects' | 'profile'): Array<string> => {
  switch (type) {
    case 'certificates': return [...certificateRegistry.keys()];
    case 'projects':     return [...projectRegistry.keys()];
    case 'profile':      return [...profileRegistry.keys()];
    default:             return [];
  }
};

export const hasAsset = (type: 'certificates' | 'projects' | 'profile', name: string): boolean => {
  switch (type) {
    case 'certificates': return certificateRegistry.has(name);
    case 'projects':     return projectRegistry.has(name);
    case 'profile':      return profileRegistry.has(name);
    default:             return false;
  }
};

export const getAssetCounts = () => ({
  certificates: certificateRegistry.size,
  projects:     projectRegistry.size,
  profile:      profileRegistry.size,
});

/** @deprecated Use getAllAssetNames */
export const getAllAssets = getAllAssetNames;
