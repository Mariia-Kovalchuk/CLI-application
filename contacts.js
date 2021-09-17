const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');


// Добавь функции для работы с коллекцией контактов.В функциях используй модуль fs и его методы readFile() и writeFile()
// Сделай экспорт созданных функций через module.exports


// TODO: задокументировать каждую функцию
async function listContacts() {
    // ...твой код
    // console.log('списк');
    const contacts = await fs.readFile(contactsPath)
    const contactList = JSON.parse(contacts);
    // console.table(contactList);
    return contactList
}

async function getContactById(contactId) {
    // ...твой код
    // console.log('фильтр по ид');
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === Number(contactId));
    if (!contact) {
        return null
    }
    return contact
}

async function updateContactsDb(newList) {
    await fs.writeFile(contactsPath, JSON.stringify(newList));

}

async function removeContact(contactId) {
    // ...твой код
    // console.log('удалить контакт по Id');
    const contacts = await listContacts();
    // console.table(contacts);
    const idx = contacts.findIndex(({ id }) => id === Number(contactId));
    // console.log(idx);
    if (idx === -1) {
        return null;
    }
    const newContacts = contacts.filter(item => item.id !== Number(contactId));
    // console.table(newContacts);
    await updateContactsDb(newContacts);
    const updatedList = await listContacts();
    // console.table(updatedList);
    return updatedList;

}

async function addContact(name, email, phone) {
    // ...твой код
    console.log('добавить контакт по ид');
    if (!name || !email || !phone) {
        return null;
    }
    const newContact = {
        name,
        email,
        phone
    };
    const contacts = await listContacts();
    // console.table(contacts);
    const listLength = contacts.length;
    // console.log(listLength);
    newContact.id = contacts[listLength - 1].id + 1;
    // console.log(newContact);
    const newContacts = [...contacts, newContact];
    // console.table(newContacts);
    await updateContactsDb(newContacts);
    const updatedList = await listContacts();
    // console.table(updatedList);
    return updatedList;



}

module.exports = {
    listContacts, getContactById, removeContact, addContact
}