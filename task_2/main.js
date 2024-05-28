import path from 'path';
import logErrorToFile from './src/logger/errorLogger/errorLogger.js';
import storyService from './src/domain/story/storyService.js';
import {
  writeToFile,
  ensureDirectoryExists,
  clearFile
} from './src/helpers/file/fileService.js';

const URL = 'https://www.anekdot.ru/random/anekdot/';
const STORAGE_DIR = './storage';
const STORAGE_FILE_NAME = 'storage.json';

main().catch((err) => {
  logErrorToFile(err);
})

async function main() {
  let dataStorage = await storyService(URL);
  dataStorage = JSON.stringify(dataStorage, null, 3);

  ensureDirectoryExists(STORAGE_DIR);
  const storageFilePath = path.join(STORAGE_DIR, STORAGE_FILE_NAME);

  clearFile(storageFilePath);
  writeToFile(storageFilePath, dataStorage);
}
