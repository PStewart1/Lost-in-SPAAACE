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

const Tos = db.tos;
const Tng = db.tng;
const Ds9 = db.ds9;
const Voy = db.voy;
const Ent = db.ent;

function paginatedResults(req, array) {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
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
  const tosArray = await Tos.findAll({})
  const tngArray = await Tng.findAll({})
  const ds9Array = await Ds9.findAll({})
  const voyArray = await Voy.findAll({})
  const entArray = await Ent.findAll({})

  let resultArray = [
    ...tosArray,
    ...tngArray,
    ...ds9Array,
    ...voyArray,
    ...entArray
  ];

  if (!resultArray) {
    log.info(resultArray)
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No episodes found'));
  } else {
    const results = paginatedResults(req, resultArray);
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code,
        HttpStatus.OK.status, `Welcome ${req.user.name}! Episodes retrieved`, results));
  }
};

export async function getTosEpisodes(req, res) {
  log.info(`${req.method} ${req.originalUrl}, fetching TOS episodes`);
  const tosArray = await Tos.findAll({})
  if (!tosArray) {
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No episodes found'));
  } else {
    const results = paginatedResults(req, tosArray);
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code,
        HttpStatus.OK.status, `Welcome ${req.user.name}! TOS episodes retrieved`, results));
  }
};

export async function getTngEpisodes(req, res) {
  log.info(`${req.method} ${req.originalUrl}, fetching TNG episodes`);
  const tngArray = await Tng.findAll({})
  if (!tngArray) {
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No episodes found'));
  } else {
    const results = paginatedResults(req, tngArray);
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code,
        HttpStatus.OK.status, `Welcome ${req.user.name}! TNG episodes retrieved`, results));
  }
};

export async function getDs9Episodes(req, res) {
  log.info(`${req.method} ${req.originalUrl}, fetching DS9 episodes`);
  const ds9Array = await Ds9.findAll({})
  if (!ds9Array) {
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No episodes found'));
  } else {
    const results = paginatedResults(req, ds9Array);
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code,
        HttpStatus.OK.status, `Welcome ${req.user.name}! DS9 episodes retrieved`, results));
  }
};

export async function getVoyEpisodes(req, res) {
  log.info(`${req.method} ${req.originalUrl}, fetching VOY episodes`);
  const voyArray = await Voy.findAll({})
  if (!voyArray) {
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No episodes found'));
  } else {
    const results = paginatedResults(req, voyArray);
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code,
        HttpStatus.OK.status, `Welcome ${req.user.name}! VOY episodes retrieved`, results));
  }
};

export async function getEntEpisodes(req, res) {
  log.info(`${req.method} ${req.originalUrl}, fetching ENT episodes`);
  const entArray = await Voy.findAll({})
  if (!entArray) {
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No episodes found'));
  } else {
    const results = paginatedResults(req, entArray);
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code,
        HttpStatus.OK.status, `Welcome ${req.user.name}! ENT episodes retrieved`, results));
  }
};

// export async function getEpisodesSearch(req, res) {
//   log.info(`${req.method} ${req.originalUrl}, fetching episodes`);
//   let request = [];
//   if (Object.entries(req.query).length > 0) {
//     request = req.query;
//   } else if (Object.entries(req.body).length > 0) {
//     request = req.body;
//   } else if (Object.entries(req.params).length > 0) {
//     request = req.params;
//   }
//   else {
//     res.status(HttpStatus.BAD_REQUEST.code)
//       .send(new Response(HttpStatus.BAD_REQUEST.code,
//         HttpStatus.BAD_REQUEST.status, 'No query found'));
//     return;
//   }
//   let episodes = [];
//   let dates = [];
//   let colors = [];
//   let subjects = [];
//   let colors_andor_subjects = request.colors_andor_subjects;
//   // log.info(`query contains: ${Object.entries(req.query)}`)
//   // log.info(`body contains: ${Object.entries(req.body)}`)
//   // log.info(`params contians: ${Object.entries(req.params)}`)

//   // filtering by dates

//   if (request.date) {
//     const query = request.date.split(' ');
//     const data = await Episodes.findAll({
//       attributes: ['episode'],
//       where: {
//         [Op.and]: [
//           {date: { [Op.like]: `${query[0]}%` }},
//           {date: { [Op.like]: `%${query[1]}` }}
//       ]}
//     });
//     dates = data.map((episode) => episode.dataValues);
//   }

//   // filtering by colors

