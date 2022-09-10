const { expect } = require("chai");
const sinon = require("sinon");

const { salesModel, productsModel } = require("../../../src/models");
const { salesService } = require("../../../src/services");

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
      sinon.stub(productsModel, 'getById').returns(2);

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
});
