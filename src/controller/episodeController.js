import log from '../util/logger.js';
import Response from '../../domain/response.js';
import db from '../../db/model/db.js';
import {Op} from 'sequelize';

const HttpStatus = {
  OK: { code: 200, status: 'OK' },
  CREATED: { code: 201, status: 'CREATED' },
  NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
  BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
  UNAUTHORIZED: { code: 401, status: 'UNAUTHORIZED' },
  FORBIDDEN: { code: 403, status: 'FORBIDDEN' },
  NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
  INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' },
};

function paginatedResults(req, array) {
  const page = parseInt(req.page);
  const limit = parseInt(req.limit);
  const offset = (page - 1) * limit;
  const end = page * limit;
  const results = {};
  results.results = array.slice(offset, end);
  if (end < array.length) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }
  if (offset > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }
  return results;
};


export const getEpisodes = async (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, fetching all episodes`);
  let request = [];
  if (Object.entries(req.query).length > 0) {
    request = req.query;
  } 
  // else if (Object.entries(req.body).length > 0) {
  //   request = req.body;
  // } 
  if (!request.page || !request.limit) {
    res.status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code,
        HttpStatus.BAD_REQUEST.status, 'Must include page and limit query parameters'));
    return;
  }

  let shows = [db.tos, db.tng, db.ds9, db.voy, db.ent];
  let resultArray = [];
  for (let i = 0; i < shows.length; i++) {
    if (request.stardate) {
      const query = request.stardate
      const data = await shows[i].findAll({
        where: {
          airdate: { [Op.like]: `%${query}` }
        }
      });
      if (data.length > 0) {
        resultArray.push(...data);
      }
    }
    else if (request.title) {
      const query = request.title
      const data =  await shows[i].findAll({
        where: {
          title: { [Op.like]: `%${query}%` }
        }
      });
      if (data.length > 0) {
        resultArray.push(...data);
      }
    }
    else {
      const data = await shows[i].findAll({})
      resultArray.push(...data)
    }
  }

  if (!resultArray) {
    log.info(resultArray)
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No episodes found'));
  } else {
    const results = paginatedResults(request, resultArray);
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code,
        HttpStatus.OK.status, `Welcome ${req.user.name}! Episodes retrieved`, results));
  }
};


export async function searchEpisodes(req, res) {
  log.info(`${req.method} ${req.originalUrl}, fetching episodes`);
  let request = [];
  if (Object.entries(req.query).length > 0) {
    request = req.query;
  } 
  // else if (Object.entries(req.body).length > 0) {
  //   request = req.body;
  // }
  if (!request.page || !request.limit) {
    res.status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code,
        HttpStatus.BAD_REQUEST.status, 'Must include page and limit query parameters'));
    return;
  }
  if (!request.show) {
    res.status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code,
        HttpStatus.BAD_REQUEST.status, 'Must include show query parameter'));
    return;
  }

  let show = {};
  if (request.show === 'tos') {
    show = db.tos;
  } else if (request.show === 'tng') {
    show = db.tng;
  } else if (request.show === 'ds9') {
    show = db.ds9;
  } else if (request.show === 'voy') {
    show = db.voy;
  } else if (request.show === 'ent') {
    show = db.ent;
  } else {
    res.status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code,
        HttpStatus.BAD_REQUEST.status, 'Must include show query parameter. Choose "tos", "tng", "ds9", "voy", or "ent"'));
    return;
  }

  let episodeArray = [];
  if (request.season) {
    if (request.episode) {
      episodeArray = await show.findAll({
        where: {
          [Op.and]: [
            {season: request.season},
            {episode: request.episode}
        ]}
      });
    }
    else {
      episodeArray = await show.findAll({
        where: {
          season: request.season
        }
      });
    }
  }
  else if (request.stardate) {
    const query = request.stardate
    episodeArray = await show.findAll({
      where: {
        airdate: { [Op.like]: `%${query}` }
      }
    });
    if (episodeArray.length === 0) {
      res.status(HttpStatus.NO_CONTENT.code)
      .send(new Response(HttpStatus.NO_CONTENT.code,
        HttpStatus.NO_CONTENT.status, 'No episodes found. Please search by month and year, using this format: Jan 67'));
    }
  }
  else if (request.title) {
    const query = request.title
    episodeArray = await show.findAll({
      where: {
        title: { [Op.like]: `%${query}%` }
      }
    });
  }
  else {
    episodeArray = await show.findAll({})
  }

  if (episodeArray.length === 0) {
    res.status(HttpStatus.NO_CONTENT.code)
      .send(new Response(HttpStatus.NO_CONTENT.code, HttpStatus.NO_CONTENT.status));
  } else {
    const results = paginatedResults(request, episodeArray);
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code,
        HttpStatus.OK.status, `Welcome ${req.user.name}! Episodes retrieved`, results));
  }
};

export default HttpStatus;
