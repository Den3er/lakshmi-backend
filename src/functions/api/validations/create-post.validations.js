import { check } from 'express-validator/check';

export default [
  // prettier-ignore
  check('post_name').isLength({ min: 3, max: 60 }).escape().trim(),

  // prettier-ignore
  check('post_url').isURL().trim()
];
