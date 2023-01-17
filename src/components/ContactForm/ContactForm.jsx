import { useDispatch, useSelector } from 'react-redux';
import { selectContactsData } from 'redux/selectors';
import { Button } from 'components/ContactForm/Button/Button';
import { Input } from 'components/ContactForm/Input/Input';
import { FormStyled } from './ContactForm.styled';
import { addContact } from 'redux/operations';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contactsState = useSelector(selectContactsData);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value
      .split(' ')
      .map(element => element[0].toUpperCase() + element.slice(1).toLowerCase())
      .join(' ');
    const number = form.elements.number.value;
    if (contactsState.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      form.reset();
      return;
    }
    dispatch(addContact({ name, number }));
    form.reset();
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <Input
        text="Name"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      />
      <Input
        text="Number"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
      />
      <Button>Add Contact</Button>
    </FormStyled>
  );
};
