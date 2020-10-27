function saveRequestQuery(query) {
  const savedQueries = getSavedQueries();
  const savedArray = savedQueries ? JSON.parse(savedQueries) : [];
  savedArray.push(query);
  localStorage.setItem('breeds', JSON.stringify(savedArray));
}

function getSavedQueries() {
  return localStorage.getItem('breeds');
}

function clearStorage() {
  localStorage.removeItem('breeds');
}
