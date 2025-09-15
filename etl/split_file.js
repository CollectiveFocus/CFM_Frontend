const fs = require('fs');
const readline = require('readline');
const path = require('path');

async function splitFile(inputFile, linesPerFile = 50) {
  const fileStream = fs.createReadStream(inputFile);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let fileIndex = 1;
  let lineBuffer = [];
  const baseName = path.basename(inputFile, path.extname(inputFile));
  const ext = path.extname(inputFile);

  for await (const line of rl) {
    lineBuffer.push(line);

    if (lineBuffer.length === linesPerFile) {
      const outFile = `${baseName}_part${fileIndex}${ext}`;
      fs.writeFileSync(outFile, lineBuffer.join('\n') + '\n');
      console.log(`Created: ${outFile}`);
      fileIndex++;
      lineBuffer.length = 0;
    }
  }

  // Write remaining lines (if any)
  if (lineBuffer.length > 0) {
    const outFile = `${baseName}_part${fileIndex}${ext}`;
    fs.writeFileSync(outFile, lineBuffer.join('\n') + '\n');
    console.log(`Created: ${outFile}`);
  }
}

splitFile('output.csv', 50).catch(console.error);
