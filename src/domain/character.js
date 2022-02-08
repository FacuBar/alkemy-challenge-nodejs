export default function buildNewCharacter() {
  return function (character) {
    // @TODO: validate and normalize
    return Object.freeze(character);
  };
}
