export function getCurDate() {
  return new Date().getDate().toString().padStart(2, '0');
}

export function getCurMonth() {
  return (new Date().getMonth() + 1).toString().padStart(2, '0');
}

export function getCurYear() {
  return new Date().getFullYear();
}

export function getCurHours() {
  return new Date().getHours().toString().padStart(2, '0');
}

export function getCurMinutes() {
  return new Date().getMinutes().toString().padStart(2, '0');
}

export function getCurSeconds() {
  return new Date().getSeconds().toString().padStart(2, '0');
}
