export const getField = (currentIndex, fields) => {
  currentIndex = currentIndex.toString();
  let indexes, altered, componentIndexes;

  let delimiterIndex = currentIndex.indexOf('#');
  if (delimiterIndex >= 0) {
    indexes = currentIndex.substr(0, delimiterIndex).split('-');
    componentIndexes = currentIndex.substr(delimiterIndex + 1).split('-');
    altered = fields[indexes[0]].rows[componentIndexes[0]][componentIndexes[1]];
  } else {
    indexes = currentIndex.split('-');
    if (indexes[1]) {
      altered = fields[indexes[0]].columns[indexes[1]];
    } else {
      altered = fields[indexes[0]];
    }
  }

  let original = fields.splice(indexes[0], 1)[0];
  return { indexes, original, altered };
};
