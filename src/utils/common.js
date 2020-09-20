import { HOST_AUTH } from '@utils/client-utils';

export function absoluteFileUrl(path) {
  const _path = path.toString();
  if (
    _path === '' ||
    _path.startsWith('http') ||
    _path.startsWith('blob')
  )
    return _path;
  return HOST_AUTH + '/bac-si/v1/files/' + _path;
}

export function combineUrlParams(url = '', params = {}) {
  const keys = Object.keys(params);
  const paramUrl = keys
    .reduce(
      (result, key) =>
        params[key] ||
        params[key] === 0 ||
        typeof params[key] === 'boolean'
          ? [...result, `${key}=${params[key]}`]
          : [...result],
      [],
    )
    .join('&');
  return `${url}?${paramUrl}`;
}

export function formatFloatPoint(number, degits) {
  const num = Number.parseFloat(number);
  if (isNaN(num)) return;
  return num.toFixed(degits || 2);
}
