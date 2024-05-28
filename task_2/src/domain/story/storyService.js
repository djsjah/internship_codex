import storyModel from './storyModel.js';
import { htmlProcessingService, removeHTML } from '../htmlProcessing/htmlProcessingService.js';
import {
  applyRegexByCleanedExec,
  applyRegexByFirstExec,
  applyRegex
} from '../../helpers/regex/regexUtils.js';

async function storyService(url) {
  const storyDataStorage = [];
  const HTML = await htmlProcessingService(url);

  const htmlDataChunk = applyRegex(
    /<[a-z]+[^>]*class="topicbox"[^>]*>([\s\S]*?(?=<[a-z]+[^>]*class="topicbox"|<\/body>))/gs,
    HTML
  );

  for (let i = 0; i < htmlDataChunk.length; i++) {
    const storyData = { ...storyModel };

    storyData.id = applyRegexByFirstExec(/data-id="([^"]+)"/, htmlDataChunk[i]);
    if (!storyData.id) {
      continue;
    }

    storyData.text = removeHTML(applyRegexByFirstExec(/<[a-z]+ class="text">(.*?)<\/[a-z]+>/s, htmlDataChunk[i]));

    const storyDataDate = applyRegexByFirstExec(
      /<[a-z]+ class="title">\s*<a href=".+?">(.*?)<\/a>\s*<\/[a-z]+>/, htmlDataChunk[i]
    );
    const [storyDataDateDay, storyDataDateMonth, storyDataDateYear] = storyDataDate.split('.').map(Number);

    storyData.date = new Date(`${storyDataDateMonth}.${storyDataDateDay}.${storyDataDateYear}`);
    storyData.rating = applyRegexByFirstExec(/data-r="([^;]+)/, htmlDataChunk[i]);

    const storyDataTagsContainer = applyRegexByFirstExec(/<div class="tags">(.*?)<\/div>/s, htmlDataChunk[i]);

    if (storyDataTagsContainer) {
      const storyDataTagsItem = applyRegexByCleanedExec(/<a href="(.*?)">(.*?)<\/a>/g, storyDataTagsContainer);
      const currentStoryTags = storyDataTagsItem.map(item => applyRegexByFirstExec(/>(.*?)</s, item)); // map вместо for
      storyData.tags = currentStoryTags;
    }

    const storyDataAuthor = applyRegexByFirstExec(
      /<[a-z]+ class="auth" href="[^"]*">(.*?)<\/[a-z]+>/s, htmlDataChunk[i]
    );

    storyData.author = storyDataAuthor ? storyDataAuthor : `${storyData.author}`;
    storyDataStorage.push(storyData);
  }

  return storyDataStorage;
}

export default storyService;
