const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function updateProducts(data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.log(err.message);
  }
}

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contactsArr = JSON.parse(data);
    return contactsArr;
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contactsArr = await listContacts();
    const contact = contactsArr.find((contact) => contact.id === contactId);
    if (!contact) return null;
    return contact;
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contactsArr = await listContacts();
    // console.log(contactsArr);
    const idx = contactsArr.findIndex((contact) => contact.id === contactId);
    if (idx === -1) return null;
    const deletedContact = contactsArr.splice(idx, 1);
    await updateProducts(contactsArr);
    return deletedContact;
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsArr = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const newContacts = [...contactsArr, newContact];
    await updateProducts(newContacts);
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
