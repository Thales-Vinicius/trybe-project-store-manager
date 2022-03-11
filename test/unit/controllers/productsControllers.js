const sinon = require('sinon');
const { expect } = require('chai');

const productServices = require('../../../services/productsServices');
const productControllers = require('../../../controllers/productsControllers');

describe('Testando o product controller', () => {
  const req = {};
  const res = {};

  const mockTeste = [
    {
      "id": 1,
      "name": "produto A",
      "quantity": 10,
    },
    {
      "id": 2,
      "name": "produto B",
      "quantity": 20,
    }
  ];

  describe('Buscando todos os produtos', () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    
    before(() => {
      sinon.stub(productServices, 'getAll').resolves(mockTeste);
    });

    after(() => {
      productServices.getAll.restore();
    });

    it('retorna a lista de produtos', async () => {
      await productControllers.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Buscando um produto pela "id"', () => {
    const mockObject = {
        "id": 1,
        "name": "produto A",
        "quantity": 10,
      };

    req.params = mockObject.id;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    before(() => {
      sinon.stub(productServices, 'getById').resolves(mockTeste);
    });

    after(() => {
      productServices.getById.restore();
    });

    it('retorna o produto correspondente a id', async () => {
      await productControllers.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('criando um produto novo', () => {
    const mockObject = {
      "id": 1,
      "name": "produto A",
      "quantity": 10,
    };

    req.body = { name: mockObject.name, quantity: mockObject.quantity };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    before(() => {
      sinon.stub(productServices, 'create').resolves(mockTeste);
    });

    after(() => {
      productServices.create.restore();
    });

    it('cria um novo produto', async () => {
      await productControllers.create(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });
});