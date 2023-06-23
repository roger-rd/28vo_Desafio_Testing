import request from "supertest";
import {app} from "../index.js";



describe("Operaciones CRUD de cafes",() => {
    const cafeId = 5;  // ID de cafe valido para las pruebas; 

// 1) Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido
// es un arreglo con por lo menos 1 objeto.     
    describe("GET /cafes",()=>{
        it("devuelve un status code 200", async()=>{
            const response = await request(app).get("/api/cafes");
    
            expect(response.status).toBe(200);
        });
    
        it("el tipo de dato recibido es un arreglo", async ()=>{
            const response = await request(app).get("/api/cafes");
    
            expect(Array.isArray(response.body)).toBe(true);
        });
    
        it("el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async ()=>{
            const response = await request(app).get("/api/cafes");
            
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).toBeInstanceOf(Object);
        });
    });

//2) Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.
    describe("DELETE /cafes/:id",() => {
        it("Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe", async () => {
            const invaliCafeId = 6; // ID de cafe invalido para las pruebas.;

            const response = await request(app)
            .delete(`/api/cafes/${invaliCafeId}`)
            .set('Authorization', 'dummy-token');
        
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: 'No se encontró ningún cafe con ese id' });
            });
    });

// 3) Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.
    describe("POST/cafes",() => {
        it("ruta POST/cafes devuelve un status code 201", async()=>{
            const response = await request(app).
            post("/api/cafes");

            expect(response.status).toBe(201);
        });
        
        it("Prueba que la ruta POST/cafes agrega un nuevo café y devuelve un código 201", async()=>{
            const response = await request(app)
            .post("/api/cafes")
            .send({
                id: cafeId, 
                nombre: "cafe venezolano",
            });

            expect(response.status).toBe(201);
        });

    });

    // 4) Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un
    // café enviando un id en los parámetros que sea diferente al id dentro del payload.
    //
    describe("PUT/cafes/:id",() => {    
        it("Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async()=>{
            const invalidCafeId = 8

        const response = await request(app)
        .put(`/api/cafes/${invalidCafeId}`)
        .send({
            id:cafeId,
            nombre: "cafe colombiano"
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
        message: "El id del parámetro no coincide con el id del café recibido",
        });
    });
    });
});