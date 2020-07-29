const core = require('@actions/core');
const { existsSync } = require('fs');
const SwaggerParser = require('@apidevtools/swagger-parser');

const fail = (reason) => {
  core.setFailed(reason);
  return 1;
};

async function run() {
  try {
    const { api } = require('yargs').argv;

    if (!api) {
      throw new Error('must include --api arg');
    }

    const specPath = `spec/${api}.json`;
    if (!existsSync(specPath)) {
      throw new Error(`spec could not be found at ${specPath}`);
    }

    const parsed = await SwaggerParser.validate(specPath);
    const { version } = parsed.info;

    if (!version) {
      throw new Error('could not detect spec version');
    }

    core.setOutput('version', version);
    console.log(`Setting SPEC_VERSION to ${version}`);
    return 0;
  } catch (err) {
    return fail(err.message);
  }
}

run();
