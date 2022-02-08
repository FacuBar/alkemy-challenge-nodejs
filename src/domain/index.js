import buildNewCharacter from './character.js';
import buildNewGenre from './genre.js';
import buildNewShow from './show.js';
import buildNewUser from './user.js';

const newCharacter = buildNewCharacter();
const newGenre = buildNewGenre();
const newShow = buildNewShow();
const newUser = buildNewUser();

export { newCharacter, newGenre, newShow, newUser };
