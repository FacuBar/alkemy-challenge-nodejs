import { userRepository } from '../repository/index.js';
import { characterRepository } from '../repository/index.js';
import { showRepository } from '../repository/index.js';
import { genreRepository } from '../repository/index.js';

import buildNewUserController from './user.js';
import buildNewCharacterController from './characters.js';
import buildNewShowController from './shows.js';
import buildNewGenreController from './genre.js';

import JWT from '../services/jwt.js';

const userController = buildNewUserController(userRepository, JWT);
const characterController = buildNewCharacterController(characterRepository);
const showController = buildNewShowController(showRepository);
const genreController = buildNewGenreController(genreRepository);

export { userController, characterController, showController, genreController };
