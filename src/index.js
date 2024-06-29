import path from 'path';
import axios from 'axios';
import fs from 'fs/promises';

/* все асинхронные операции  внутри библиотеки должны быть построены на промисах */
/* на данном этапе не производятся манипуляции с содержимым, только сохранение */
/* программа должна возвращать полный путь к загруженному файлу */

const makeName = (url, output) => {
  const name = url.split('ps://')[1]; // url.replace(/htt(p|ps):\/\//, '') - можно и так
  const regEx = /\W/g;
  const editedName = name.replace(regEx, '-').trim('-').concat('.html');
  return path.join(output, editedName);
  /* const newEditedName = editedName.startsWith('-') ? editedName.slice(1) : editedName;
  const newNewEditedName = newEditedName.endsWith('-') ? newEditedName.slice(0, (newEditedName.length - 1)) : newEditedName;
  const extendedName = path.join(output, newNewEditedName.concat('.html'));
  return extendedName; */
};

const pageLoader = (url, output) => {
  const fileName = makeName(url, output);
  axios.get(url)
    .then(({ data }) => fs.writeFile(fileName, data));
  return fileName;
};

export default pageLoader;
