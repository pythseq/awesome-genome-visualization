//run this in the static dir folder
//identify -format "%f %wx%h\n" *.jpg *.png > ../../dims.txt
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("TOOLS.json", "utf8"));
const d2 = Object.fromEntries(
  fs
    .readFileSync("dims.txt", "utf8")
    .split("\n")
    .filter((f) => !!f)
    .map((line) => line.split(" "))
);

data.tools = data.tools
  .filter((d) => d2[d.img])
  .map((d) => {
    const entry = d2[d.img];
    const [width, height] = entry.split("x");
    return { ...d, width: +width, height: +height };
  });

fs.writeFileSync("TOOLS.json", JSON.stringify(data, null, 2));