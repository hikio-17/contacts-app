import React from 'react';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';
import { deleteContact, getContacts } from '../utils/api';

class HomePage extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         contacts: [],
         keyword: '',
      }
      this.onDeleteHandler = this.onDeleteHandler.bind(this);
      this.keywordChange = this.keywordChange.bind(this);
   }

   async componentDidMount() {
      const { data } = await getContacts();
      this.setState(() => {
         return {
            contacts: data,
         }
      })
   }

   async onDeleteHandler(id) {
      await deleteContact(id);

      const { data } = await getContacts();
      this.setState(() => {
         return {
            contacts: data,
         }
      })
   }

   keywordChange(keyword) {
      this.setState(() => {
         return {
            keyword,
         }
      })
   }

   render() {
      const contacts = this.state.contacts.filter((contact) => contact.name.toLowerCase().includes(this.state.keyword.toLowerCase()))
      return (
         <section>
            <SearchBar keyword={this.state.keyword} keywordChange={this.keywordChange} />
            <h2>Daftar Kontak</h2>
            <ContactList contacts={contacts} onDelete={this.onDeleteHandler} />
         </section>
      )
   }
}

export default HomePage;