import { useState, useEffect } from 'react';
import PhonebookForm from 'components/MyContacts/PhonebookForm/PhonebookForm';
import ContactsList from 'components/MyContacts/ContactsList/ContactsList';
import css from './my-contacts.module.css';
// import css from './my-contacts.module.css';
import { nanoid } from 'nanoid';

const MyContacts = () => {
  const [contacts, setContacts] = useState(() => {
    const data = JSON.parse(localStorage.getItem('my-contacts'));
    return data || [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublacate = ({ name, number }) => {
    const normalazedName = name.toLowerCase();
    const normalazedNumber = number.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalazedCurrentName = item.name.toLowerCase();
      const normalazedCurrentNumber = item.number.toLowerCase();
      return (
        normalazedCurrentName === normalazedName &&
        normalazedCurrentNumber === normalazedNumber
      );
    });
    return Boolean(dublicate);
  };

  const addContact = data => {
    const { name, number } = data;

    if (isDublacate(data)) {
      return alert(`${name} with number ${number} is already in contacts`);
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return [...prevContacts, newContact];
    });
  };

  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const changeFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();

    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const normalizedNumber = number.toLocaleLowerCase();
      return (
        normalizedName.includes(normalizedFilter) ||
        normalizedNumber.includes(normalizedFilter)
      );
    });
    return filteredContacts;
  };

  const items = getFilteredContacts();
  return (
    <div>
      <h1 className={css.title}>Phonebook</h1>
      <PhonebookForm onSubmit={addContact} />
      <div className={css.listWrapper}>
        <h2>Contacts</h2>
        <input onChange={changeFilter} name="filter" placeholder="Search" />
        <ContactsList items={items} deleteContact={deleteContact} />
      </div>
    </div>
  );
};

// class MyContacts extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('my-contacts'));
//     if (contacts && contacts.length) {
//       this.setState({
//         contacts,
//       });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;

//     if (prevState.contacts.length !== contacts.length) {
//       localStorage.setItem('my-contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   isDublacate({ name, number }) {
//     const normalazedName = name.toLowerCase();
//     const normalazedNumber = number.toLowerCase();
//     const { contacts } = this.state;

//     const dublicate = contacts.find(item => {
//       const normalazedCurrentName = item.name.toLowerCase();
//       const normalazedCurrentNumber = item.number.toLowerCase();
//       return (
//         normalazedCurrentName === normalazedName &&
//         normalazedCurrentNumber === normalazedNumber
//       );
//     });
//     return Boolean(dublicate);
//   }

//   addContact = data => {
//     const { name, number } = data;

//     if (this.isDublacate(data)) {
//       return alert(`${name} with number ${number} is already in contacts`);
//     }

//     this.setState(({ contacts }) => {
//       const newContact = {
//         id: nanoid(),
//         ...data,
//       };
//       return {
//         contacts: [...contacts, newContact],
//       };
//     });
//   };

//   deleteContact = id => {
//     this.setState(({ contacts }) => {
//       const newContacts = contacts.filter(item => item.id !== id);
//       return {
//         contacts: newContacts,
//       };
//     });
//   };

//   changeFilter = ({ target }) => {
//     this.setState({
//       filter: target.value,
//     });
//   };

//   getFilteredContacts = () => {
//     const { filter, contacts } = this.state;

//     if (!filter) {
//       return contacts;
//     }

//     const normalizedFilter = filter.toLocaleLowerCase();

//     const filteredContacts = contacts.filter(({ name, number }) => {
//       const normalizedName = name.toLocaleLowerCase();
//       const normalizedNumber = number.toLocaleLowerCase();
//       return (
//         normalizedName.includes(normalizedFilter) ||
//         normalizedNumber.includes(normalizedFilter)
//       );
//     });
//     return filteredContacts;
//   };

//   render() {
//     const { addContact, deleteContact, changeFilter } = this;
//     const contacts = this.getFilteredContacts();
//     return (
//       <div>
//         <h1 className={css.title}>Phonebook</h1>
//         <PhonebookForm onSubmit={addContact} />
//         <div className={css.listWrapper}>
//           <h2>Contacts</h2>
//           <input onChange={changeFilter} name="filter" placeholder="Search" />
//           <ContactsList items={contacts} deleteContact={deleteContact} />
//         </div>
//       </div>
//     );
//   }
// }

export default MyContacts;
