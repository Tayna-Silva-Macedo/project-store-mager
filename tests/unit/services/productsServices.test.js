const { expect } = require("chai");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const { productsService } = require("../../../src/services");

const {
  correctReturnProducts,
  validProductName,
  invalidProductName,
} = require("../mocks/products.mock");

describe("Testes de unidade da camada service de produtos", function () {
  describe("Testando rotas GET", function () {
    afterEach(sinon.restore);

    it("Testa se todos os produtos são listados corretamente", async function () {
      sinon.stub(productsModel, "getAll").resolves(correctReturnProducts);

      const result = await productsService.getAll();

      expect(result).to.be.deep.equal(correctReturnProducts);
    });

    it("Testa é possível listar um produto pelo seu id", async function () {
      sinon.stub(productsModel, "getById").resolves(correctReturnProducts[0]);

      const result = await productsService.getById(1);

      expect(result).to.be.deep.equal({
        type: null,
        message: correctReturnProducts[0],
      });
    });

    it("Testa se ao digitar um id que não existe é retornado um objeto com erro", async function () {
      sinon.stub(productsModel, "getById").resolves(undefined);

      const result = await productsService.getById(99);

      expect(result).to.be.deep.equal({
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      });
    });
  });

  describe("Testando rota POST", function () {
    afterEach(sinon.restore);

    it("Testa se é possível cadastrar um produto com sucesso", async function () {
      sinon.stub(productsModel, "insert").resolves(5);

      const result = await productsService.insert(validProductName);

      expect(result).to.be.deep.equal({ type: null, message: 5 });
    });

    it("Testa se é retornado um erro ao tentar cadastrar um produto com menos de 5 letras", async function () {
      const result = await productsService.insert(invalidProductName);

      expect(result).to.be.deep.equal({
        type: "INVALID_VALUE",
        message: '"name" length must be at least 5 characters long',
      });
    });
  });
});
