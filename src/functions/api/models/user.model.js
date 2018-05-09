import sillyname from 'sillyname';
import database from '../../config/database';

// prettier-ignore
export const getUserByIp = ip =>
  database.ref('users').orderByChild('client_ip').equalTo(ip).limitToFirst(1).once('value');

export const createUser = (ip, likes = 0, dislikes = 0) =>
  database.ref('users').push({
    silly_name: sillyname(),
    client_ip: ip,
    total_likes: likes,
    total_dislikes: dislikes,
    created_at: Date.now(),
    last_like_event: Date.now()
  });

export const updateUserLikes = (user, likes = 0, dislikes = 0) =>
  database.ref(`users/${user.key}`).update({
    total_likes: user.total_likes + likes,
    total_dislikes: user.total_dislikes + dislikes,
    last_like_event: Date.now()
  });
