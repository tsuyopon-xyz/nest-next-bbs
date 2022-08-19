const STORAGE_KEY_MAP = {
  prefix: 'nest-next-bbs',
  tokens: 'tokens',
};
type STORAGE_KEY_TYPE = keyof typeof STORAGE_KEY_MAP;

const STORAGE_BOOL_MAP = {
  true: 'true',
  false: 'false',
};

export const setHasTokensInCookie = (bool: boolean) => {
  const key = generateStorageKey('tokens');
  const value = bool ? STORAGE_BOOL_MAP.true : STORAGE_BOOL_MAP.false;
  localStorage.setItem(key, value);
};

export const hasTokensInCookie = () => {
  const key = generateStorageKey('tokens');
  return localStorage.getItem(key) === STORAGE_BOOL_MAP.true;
};

const generateStorageKey = (key: STORAGE_KEY_TYPE) => {
  return `${STORAGE_KEY_MAP.prefix}:${STORAGE_KEY_MAP[key]}`;
};
