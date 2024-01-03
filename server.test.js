const request = require('supertest');
const app = require('./server');

describe('GET /', () => {
  it('should return status code 200 and the home page content', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain("<h1>Page d'accueil </h1>");
  });
});

describe('GET /produit/:id', () => {
  it('should return status code 200 and the product page content if the id is an integer', async () => {
    const response = await request(app).get('/produit/123');
    expect(response.status).toBe(200);
    expect(response.text).toContain('page de produit n°123');
  });

  it('should return status code 200 and "produit non trouvé" if the id is not an integer', async () => {
    const response = await request(app).get('/produit/abc');
    expect(response.status).toBe(200);
    expect(response.text).toContain('produit non trouvé');
  });
});