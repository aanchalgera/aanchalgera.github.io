import { findById, findByName, toggleItem } from './helpers';

const users = [
  { id: 1, display_name: 'one' },
  { id: 2, display_name: 'two' },
  { id: 3, display_name: 'three' }
];

test('findById should return the expected item from an array', () => {
  const expected = { id: 2, display_name: 'two' };
  const result = findById(2, users);
  expect(result).toEqual(expected);
});

test('findByName should return the expected item from an array', () => {
  const expected = { id: 2, display_name: 'two' };
  const result = findByName('two', users);
  expect(result).toEqual(expected);
});

test('toggleItem should add the item in an array', () => {
  const countries = ['ES', 'IN'];
  const expected = ['ES', 'IN', 'US'];
  expect(toggleItem('US', countries)).toEqual(expected);
});

test('toggleItem should remove the item in an array if it exists', () => {
  const countries = ['ES', 'IN'];
  const expected = ['ES'];
  expect(toggleItem('IN', countries)).toEqual(expected);
});
