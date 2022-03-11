const sinon = require('sinon');
const { expect } = require('chai');

const salesModels = require('../../../models/salesModels');
const salesServices = require('../../../services/salesServices');

describe('Testando sales services', () => {
  describe('Buscando por todas as vendar', () => {
    const mockTeste = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];

    before(() => {
      sinon.stub(salesModels, 'getAll').resolves(mockTeste);
    });

    after(() => {
      salesModels.getAll.restore();
    });

    it('retorna um array com a quantidade certa de produtos', async () => {
      const serviceResponse = await salesServices.getAll();

      expect(serviceResponse).to.be.an('array');
      expect(serviceResponse).to.have.lengthOf(2);
    });
  });

  describe('Buscando uma venda por "id"', () => {
    const mockTeste = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }
    ];

    before(() => {
      sinon.stub(salesModels, 'getById').resolves(mockTeste);
    });

    after(() => {
      salesModels.getById.restore();
    });

    it('retorna o objeto com as propriedades certas', async () => {
      const [serviceResponse] = await salesServices.getById();

      expect(serviceResponse).to.be.an('object');
      expect(serviceResponse).to.have.a.property('date');
      expect(serviceResponse).to.have.a.property('productId');
      expect(serviceResponse).to.have.a.property('quantity');
    });
  });

  describe('cadastrando uma nova venda', () => {
    const mockTeste = [
      {
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 3
          }
        ]
      }
    ];

    before(() => {
      sinon.stub(salesModels, 'create').resolves(mockTeste);
    });

    after(() => {
      salesModels.create.restore();
    });

    it('retorna a venda cadastrado', async () => {
      const [serviceResponse] = await salesServices.create(mockTeste);

      expect(serviceResponse).to.be.an('object');
      expect(serviceResponse).to.have.a.property('id');
      expect(serviceResponse).to.have.a.property('itemsSold');
    });
  });

  describe('quando não pode cadastrar uma venda', () => {
    const mockTeste = [
      {
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 3
          }
        ]
      }
    ];

    before(() => {
      sinon.stub(salesModels, 'create').resolves(false);
    });

    after(() => {
      salesModels.create.restore();
    });

    it('retorna null quando vai criar', async () => {
      const serviceResponse = await salesServices.create(mockTeste);

      expect(serviceResponse).to.be.a('null');
    });
  });

  describe('dando update em uma venda', () => {
    const mockTeste = [
      {
        "saleId": 1,
        "itemUpdated": [
          {
            "productId": 1,
            "quantity": 6
          }
        ]
      }
    ];

    before(() => {
      sinon.stub(salesModels, 'update').resolves(mockTeste);
      sinon.stub(salesModels, 'getById').resolves(mockTeste);
    });

    after(() => {
      salesModels.update.restore();
      salesModels.getById.restore();
    });

    it('retorna a venda atualizada', async () => {
      const [serviceResponse] = await salesServices.update(mockTeste);

      expect(serviceResponse).to.be.an('object');
      expect(serviceResponse).to.have.a.property('saleId');
      expect(serviceResponse).to.have.a.property('itemUpdated');
    });
  });

  describe('quando não tiver sale para dar update', () => {
    const mockTeste = [
      {
        "saleId": 1,
        "itemUpdated": [
          {
            "productId": 1,
            "quantity": 6
          }
        ]
      }
    ];

    before(() => {
      sinon.stub(salesModels, 'update').resolves(false);
      sinon.stub(salesModels, 'getById').resolves([]);
    });

    after(() => {
      salesModels.update.restore();
      salesModels.getById.restore();
    });

    it('retorna null quando vai atualizar', async () => {
      const serviceResponse = await salesServices.update(mockTeste);

      expect(serviceResponse).to.be.a('null');
    });
  });
});
