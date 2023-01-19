const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contacts = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contacts);
  const allContacts = JSON.parse(data);
  return allContacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {};

const addContact = async (data) => {
  const allContacts = await listContacts();
  const newContact = { id: v4(), ...data };
  allContacts.push(newContact);
  await fs.writeFile(contacts, JSON.stringify(allContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
