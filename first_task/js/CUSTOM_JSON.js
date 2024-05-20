class CUSTOM_JSON {
  static stringify(value, replacer = null, space = null) {
    const initSpace = space;
    let objMemory = new Map();

    if (replacer) {
      value = applyReplacer(value, replacer);
      objMemory.clear();
    }

    return customStringify(value, replacer, space);

    function circularReferenceCheck(value) {
      if (typeof value === 'object' && value) {
        if (objMemory.has(value)) {
          throw new Error('TypeError: Converting circular structure to JSON');
        }

        objMemory.set(value, true);
      }
    }

    function applyReplacer(value, replacer) {
      let result = value;

      if (typeof replacer === 'function') {
        if (value instanceof Array) {
          result = [];
        }
        else if (typeof value === 'object') {
          result = {};
        }

        switch (replacer.length) {
          case 0:
          case 1:
            result = replacer(value);
            break;

          default:
            if (!isSingleValue(replacer)) {
              return replacer(value);
            }

            const valueKeys = Object.keys(value);

            for (let i = 0; i < valueKeys.length; i++) {
              const newValue = replacer(valueKeys[i], value[valueKeys[i]]);

              if (
                 newValue !== undefined && typeof value === 'object' && typeof value[valueKeys[i]] !== 'object'
              ) {
                result[valueKeys[i]] = newValue;
              }
              else if (
                newValue !== undefined && typeof value[valueKeys[i]] === 'object' &&
                !(value[valueKeys[i]] instanceof Date)
              ) {
                circularReferenceCheck(value[valueKeys[i]]);
                result[valueKeys[i]] = applyReplacer(value[valueKeys[i]], replacer);
              }
              else if (
                newValue !== undefined && typeof value[valueKeys[i]] === 'object' &&
                value[valueKeys[i]] instanceof Date
              ) {
                result[valueKeys[i]] = newValue.toISOString();
              }
            }
        }
      }
      else if (replacer instanceof Array && value && typeof value === 'object') {
        return setReplacerArray(value, replacer);
      }

      if (typeof result === 'object' && result && !(result instanceof Array) && Object.keys(result).length === 0) {
        return {};
      }

      return result;
    }

    function setReplacerArray(value, replacer) {
      const valueData = Object.entries(value);
      let result = null;

      if (value instanceof Array) {
        result = [];
        for (let i = 0; i < valueData.length; i++) {
          if (typeof valueData[i][1] === 'object') {
            result[i] = setReplacerArray(valueData[i][1], replacer);
          }
          else {
            result[i] = valueData[i][1];
          }
        }

        return result;
      }

      result = {};

      for (const replacerItem of replacer) {
        if (typeof replacerItem === 'string' || typeof replacerItem === 'number') {
          const foundIndex = valueData.findIndex(([key]) => key === `${replacerItem}`);
          if (foundIndex !== -1) {
            if (typeof valueData[foundIndex][1] === 'object') {
              circularReferenceCheck(valueData[foundIndex][1]);
              result[`${replacerItem}`] = setReplacerArray(valueData[foundIndex][1], replacer);
            }
            else {
              result[`${replacerItem}`] = valueData[foundIndex][1];
            }
          }
        }
      }

      return result;
    }

    function isSingleValue(func) {
      const funcSourceCode = func.toString();
      const paramsList = funcSourceCode.match(/\(([^)]+)\)/)[1].split(', ');
      const curParam = paramsList[1];

      if (funcSourceCode.includes(`return ${curParam}`)) {
        return true;
      }
      else {
        return false;
      }
    }

    function customStringify(value, replacer, space) {
      circularReferenceCheck(value);

      switch (typeof value) {
        case 'number':
          if (value === Infinity || isNaN(value)) {
            return `${null}`;
          }

          return `${value}`;

        case 'boolean':
          return `${value}`;

        case 'string':
          return `"${value}"`;

        case 'bigint':
          throw new Error('Uncaught TypeError: Do not know how to serialize a BigInt');

        case 'object':
          if (value instanceof Array) {
            return customStringifyArr(value, replacer, space);
          }
          else if (value instanceof Date) {
            return `"${value.toISOString()}"`;
          }
          else {
            return !value ? `${value}` : customStringifyObj(value, replacer, space);
          }

        default:
          return;
      }
    }

    function customStringifyArr(array, replacer, space) {
      let wrap = '';
      let tab = '';
      let rollback = 0;

      if (space) {
        wrap = '\n';
        tab = ' '.repeat(space);
        space += initSpace;
        rollback = space - initSpace * 2;
      }

      let result = '[' + wrap;

      for (let i = 0; i < array.length; i++) {
        const resValue = customStringify(array[i], replacer, space);
        result += tab + (resValue ? resValue : null);

        if (i !== array.length - 1) {
          result += ',' + wrap;
        }
      }

      if (result[result.length - 1] === ',') {
        result = result.slice(0, -1);
      }
      else if (result[result.length - 1] === '\n' && result[result.length - 2] === ',') {
        result = result.slice(0, -2);
      }

      return result + wrap + ' '.repeat(rollback) + ']';
    }

    function customStringifyObj(object, replacer, space) {
      const objectKeys = Object.keys(object);

      let wrap = '';
      let tab = '';
      let indent = '';

      let rollback = 0;

      if (space) {
        wrap = '\n';
        tab = ' '.repeat(space);
        indent = ' ';
        space += initSpace;
        rollback = space - initSpace * 2;
      }

      let result = '{' + wrap;

      for (let i = 0; i < objectKeys.length; i++) {
        const resValue = customStringify(object[objectKeys[i]], replacer, space);
        if (resValue) {
          result += tab + `"${objectKeys[i]}":` + indent + resValue;
        }
        else {
          continue;
        }

        if (i !== objectKeys.length - 1) {
          result += ',' + wrap;
        }
      }

      if (result[result.length - 1] === ',') {
        result = result.slice(0, -1);
      }
      else if (result[result.length - 1] === '\n' && result[result.length - 2] === ',') {
        result = result.slice(0, -2);
      }

      if (space) {
        for (let i = 0; i < result.length; i++) {
          if (result[i] !== '{' && result[i] !== '\n' && result[i] !== '}') {
            break;
          }

          if (i === result.length - 1) {
            return '{}';
          }
        }
      }

      return result + wrap + ' '.repeat(rollback) + '}';
    }
  }
}

window.CUSTOM_JSON = CUSTOM_JSON;
