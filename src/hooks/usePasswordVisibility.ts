import { useState } from 'react';

export const usePasswordVisibility = (fields: { id: string }[]) => {
  const [inputTypes, setInputTypes] = useState(
    fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.id] = 'password';
      return acc;
    }, {}),
  );

  const [visibilityIcon, setVisibilityIcon] = useState(
    fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.id] = '/icons/visibility.svg';
      return acc;
    }, {}),
  );

  const handleChangeType = (id: string) => {
    setInputTypes(prevState => ({
      ...prevState,
      [id]: prevState[id] === 'password' ? 'text' : 'password',
    }));

    setVisibilityIcon(prevState => ({
      ...prevState,
      [id]:
        prevState[id] === '/icons/visibility.svg'
          ? '/icons/invisibility.svg'
          : '/icons/visibility.svg',
    }));
  };

  return { inputTypes, visibilityIcon, handleChangeType };
};
