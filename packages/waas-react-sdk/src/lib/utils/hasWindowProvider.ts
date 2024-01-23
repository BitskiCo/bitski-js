export const hasWindowProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return true;
  }

  return false;
};
