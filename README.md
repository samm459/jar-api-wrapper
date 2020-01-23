# Jar-Api-Wrapper
This is a node module that acts are a wrapper to the JarHq REST api. It contains a bunch of methods to help make working with the Jar API easier and faster.

## Get Started

Start by installing it via npm:

    $ npm install https://github.com/samm459/jar-api-wrapper.git

or yarn:

    $ yarn add https://github.com/samm459/jar-api-wrapper.git

Once you have it installed you can get an array of your clients with the following code:

    let jar = require('jar-api-wrapper');
    let myJarToken = 'mySecretToken';
    
    jar.getAllClients(myJarToken).then(clients => {
	    // access clients here
	});

You can use any method in async/await as well:

    let jar = require('jar-api-wrapper);
    let myJarToken = 'mySecretToken'
    
    async function getClients() {
	    let clients = await jar.getAllClients(myJarToken);
	    // access clients here
    }

## Methods

Jar-Api-Wrapper comes with a set of methods that make getting data from jar much easier.

### jar.getAllClients

This method returns all of your clients. For example: 

		[
			{ 
				id: 123,
				name: 'Client Company',
				slug: 'client-company',
				createdAt: '2019-02-27T16:11:09.486-07:00',
				updatedAt: '2019-08-06T10:25:13.967-07:00',
				deleted: false,
				status: 'archived',
				description: 'One of my clients.',
				seesAllRequests: true,
				users: [ 
					{
						firstName: 'John',
						lastName: 'Doe',
						email: 'john.doe@gmail.com',
						deleted: false,
						invitationAccepted: true
					} 
				],
				designer: { 
					firstName: 'Jane',
					lastName: 'Doe',
					email: 'jane.doe@gmail.com' 
				}
			}
		]

### jar.getActiveClients

Similar to jar.getAllClients, except it will only return clients with a status of 'active'.

		[
			{ 
				id: 123,
				name: 'Client Company',
				slug: 'client-company',
				createdAt: '2019-02-27T16:11:09.486-07:00',
				updatedAt: '2019-08-06T10:25:13.967-07:00',
				deleted: false,
				status: 'active',
				description: 'One of my clients.',
				seesAllRequests: true,
				users: [ 
					{
						firstName: 'John',
						lastName: 'Doe',
						email: 'john.doe@gmail.com',
						deleted: false,
						invitationAccepted: true
					} 
				],
				designer: { 
					firstName: 'Jane',
					lastName: 'Doe',
					email: 'jane.doe@gmail.com' 
				}
			}
		]

### jar.getAllDesigners

This method will return an array of designers. This array is derived from your list of clients meaning that **this method will only return designers that have been auto-assigned to a client!** The Jar api does not have any endpoints specifically for designers, so this is the only way to access designer data.

This method will return an array of designers (each with a list of their current clients):

		[
			{ 
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@gmail.com',
				clients: [
					{
						id: 123,
						name: 'Client Company',
						slug: 'client-company',
						createdAt: '2019-02-27T16:11:09.486-07:00',
						updatedAt: '2019-08-06T10:25:13.967-07:00',
						deleted: false,
						status: 'active',
						description: 'One of my clients.',
						seesAllRequests: true,
						users: [ 
							{
								firstName: 'John',
								lastName: 'Doe',
								email: 'john.doe@gmail.com',
								deleted: false,
								invitationAccepted: true
							}
						]
					} 
				] 
			}
		]

### jar.getDesignerByEmail

This will return the writer with the email passed into the function. THe output will look something like this:

		{
			firstName: 'Jane',
			lastName: 'Doe',
			email: 'Jane@gmail.com',
			clients: [
				{
					name: 'Black Lion Digital',
					createdAt: '2020-01-22T14:31:12.990-07:00',
					users: [Array]
				},
				{
					name: 'Epica',
					createdAt: '2019-09-17T13:52:39.914-07:00',
					users: [Array]
				},
				{
					name: 'InfluenceGeek',
					createdAt: '2019-09-10T12:56:34.653-07:00',
					users: [Array]
				},
				{
					name: 'The MBC Group, LLC',
					createdAt: '2019-09-03T08:49:27.116-07:00',
					users: [Array]
				},
				{
					name: 'CSM Education Inc',
					createdAt: '2019-02-27T14:36:55.819-07:00',
					users: [Array]
				}
			]
		}

### jar.isDesigner

This method will take in a username and password and return true if that email and password can be used to successfully login to jar.

		// username + password are correct => true
		// username + password are not correct => false

### Aliases

Some methods have aliases. Here they are:

* getAllWriters = getAllDesigners
* getWriterByEmail = getDesignerByEmail
* isWriter = isDesigner