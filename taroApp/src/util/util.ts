import { HOST } from './constant';
export function getOrigin() {
  const isH5 = process.env.CLIENT_ENV === 'h5';
  if (isH5) {
    return window.location.origin;
  } else {
    return HOST;
  }
}
