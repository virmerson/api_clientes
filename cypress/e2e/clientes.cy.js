describe("Clientes GET /clientes", () => {
  it("Deve listar os clientes", () => {
    cy.request("GET", "http://localhost:3000/clientes").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });
});

describe("Clientes POST /clientes", () => {
  it("Deve cadastrar um cliente", () => {
    cy.request("POST", "http://localhost:3000/clientes", {
      nome: "Virmerson",
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("nome", "Virmerson");
    });
  });
});

describe("Clientes GET /clientes/:id", () => {
  it("Deve buscar um cliente por id", () => {
    cy.request("POST", "http://localhost:3000/clientes", {
      nome: "Maria",
    }).then((response) => {
      const id = response.body.id;

      cy.request("GET", `http://localhost:3000/clientes/${id}`).then(
        (response) => {
          expect(response.body).to.have.property("nome", "Maria");
        }
      );
    });
  });
});

describe("Clientes PUT /clientes/:id", () => {
  it("Deve alterar um cliente por id", () => {
    cy.request("POST", "http://localhost:3000/clientes", {
      nome: "Maria da Silva",
    }).then((response) => {
      const id = response.body.id;

      cy.request("PUT", `http://localhost:3000/clientes/${id}`, {
        nome: "Maria de Souza",
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("nome", "Maria de Souza");
      });
    });
  });
});

describe("Clientes DELETE /clientes/:id", () => {
  it("Deve excluir um cliente por id", () => {
    cy.request("POST", "http://localhost:3000/clientes", {
      nome: "Maria",
    }).then((response) => {
      const id = response.body.id;

      cy.request("DELETE", `http://localhost:3000/clientes/${id}`).then(
        (response) => {
          expect(response.status).to.eq(204);
        }
      );
    });
  });
});
