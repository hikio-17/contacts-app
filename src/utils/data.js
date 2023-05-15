let contacts = [
  {
    id: 1,
    name: 'Dimas Saputra',
    tag: 'dimasmds',
    imageUrl: '/images/dimasmds.jpeg'
  },
  {
    id: 2,
    name: 'Arif Faizin',
    tag: 'arifaizin',
    imageUrl: '/images/arifaizin.jpeg'
  },
  {
    id: 3,
    name: 'Rahmat Fajri',
    tag: 'rfajri27',
    imageUrl: '/images/rfajri27.jpeg'
  }
]

const getContacts = () => contacts
const addContact = contact => {
  contacts = [
    ...contacts,
    { id: +new Date(), imageUrl: '/images/default.jpg', ...contact }
  ]
}
const deleteContact = (id )=> {
  contacts = contacts.filter((item) => item.id !== id)
}

export { getContacts, addContact, deleteContact }
