const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { productsService } = require("../../../src/services");
const { productsController } = require("../../../src/controllers");

const {
  correctReturnProducts,
  validProductName,
  invalidProductName,
} = require("../mocks/products.mock");

const { expect } = chai;
chai.use(sinonChai);

describe("Testes de unidade da camada controller de produtos", function () {
  describe("Testando rotas GET", function () {
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
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });

  describe("Testando rota POST", function () {
    afterEach(sinon.restore);

    it("Testa se é possível cadastrar um produto com sucesso", async function () {
      const res = {};
      const req = {
        body: {
          name: validProductName,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, "insert")
        .resolves({ type: null, message: 5 });

      await productsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 5,
        name: validProductName,
      });
    });

    it("Testa se é retornado um erro ao tentar cadastrar um produto com menos de 5 letras", async function () {
      const res = {};
      const req = {
        body: {
          name: invalidProductName,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, "insert").resolves({
        type: "INVALID_VALUE",
        message: '"name" length must be at least 5 characters long',
      });

      await productsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });
  });

  describe("Testando rota PUT", function () {
    afterEach(sinon.restore);

    it("Testa se a tabela não é atualizada caso o novo nome tenha menos de 5 letras", async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: invalidProductName,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, "update").resolves({
        type: "INVALID_VALUE",
        message: '"name" length must be at least 5 characters long',
      });

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });

    it("Testa se a tabela não é atualizada caso o id não exista", async function () {
      const res = {};
      const req = {
        params: {
          id: 99,
        },
        body: {
          name: validProductName,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, "update")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });

    it("Testa se é possível atualizar um produto com sucesso", async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: validProductName,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, "update")
        .resolves({ type: null, message: "" });

      await productsController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        id: 1,
        name: validProductName,
      });
    });
  });
});
