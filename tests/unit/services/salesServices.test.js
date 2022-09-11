const { expect } = require("chai");
const sinon = require("sinon");

const { salesModel, productsModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");

const { returnSucessGet, returnSucessGetById } = require("../mocks/sales.mock");

describe("Testes de unidade da camada service de vendas", function () {
  describe("Testando rota POST", function () {
    afterEach(sinon.restore);

    it("Testa se não é possível realizar operações quando a quantidade é menor que 0", async function () {
      const result = await salesService.insert([
        {
          productId: 1,
          quantity: -1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ]);

      expect(result).to.be.deep.equal({
        type: "INVALID_VALUE",
        message: '"quantity" must be greater than or equal to 1',
      });
    });

    it("Testa se não é possível realizar operações quando a quantidade é igual a 0", async function () {
      const result = await salesService.insert([
        {
          productId: 1,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 0,
        },
      ]);

      expect(result).to.be.deep.equal({
        type: "INVALID_VALUE",
        message: '"quantity" must be greater than or equal to 1',
      });
    });

    it("Testa se não é possível realizar operações quando o id é inexistente", async function () {
      sinon.stub(productsModel, "getById").returns(undefined);

      const result = await salesService.insert([
        {
          productId: 99,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 4,
        },
      ]);

      expect(result).to.be.deep.equal({
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      });
    });

    it("Testa se é possível cadastrar uma venda com sucesso", async function () {
      sinon.stub(salesModel, "insertSalesProducts").returns(7);
      sinon.stub(productsModel, "getById").returns(2);

      const result = await salesService.insert([
        {
          productId: 1,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 4,
        },
      ]);

      expect(result).to.be.deep.equal({ type: null, message: 7 });
    });
  });

  describe("Testando rotas GET", function () {
    afterEach(sinon.restore);

    it("Testa se é possível listar todas as vendas", async function () {
      sinon.stub(salesModel, "getAll").returns(returnSucessGet);

      const result = await salesService.getAll();

      expect(result).to.be.deep.equal(returnSucessGet);
    });

    it("Testa se é possível listar uma venda pelo seu id", async function () {
      sinon.stub(salesModel, "getById").returns(returnSucessGetById);

      const result = await salesService.getById(1);

      expect(result).to.be.deep.equal({
        type: null,
        message: returnSucessGetById,
      });
    });

    it("Testa se ao procurar por um id que não existe é retornado um objeto com erro", async function () {
      sinon.stub(salesModel, "getById").returns([]);

      const result = await salesService.getById(99);

      expect(result).to.be.deep.equal({
        type: "SALE_NOT_FOUND",
        message: "Sale not found",
      });
    });
  });

  describe("Testando rota DELETE", function () {
    afterEach(sinon.restore);

    it("Testa se não é possível deletar uma venda que não existe", async function () {
      sinon.stub(salesModel, "destroy").returns(0);

      const result = await salesService.destroy(99);

      expect(result).to.be.deep.equal({
        type: "SALE_NOT_FOUND",
        message: "Sale not found",
      });
    });

    it("Testa se é possível deletar uma venda com sucesso", async function () {
      sinon.stub(salesModel, "destroy").returns(1);

      const result = await salesService.destroy(1);

      expect(result).to.be.deep.equal({ type: null, message: "" });
    });
  });
});
