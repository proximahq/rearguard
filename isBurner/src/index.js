import {valid} from './valid';
import {list} from './list';

export const isBurner = (email = '') => {
  const [address, domain] = email.split('@');
  return valid.has(domain) ? false : list.has(domain);
};
