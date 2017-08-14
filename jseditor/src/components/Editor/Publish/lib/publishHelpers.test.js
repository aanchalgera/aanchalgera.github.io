import { findById, findByName, toggleItem, getCategories } from './publishHelpers'

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

test('toggleItem should add the item in an array', () => {
  const countries = ['ES', 'IN']
  const expected = ['ES', 'IN', 'US']
  toggleItem('US', countries)
  expect(countries).toEqual(expected)
})


test('toggleItem should remove the item in an array if it exists', () => {
  const countries = ['ES', 'IN']
  const expected = ['ES']
  toggleItem('IN', countries)
  expect(countries).toEqual(expected)
})

test('getCategories should create an array of category objects', () => {
  const categoryTree = {
      4: {
        children: [
          {
            id: 1, cat_name:'First', category_nicename: 'first'
          },
          {
            id: 2, cat_name:'Second', category_nicename: 'second'
          }
        ]
      }
    }
  const expectedResult = [
      {id: 1, categoryName: 'First'},
      {id: 2, categoryName: 'Second'}
    ]

  const actualResult = getCategories(categoryTree)
  expect(actualResult).toEqual(expectedResult)
})