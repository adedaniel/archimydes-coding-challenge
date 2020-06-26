export default (body, group, query) => {
  return body.find((element) => element[group] == query); // returns object whose query value exists in the array
};
