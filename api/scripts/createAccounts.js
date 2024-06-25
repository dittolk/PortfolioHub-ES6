import axios from 'axios';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import 'dotenv/config';

const userData = () => {
    return {
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
};

const createAccount = async (user) => {
    try {
        const response = await axios.post(`${process.env.BASE_URL_API}/api/users/`, user, {
            timeout: 10000
        });
        console.log(`Account created: ${response.data}`);
    } catch (error) {
        if (error.response) {
            console.error(`Server responded with status ${error.response.status}: ${error.response.data}`);
        } else if (error.request) {
            console.error(`No response received: ${error.message}`);
        } else {
            console.error(`Error setting up request: ${error.message}`);
        }
    }
};

const createMultipleAccounts = async (numAccounts) => {
    const users = [];
    for (let i = 0; i < numAccounts; i++) {
        const user = userData();
        users.push(user);
        await createAccount(user);
        
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    fs.writeFileSync('accounts.json', JSON.stringify(users, null, 2));
    console.log(`Saved ${numAccounts} accounts to accounts.json`);

    console.log(`${numAccounts} accounts created successfully`);
};

createMultipleAccounts(800);
