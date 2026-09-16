import { ApiHelper } from '../../src/api/ApiHelper';
import {test,expect} from '../../src/fixtures/apifixtures';

const TOKEN= process.env.API_Token!;
let AUTH_HEADER={Authorization:`Bearer ${TOKEN}` };

//helper - genric function- create a fresh user 

async function createUser(apiHelper:any) {

      let userData={
        name: 'uday',
        email: `automation${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    };

    let response= await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    return response.body;

    
}

//Test 1: create a user test + verify : AAA
//POST---> userId--. GET/userId--verify


test('Post - create a user ',async({apiHelper})=>{

    //create a user
    let userResponse=await createUser(apiHelper);

//get the user:

let response =await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
expect(response.status).toBe(200);
expect(response.body.name).toBe('Naveen API');

});


test('PUT - uPDATE a user ',async({apiHelper})=>{

    //create a user
    let userResponse=await createUser(apiHelper);

       let userUpdatedData={
        name: 'Naveen API Updated',
      
        status: 'inactive'
    };


//UPDATE the user:

let response =await apiHelper.put(`/public/v2/users/${userResponse.id}`, userUpdatedData,AUTH_HEADER);
expect(response.status).toBe(200);


expect(response.body.name).toBe(userUpdatedData.name);
expect(response.body.status).toBe(userUpdatedData.status);

//GET THE USER 

let getResponse =await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
expect(getResponse.status).toBe(200);
expect(getResponse.body.name).toBe(userUpdatedData.name);

});


//DELETE A user


test('Delete - Delete a user ',async({apiHelper})=>{

    //create a user
    let userResponse=await createUser(apiHelper);

   


//delete the user:

let response =await apiHelper.delete(`/public/v2/users/${userResponse.id}`,AUTH_HEADER);
expect(response.status).toBe(204);




//GET THE USER 

let getResponse =await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER);
expect(getResponse.status).toBe(404);
expect(getResponse.body.message).toBe('Resource not found');

});