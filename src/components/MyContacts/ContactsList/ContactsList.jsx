import css from './contacts-list.module.css';

const ContactsList = ({ items, deleteContact }) => {
  const elements = items.map(({ id, name, number }) => (
    <li className={css.item} key={id}>
      {name}: <span className={css.number}>{number}</span>
      <button
        className={css.button}
        onClick={() => deleteContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));
  return <ul className={css.list}>{elements}</ul>;
};

export default ContactsList;
