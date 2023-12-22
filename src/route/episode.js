import express from 'express';
import { login, token, authenticateToken, logout } from '../controller/authController.js';
import { getEpisodes, searchEpisodes} from '../controller/episodeController.js';


const router = express.Router();

router.route('/')
  .get(authenticateToken, getEpisodes)

router.route('/login')
  .post(login);

router.route('/token')
  .post(token);

router.route('/logout')
.delete(logout);

router.route('/search')
  .get(authenticateToken, searchEpisodes);

export default router;
