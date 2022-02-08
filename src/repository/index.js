import connectDB from '../db/models/index.js';
import buildNewCharacterRepo from './character.js';
import buildNewGenreRepo from './genre.js';
import buildNewShowRepo from './show.js';
import buildNewUserRepo from './user.js';

const db = connectDB();

const characterRepository = buildNewCharacterRepo(db);
const genreRepository = buildNewGenreRepo(db);
const showRepository = buildNewShowRepo(db);
const userRepository = buildNewUserRepo(db);

export { characterRepository, genreRepository, showRepository, userRepository };
