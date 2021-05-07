//importando a função que queremos testar
const generateId = require("../../src/utils/generateUUID");

/* os testes são:
 
- é possivel gerar um uuid único
- se esta vindo um id
- se esse id é uma string
- se o tamnaho da string é igual a 36 characteres
*/

//criação de caso de teste (função, função de caso de teste)
describe("generateId", () => {
  //(nome do teste, função do teste)
  it("é possivel gerar um uuid único", () => {
    const id = generateId();

    //o que deve ser esperado
    //expect(variavel pra testar).(testes)
    expect(id).toBeDefined();
    expect(typeof id).toBe("string");
    expect(id).toHaveLength(36);
  });
});
