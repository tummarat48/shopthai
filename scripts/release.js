const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const archiver = require('archiver');

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

function createZip(outputPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => resolve());
    archive.on('error', err => reject(err));

    archive.pipe(output);
    archive.glob('**/*', {
      ignore: ['node_modules/**', 'dist/**', '.git/**', '.next/**', '.github/**']
    });
    archive.finalize();
  });
}

async function main() {
  run('npm run build');
  fs.mkdirSync('dist', { recursive: true });
  const name = `shopthai-${Date.now()}.zip`;
  const out = path.join('dist', name);
  console.log('Creating', out);
  await createZip(out);
  console.log('Created', out);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
