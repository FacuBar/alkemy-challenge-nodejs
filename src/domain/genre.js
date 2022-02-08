export default function buildNewGenre() {
  return function (genre) {
    // @TODO: validate and normalize
    return Object.freeze(genre);
  };
}
