require('dotenv').config();

// Dependencies
const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const jar = require('..');

// Chai Plugins
chai.use(chaiHttp);

describe('getAllClients', () => {
	it('returns an array of clients', async() => {
		let clients = await jar.getAllClients(process.env.JAR_TOKEN);
		for (let i = 0; i < clients.length; i++) {
			expect(clients[i]).to.include.keys(['id', 'name', 'slug', 'createdAt', 'updatedAt', 'deleted', 'status', 'users']);	
        }
	});
});

describe('getActiveClients', () => {
    it('returns an array of active clients', async() => {
        let clients = await jar.getActiveClients(process.env.JAR_TOKEN);
        for (client of clients) {
            expect(client.status).to.eql('active');
        }
    });
});

describe('getAllDesigners', () => {
    it('returns a list of designers', async() => {
        let designers = await jar.getAllDesigners(process.env.JAR_TOKEN);
        for (d of designers) {
            expect(d).to.include.keys('firstName', 'lastName', 'email', 'clients');
        }
    });
    it('deletes the client\'s designer so as to not return a circular object', async() => {
        let designers = await jar.getAllDesigners(process.env.JAR_TOKEN);
        expect(designers[0].clients[0].designer).to.be.undefined;
    });
});

describe('getDesignerByEmail', () => {
    it('returns the designer by the email passed in', async() => {
        let designers = await jar.getAllDesigners(process.env.JAR_TOKEN);
        let designer = await jar.getDesignerByEmail(designers[0].email, process.env.JAR_TOKEN);
        console.log(designer);
        expect(designer).to.not.be.undefined;
        expect(designer).eql(designers[0]);
    });
});

describe('isDesigner', () => {
    it('returns true when a valid jar user is passed in', async() => {
        let validDesigner = await jar.isDesigner(process.env.JAR_EMAIL, process.env.JAR_PASSWORD);
        expect(validDesigner).to.be.true;
    });
    it('returns false when password is not correct', async() => {
        let validDesigner = await jar.isDesigner(process.env.JAR_EMAIL, 'wrong password');
        expect(validDesigner).to.be.false;
    });
    it('returns false when email does not exist', async() => {
        let validDesigner = await jar.isDesigner('invalid@email.com', process.env.JAR_PASSWORD);
        expect(validDesigner).to.be.false;
    });
});