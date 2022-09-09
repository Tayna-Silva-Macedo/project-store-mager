const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const validateProductsFields = require("../../../src/middlewares/validateProductsFields");

const { expect } = chai;
chai.use(sinonChai);

describe("Testes de unidade do middleware validateProductsFields", function () {
  afterEach(sinon.restore);

  it("Testa se é retornado erro ao tentar cadastrar um produto sem o campo name", async function () {
    const res = {};
    const req = {
      body: {},
    };
    const next = sinon.stub().returns();

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateProductsFields(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    expect(next).to.have.not.been.called;
  });
});
