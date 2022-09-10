const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const { salesModel } = require("../../../src/models");

describe("Testes de unidade da camada model de vendas", function () {
  describe("Testando rota POST", function () {
    afterEach(sinon.restore);

    it("Testa se é possível cadastrar uma venda com sucesso", async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 7 }]);

      const result = await salesModel.insertSalesProducts([
        {
          productId: 1,
          quantity: 5,
        },
        {
          productId: 2,
          quantity: 4,
        },
      ]);

      expect(result).to.be.deep.equal(7);
    });
  });
});
