const RELATED_PHOTOS = [
  "/images/custom-home-richmond-tx.jpg",
  "/images/hero-home-remodeled-richmond-tx.webp",
  "/images/kitchen-gallery-1.jpeg",
  "/images/custom-homes-7.jpeg",
  "/images/remodeling-1.jpeg",
  "/images/home-remodeling-richmond-tx.jpg",
  "/images/kitchen-gallery-4.jpeg",
  "/images/bathroom-gallery-4.jpeg",
  "/images/whole-home-remodeling-richmond-tx.jpg",
  "/images/Professional-Home-Remodeling-Services-in-Park-Row-TX.webp",
];

export function photosForLocation(heroSrc?: string) {
  const first = heroSrc || RELATED_PHOTOS[0];
  const rest = RELATED_PHOTOS.filter((src) => src !== first);
  return [first, ...rest.slice(0, 3)];
}
