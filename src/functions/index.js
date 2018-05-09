import * as functions from 'firebase-functions';
import express from './config/express';

exports.api = functions.https.onRequest(express);

/**
 * Firebase Structure
 * ------------------
 * → users
 *   ↓ user_id
 *   — client_ip
 *   — silly_name
 *   — total_likes
 *   — total_dislikes
 *   — created_at
 *   — last_like_event
 * → posts
 *   ↓ post_id
 *   — post_name
 *   — post_url
 *   — created_at
 *   → likes
 *     — timestamp
 *     — user_id
 *   → dislikes
 *     — timestamp
 *     — user_id
 * → stats
 *   ↓ by_posts
 *     ↓ post_id
 *     — last_24_hours
 *     — last_30_days
 *     — all_time
 *   ↓ by_overall
 *   — last_24_hours
 *   — last_30_days
 *   — all_time
 */
