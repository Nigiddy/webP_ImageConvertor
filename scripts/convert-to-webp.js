import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = "./downloads";       //This is where the images being converted are stored
const outputDir = "./webp";           //This is the folder where the converted images will be saved

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convertImages() {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    if (![".jpg", ".jpeg", ".png"].includes(ext)) {
      continue;
    }

    const inputPath = path.join(inputDir, file);

    const outputPath = path.join(
      outputDir,
      `${path.parse(file).name}.webp`
    );

    try {
      await sharp(inputPath)
        .webp({
          quality: 85,
        })
        .toFile(outputPath);

      console.log(`✓ Converted: ${file}`);
    } catch (error) {
      console.error(`✗ Failed: ${file}`, error);
    }
  }

  console.log("Conversion complete.");
}

convertImages();