const { expect } = require("chai");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const { productsService } = require("../../../src/services");

const { correctReturnProducts } = require("../mocks/products.mock");

describe("Testes de unidade da camada service de produtos", function () {
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
