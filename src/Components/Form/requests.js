//Post method for adding contact
export function addContactToServer(contactObj, onSuccess, onError) {
  fetch(
    "https://my-json-server.typicode.com/Klarala13/contact-list-server/data",
    {
      contactObj,
      method: "POST",
      body: JSON.stringify(contactObj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      onSuccess(res);
      console.log("Good job! u added ur contact!", res);
    })
    .catch((error) => {
      onError();
      console.error("Ooohhh, u messed up! try again buddy", error);
    });
}

//method for editing existing contact
export function editContactInServer(contactObj, onSuccess, onError) {
  fetch(
    "https://my-json-server.typicode.com/Klarala13/contact-list-server/data",
    {
      contactObj,
      method: "POST",
      body: JSON.stringify(contactObj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      onSuccess(contactObj);
      console.log("Good job! u updated ur contact!", contactObj);
    })
    .catch((error) => {
      onError();
      console.error("Ohhh, u messed up! could not update", error);
    });
}
