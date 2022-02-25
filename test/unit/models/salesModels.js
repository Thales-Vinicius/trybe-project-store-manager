const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModels = require('../../../models/salesModels');

describe('Testando sales models requisito 2', () => {
  const salesMock = [[
    {
      "sale_id": 1,
      "date": "2022-02-22 22:22:22",
      "product_id": 1,
      "quantity": 10
    },
    {
      "sale_id": 1,
      "date": "2021-01-11 11:11:11",
      "product_id": 2,
      "quantity": 10
    },
    {
      "sale_id": 2,
      "date": "2021-02-12 12:12:12",
      "product_id": 3,
      "quantity": 20
    }
  ]];

  describe('Quando buscar sem o parâmetro "id"' , () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(salesMock);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array com a quantidade certa de elementos', async () => {
      const modelResponse = await salesModels.getAll();

      expect(modelResponse).to.be.an('array');
      expect(modelResponse).to.have.lengthOf(3);
    });

    it('retorno da busca por id', async () => {
      const modelResponse = await salesModels.getById(1);

      expect(modelResponse).to.be.an('array');
    });
  });
});