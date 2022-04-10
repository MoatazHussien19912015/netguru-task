const controller = require('./moviesController');
const middleware = require('./../middlewares/roleCheckMiddleware');
/* const app = require('../index');
const supertest = require("supertest");
const request = supertest(app); */
const axios = require('axios');
jest.mock('axios');



describe('testing the get requests',() => {

    it('testing the get api', async() => {
        axios.get.mockResolvedValue({
            status: 200,
            body: {success: true, movies: [{}, {}]}
          });
        const response = await axios.get('/get-movies');
        
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.movies.length).toBeGreaterThan(0);
    });
});

describe('testing the post requests', () => {
    it('no token provided', async() => {
        axios.post.mockResolvedValue({
            status: 403,
            body: {success: false, message: 'token not provided'}
          });
        const response = await axios.post('/add-movie', {
            "title": "Inception",
            "director": "Christopher Nolan",
            "genre": "Action",
            "released": "2010-07-14"
        });
        expect(response.status).toBe(403);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('token not provided');
    });

    it('token expired', async() => {
        axios.post.mockResolvedValue({
            status: 401,
            body: {success: false, message: 'invalid token'}
          });
        const response = await axios.post('/add-movie', {
            "title": "Inception",
            "director": "Christopher Nolan",
            "genre": "Action",
            "released": "2010-07-14"
        }, {headers:{Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0OTM2NTY5MCwiZXhwIjoxNjQ5MzY3NDkwLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.MPGVjFA1fPmUL1Ey7Q3Ohq4CEUwu6jtB4cexbrVThL4'}});
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('invalid token');
    });

    it('no body or error in the body request', async() => {
        axios.post.mockResolvedValue({
            status: 400,
            body: {success: false, message: 'specific error message'}
          }); 
        const response = await axios.post('/add-movie', {}, {headers:{Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0OTM2NTY5MCwiZXhwIjoxNjQ5MzY3NDkwLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.MPGVjFA1fPmUL1Ey7Q3Ohq4CEUwu6jtB4cexbrVThL4'}});
     
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('specific error message'); 
    });

    it('movie added successfully', async() => {
        axios.post.mockResolvedValue({
            status: 200,
            body: {success: true, movie: {
                "title": "Inception",
                "director": "Christopher Nolan",
                "genre": "Action",
                "released": "2010-07-14"
            }}
          });
        const response = await axios.post('/add-movie', {
            "title": "Inception",
            "director": "Christopher Nolan",
            "genre": "Action",
            "released": "2010-07-14"
        }, {headers:{Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0OTM2NTY5MCwiZXhwIjoxNjQ5MzY3NDkwLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.MPGVjFA1fPmUL1Ey7Q3Ohq4CEUwu6jtB4cexbrVThL4'}});
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.movie).toEqual({
            "title": "Inception",
            "director": "Christopher Nolan",
            "genre": "Action",
            "released": "2010-07-14"
        });
    });

    it('basic user exceeded his limit', async() => {
        axios.post.mockResolvedValue({
            status: 400,
            body: {success: false, message: 'please come back next month, your number of added movies exceeded'}
          });
        const response = await axios.post('/add-movie', {
            "title": "Inception",
            "director": "Christopher Nolan",
            "genre": "Action",
            "released": "2010-07-14"
        }, {headers:{Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0OTM2NTY5MCwiZXhwIjoxNjQ5MzY3NDkwLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.MPGVjFA1fPmUL1Ey7Q3Ohq4CEUwu6jtB4cexbrVThL4'}});
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('please come back next month, your number of added movies exceeded');
    });
});