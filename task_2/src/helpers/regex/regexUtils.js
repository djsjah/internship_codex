export function applyRegexByCleanedExec(regex, str) {
  applyRegexCheck(regex, str);

  let matches = [];
  let match;

  while ((match = regex.exec(str)) !== null) {
    const cleanedMatch = match[0].replace(/\s+/g, ' ').trim();
    matches.push(cleanedMatch);
  }

  return matches;
}

export function applyRegexByFirstExec(regex, str) {
  applyRegexCheck(regex, str);

  const result = regex.exec(str);
  if (result && result[1]) {
    return result[1];
  }
}

export function applyRegex(regex, str) {
  applyRegexCheck(regex, str);
  return str.match(regex);
}

function applyRegexCheck(regex, str) {
  if (!(regex instanceof RegExp) || typeof str !== 'string') {
    throw new Error('regex must be a regular expression and str must be a string');
  }
}
