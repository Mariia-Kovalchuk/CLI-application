const contactsHandler = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            contactsHandler.listContacts()
                .then(console.table)
                .catch(error => console.log(error.message));
            break;
            
        case 'get':
            contactsHandler.getContactById(id)
                .then(contact => {
                    if (!contact) {
                        console.log(`There is no contact with id ${id}`);
                        return;
                    }
                    console.log(`Contact with id ${id}: `, contact);
                })
                .catch(error => console.log(error.message));
            break;
            
        case 'add':
            contactsHandler.addContact(name, email, phone)
                .then(updatedList => {
                    if (!updatedList) {
                        console.log('Name, email and phone should be send in request');
                        return;
                    };
                    console.log(`The new contact ${name} was added successfully. The updated contact list:`);
                    console.table(updatedList);
                })
                .catch(error => console.log(error.message));
            break;

        case 'remove':
            contactsHandler.removeContact(id)
                .then(updatedList => {
                    if (!updatedList) {
                        console.log(`There is no contact with id ${id}`);
                        return;
                    };
                    console.log(`The contact with id ${id} was removed successfully. The updated contact list:`);
                    console.table(updatedList);
                
                })
                .catch(error => console.log(error.message));
            break;
        
        default:
            console.warn('\x1B[31m Unknown action type!');
    };
};

invokeAction(argv);



// variant 2
// async function invokeAction({ action, id, name, email, phone }) {
//     switch (action) {
//         case 'list':
//             const contacts = await contactsHandler.listContacts();
//             console.table(contacts);
//             break;

//         case 'get':
//             const contact = await contactsHandler.getContactById(id)
//             if (!contact) {
//                 console.log(`There is no contact with id ${id}`);
//                 break;
//             }
//             console.log(`Contact with id ${id}: `, contact);
//             break;

//         case 'add':
//             const updatedList = await contactsHandler.addContact(name, email, phone)
//             if (!updatedList) {
//                 console.log('Name, email and phone should be send in request');
//                 break;
//             }
//             console.log(`The new contact ${name} was added successfully. The updated contact list:`);
//             console.table(updatedList);
//             break;

//         case 'remove':
//             const updatedContactList = await contactsHandler.removeContact(id)
//             if (!updatedContactList) {
//                 console.log(`There is no contact with id ${id}`);
//                 break;
//             }
//             console.log(`The contact with id ${id} was removed successfully. The updated contact list:`);
//             console.table(updatedContactList);
//             break;

//         default:
//             console.warn('\x1B[31m Unknown action type!');
//     }
// }

// invokeAction(argv);