export default function buildNewGenreRepo(db) {
  return Object.freeze({
    create,
    getAll,
  });

  async function create(genreInfo) {
    try {
      const genre = db.Genre.build(genreInfo);
      await genre.save();
      return genre;
    } catch (e) {
      throw e;
    }
  }

  async function getAll(queryOpts) {
    queryOpts.page = +queryOpts.page <= 0 ? 1 : queryOpts.page;
    queryOpts.limit = +queryOpts.limit <= 0 ? 1 : queryOpts.limit;
    const page = parseInt(queryOpts.page, 10) || 1;
    const limit = parseInt(queryOpts.limit, 10) || 10;
    const offset = (page - 1) * limit;

    let { count, rows } = await db.Genre.findAndCountAll({
      attributes: { include: ['name'] },
      order: [['createdAt', 'DESC']],
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
  }
}
