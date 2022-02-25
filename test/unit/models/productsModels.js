const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection')
const productModels = require('../../../models/productsModels');

describe('Testando product models requisito requisito 2', () => {
  const productsMock = [[
    {
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 10,
    },
    {
      "id": 2,
      "name": "Traje de encolhimento",
      "quantity": 20,
    }
  ]];

  describe('Quando buscar sem o parâmetro "id"' , () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(productsMock);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array com a quantidade certa de produtos', async () => {
      const modelResponse = await productModels.getAll();

      expect(modelResponse).to.be.an('array');
      expect(modelResponse).to.have.lengthOf(2);
    });
    
    it('que o objeto possui as todas propriedades', async () => {
      const [modelResponse] = await productModels.getAll();

      expect(modelResponse).to.be.an('object');
      expect(modelResponse).to.have.property('id');
      expect(modelResponse).to.have.property('name');
      expect(modelResponse).to.have.property('quantity');
    });
  });

  describe('Quando buscar com o parâmetro "id"', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(productsMock);
    });

    after(() => {
      connection.execute.restore();
    });

    it('o array retornado possui apenas um objeto', async () => {
      const [modelResponse] = await productModels.getById(1);

      expect(modelResponse).to.be.an('object');
    });
  });
});
