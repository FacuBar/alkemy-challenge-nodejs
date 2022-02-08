export default function buildNewCharacterRepo(db) {
  return Object.freeze({
    create,
    getAll,
    getOne,
    editOne,
    deleteOne,
  });

  async function create(characterInfo) {
    try {
      const { shows, ...characterBody } = characterInfo;
      const result = await db.sequelize.transaction(async (transaction) => {
        const character = await db.Character.create(characterBody, {
          transaction,
        });
        await character.addShows(shows, { transaction });

        return character;
      });

      const showsT = await result.getShows({
        attributes: ['id', 'title', 'image'],
        joinTableAttributes: [],
      });

      result.setDataValue('shows', showsT);
      return result;
    } catch (e) {
      if (e.name == 'SequelizeForeignKeyConstraintError') throw e;
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
      const { name, age, shows } = queryOpts;

      let queryCharacters = [];
      let queryShows = {};
      let showRequired = false;

      if (name) {
        queryCharacters.push({
          name: { [Op.like]: `%${name}%` },
        });
      }
      if (age) {
        queryCharacters.push({ age: age });
      }
      if (shows) {
        showRequired = true;
        if (Array.isArray(shows)) {
          queryShows = { id: { [Op.in]: shows } };
        } else {
          queryShows = { id: shows };
        }
      }

      let { count, rows } = await db.Character.findAndCountAll({
        attributes: ['image', 'name'],
        where: {
          [Op.and]: queryCharacters,
        },
        include: {
          where: queryShows,
          association: 'Shows',
          attributes: [],
          through: { attributes: [] },
          required: showRequired,
        },
        limit,
        offset,
      });

      return {
        data: rows,
        metadata: {
          total: count,
          currentPage: page,
          previousPage: page > 1 ? page - 1 : null,
          nextPage: count / limit > page ? page + 1 : null,
        },
      };
    } catch (e) {
      throw e;
    }
  }

  async function getOne(id) {
    try {
      const character = await db.Character.findByPk(id, {
        include: {
          association: 'Shows',
          through: { attributes: [] },
          attributes: ['id', 'image', 'title'],
        },
      });
      if (!character) throw new Error('char not found');
      return character;
    } catch (e) {
      throw e;
    }
  }

  async function editOne() {}

  async function deleteOne() {}
}
