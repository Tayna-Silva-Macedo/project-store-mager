const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { productsService } = require("../../../src/services");
const { productsController } = require("../../../src/controllers");

const { correctReturnProducts } = require("../mocks/products.mock");

const { expect } = chai;
chai.use(sinonChai);

describe("Testes de unidade da camada controller de produtos", function () {
  afterEach(sinon.restore);

  it("Testa se todos os produtos são listados corretamente", async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, "getAll").resolves(correctReturnProducts);

    await productsController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(correctReturnProducts);
  });

  it("Testa é possível listar um produto pelo seu id", async function () {
    const res = {};
    const req = {
      params: {
        id: 1,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, "getById")
      .resolves({ type: null, message: correctReturnProducts[0] });

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(correctReturnProducts[0]);
  });

  it("Testa se ao digitar um id que não existe é retornado um objeto com erro", async function () {
    const res = {};
    const req = {
      params: {
        id: 99,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, "getById")
      .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: "Product not found" });
  });
});
