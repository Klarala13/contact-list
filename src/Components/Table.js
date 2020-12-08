import React, { useState, useEffect } from "react";

const Table = ({
  contactList,
  searchText,
  deleteContact,
  addFromTable,
  sortBy,
  startEditingContact
}) => {
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const searchTextLowerCased = searchText.toLowerCase();

    //Set-up filter and pass contacts through it
    const contacts = contactList.filter(contact => {
      const name = `${contact.first_name} `.toLowerCase();
      return name.indexOf(searchTextLowerCased) >= 0;
    });

    setFilteredContacts(contacts);
  }, [contactList, searchText]);

  return (
    <div className="bd-border table-light">
      <table className="table">
        <thead className="bg-light">
          <tr>
            <th scope="col">
              <button onClick={() => sortBy("first_name")}>Name</button>
            </th>
            <th scope="col">
              <button onClick={() => sortBy("last_name")}>Last Name</button>
            </th>
            <th scope="col">
              <button onClick={() => sortBy("email")}>Email</button>
            </th>
            <th scope="col">Delete</th>
            <th scope="col">To My List</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.first_name}</td>
              <td>{contact.last_name}</td>
              <td>{contact.email}</td>
              <td>
                <i
                  className="fa fa-trash-o ml-3"
                  aria-hidden="true"
                  onClick={() => deleteContact(contact.id)}
                />
              </td>
              <td>
                {!contact.isInUserList && (
                  <i
                    className="fa fa-plus-square ml-3"
                    aria-hidden="true"
                    onClick={() => addFromTable(contact.id)}
                  />
                )}

                {contact.isInUserList && "added!"}
              </td>

              <td>
                <i
                  className="fa fa-pencil-square yellow"
                  aria-hidden="true"
                  onClick={() => startEditingContact(contact.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
