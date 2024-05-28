import path from 'path';
import { appendFile, ensureDirectoryExists } from "../../helpers/file/fileService.js";
import {
  getCurDate,
  getCurMonth,
  getCurYear,
  getCurHours,
  getCurMinutes,
  getCurSeconds
} from '../../helpers/date/dateUtils.js';

const LOGGER_DIR = './logs';

function logErrorToFile(error) {
  ensureDirectoryExists(LOGGER_DIR);

  const errorLogFilePath = path.join(
    LOGGER_DIR,
    `${getCurDate()}.${getCurMonth()}.${getCurYear()} ${getCurHours()}-${getCurMinutes()}-${getCurSeconds()}.txt`
  );

  const lines = error.stack.split('\n');
  const typeError = lines[0].split(': ')[0];
  const atIndex = lines.findIndex(line => line.trim().startsWith('at '));

  let location = 'Unknown Location';

  if (atIndex !== -1) {
    const locationLines = lines.slice(atIndex).join('\n');
    location = locationLines.trim();

    const locationsArray = location.split('\n').map(line => {
      const startCut = line.indexOf("file:");
      const endCut = line.indexOf("task_2");

      if (startCut !== -1 && endCut !== -1) {
        const result = line.substring(0, startCut) + line.substring(endCut);
        return `${result}`;
      }
      return line;
    });

    location = locationsArray.join('\n');
  }

  const errMessage = `${getCurDate()}.${getCurMonth()}.${getCurYear()} ${getCurHours()}:${getCurMinutes()} - ${typeError}:
    CustomError: ${error.message}
    SystemError: ${location}
  `;

  appendFile(errorLogFilePath, errMessage);
}

export default logErrorToFile;
