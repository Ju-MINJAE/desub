export const getProfileImage = (imgUrl?: string) => {
  const DEFAULT_IMAGE = '/icons/profile.svg';

  if (!imgUrl || imgUrl === 'none' || imgUrl.includes('googleusercontent.com')) {
    return DEFAULT_IMAGE;
  }

  return imgUrl;
};
