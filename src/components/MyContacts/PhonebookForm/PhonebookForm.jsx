import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './phonebook-form.module.css';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  name: '',
  number: '',
};

class PhonebookForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  HandleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  HandleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    // const { elements } = e.currentTarget;
    this.setState({ ...INITIAL_STATE });
    console.log(this.state);
  };

  contactNameId = nanoid();
  render() {
    const { contactNameId, numberId, HandleSubmit, HandleChange } = this;
    const { name, number } = this.state;
    return (
      <div className={css.wrapper}>
        <form onSubmit={HandleSubmit} className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor={contactNameId}>Name</label>
            <input
              value={name}
              onChange={HandleChange}
              id={contactNameId}
              type="text"
              name="name"
              required
              placeholder="Contact name"
            />
            <label htmlFor={numberId}>Number</label>
            <input
              value={number}
              onChange={HandleChange}
              id={numberId}
              type="tel"
              name="number"
              required
              placeholder="Number"
            />
          </div>
          <button className={css.button} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

export default PhonebookForm;
