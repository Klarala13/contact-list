import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/App.css";
import "../../css/main.css";
import Search from "../Search";
import Table from "../Table";
import ContactForm from "../Form/";
import UserTable from "../UserTable";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [myContacts, setMyContacts] = useState([]);
  const [searchText, setSearchText] = useState("");
  // id of contact currently being edited, if any; otherwise null
  const [idOfContactBeingEdited, setIdOfContactBeingEdited] = useState(null);

  const deleteContact = (id) => {
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  const sortBy = (key) => {
    const contactList = [...contacts];
    contactList.sort((a, b) => a[key].localeCompare(b[key]));
    setContacts(contactList);
  };

  const sortByMyContacts = (key) => {
    const contactList = [...myContacts];
    contactList.sort((a, b) => a[key].localeCompare(b[key]));
    setMyContacts(contactList);
  };

  const addFromTable = (id) => {
    const contactIndex = contacts.findIndex((contact) => contact.id === id);
    console.log("contactIndex", contactIndex);
    contacts[contactIndex].isInUserList = true;
    setMyContacts([...myContacts, contacts[contactIndex]]);
  };

  const getContactById = (id) => {
    return (contacts.filter((contact) => contact.id === id) || [])[0];
  };

  const updateContact = (newContactData) => {
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === newContactData.id
    );
    console.log("new cont", newContactData);
    let updatedContacts = [...contacts];
    updatedContacts[contactIndex] = {
      ...updatedContacts[contactIndex],
      ...newContactData,
    };
    setContacts(updatedContacts);
    setIdOfContactBeingEdited(null);
  };

  const addNewContact = (newContactData) => {
    const newContactList = [...contacts, newContactData];
    setContacts(newContactList);
    setIdOfContactBeingEdited(null);
  };

  const removeContactFromUserList = (id) => {
    const contactIndex = myContacts.findIndex((contact) => contact.id === id);
    myContacts.splice(contactIndex, 1);
    setMyContacts([...myContacts]);
  };

  // Load the contacts list only once and update according to add or edit method
  useEffect(() => {
    axios
      .get(
        "https://my-json-server.typicode.com/Klarala13/contact-list-server/data"
      )
      .then((response) => {
        response.data.forEach((contact) => (contact.isInUserList = false));
        return response.data;
      })
      .then((data) => setContacts(data));
  }, []);

  return (
    <div className="App">
      <div>
        <header className="App-header">
          <h1>Contact List</h1>
        </header>

        <Search searchText={searchText} setSearchText={setSearchText} />

        <main>
          <section className="col-7">
            <Table
              contactList={contacts}
              searchText={searchText}
              deleteContact={deleteContact}
              startEditingContact={setIdOfContactBeingEdited}
              sortBy={sortBy}
              addFromTable={addFromTable}
            />
          </section>

          <aside>
            {idOfContactBeingEdited && (
              <ContactForm
                contact={getContactById(idOfContactBeingEdited)}
                updateContact={updateContact}
              />
            )}

            {!idOfContactBeingEdited && (
              <ContactForm addNewContact={addNewContact} />
            )}

            <UserTable
              contacts={myContacts}
              removeContactFromUserList={removeContactFromUserList}
              sortBy={sortByMyContacts}
            />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default App;
