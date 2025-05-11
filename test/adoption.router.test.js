import request from 'supertest';
import app from '../src/app';
describe('Adoptions API', () => {

  describe('GET /api/adoptions', () => {
    it('should return a list of adoptions', async () => {
      const response = await request(app).get('/api/adoptions');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array); 
    });
  });

  describe('GET /api/adoptions/:aid', () => {
    it('should return a single adoption by ID', async () => {
      const adoptionId = 'validAdoptionId'; 
      const response = await request(app).get(`/api/adoptions/${adoptionId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('aid', adoptionId); 
    });

    it('should return 404 if the adoption is not found', async () => {
      const invalidAdoptionId = 'invalidAdoptionId';
      const response = await request(app).get(`/api/adoptions/${invalidAdoptionId}`);
      expect(response.status).toBe(404);
    });
  });

  describe('POST /api/adoptions/:uid/:pid', () => {
    it('should create a new adoption', async () => {
      const userId = 'validUserId'; 
      const petId = 'validPetId'; 
      const response = await request(app)
        .post(`/api/adoptions/${userId}/${petId}`)
        .send({ additionalField: 'value' }); 

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('aid');
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/adoptions/invalidUserId/invalidPetId')
        .send({});
      expect(response.status).toBe(400); // Error si falta un campo
    });
  });

});
