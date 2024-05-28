export async function htmlProcessingService(url) {
  return (await getHTML(url));
}

export function removeHTML(str) {
  return str.replace(/<br\s*\/?>/gi, ' \n')
    .replace(/<[^>]*>?/gm, ' ');
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
