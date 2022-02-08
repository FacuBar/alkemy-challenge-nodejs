export default function buildNewUser() {
  return function (user) {
    // @TODO: validate and normalize
    return Object.freeze(user);
  };
}
