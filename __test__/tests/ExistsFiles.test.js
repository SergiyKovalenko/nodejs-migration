const chai = require('chai');
const path = require('path');

// expect path
chai.use(require('chai-fs'));

const { expect } = chai;

describe('EXIST FILES', () => {
  it('ExistsFiles Test', (done) => {
    expect(path.join(__dirname, '../../.eslintrc.json')).to.be.a.path();
    done();
  });
  it('ExistsFiles Test', (done) => {
    expect(path.join(__dirname, '../../package-lock.json')).to.be.a.path();
    done();
  });
  it('ExistsFiles Test', (done) => {
    expect(path.join(__dirname, '../../package.json')).to.be.a.path();
    done();
  });
  it('ExistsFiles Test', (done) => {
    expect(path.join(__dirname, '../../src/server/')).to.be.a.directory().with.files(['events.js', 'index.js', 'server.js']);
    done();
  });
});
