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

  describe("Testando rota PUT", function () {
    afterEach(sinon.restore);

    it("Testa se a tabela não é atualizada caso o novo nome tenha menos de 5 letras", async function () {
      const result = await productsService.update("Prod", 3);

      expect(result).to.be.deep.equal({
        type: "INVALID_VALUE",
        message: '"name" length must be at least 5 characters long',
      });
    });

    it("Testa se a tabela não é atualizada caso o id não exista", async function () {
      sinon.stub(productsModel, "update").resolves(0);

      const result = await productsService.update("ProdutoX", 3);

      expect(result).to.be.deep.equal({
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      });
    });

    it("Testa se é possível atualizar um produto com sucesso", async function () {
      sinon.stub(productsModel, "update").resolves(1);

      const result = await productsService.update("ProdutoX", 3);

      expect(result).to.be.deep.equal({ type: null, message: "" });
    });
  });

  describe("Testando rota DELETE", function () {
    afterEach(sinon.restore);

    it("Testa se não é possível deletar um produto que não existe", async function () {
      sinon.stub(productsModel, "destroy").resolves(0);

      const result = await productsService.destroy(99);

      expect(result).to.be.deep.equal({
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      });
    });

    it("Testa se é possível deletar um produto com sucesso", async function () {
      sinon.stub(productsModel, "destroy").resolves(1);

      const result = await productsService.destroy(2);

      expect(result).to.be.deep.equal({ type: null, message: "" });
    });
  });
});
