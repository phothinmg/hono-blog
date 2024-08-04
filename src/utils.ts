/**
 * Reads a file synchronously and returns its contents as a string.
 *
 * @param {string} file - The path of the file to read.
 * @return {string} The content of the file as a string.
 */
export function readFile(file: string): string {
  try {
    const decoder = new TextDecoder("utf-8");
    const fdata = Deno.readFileSync(file);
    const data = decoder.decode(fdata);
    return data;
  } catch (error) {
    console.error(`Error reading file ${file}:`, error);
    throw error;
  }
}
/**
 * Calculates the estimated reading time of a given text.
 *
 * @param {string} text - The text to calculate the reading time for.
 * @return {number} The estimated reading time in minutes.
 */
export function readingTime(text: string): number {
  const wpm = 225;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wpm);
}
/**
 * Returns the filename from the given file path.
 *
 * @param filePath - The path of the file.
 * @returns The filename extracted from the file path.
 */
export const getFilename = (filePath: string) => {
  return filePath.split("/").slice(-1)[0];
};
/**
 * Returns the base name of the file from the given file path.
 *
 * @param filePath - The path of the file.
 * @returns The base name of the file without the extension.
 */
export const getFname = (filePath: string) => {
  return getFilename(filePath).split(".")[0];
};

// export const getfn = (filePath: string) => {
//   const fname = getFilename(filePath);

// };
