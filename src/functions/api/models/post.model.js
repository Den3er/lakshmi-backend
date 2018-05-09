import database from '../../config/database';

const updatePostLikes = async (postId, userId, likes = 0, dislikes = 0) => {
  const reference = database.ref(`posts/${postId}`);

  for (let i = 0; i < likes; i += 1) {
    reference.child('likes').push({
      timestamp: Date.now(),
      user_id: userId
    });
  }

  for (let i = 0; i < dislikes; i += 1) {
    reference.child('dislikes').push({
      timestamp: Date.now(),
      user_id: userId
    });
  }
};

export default updatePostLikes;
