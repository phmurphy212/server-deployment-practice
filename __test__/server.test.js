'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('web server', () => {
  it('should respond properly on request to /person with a name', async () => {
    const data = {
      name: 'test'
    }
    const response = await mockRequest.get('/person').query(data);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(data);
  })
  
  it('should respond with a 404 on an invalid route', () => {
    return mockRequest
      .get('/foobar')
      .then(results => {
        expect(results.status).toBe(404);
      });
  })

  it('should respond with a 404 on an bad method', () => {
    return mockRequest
      .get('/foo')
      .then(results => {
        expect(results.status).toBe(404);
        expect(results.req.method).toBe('GET');
      });
  })

  it('should respond with a 500 for a nameless request to /person', async () => {
    const data = {
      name: 'test'
    }
    const response = await mockRequest.get('/person');
      expect(response.status).toBe(500);
      expect(response.body.query.value).toBeFalsy();
  })
})
