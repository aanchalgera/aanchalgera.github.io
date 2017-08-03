import { findById, findByName, toggleItem } from './publishHelpers'

const users = [
    {id:1, display_name: 'one'},
    {id:2, display_name: 'two'},
    {id:3, display_name: 'three'}
  ]

test('findById should return the expected item from an array', () => {
  const expected = {id:2, display_name: 'two'}
  const result = findById(2, users)
  expect(result).toEqual(expected)
})

test('findByName should return the expected item from an array', () => {
  const expected = {id:2, display_name: 'two'}
  const result = findByName('two', users)
  expect(result).toEqual(expected)
})

test('toggleItem should toggle the item in an array', () => {
  const countries = ['ES', 'IN']
  const expected = ['ES', 'IN', 'US']
  toggleItem('US', countries)
  expect(countries).toEqual(expected)
})
