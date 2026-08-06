import { access, readFile, stat } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "robots.txt",
  "sitemap.xml",
  "manifest.webmanifest",
  "public/assets/jitesh-sharma-profile.jpeg",
  "public/assets/wishing-experience.jpg",
  "public/assets/private-wishing-experience.jpg",
  "public/assets/Jitesh-Sharma-Resume.pdf",
  "public/assets/favicon.svg",
  "public/assets/og-jitesh-dev.svg"
];

for (const file of requiredFiles) {
  await access(file);
  const info = await stat(file);
  if (info.size === 0) throw new Error(`${file} is empty`);
}

const html = await readFile("index.html", "utf8");
const mustContain = [
  "Jitesh Sharma",
  "jiteshdubey878@gmail.com",
  "https://wa.me/917253847693",
  "Jitesh-Sharma-Resume.pdf",
  "wishing-experience.jpg",
  "private-wishing-experience.jpg"
];

for (const text of mustContain) {
  if (!html.includes(text)) throw new Error(`Missing expected content: ${text}`);
}

if (/hospital management/i.test(html)) {
  throw new Error("Hospital Management System must not be public in Part 1.");
}

const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
for (const ref of refs) {
  if (!ref.startsWith("public/")) continue;
  await access(ref);
}

console.log("Build check passed.");
