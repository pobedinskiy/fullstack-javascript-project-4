import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import os from 'os';
import nock from 'nock';
import path from 'path';
import { test, expect, beforeEach, beforeAll } from '@jest/globals';
import pageLoader from '../src/index.js';

nock.disableNetConnect(); /* запрет HTTP-запросов */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); /*  __dirname — директория, в которой находится данный файл с тестами */

const getFixturePath = (filename) => path.join(__dirname, '../__fixtures__', filename);
const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');
// const tmpFilePath = path.join(os.tmpdir());

let fixturesFileData;
let pathToTmpDir;

beforeAll(async () => {
  fixturesFileData = await readFile('ru-hexlet-io-courses.html');
  // console.log(fixturesFileData);
});

beforeEach(async () => {
  pathToTmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
});

test('Content should be copied successfully', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, fixturesFileData);
  const expectedHtml = fixturesFileData;
  await pageLoader('https://ru.hexlet.io/courses', pathToTmpDir);
  const actualHTML = await fs.readFile(path.join(pathToTmpDir, '/', 'ru-hexlet-io-courses.html'), 'utf-8');
  console.log(actualHTML);
  expect(actualHTML).toEqual(expectedHtml);
});

test('Filepath should be changed correctly', async () => {
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, fixturesFileData);
  const expectedFilePath = `${pathToTmpDir}/ru-hexlet-io-courses.html`;
  const actualFilePath = await pageLoader('https://ru.hexlet.io/courses', pathToTmpDir);
  expect(expectedFilePath).toEqual(actualFilePath);
});
