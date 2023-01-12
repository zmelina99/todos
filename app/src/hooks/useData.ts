import { useState } from 'react';

const useSetData = (initialData: any, property: string) => {
  const [data, setData] = useState(initialData);
  const updateData = (updates: any) => {
    if (updates === 'submited') setData({ name: '', [property]: '' });
    else if (typeof updates === 'string') {
      setData({ ...data, [property]: updates });
    } else setData({ ...data, name: updates?.target.value });
  };

  return [data, updateData];
};

export default useSetData;
