import { useState } from 'react';

export function useWeddingImages() {
  const [images] = useState<{ brideUrl: string, groomUrl: string }>({
    brideUrl: "./images/bride.png",
    groomUrl: "./images/groom.png"
  });

  return { images, loading: false };
}
