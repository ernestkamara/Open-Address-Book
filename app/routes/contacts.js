const Joi = require('joi');

const contacts = [
    { id: 1, first: 'Ernest', last: 'Kamara' },
    { id: 2, first: 'Mrs.', last: 'Kamara' },
    { id: 3, first: 'Mrs.S.', last: 'Kamara' }
];

module.exports = (app, db) => {
    // Get all contacts
    app.get('/api/contacts', (req, res) => {
        res.send(contacts)
    });

    // Get contact with a given ID
    app.get('/api/contacts/:id', (req, res) => {
        //Look up the contact using the id params
        const ID = parseInt(req.params.id);
        const contact = contacts.find(c => c.id === ID);

        //Validate contacts existance, else return 404
        if (!contact) return res.status(404).send(`No contact with ID:${ID} found!`);

        // Return contact
        res.send(contact);
    });

    // Add contact
    app.post('/api/contacts', (req, res) => {
        // Validate request body, else return 400 Bad Request
        const { error } = validateContact(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        // Create the contact object
        const contact = craeteContact(req);

        // Added the contact
        contacts.push(contact);

        // Retured added contact
        res.send(`Contact added, response:${toJson(contact)}`);
    });


    // Update a contact 
    app.put('/api/contacts/:id', (req, res) => {
        //Look up the contact using the id params
        const ID = parseInt(req.params.id);
        const contact = contacts.find(c => c.id === ID);

        //Validate contacts existance, else return 404
        if (!contact) return res.status(404).send(`No contact with ID:${ID} found to update!`);

        // Validate request body, else return 400 Bad Request
        const { error } = validateContact(req.body);
        if (error) return res.status(400).send(error.details[0].message)

        // Update contact 
        contact = req.body;

        // Retured updated contact
        res.send(`Contact updated, response:${toJson(contact)}`);
    });

    // Delete contact with a given ID
    app.delete('/api/contacts/:id', (req, res) => {
        //Look up the contact using the id params
        const ID = parseInt(req.params.id);
        const contact = contacts.find(c => c.id === ID);

        //Validate contacts existance, else return 404
        if (!contact) return res.status(404).send(`No contact with ID:${ID} found to delete!`);

        // Delete the contact 
        const index = contacts.indexOf(toJson(contact));
        contacts.splice(index, 1);

        // Retured the deleted contact
        res.send(`Contact deleted, response:${toJson(contact)}`);
    });
};



function validateContact(contact) {
    const schema = {
        first: Joi.string().min(3).required(),
        last: Joi.string().min(5).required()
    };
    return Joi.validate(contact, schema)
}

function craeteContact(req) {
    return contact = {
        id: contacts.length + 1,
        first: req.body.first,
        last: req.body.last
    }
}

function toJson(contact) {
    return JSON.stringify(contact);
}