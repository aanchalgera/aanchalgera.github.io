import { queryBuilder } from './helpers';

test('queryBuilder should return query', () => {
  const expected = 'form[postId]=23&form[url]=https%3A%2F%2Fdev.xataka.com';
  const data = {
    form: {
      postId: 23,
      url: 'https://dev.xataka.com'
    }
  };
  const result = queryBuilder(data);
  expect(result).toEqual(expected);
});

test('queryBuilder with deep object should return query', () => {
  const expected =
    'form[postId]=23&form[url]=https%3A%2F%2Fdev.xataka.com&form[post_meta][golden]=23&form[post_meta][square]=23';
  const data = {
    form: {
      postId: 23,
      url: 'https://dev.xataka.com',
      post_meta: {
        golden: 23,
        square: 23
      }
    }
  };
  const result = queryBuilder(data);
  expect(result).toEqual(expected);
});
