import { isFuture } from './momentHelper';

test('isFuture should return true for future date', () => {
  const expected = true;
  const result = isFuture('01/11/2099 10:00');
  expect(result).toEqual(expected);
});

test('isFuture should return false for past date', () => {
  const expected = false;
  const result = isFuture('02/10/2016 7:00');
  expect(result).toEqual(expected);
});
