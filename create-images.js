// This script creates placeholder images for the project
const fs = require("fs");
const { createCanvas } = require("canvas");

// Define the images to create
const images = [
  {
    name: "placeholder-extension.png",
    width: 500,
    height: 400,
    color: "#4F46E5",
    text: "Extension Screenshot",
  },
  {
    name: "placeholder-admin.png",
    width: 500,
    height: 400,
    color: "#10B981",
    text: "Admin Dashboard",
  },
  {
    name: "placeholder-partner-1.png",
    width: 300,
    height: 100,
    color: "#F59E0B",
    text: "Partner 1",
  },
  {
    name: "placeholder-partner-2.png",
    width: 300,
    height: 100,
    color: "#EF4444",
    text: "Partner 2",
  },
  {
    name: "placeholder-partner-3.png",
    width: 300,
    height: 100,
    color: "#8B5CF6",
    text: "Partner 3",
  },
  {
    name: "placeholder-partner-4.png",
    width: 300,
    height: 100,
    color: "#06B6D4",
    text: "Partner 4",
  },
  {
    name: "placeholder-avatar-1.png",
    width: 100,
    height: 100,
    color: "#EC4899",
    text: "User 1",
  },
  {
    name: "placeholder-avatar-2.png",
    width: 100,
    height: 100,
    color: "#F97316",
    text: "User 2",
  },
  {
    name: "placeholder-avatar-3.png",
    width: 100,
    height: 100,
    color: "#14B8A6",
    text: "User 3",
  },
];

// Create the images
images.forEach((img) => {
  try {
    // Create canvas with the specified dimensions
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");

    // Fill background
    ctx.fillStyle = img.color;
    ctx.fillRect(0, 0, img.width, img.height);

    // Add text
    ctx.fillStyle = "white";
    ctx.font = `bold ${Math.floor(img.width / 15)}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(img.text, img.width / 2, img.height / 2);

    // Save to file
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(`public/${img.name}`, buffer);

    console.log(`Created ${img.name}`);
  } catch (error) {
    console.error(`Error creating ${img.name}:`, error.message);
  }
});

console.log("All placeholder images created!");
