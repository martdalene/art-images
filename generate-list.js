const fs = require("fs");
const path = require("path");

const directoryPath = __dirname + "/images"; // Replace with the path to your images directory

// Function to retrieve the metadata (name and upload date) of a file
const getMetadata = (filePath) => {
  const { birthtime } = fs.statSync(filePath);
  return {
    uploadDate: birthtime.toISOString(),
  };
};

// Function to get all .jpeg files and their metadata in a directory
const getJPEGFilesWithMetadata = (directoryPath) => {
  const files = fs.readdirSync(directoryPath);
  const jpegFiles = files.filter((file) => path.extname(file) === ".jpeg");
  const filesWithMetadata = jpegFiles.map((file) => ({
    file: "/images/" + file,
    metadata: getMetadata(path.join(directoryPath, file)),
  }));
  return filesWithMetadata;
};

// Call the function with the directory path and log the result
const filesWithMetadata = getJPEGFilesWithMetadata(directoryPath);
console.log(filesWithMetadata);

fs.writeFileSync("./all-images.json", JSON.stringify(filesWithMetadata));
