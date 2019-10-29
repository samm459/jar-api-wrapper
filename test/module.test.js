require('dotenv').config();

// Dependencies
const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const jar = require('../main');

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
    it('returns an array of designers', async() => {
        let designers = await jar.getAllDesigners(process.env.JAR_TOKEN);
        for (d of designers) {
            expect(d).to.include.keys('firstName', 'lastName', 'email', 'clients');
        }
    });
});