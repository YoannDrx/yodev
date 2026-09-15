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
for (const [key, brand] of Object.entries(manifest.products)) {
  copies.push([`public/brand/${key}-symbol.svg`, Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="${brand.accent}" d="${symbol}"/></svg>\n`)]);
  const label = key === "yodev" ? "yodev" : `yodev ${brand.name.split(" ")[1]}`;
  copies.push([`public/brand/${key}-logo.svg`, Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 48"><path transform="translate(0 8)" fill="${brand.accent}" d="${symbol}"/><text x="44" y="34" font-family="DM Sans,Arial,sans-serif" font-weight="600" font-size="30" fill="#ebefeb">${label}</text></svg>\n`)]);
  copies.push([`public/brand/${key}-logo-light.svg`, Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 48"><path transform="translate(0 8)" fill="${brand.accentLight}" d="${symbol}"/><text x="44" y="34" font-family="DM Sans,Arial,sans-serif" font-weight="600" font-size="30" fill="#18201b">${label}</text></svg>\n`)]);
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
