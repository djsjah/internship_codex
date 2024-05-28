import fs from 'fs';

export function appendFile(filePath, message) {
  fs.appendFileSync(filePath, message + '\n', 'utf8');
}

export function writeToFile(filePath, record) {
  fs.writeFileSync(filePath, record);
}

export function ensureDirectoryExists(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

export function clearFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
  }
}
