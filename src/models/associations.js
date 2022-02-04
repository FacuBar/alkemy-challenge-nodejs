module.exports = (sequelize) => {
  const { Show, Character, Genre } = sequelize.models;
  // many to many between characters and shows
  Character.belongsToMany(Show, {
    through: 'characters_shows',
  });
  Show.belongsToMany(Character, {
    through: 'characters_shows',
  });

  // many to many between genres and shows
  Genre.belongsToMany(Show, {
    through: 'genres_shows',
  });
  Show.belongsToMany(Genre, {
    through: 'genres_shows',
  });
};
