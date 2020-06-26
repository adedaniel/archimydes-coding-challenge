export default (body, group, query) => {
  return body.find((element) => element[group] == query);
};
