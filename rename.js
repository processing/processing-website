const fs = require('fs');
const path = require('path');
const recursive = require('recursive-readdir');

const run = async () => {
  const files = await recursive('./content/examples');
  files.forEach((file) => {
    const dir = path.dirname(file);
    const base = path.basename(file);
    const shouldRename = base[0] === '1';
    if (shouldRename) {
      const newBase = base.substring(1);
      fs.renameSync(file, path.join(dir, newBase));
    }
  });
};

run();
