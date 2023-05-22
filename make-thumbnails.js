// Run on every commit
// Grab all the images from the images folder
// Create 100 x 100 px thumbnails
// Save them all to a folder /thumbnails

const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

const imageDir = "./images"; // The directory with original images
const outputDir = "./thumbnails"; // The directory to save thumbnails

const processImages = async () => {
  try {
    const files = await fs.readdir(imageDir);
    const promises = files.map(async (file) => {
      const imagePath = path.join(imageDir, file);
      try {
        const stat = await fs.lstat(imagePath);
        if (
          stat.isFile() &&
          [".png", ".jpg", ".jpeg"].includes(
            path.extname(imagePath).toLowerCase()
          )
        ) {
          await sharp(imagePath)
            .withMetadata() // Preserve original image metadata
            .resize(100, 100) // Resize the image to 100x100 px
            .toFile(path.join(outputDir, file));
          console.log(
            `Image ${file} has been resized and saved to ${outputDir}`
          );
        }
      } catch (err) {
        console.error("Error during image processing", err);
      }
    });
    await Promise.all(promises);
  } catch (err) {
    console.error("Could not list the directory.", err);
  }
};

processImages();
