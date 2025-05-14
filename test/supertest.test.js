import app from '../src/app.js';
import request from 'supertest';
import { expect } from 'chai';

import userModel from '../src/dao/models/User.js';
import petModel from '../src/dao/models/Pet.js';
import adoptionModel from '../src/dao/models/Adoption.js';

describe('Adoptions API', () => {
  let createdUser;
  let createdPet;

  before(async () => {
    createdUser = await userModel.create({
      first_name: 'Test',
      last_name: 'User',
      email: 'testuser@example.com',
      password: '123456'
    });

    createdPet = await petModel.create({
      name: 'Firulais',
      specie: 'Dog',
      adopted: false
    });
  });

  after(async () => {
    await adoptionModel.deleteMany({});
    await userModel.deleteMany({});
    await petModel.deleteMany({});
  });

  it('should create a new adoption', async () => {
    const res = await request(app)
      .post(`/api/adoptions/${createdUser._id}/${createdPet._id}`);

    console.log('Create Adoption Response:', res.body);

    expect(res.status).to.equal(201);
    expect(res.body.status).to.equal('success');
    expect(res.body).to.have.property('payload'); 
    expect(res.body.payload).to.have.property('_id');
  });

  it('should return a single adoption by ID', async () => {
    const newPet = await petModel.create({
      name: 'Luna',
      specie: 'Cat',
      adopted: false
    });

    const postRes = await request(app)
      .post(`/api/adoptions/${createdUser._id}/${newPet._id}`);

    console.log('Post Adoption Response:', postRes.body);

    expect(postRes.status).to.equal(201);
    expect(postRes.body).to.have.property('payload');
    const adoptionId = postRes.body.payload._id;

    const getRes = await request(app)
      .get(`/api/adoptions/${adoptionId}`);

    console.log('Get Adoption Response:', getRes.body);

    expect(getRes.status).to.equal(200);
    expect(getRes.body.status).to.equal('success');
    expect(getRes.body.payload._id).to.equal(adoptionId);
  });

  it('should return 404 if the adoption is not found', async () => {
    const fakeId = '64a7d9e1d23456789abc1234';
    const res = await request(app)
      .get(`/api/adoptions/${fakeId}`);

    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal('error');
  });

  it('should return 400 if the pet is already adopted', async () => {
    const res = await request(app)
      .post(`/api/adoptions/${createdUser._id}/${createdPet._id}`);

    console.log('Duplicate Adoption Response:', res.body);

    expect(res.status).to.equal(400);
    expect(res.body.status).to.equal('error');
    expect(res.body.error).to.equal('Pet is already adopted');
  });
});
