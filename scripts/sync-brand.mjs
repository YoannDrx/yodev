import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const check = process.argv.includes("--check");
const local = process.argv.includes("--local");
const destinations = [root, ...(!local ? ["../yodev-mail", "../yodev-ads/web", "../yodev-spend"].map(p => path.resolve(root, p)) : [])];
const manifest = JSON.parse(await readFile(path.join(root, "brand/manifest.json"), "utf8"));
const copies = [];
for (const file of ["tokens.css", "brand.tsx", "social-image.tsx", "navigation-disclosure.tsx"]) copies.push([`src/brand/${file}`, await readFile(path.join(root, "brand", file))]);
const source = copies.find(([name]) => name.endsWith("brand.tsx"))[1].toString();
const symbol = source.match(/symbolPath = "([^"]+)"/)[1];
// Signal marks: Yodev keeps the bare symbol (on a dark tile in the light theme); products sit on a tile of their fill colour.
const tile = (x, y, fill, ink) => `<rect x="${x}" y="${y}" width="32" height="32" rx="8" fill="${fill}"/><path transform="translate(${x + 6} ${y + 6}) scale(.625)" fill="${ink}" d="${symbol}"/>`;
const wordmark = (label, ink) => { const [first, ...rest] = label.split(" "); return `<text x="44" y="34" font-family="Geist,Arial,sans-serif" font-size="30" letter-spacing="-1.2" fill="${ink}"><tspan font-weight="650">${first}</tspan>${rest.length ? `<tspan font-weight="400"> ${rest.join(" ")}</tspan>` : ""}</text>`; };
for (const [key, brand] of Object.entries(manifest.products)) {
  const label = key === "yodev" ? "yodev" : `yodev ${brand.name.split(" ")[1]}`;
  const mark = key === "yodev" ? `<path fill="${brand.accent}" d="${symbol}"/>` : tile(0, 0, brand.accent, brand.onAccent);
  const markDark = key === "yodev" ? `<path transform="translate(0 8)" fill="${brand.accent}" d="${symbol}"/>` : tile(0, 8, brand.accent, brand.onAccent);
  const markLight = key === "yodev" ? tile(0, 8, manifest.lightColors.text, brand.accent) : tile(0, 8, brand.accent, brand.onAccent);
  copies.push([`public/brand/${key}-symbol.svg`, Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${mark}</svg>\n`)]);
  copies.push([`public/brand/${key}-logo.svg`, Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 48">${markDark}${wordmark(label, manifest.colors.text)}</svg>\n`)]);
  copies.push([`public/brand/${key}-logo-light.svg`, Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 48">${markLight}${wordmark(label, manifest.lightColors.text)}</svg>\n`)]);
}
const hashes = Object.fromEntries(copies.map(([file, body]) => [file, createHash("sha256").update(body).digest("hex")]));
copies.push(["src/brand/manifest.json", Buffer.from(JSON.stringify({ ...manifest, hashes }, null, 2) + "\n")]);
let failures = 0;
for (const target of destinations) for (const [file, body] of copies) {
  const output = path.join(target, file);
  if (check) { const actual = await readFile(output).catch(() => null); if (!actual?.equals(body)) { console.error(`Out of sync: ${output}`); failures++; } }
  else { await mkdir(path.dirname(output), { recursive: true }); await writeFile(output, body); }
}
if (failures) process.exitCode = 1;
else console.log(`Brand ${manifest.version}: ${destinations.length} repositories ${check ? "verified" : "synchronized"}.`);
