import chai from "chai";
import chaiHttp from "chai-http";
import request from "supertest";
import app from "../app.js";
import { usersService, petsService, adoptionsService } from "../services/index.js";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Pruebas funcionales del router de adopciones", function () {
  this.timeout(10000);

  let userId;
  let petId;
  let adoptionId;

  before(async () => {
    const user = await usersService.create({
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      password: "test1234",
      pets: [],
      role: "user"
    });

    userId = user._id.toString();

    const pet = await petsService.create({
      name: "Test Pet",
      specie: "dog",
      adopted: false
    });

    petId = pet._id.toString();
  });

  after(async () => {
    if (adoptionId) await adoptionsService.delete(adoptionId);
    if (userId) await usersService.delete(userId);
    if (petId) await petsService.delete(petId);
  });

  describe("GET /api/adoptions", () => {
    it("debería devolver todas las adopciones", async () => {
      const res = await request(app).get("/api/adoptions");
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal("success");
      expect(res.body.payload).to.be.an("array");
    });
  });

  describe("GET /api/adoptions/:aid", () => {
    it("debería devolver 404 si la adopción no existe", async () => {
      const fakeId = "64b1d9f91234567890123456";
      const res = await request(app).get(`/api/adoptions/${fakeId}`);
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal("error");
      expect(res.body.error).to.equal("Adoption not found");
    });

    it("debería devolver una adopción válida cuando se proporciona un ID correcto", async () => {
      const createRes = await request(app).post(`/api/adoptions/${userId}/${petId}`);
      expect(createRes.status).to.equal(200);
      expect(createRes.body.status).to.equal("success");

      const allRes = await request(app).get("/api/adoptions");
      adoptionId = allRes.body.payload[allRes.body.payload.length - 1]._id;

      const res = await request(app).get(`/api/adoptions/${adoptionId}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal("success");
      expect(res.body.payload).to.have.property("_id", adoptionId);
    });
  });

  describe("POST /api/adoptions/:uid/:pid", () => {
    it("debería devolver 404 si el usuario no existe", async () => {
      const fakeUserId = "64b1d9f91234567890123456";
      const res = await request(app).post(`/api/adoptions/${fakeUserId}/${petId}`);
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal("error");
      expect(res.body.error).to.equal("user Not found");
    });

    it("debería devolver 404 si la mascota no existe", async () => {
      const fakePetId = "64b1d9f91234567890123456";
      const res = await request(app).post(`/api/adoptions/${userId}/${fakePetId}`);
      expect(res.status).to.equal(404);
      expect(res.body.status).to.equal("error");
      expect(res.body.error).to.equal("Pet not found");
    });

    it("debería devolver 400 si la mascota ya fue adoptada", async () => {
      await request(app).post(`/api/adoptions/${userId}/${petId}`);
      const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);
      expect(res.status).to.equal(400);
      expect(res.body.status).to.equal("error");
      expect(res.body.error).to.equal("Pet is already adopted");
    });

    it("debería crear una adopción correctamente", async () => {
      // Eliminar usuario con email duplicado si existe
      const existente = await usersService.getBy({ email: "user2@example.com" });
      if (existente) await usersService.delete(existente._id);

      const newUser = await usersService.create({
        first_name: "Usuario",
        last_name: "Dos",
        email: "user2@example.com",
        password: "test1234",
        pets: [],
        role: "user"
      });

      const newPet = await petsService.create({
        name: "Mascota 2",
        specie: "cat",
        adopted: false
      });

      const res = await request(app).post(`/api/adoptions/${newUser._id}/${newPet._id}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal("success");
      expect(res.body.message).to.equal("Pet adopted");

      const adoption = await adoptionsService.getBy({ owner: newUser._id, pet: newPet._id });
      if (adoption) {
        await adoptionsService.delete(adoption._id);
      }

      await usersService.delete(newUser._id);
      await petsService.delete(newPet._id);
    });
  });
});
