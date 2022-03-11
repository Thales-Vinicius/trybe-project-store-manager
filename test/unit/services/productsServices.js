const sinon = require('sinon');
const { expect } = require('chai');

const productModels = require('../../../models/productsModels');
const productServices = require('../../../services/productsServices');
const { array } = require('joi');

describe('Testando product services', () => {
  describe('Buscando por todos os produtos', () => {
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

    before(() => {
      sinon.stub(productModels, 'getAll').resolves(mockTeste);
    });

    after(() => {
      productModels.getAll.restore();
    });

    it('retorna um array com a quantidade certa de produtos', async () => {
      const serviceResponse = await productServices.getAll();

      expect(serviceResponse).to.be.an('array');
      expect(serviceResponse).to.have.lengthOf(2);

    });
  });

  describe('Buscando um produto por "id"', () => {
    const mockTeste = [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10,
      }
    ];

    before(() => {
      sinon.stub(productModels, 'getById').resolves(mockTeste);
    });

    after(() => {
      productModels.getById.restore();
    });

    it('retorna o objeto com as propriedades certas', async () => {
      const [serviceResponse] = await productServices.getById();

      expect(serviceResponse).to.be.an('object');
      expect(serviceResponse).to.have.a.property('id');
      expect(serviceResponse).to.have.a.property('name');
      expect(serviceResponse).to.have.a.property('quantity');
    });
  });

  describe('cadastrando um novo produto', () => {
    const mockTeste = [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10,
      }
    ];

    before(() => {
      sinon.stub(productModels, 'create').resolves(mockTeste);
    });

    after(() => {
      productModels.create.restore();
    });

    it('retorna o produto cadastrado', async () => {
      const [serviceResponse] = await productServices.create(mockTeste);

      expect(serviceResponse).to.be.an('object');
      expect(serviceResponse).to.have.a.property('id');
      expect(serviceResponse).to.have.a.property('name');
      expect(serviceResponse).to.have.a.property('quantity');
    });
  });

  describe('dando update em um produto', () => {
    const mockTeste = [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10,
      }
    ];

    before(() => {
      sinon.stub(productModels, 'update').resolves(mockTeste);
      sinon.stub(productModels, 'getById').resolves(mockTeste);
    });

    after(() => {
      productModels.update.restore();
      productModels.getById.restore();
    });

    it('retorna o produto atualizado', async () => {
      const serviceResponse = await productServices.update(mockTeste);

      expect(serviceResponse).to.be.an('object');
      expect(serviceResponse).to.have.a.property('id');
      expect(serviceResponse).to.have.a.property('name');
      expect(serviceResponse).to.have.a.property('quantity');
    });
  });

  describe('Deletando um produto', () => {
    const mockTeste = [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10,
      }
    ];

    before(() => {
      sinon.stub(productModels, 'getById').resolves(mockTeste);
      sinon.stub(productModels, 'deleted').resolves(mockTeste);
    });

    after(() => {
      productModels.getById.restore();
      productModels.deleted.restore();
    });

    it('deleta o produto com sucesso', async () => {
      const serviceResponse = await productServices.deleted(mockTeste);

      expect(serviceResponse).to.be.an('array');
    });
  });
});
