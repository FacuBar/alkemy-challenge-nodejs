export default function buildNewShowRepo(db) {
  return Object.freeze({
    create,
    getAll,
    getOne,
    editOne,
    deleteOne,
  });

  async function create(showInfo) {
    try {
      const result = await db.sequelize.transaction(async (transaction) => {
        const show = await db.Show.create(showInfo, { transaction });
        await show.addGenres(showInfo?.genres || [], { transaction });
        return show;
      });

      const genres = await result.getGenres({
        attributes: ['id', 'name'],
        joinTableAttributes: [],
      });

      result.setDataValue('genres', genres);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async function getAll(queryOpts) {
    try {
      queryOpts.page = +queryOpts.page <= 0 ? 1 : queryOpts.page;
      queryOpts.limit = +queryOpts.limit <= 0 ? 1 : queryOpts.limit;
      const page = parseInt(queryOpts.page, 10) || 1;
      const limit = parseInt(queryOpts.limit, 10) || 10;
      const offset = (page - 1) * limit;

      const Op = db.Sequelize.Op;
      const { title, genres, order } = queryOpts;
      let queryShows = {};
      let sortShows = 'DESC';
      let queryGenres = {};
      let genreRequired = false;

      if (title) {
        queryShows = { title: { [Op.like]: `%${title}%` } };
      }
      if (genres) {
        genreRequired = true;
        if (Array.isArray(genres)) {
          queryGenres = { id: { [Op.in]: genres } };
        } else {
          queryGenres = { id: genres };
        }
      }
      if (order === 'ASC') {
        sortShows = 'ASC';
      }
      const { count, rows } = await db.Show.findAndCountAll({
        attributes: ['image', 'title', 'releaseDate'],
        where: queryShows,
        order: [['releaseDate', sortShows]],
        include: {
          where: queryGenres,
          association: 'Genres',
          attributes: [],
          through: { attributes: [] },
          required: genreRequired,
        },
        offset,
        limit,
      });

      return {
        data: rows,
        metadata: {
          lastPage: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page > 1 ? page - 1 : null,
          nextPage: count / limit > page ? page + 1 : null,
        },
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async function getOne(id) {
    try {
      const show = await db.Show.findByPk(id, {
        include: {
          association: 'Characters',
          through: { attributes: [] },
          attributes: ['id', 'image', 'name'],
          as: 'characters',
        },
      });
      return show;
    } catch (e) {
      throw e;
    }
  }

  async function editOne() {}
  async function deleteOne() {}
}
