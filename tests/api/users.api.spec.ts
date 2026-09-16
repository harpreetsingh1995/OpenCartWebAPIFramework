import {test, expect} from '@playwright/test';
import { json } from 'node:stream/consumers';

let AUTH_TOKEN={Authorization: 'Bearer 654996f60bd5a506f0156257511ad72289d94b182394cf63b2e42af18daa26cc'};

test('get user test',async ({request})=>{

    let response=await request.get('https://gorest.co.in/public/v2/users/',{
     headers: AUTH_TOKEN

    });
console.log(response);
let jsonBody= await response.json();
console.log(jsonBody);
console.log(response.status());
console.log(response.statusText());

});

test('create a user test',async ({request})=>{


    //JS Object
    let userData={
        name: 'uday',
        email: `automation${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    }

    //JSObject to Serialization
    let response=await request.post('https://gorest.co.in/public/v2/users/',{
     headers: AUTH_TOKEN,
     data: userData

    });
console.log(response);
let jsonBody= await response.json();
console.log(jsonBody);
console.log(response.status());
console.log(response.statusText());

});

test('update a user test',async ({request})=>{


    //JS Object
    let userData={
        name: 'uday',
        email: `automation${Date.now()}@open.com`,
        gender: 'male',
        status: 'inactive'
    }

    //JSObject to Serialization
    let response=await request.put('https://gorest.co.in/public/v2/users/8558167',{
     headers: AUTH_TOKEN,
     data: userData

    });
console.log(response);
let jsonBody= await response.json();
console.log(jsonBody);
console.log(response.status());
console.log(response.statusText());

});

test('Delete a user test',async ({request})=>{


    

    //JSObject to Serialization
    let response=await request.delete('https://gorest.co.in/public/v2/users/8558137',{
     headers: AUTH_TOKEN,
    

    });
console.log(response);

console.log(response.status());
console.log(response.statusText());

});

