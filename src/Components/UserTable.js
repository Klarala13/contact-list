import React from "react";

const UserTable = ({ removeContactFromUserList, sortBy, contacts }) => {
  return (
    <div className="box">
      <div className="user-table table-light">
        <h3 className="text-center">My Fav Contacts</h3>
        <table className="user-table table">
          <thead className="bg-light">
            <tr>
              <th scope="col">
                <button onClick={() => sortBy("first_name", contacts)}>
                  Name
                </button>
              </th>
              <th scope="col">
                <button onClick={() => sortBy("last_name", contacts)}>
                  Last Name
                </button>
              </th>
              <th scope="col">
                <button onClick={() => sortBy("email", contacts)}>Email</button>
              </th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(person => (
              <tr key={person.id}>
                <td>{person.first_name}</td>
                <td>{person.last_name}</td>
                <td>{person.email}</td>
                <td>
                  <i
                    className="fa fa-trash-o ml-3"
                    aria-hidden="true"
                    onClick={() => removeContactFromUserList(person.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
