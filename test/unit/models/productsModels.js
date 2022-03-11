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

  describe('Quando buscar pelo pârametro "name"', () => {
    const mockTeste = [[{
      "id": 10,
      "name": "produto1",
      "quantity": 10,
    }]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(mockTeste);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna a resposta esperada', async () => {
      const [modelResponse] = await productModels.findByName(mockTeste);

      expect(modelResponse).to.be.an('object');
    });

    it('possui todas as propriedades', async () => {
      const [modelResponse] = await productModels.findByName(mockTeste);

      expect(modelResponse).to.have.a.property('id');
      expect(modelResponse).to.have.a.property('name');
      expect(modelResponse).to.have.a.property('quantity');
    });
  });

  describe('Criando um produto novo', () => {
    const mockTeste = [[{
      "name": "produto2",
      "quantity": 2,
    }]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(mockTeste);
    });

    after(() => {
      connection.execute.restore();
    });

    it('quando o cadastro for feito corretamente', async () => {
      const modelResponse = await productModels.create(mockTeste);

      expect(modelResponse).to.be.an('object');
    });

    it('o produto cadastrado possui todas as propriedades', async () => {
      const modelResponse = await productModels.create(mockTeste);

      expect(modelResponse).to.have.a.property('id');
      expect(modelResponse).to.have.a.property('name');
      expect(modelResponse).to.have.a.property('quantity');
    });
  });

  describe('Dando update em um produto existente', () => {
    const mockTeste = [[{
      "id": 1,
      "name": "Martelo de Thor",
      "quantity": 15,
    }]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(mockTeste);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Se foi atualizado com sucesso', async () => {
      const [modelResponse] = await productModels.update(mockTeste);

      expect(modelResponse).to.be.an('object');
    });

    it('o produto atualizado possui todas as propriedades', async () => {
      const [modelResponse] = await productModels.update(mockTeste);

      expect(modelResponse).to.have.a.property('id');
      expect(modelResponse).to.have.a.property('name');
      expect(modelResponse).to.have.a.property('quantity');
    });
  });

  describe('Deletando um produto existente', () => {
    const mockTeste = [[]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(mockTeste);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Se foi deletado com sucesso', async () => {
      const modelResponse = await productModels.deleted(mockTeste);

      expect(modelResponse).to.be.an('array');
    });
  });
});
