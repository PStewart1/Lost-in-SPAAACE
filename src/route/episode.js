import express from 'express';
import { login, token, authenticateToken, logout } from '../controller/authController.js';
import dotenv from 'dotenv';
import { 
  getEpisodes, 
  getTosEpisodes,
  getTngEpisodes, 
  getDs9Episodes, 
  getVoyEpisodes, 
  getEntEpisodes 
} from '../controller/episodeController.js';


const router = express.Router();
dotenv.config();

router.route('/')
  .get(authenticateToken, getEpisodes)

// router.route('/search/')
//   .get(getEpisodesSearch);

router.route('/login')
  .post(login);

router.route('/token')
  .post(token);

router.route('/logout')
.delete(logout);

router.route('/tos')
  .get(getTosEpisodes);

router.route('/tng')
  .get(getTngEpisodes);

router.route('/ds9')
  .get(getDs9Episodes);

router.route('/voy')
  .get(getVoyEpisodes);

router.route('/ent')
  .get(getEntEpisodes);

export default router;
