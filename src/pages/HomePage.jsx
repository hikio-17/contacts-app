import React from 'react';
import { deleteContact, getContacts } from '../utils/data';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';



class HomePage extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         contacts: getContacts(),
         keyword: '',
      }
      this.onDeleteHandler = this.onDeleteHandler.bind(this);
      this.keywordChange = this.keywordChange.bind(this);
   }

   onDeleteHandler(id) {
      deleteContact(id)
      this.setState(() => {
         return {
            contacts: getContacts()
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