import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import database from '../../config/database';

export default async (request, response) => {
  const errors = validationResult(request);
  const body = matchedData(request);

  if (!errors.isEmpty()) {
    return response.status(422).json({
      status: 'error',
      message: 'An error has been occurred! ^_^;'
    });
  }

  try {
    const post = await database.ref('posts').push({
      post_name: body.post_name,
      post_url: body.post_url,
      created_at: Date.now()
    });

    return response.json({
      status: 'success',
      post_id: post.key
    });
  } catch (error) {
    return response.status(500).json({
      status: 'error',
      message: 'https://static01.nyt.com/images/2016/08/05/us/05onfire1_xp/05onfire1_xp-master768-v2.jpg'
    });
  }
};
