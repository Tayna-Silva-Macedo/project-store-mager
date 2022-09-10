const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const validateSalesFields = require("../../../src/middlewares/validateSalesFields");
const { returnNoProductId, returnNoQuantity } = require("../mocks/sales.mock");

const { expect } = chai;
chai.use(sinonChai);

describe("Testes de unidade do middleware validateSalesFields", function () {
  afterEach(sinon.restore);

  it("Testa se é retornado erro ao tentar cadastrar uma venda sem o campo productId", async function () {
    const res = {};
    const req = {
      body: [
        {
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateSalesFields(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(returnNoProductId);
    expect(next).to.have.not.been.called;
  });

  it("Testa se é retornado erro ao tentar cadastrar uma venda sem o campo quantity", async function () {
    const res = {};
    const req = {
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
        },
      ],
    };
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateSalesFields(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(returnNoQuantity);
    expect(next).to.have.not.been.called;
  });
});
