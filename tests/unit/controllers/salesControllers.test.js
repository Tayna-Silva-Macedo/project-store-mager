const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { salesService } = require("../../../src/services");
const { salesController } = require("../../../src/controllers");

const {
  returnInvalidQuantity,
  returnInvalidProductId,
  returnSucess,
} = require("../mocks/sales.mock");

const { expect } = chai;
chai.use(sinonChai);

describe("Testes de unidade da camada controller de vendas", function () {
  describe("Testando rota POST", function () {
    afterEach(sinon.restore);

    it("Testa se não é possível realizar operações quando a quantidade é menor que 0", async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: -1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, "insert").resolves({
        type: "INVALID_VALUE",
        message: '"quantity" must be greater than or equal to 1',
      });

      await salesController.insert(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith(returnInvalidQuantity);
    });

    it("Testa se não é possível realizar operações quando a quantidade é igual a 0", async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 4,
          },
          {
            productId: 2,
            quantity: 0,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, "insert").resolves({
        type: "INVALID_VALUE",
        message: '"quantity" must be greater than or equal to 1',
      });

      await salesController.insert(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith(returnInvalidQuantity);
    });

    it("Testa se não é possível realizar operações quando o id é inexistente", async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 99,
            quantity: 3,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, "insert").resolves({
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      });

      await salesController.insert(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(returnInvalidProductId);
    });

    it("Testa se é possível cadastrar uma venda com sucesso", async function () {
      const res = {};
      const req = {
        body: [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ],
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, "insert").resolves({
        type: null,
        message: 3,
      });

      await salesController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(returnSucess);
    });
  });
});
