const core = require('@actions/core');
const { existsSync } = require('fs');
const editJsonFile = require('edit-json-file');

const fail = (reason) => {
  core.setFailed(reason);
  return 1;
};

const langMap = new Map([
  ['csharp', 'packageVersion'],
  ['java', 'artifactVersion'],
  ['javascript', 'projectVersion'],
  ['php', 'artifactVersion'],
  ['python', 'packageVersion'],
  ['ruby', 'gemVersion'],
]);

async function run() {
  try {
    const { api, lang, specVersion } = require('yargs').argv;

    if (!api || !lang || !specVersion) {
      console.log({ api, lang, specVersion });
      throw new Error('must include --api, --lang, and --specVersion args');
    }

    const configPath = `swagger-config/${api}/${lang}/config.json`;
    if (!existsSync(configPath)) {
      throw new Error(`config could not be found at ${configPath}`);
    }

    if (langMap.get(lang)) {
      const configKey = langMap.get(lang);

      const configFile = editJsonFile(configPath);
      configFile.set(configKey, specVersion);
      configFile.save();

      console.log(`Set config.${configKey} to ${specVersion}`);
    } else {
      console.log(`Unrecognized lang ${lang}, not altering config`);
    }

    return 0;
  } catch (err) {
    return fail(err.message);
  }
}

run();
