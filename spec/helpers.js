const fs   = require('fs');
const path = require('path');

const readFixtureFile = (name) => {
  const fixturePath = path.join(__dirname, 'fixtures', name);
  return fs.readFileSync(fixturePath);
};

module.exports = { readFixtureFile };