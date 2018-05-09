import { check } from 'express-validator/check';

export default [
  // prettier-ignore
  check('post_id').isLength({ min: 10 }).trim(),

  // prettier-ignore
  check('action').isIn(['like', 'dislike']).trim()
];
