import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import { getUserByIp, createUser, updatePostLikes, updateUserLikes } from '../models';
import database from '../../config/database';

const parseLikeType = action => ({
  likes: action === 'like' ? 1 : 0,
  dislikes: action === 'dislike' ? 1 : 0
});

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
    const postCreateTime = await database.ref(`posts/${body.post_id}/created_at`).once('value');

    if (!postCreateTime.exists()) {
      return response.status(404).json({
        status: 'error',
        message: 'Entry Point Not Found!'
      });
    }

    const userSnapshot = await getUserByIp(request.clientIp);
    const likeType = parseLikeType(body.action);

    if (userSnapshot.exists()) {
      const user = userSnapshot.val();
      const userId = Object.keys(user)[0];
      const userEntry = user[userId];

      userEntry.key = userId;

      if (differenceInSeconds(Date.now(), userEntry.last_like_event) < 10) {
        return response.status(429).json({
          status: 'error'
        });
      }

      await updateUserLikes(userEntry, likeType.likes, likeType.dislikes);
      await updatePostLikes(body.post_id, userId, likeType.likes, likeType.dislikes);
    } else {
      const newbie = await createUser(request.clientIp, likeType.likes, likeType.dislikes);
      await updatePostLikes(body.post_id, newbie.key, likeType.likes, likeType.dislikes);
    }

    return response.status(201).json({
      status: 'success'
    });
  } catch (error) {
    return response.status(500).json({
      status: 'error',
      message: 'https://static01.nyt.com/images/2016/08/05/us/05onfire1_xp/05onfire1_xp-master768-v2.jpg'
    });
  }
};
