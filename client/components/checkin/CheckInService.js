
const save = (mood, onSuccess, onFailure) => {
  return fetch("/mood", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mood)
  })
  .then((response) => {
    if(response.ok) {
      onSuccess();
    } else {
      onFailure(Error(`${response.status} when attempting to save mood`));
    }
  })
  .catch((error) => {
    onFailure(error);
  });
}

export {save};
