export default function buildNewUserRepo(db) {
  return Object.freeze({
    findByEmail,
    create,
  });

  async function create(userInfo) {
    try {
      const user = db.User.build(userInfo);
      await user.save();
      return user;
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError')
        throw new Error('email address must be unique');
      throw e;
    }
  }

  async function findByEmail(email) {
    let user = await db.User.findOne({
      where: { email },
    });
    delete user.password;
    return user;
  }
}
