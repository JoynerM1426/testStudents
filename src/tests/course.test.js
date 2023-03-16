const request = require('supertest')
const app = require('../app')
require('../models')

let  coursesId;

test("POST /courses crete courses", async () => {
  const newCourse={
    name: "Sofware",
    credits: 5
  }
  const res =await request(app).post('/courses').send(newCourse)
  coursesId=res.body.id
  expect(res.status).toBe(201)
  expect(res.body.name).toBe(newCourse.name)
})

test("GET /course return all the students", async () => {
  const res = await request(app).get('/courses');
  // console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].students).toBeDefined()
})
test("PUT /course", async()=>{
  const body = {
    name:"sofware update"
  }
  const res = await request(app)
  .put(`/courses/${coursesId}`)
  .send(body);   //lo que envia de regreso
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(body.name)  
})

test("DELETE /courses/:id  delete", async() => {
  const res =  await request(app).delete(`/courses/${coursesId}`);
   expect(res.status).toBe(204);
} )