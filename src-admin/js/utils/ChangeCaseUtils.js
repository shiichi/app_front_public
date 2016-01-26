import { snakeCase, camelCase } from 'change-case';

function nameToUserId(string) {
  if (string === 'name') {
    return 'userId';
  };
  return string;
}

function userIdToName(string) {
  if (string === 'userId') {
    return 'name';
  };
  return string;
}

export function keyToCamel(object) {
  return Object.keys(object).reduce((result, key) => {
    result[camelCase(nameToUserId(key))] = object[key];
    return result;
  }, {});
}

export function keyToSnake(object) {
  return Object.keys(object).reduce((result, key) => {
    result[snakeCase(userIdToName(key))] = object[key];
    return result;
  }, {});
}

export function keyToCamel2(object) {
  return Object.keys(object).reduce((result, key) => {
    result[camelCase(key)] = object[key];
    return result;
  }, {});
}

export function keyToSnake2(object) {
  return Object.keys(object).reduce((result, key) => {
    result[snakeCase(key)] = object[key];
    return result;
  }, {});
}