const fs = require('fs')
const request = require('supertest');
const app = require('../src/app');
const animalsData = require('../src/data/animals.json');

//Questão 2
describe('Cadastro de animais', () => {
    afterAll(() => {
        while(animalsData.length > 0){
            animalsData.pop();
        }

        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    it('deve cadastrar um animal com sucesso', async () => {
        const res = await request(app).post('/animais?nome=Spike&especie=Cachorro&idade=3');
        expect(res.status).toBe(201);
    });

    it('deve falhar no cadastro pois a idade não é um número', async() => {
        const res = await request(app).post('/animais?nome=Mimi&especie=Gato&idade=jovem');
        expect(res.status).toBe(400); 
    });

    it('deve falhar no cadastro pois o nome é curto', async() => {
        const res = await request(app).post('/animais?nome=J&especie=Hamster&idade=1');
        expect(res.status).toBe(400); 
    });
});

//Questão 3
describe('Retorno de animais', () => {
    beforeAll(() => {
        animalsData.push({
            'id': '1',
            'nome': 'Rex',
            'especie': 'Cachorro',
            'idade' : '5'
        });
        animalsData.push({
            'id': '2',
            'nome': 'Rafael',
            'especie': 'Tartaruga',
            'idade': '40'
        });
        animalsData.push({
            'id': '3',
            'nome': 'Tom',
            'especie': 'Gato',
            'idade': '2'
        });

        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    afterAll(() => {
        while(animalsData.length > 0){
            animalsData.pop();
        }

        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    it('deve retornar uma lista com todos os animais', async() => {
        const res = await request(app).get('/animais');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
    })

})