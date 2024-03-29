const fs = require(`fs/promises`);
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');



async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
    // ...твій код. Повертає масив контактів.
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => { return item.id === contactId });
    return result || null;
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null
    }
    else {
        const newContacts = contacts.filter(item => {
            return item.id != contactId
        })
        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
        return contacts.find(item => { return item.id === contactId });
    }
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact({ name, email, phone }) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
    // ...твій код. Повертає об'єкт доданого контакту (з id).
}
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}