/**
 * A simple tool for parsing the custom method names for
 * each endpoint in an OpenAPI spec. Detects any duplicate
 * or missing methods.
 */

const fs = require('fs');

function parseSpecFile(filePath) {
  const namesUtilized = [];
  let index = 1;

  const raw = fs.readFileSync(filePath);
  const { paths } = JSON.parse(raw);

  Object.keys(paths).map((key) => {
    const prefix = key.split('/')[1];
    const path = paths[key];

    Object.keys(path).map((method) => {
      const methodData = path[method];

      let methodNameCamel = 'n/a';
      let methodNameSnake = 'n/a';

      if (
        methodData &&
        methodData['x-custom-config'] &&
        methodData['x-custom-config']['methodNameCamel'] &&
        methodData['x-custom-config']['methodNameSnake']
      ) {
        methodNameCamel = methodData['x-custom-config']['methodNameCamel'];
        methodNameSnake = methodData['x-custom-config']['methodNameSnake'];

        methodTag = prefix + '.' + methodNameCamel;

        const methodLabel =
          index +
          '. ' +
          prefix.replace('-', '_') +
          '.' +
          methodNameCamel +
          '()';

        if (namesUtilized.includes(methodTag)) {
          console.log('🛑  ' + methodLabel);
        } else {
          console.log('✅  ' + methodLabel);
        }

        // Ensure the snake_case methodName matches the camelCase name.
        if (toCamelCase(methodNameSnake) !== methodNameCamel) {
          console.log(`\t🛑 method name mismatch`);
        }

        namesUtilized.push(methodTag);
        index++;
      } else {
        console.log(
          '🛑  No custom method name specified for path: ' +
            path +
            ' method: ' +
            method
        );
      }
    });
  });
}

function toCamelCase(text) {
  return text.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
}

parseSpecFile('../../spec/marketing.json');
parseSpecFile('../../spec/transactional.json');
