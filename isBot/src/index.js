import {botPatterns, starters} from './patterns';

const regex = new RegExp('(' + botPatterns.join('|') + ')', 'i');
const regStart = new RegExp('^(' + starters.join('|') + ')', 'i');

export const isBot = ua => {
  return !regStart.test(ua) || regex.test(ua);
};