//   if (request.colors) {
//     const colorsArray = request.colors.split(',');
//     let andor = request.colors_andor;
//     if (colorsArray.length > 1) {
//       if(!andor || andor !== 'and' && andor !== 'or') {
//         res.status(HttpStatus.BAD_REQUEST.code)
//           .send(new Response(HttpStatus.BAD_REQUEST.code,
//             HttpStatus.BAD_REQUEST.status, 'Please specify whether you would like episodes with all or any of the colors specified, by setting the andor query parameter to "and" or "or"'));
//         return;
//       }};
//     const query = colorsArray.map(key => ({ [key]: 1 }));
//     let data ={}
//     if (andor === 'or') {
//       data = await Colors.findAll({
//         attributes: ['episode'],
//         where: {
//           [Op.or]: query
//         }
//       });
//     } else {
//       data = await Colors.findAll({
//         attributes: ['episode'],
//         where: {
//           [Op.and]: query
//         }
//       });
//     }
//     colors = data.map((episode) => episode.dataValues);
//   }

//   // filtering by subjects

//   if (request.subjects) {
//     const subjectsArray = request.subjects.split(',');
//     let andor = request.subjects_andor;
//     if (subjectsArray.length > 1) {
//       if(!andor || andor !== 'and' && andor !== 'or') {
//         res.status(HttpStatus.BAD_REQUEST.code)
//           .send(new Response(HttpStatus.BAD_REQUEST.code,
//             HttpStatus.BAD_REQUEST.status, "Please specify whether you would like episodes with all or any of the subjects specified, by setting the andor query parameter to 'and' or 'or'"));
//         return;
//       }};
//     const query = subjectsArray.map(key => ({ [key]: 1 }));
//     let data ={}
//     if (andor === 'or') {
//       data = await Subjects.findAll({
//         attributes: ['episode'],
//         where: {
//           [Op.or]: query
//         }
//       });
//     } else {
//       data = await Subjects.findAll({
//         attributes: ['episode'],
//         where: {
//           [Op.and]: query
//         }
//       });
//     }
//     subjects = data.map((episode) => episode.dataValues);
//   }

//   // finally get all episodes that match the query(s)

//   if (dates.length === 0 && colors.length === 0 && subjects.length === 0) {
//     res.status(HttpStatus.BAD_REQUEST.code)
//       .send(new Response(HttpStatus.BAD_REQUEST.code,
//         HttpStatus.BAD_REQUEST.status, 'No query found'));
//     return;
//   }
//   let mergedQueryList = [];
//   if (dates.length > 0 && colors.length > 0 && subjects.length > 0) {
//     if (colors_andor_subjects === 'and') {
//       const mergedArray = colors.filter(a => subjects.some(b => a.episode === b.episode));
//       mergedQueryList = dates.filter(a => mergedArray.some(b => a.episode === b.episode));
//     } else {
//       const mergedArray = [...colors, ...subjects];
//       mergedQueryList = dates.filter(a => mergedArray.some(b => a.episode === b.episode));
//     }
//   }
//   if (dates.length > 0 && colors.length > 0 && subjects.length === 0) {
//     mergedQueryList = dates.filter(a => colors.some(b => a.episode === b.episode));
//   }
//   if (dates.length > 0 && colors.length === 0 && subjects.length > 0) {
//     mergedQueryList = dates.filter(a => subjects.some(b => a.episode === b.episode));
//   }
//   if (dates.length === 0 && colors.length > 0 && subjects.length > 0) {
//     if (colors_andor_subjects === 'and') {
//       mergedQueryList = colors.filter(a => subjects.some(b => a.episode === b.episode));
//     } else {
//       mergedQueryList = [...colors, ...subjects];
//     }
//   }
//   if (dates.length > 0 && colors.length === 0 && subjects.length === 0) {
//     mergedQueryList = dates;
//   }
//   if (dates.length === 0 && colors.length > 0 && subjects.length === 0) {
//     mergedQueryList = colors;
//   }
//   if (dates.length === 0 && colors.length === 0 && subjects.length > 0) {
//     mergedQueryList = subjects;
//   }
//   log.info(mergedQueryList)
//   const data = await Episodes.findAll({
//     where: {
//       [Op.or]: mergedQueryList
//     }
//   });
//   episodes = data.map((episode) => episode.dataValues);
//   if (episodes.length === 0) {
//     res.status(HttpStatus.NOT_FOUND.code)
//       .send(new Response(HttpStatus.NOT_FOUND.code,
//         HttpStatus.NOT_FOUND.status, `No episodes with those selections found`));
//   } else {
//     res.status(HttpStatus.OK.code)
//       .send(new Response(HttpStatus.OK.code,
//         HttpStatus.OK.status, 'Episodes retrieved', { episodes: episodes }));
//   }
// };

export default HttpStatus;
