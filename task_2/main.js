const FS = require('fs');
const PATH = require('path');

const URL = 'https://www.anekdot.ru/random/anekdot/';
const STORAGE_DIR = 'C:/Storage';
const STORAGE_FILE_NAME = 'storage.json';
const LOGGER_DIR = 'C:/Logger';

const storyDataModel = {
  id: null,
  text: null,
  date: null,
  rating: null,
  tags: [],
  author: null
};

let dataStorage = [];

main().catch((err) => {
  ensureDirectoryExists(LOGGER_DIR);

  const errorLogFilePath = PATH.join(
    LOGGER_DIR,
    `${getCurDate()}.${getCurMonth()}.${getCurYear()} ${getCurHours()}-${getCurMinutes()}-${getCurSeconds()}.txt`
  );

  logErrorToFile(err, errorLogFilePath);
})

async function main() {
  const HTML = await getHTML(URL);

  const dataChunk = applyRegex(
    /<[a-z]+[^>]*class="topicbox"[^>]*>([\s\S]*?(?=<[a-z]+[^>]*class="topicbox"|<\/body>))/gs,
    HTML
  );

  for (let i = 0; i < dataChunk.length; i++) {
    const data = { ...storyDataModel };

    data.id = applyRegexByFirstExec(/data-id="([^"]+)"/, dataChunk[i]);
    if (!data.id) {
      continue;
    }

    data.text = removeHTML(applyRegexByFirstExec(/<[a-z]+ class="text">(.*?)<\/[a-z]+>/s, dataChunk[i]));

    const dataDate = applyRegexByFirstExec(
      /<[a-z]+ class="title">\s*<a href=".+?">(.*?)<\/a>\s*<\/[a-z]+>/, dataChunk[i]
    );
    const [dataDateDay, dataDateMonth, dataDateYear] = dataDate.split('.').map(Number);

    data.date = new Date(`${dataDateMonth}.${dataDateDay}.${dataDateYear}`);
    data.rating = applyRegexByFirstExec(/data-r="([^;]+)/, dataChunk[i]);

    const dataTagsContainer = applyRegexByFirstExec(/<div class="tags">(.*?)<\/div>/s, dataChunk[i]);
    if (dataTagsContainer) {
      const dataTagsItem = applyRegexByCleanedExec(/<a href="(.*?)">(.*?)<\/a>/g, dataTagsContainer);

      const currentTags = [];
      for (let j = 0; j < dataTagsItem.length; j++) {
        currentTags.push(applyRegexByFirstExec(/>(.*?)</s, dataTagsItem[j]));
      }

      data.tags = currentTags;
    }

    const dataAuthor = applyRegexByFirstExec(
      /<[a-z]+ class="auth" href="[^"]*">(.*?)<\/[a-z]+>/s, dataChunk[i]
    );

    data.author = dataAuthor ? dataAuthor : `${data.author}`;
    dataStorage.push(data);
  }

  dataStorage = JSON.stringify(dataStorage, null, 3);

  ensureDirectoryExists(STORAGE_DIR);
  const storageFilePath = PATH.join(STORAGE_DIR, STORAGE_FILE_NAME);

  clearFile(storageFilePath);
  writeToFile(storageFilePath, dataStorage);
}

async function getHTML(url) {
  if (typeof url !== 'string') {
    throw new Error('Url must be a string!');
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.text}`);
  }

  return (await response.text());
}

function applyRegexByCleanedExec(regex, html) {
  applyRegexCheck(regex, html);

  let matches = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    const cleanedMatch = match[0].replace(/\s+/g, ' ').trim();
    matches.push(cleanedMatch);
  }

  return matches;
}

function applyRegexByFirstExec(regex, html) {
  applyRegexCheck(regex, html);

  const result = regex.exec(html);
  if (result && result[1]) {
    return result[1];
  }
}

function applyRegex(regex, html) {
  applyRegexCheck(regex, html);
  return html.match(regex);
}

function applyRegexCheck(regex, html) {
  if (!(regex instanceof RegExp) || typeof html !== 'string') {
    throw new Error('regex must be a regular expression and html must be a string');
  }
}

function removeHTML(str) {
  return str.replace(/<br\s*\/?>/gi, ' \n')
    .replace(/<[^>]*>?/gm, ' ');
}

function getCurDate() {
  return new Date().getDate().toString().padStart(2, '0');
}

function getCurMonth() {
  return (new Date().getMonth() + 1).toString().padStart(2, '0');
}

function getCurYear() {
  return new Date().getFullYear();
}

function getCurHours() {
  return new Date().getHours().toString().padStart(2, '0');
}

function getCurMinutes() {
  return new Date().getMinutes().toString().padStart(2, '0');
}

function getCurSeconds() {
  return new Date().getSeconds().toString().padStart(2, '0');
}

function ensureDirectoryExists(directoryPath) {
  if (!FS.existsSync(directoryPath)) {
    FS.mkdirSync(directoryPath, { recursive: true });
  }
}

function writeToFile(filePath, record) {
  FS.writeFileSync(filePath, record);
}

function clearFile(filePath) {
  if (FS.existsSync(filePath)) {
    FS.writeFileSync(filePath, '');
  }
}

function logErrorToFile(error, filePath) {
  const lines = error.stack.split('\n');
  const typeError = lines[0].split(': ')[0];
  const atIndex = lines.findIndex(line => line.trim().startsWith('at '));
  let location = 'Unknown Location';

  if (atIndex !== -1) {
    const locationLines = lines.slice(atIndex).join('\n');
    location = locationLines.trim();
  }

  const errMessage = `${getCurDate()}.${getCurMonth()}.${getCurYear()} ${getCurHours()}:${getCurMinutes()} - ${typeError}:
    CustomError: ${error.message}
    SystemError: ${location}
  `;

  FS.appendFileSync(filePath, errMessage + '\n', 'utf8');
}
