export default function buildNewShow() {
  return function (show) {
    // @TODO: validate and normalize
    return Object.freeze(show);
  };
}
