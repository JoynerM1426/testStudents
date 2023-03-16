const request = require('supertest')
const app = require('../app');
const Course = require('../models/Couse');
require('../models')

let studentId;
// clg antes del expect para ver el error
test("POST /students create students", async()=> {
  const newStudent = {
    firstName: "Jose",
    lastName : "Morra",
    birthday: 1997,
    program : "Tecnology"
  }
  const res = await request(app)
  .post('/students')
  .send(newStudent)
  studentId= res.body.id;
  // console.log(res.body);
  expect(res.status).toBe(201)
  expect(res.body.firstName).toBe(newStudent.firstName)
})

test("GET /students return all the students", async () => {
  const res = await request(app).get('/students');
  console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].courses).toBeDefined() 
})

test("PUT /students", async()=>{
  const body = {
    firstName:"Jose update"
  }
  const res = await request(app)
  .put(`/students/${studentId}`)
  .send(body);   //lo que envia de regreso
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(body.firstName);
})

test("POST /studets/:id/courses set courses", async()=> {
  const courses = await Course.create({
    name: "Sofware",
    credits: 5
  })
  const res = await request(app)
  .post(`/students/${studentId}/courses`)
  .send([courses.id])
  console.log(res.body);
  await courses.destroy()
  expect(res.status).toBe(200)
  expect(res.body).toHaveLength(1)
})

test("DELETE /students/:id  delete", async() => {
  const res =  await request(app).delete(`/students/${studentId}`);
   expect(res.status).toBe(204);
} )

