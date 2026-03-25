import { useState, useEffect } from 'react';
import { generateWeddingImages } from '../services/imageService';

export function useWeddingImages() {
  const [images, setImages] = useState<{ brideUrl: string, groomUrl: string }>({
    brideUrl: "/images/bride.png", // Default to local assets
    groomUrl: "/images/groom.png"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        // Check if local images exist by attempting to fetch them
        const brideRes = await fetch("/images/bride.png", { method: 'HEAD' });
        const groomRes = await fetch("/images/groom.png", { method: 'HEAD' });

        if (brideRes.ok && groomRes.ok) {
          setLoading(false);
          return;
        }

        // If local images don't exist, fall back to AI generation
        const result = await generateWeddingImages();
        setImages(result);
      } catch (error) {
        console.error("Failed to load wedding images, using placeholders:", error);
        setImages({
          brideUrl: "https://picsum.photos/seed/indian-bride/400/400",
          groomUrl: "https://picsum.photos/seed/indian-groom/400/400"
        });
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  return { images, loading };
}
