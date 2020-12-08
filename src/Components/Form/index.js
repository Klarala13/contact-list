import React from "react";
import { addContactToServer, editContactInServer } from "./requests";

export default class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.contact ? props.contact.id : null,
      contact: {
        first_name: props.contact ? props.contact.first_name : "",
        last_name: props.contact ? props.contact.last_name : "",
        email: props.contact ? props.contact.email : "",
        gender: props.contact ? props.contact.gender : ""
      },

      isValid: {
        first_name: props.contact ? true : false,
        last_name: props.contact ? true : false,
        email: props.contact ? true : false,
        gender: props.contact ? true : false
      }
    };
  }

  isNewContact = () => {
    //console.log("isNewContact ?", this.state.id == null);
    return this.state.id == null;
  };

  handleChange = (event, isValid) => {
    this.setState({
      contact: {
        ...this.state.contact,
        [event.target.name]: event.target.value
      },
      isValid: { ...this.state.isValid, [event.target.name]: isValid }
    });
  };

  // @TODO: saveContact on submit
  handleSubmit = event => {
    event.preventDefault();
    if (this.isNewContact()) {
      addContactToServer(
        this.state.contact,
        responseObject => {
          this.props.addNewContact(responseObject);
        },
        () => {
          alert("Something went wrong!");
        }
      );
    } else {
      console.log(this.state.id, "id of contact being edited");
      editContactInServer(
        //updates the state of the contact
        this.state.contact,
        () => {
          this.props.updateContact({
            id: this.state.id,
            ...this.state.contact
          });
        },

        () => {
          alert("Something went wrong!");
        }
      );
    }
    //event.currentTarget.reset();
  };

  render() {
    const contact = this.state.contact;

    // disable the button until input is validated
    const isDisabled = Object.values(this.state.isValid).includes(false);

    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)} className="contact-form">
          <div className="form-group p-2">
            <h3 className="text-center">
              {this.isNewContact() ? "Add New" : "Edit Existing"} Contact
            </h3>
            <label htmlFor="first_name" className="text-left">
              Contact Name
            </label>
            <input
              onChange={e =>
                this.handleChange(
                  e,
                  e.target.value.length >= 3 && e.target.value.length <= 20
                )
              }
              type="text"
              name="first_name"
              value={contact.first_name}
              className="form-control mb-2"
              id="first_name"
              placeholder="First name"
              required
              autoComplete="true"
            />
            <label htmlFor="last_name" className="text-left">
              Last Name
            </label>
            <input
              onChange={e =>
                this.handleChange(
                  e,
                  e.target.value.length >= 3 && e.target.value.length <= 20
                )
              }
              type="text"
              name="last_name"
              value={contact.last_name}
              className="form-control mb-2"
              id="last_name"
              placeholder="Last name"
              autoComplete="true"
            />
            <label htmlFor="email" className="text-left">
              Email
            </label>
            <input
              onChange={e =>
                this.handleChange(
                  e,
                  e.target.value.length >= 6 && e.target.value.includes("@")
                )
              }
              type="email"
              name="email"
              value={contact.email}
              className="form-control mb-2"
              id="email"
              placeholder="Email"
              required
            />

            <label htmlFor="gender" className="text-left">
              Gender
            </label>
            <select
              className="form-control"
              id="gender"
              placeholder="Gender"
              name="gender"
              value={contact.gender}
              required
              onChange={e =>
                //This makes them all male
                this.handleChange(
                  e,
                  ["Male", "Female", "Other"].includes(e.target.value)
                )
              }
            >
              <option>Other</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            <div className="mb-3">
              <button
                className="btn btn-danger float-left"
                id="submit"
                type="submit"
                disabled={isDisabled}
              >
                Save Contact
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
