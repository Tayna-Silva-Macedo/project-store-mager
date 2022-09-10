const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const { productsModel } = require("../../../src/models");

const { correctReturnProducts } = require("../mocks/products.mock");

describe("Testes de unidade da camada model de produtos", function () {
  describe("Testando rotas GET", function () {
    afterEach(sinon.restore);

    it("Testa se todos os produtos são listados corretamente", async function () {
      sinon.stub(connection, "execute").resolves([correctReturnProducts]);

      const result = await productsModel.getAll();

      expect(result).to.be.deep.equal(correctReturnProducts);
    });

    it("Testa é possível listar um produto pelo seu id", async function () {
      sinon.stub(connection, "execute").resolves([[correctReturnProducts[0]]]);

      const result = await productsModel.getById(1);

      expect(result).to.be.deep.equal(correctReturnProducts[0]);
    });

    it("Testa se ao digitar um id que não existe é retornado 'undefined'", async function () {
      sinon.stub(connection, "execute").resolves([[]]);

      const result = await productsModel.getById(99);

      expect(result).to.be.equal(undefined);
    });
  });

  describe("Testando rota POST", function () {
    afterEach(sinon.restore);

    it("Testa se é possível cadastrar um produto com sucesso", async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: 5 }]);

      const result = await productsModel.insert();

      expect(result).to.be.equal(5);
    });
  });

  describe("Testando rota PUT", function () {
    afterEach(sinon.restore);

    it("Testa se é possível atualizar um produto com sucesso", async function () {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const result = await productsModel.update("ProdutoX", 9);

      expect(result).to.be.equal(1);
    });

    it("Testa se a tabela não é atualizada caso o id não exista", async function () {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 0 }]);

      const result = await productsModel.update("ProdutoX", 99);

      expect(result).to.be.equal(0);
    });
  });
});
