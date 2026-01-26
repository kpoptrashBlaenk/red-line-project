/**
 * Create an array of placeholder images labeled with their index
 *
 * @param texts Texts to display on the images
 */
export default function (texts: (string | number)[]) {
  return Array.from({ length: texts.length }, (v, k) => `https://placehold.co/600x400/EEE/31343C?text=${texts[k]}`)
}
