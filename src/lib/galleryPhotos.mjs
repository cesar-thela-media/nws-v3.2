/**
 * Split gallery photos for the project-photos section:
 * first 4 → gallery-03, remainder → gallery-01.
 * Never replaces remainder with the first four.
 *
 * @param {string[]} images
 * @returns {{ featured: string[], remaining: string[] }}
 */
export function splitGalleryPhotos(images) {
  return {
    featured: images.slice(0, 4),
    remaining: images.slice(4),
  };
}
