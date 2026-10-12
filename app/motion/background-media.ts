// Owner-provided footage; original exports remain untouched in public/.
const footage = (name: string) => ({
  src: `/media/videos/${name}.mp4`,
  poster: `/media/videos/posters/${name}.jpg`,
});
export const ambientFootage = footage("tokilo-ambient-tech");
export const productFootage = footage("tokilo-connected-products");
export const aiFootage = footage("tokilo-ai-network");
export const engineeringFootage = footage("tokilo-digital-engineering");
export const growthFootage = footage("tokilo-growth-ribbon");
