import React from 'react'
import { useSearchParams } from 'react-router-dom'
import ContactList from '../components/ContactList'
import SearchBar from '../components/SearchBar'
import { deleteContact, getContacts } from '../utils/api'
import LocaleContext from '../contexts/LocaleContext'

function HomePage () {
  const [searchParams, setSearchParams] = useSearchParams()
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get('keyword') || ''
  })
  const [contacts, setContacts] = React.useState([])

  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    getContacts().then(({ data}) => setContacts(data))
  }, [])

  async function onDeleteHandler(id) {
    await deleteContact(id);

    const { data } = await getContacts();
    setContacts(data);
  }

  async function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(keyword.toLowerCase()));

  return (
    <section>
      <SearchBar
        keyword={keyword}
        keywordChange={onKeywordChangeHandler}
      />
      <h2>{locale === 'id' ? 'Daftar Kontak' : 'Contacts List'}</h2>
      <ContactList contacts={filteredContacts} onDelete={onDeleteHandler} />
    </section>
  )
}

// with class component
// class HomePage extends React.Component {
//   constructor (props) {
//     super(props)

//     this.state = {
//       contacts: [],
//       keyword: this.props.defaultKeyword || ''
//     }
//     this.onDeleteHandler = this.onDeleteHandler.bind(this)
//     this.keywordChange = this.keywordChange.bind(this)
//   }

//   async componentDidMount () {
//     const { data } = await getContacts()
//     this.setState(() => {
//       return {
//         contacts: data
//       }
//     })
//   }

//   async onDeleteHandler (id) {
//     await deleteContact(id)

//     const { data } = await getContacts()
//     this.setState(() => {
//       return {
//         contacts: data
//       }
//     })
//   }

//   keywordChange (keyword) {
//     this.setState(() => {
//       return {
//         keyword
//       }
//     })

//     this.props.keywordChange()
//   }

//   render () {
//     const contacts = this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(this.state.keyword.toLowerCase())
//     )
//     return (
//       <LocaleConsumer>
//         {({ locale }) => {
//           return (
//             <section>
//               <SearchBar
//                 keyword={this.state.keyword}
//                 keywordChange={this.keywordChange}
//               />
//               <h2>{locale === 'id' ? 'Daftar Kontak' : 'Contacts List'}</h2>
//               <ContactList
//                 contacts={contacts}
//                 onDelete={this.onDeleteHandler}
//               />
//             </section>
//           )
//         }}
//       </LocaleConsumer>
//     )
//   }
// }

export default HomePage;
