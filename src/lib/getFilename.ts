export const getFilename = (filePath: string) => {
  return filePath.split("/").slice(-1)[0];
};

export const getFname = (filePath: string) => {
  return getFilename(filePath).split(".")[0];
};
