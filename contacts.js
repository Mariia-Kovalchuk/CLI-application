const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
    try {
        const contacts = await fs.readFile(contactsPath)
        const contactList = JSON.parse(contacts);
        return contactList
        
    } catch (error) {
        throw error
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const contact = contacts.find(item => item.id === Number(contactId));
        if (!contact) {
            return null
        }
        return contact
        
    } catch (error) {
        throw error
    }
}

async function updateContactsDb(newList) {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(newList));
    } catch (error) {
        throw error
        
    }

}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const idx = contacts.findIndex(({ id }) => id === Number(contactId));
        if (idx === -1) {
            return null;
        }
        const newContacts = contacts.filter(item => item.id !== Number(contactId));
        await updateContactsDb(newContacts);
        const updatedList = await listContacts();
        return updatedList;
        
    } catch (error) {
        throw error;
    }

}

async function addContact(name, email, phone) {
    try {
        if (!name || !email || !phone) {
            return null;
        }
        const newContact = {
            name,
            email,
            phone
        };
        const contacts = await listContacts();
        const listLength = contacts.length;
        newContact.id = contacts[listLength - 1].id + 1;
        const newContacts = [...contacts, newContact];
        await updateContactsDb(newContacts);
        const updatedList = await listContacts();
        return updatedList;
        
    } catch (error) {
        throw error
    }

}

module.exports = {
    listContacts, getContactById, removeContact, addContact
}