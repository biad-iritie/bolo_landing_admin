const fs = require("fs");
const path = require("path");

const imageFiles = [
  "placeholder-extension.png",
  "placeholder-partner-1.png",
  "placeholder-partner-2.png",
  "placeholder-partner-3.png",
  "placeholder-partner-4.png",
  "placeholder-avatar-1.png",
  "placeholder-avatar-2.png",
  "placeholder-avatar-3.png",
];

// Check if placeholder-admin.png exists
const adminImagePath = path.join("public", "placeholder-admin.png");
if (fs.existsSync(adminImagePath)) {
  imageFiles.push("placeholder-admin.png");
}

// Process each image file
imageFiles.forEach((filename) => {
  const filePath = path.join("public", filename);

  try {
    // Read the file content (base64 data URL)
    const content = fs.readFileSync(filePath, "utf8");

    if (content.includes("data:image/png;base64,")) {
      // Extract the base64 data (remove the data:image/png;base64, prefix)
      const base64Data = content.replace("data:image/png;base64,", "").trim();

      // Convert to binary buffer
      const buffer = Buffer.from(base64Data, "base64");

      // Save as actual PNG file
      fs.writeFileSync(filePath, buffer);

      console.log(`Converted ${filename} to PNG`);
    } else {
      console.log(`Skipping ${filename} - not a valid base64 data URL`);
    }
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
  }
});

console.log("All images converted");
