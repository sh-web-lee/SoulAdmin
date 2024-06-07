import { createStorage } from '~/packages/utils/src';

const storagePrefix = import.meta.env.VITE_STORAGE_PREFIX || '';

export const localStg = createStorage<StorageType.Local>('local', storagePrefix);
