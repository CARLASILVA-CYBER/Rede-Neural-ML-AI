// GRUPO

// Daniel Pereira 30363
// Alexandre Lúcio 30333
// Rodolfo Francisco 30336

const brain = require('brain.js');

const data = [
//Semana 12/06
  { "input": { "idTipoTempo": 1, "tMax": 24.1000, "tMin": 17.1000 }, "output": { "probPrecipita": 1 } },
  { "input": { "idTipoTempo": 1, "tMax": 23.6000, "tMin": 16.5000 }, "output": { "probPrecipita": 0 } },
  { "input": { "idTipoTempo": 1, "tMax": 15.8000, "tMin": 12.1000 }, "output": { "probPrecipita": 0.5 } },
  { "input": { "idTipoTempo": 1, "tMax": 31.4000, "tMin": 17.1000 }, "output": { "probPrecipita": 0.7 } },
  { "input": { "idTipoTempo": 1, "tMax": 31.9000, "tMin": 19.2000 }, "output": { "probPrecipita": 0.6 } },
//Semana 06/06 - Ficticios
  { "input": { "idTipoTempo": 1, "tMax": 22.5000, "tMin": 15.8000 }, "output": { "probPrecipita": 0.2 } },
  { "input": { "idTipoTempo": 1, "tMax": 21.8000, "tMin": 17.4000 }, "output": { "probPrecipita": 0.1 } },
  { "input": { "idTipoTempo": 1, "tMax": 25.8000, "tMin": 16.1000 }, "output": { "probPrecipita": 0.4 } },
  { "input": { "idTipoTempo": 1, "tMax": 24.1000, "tMin": 17.1000 }, "output": { "probPrecipita": 1 } },
  { "input": { "idTipoTempo": 1, "tMax": 19.2000, "tMin": 13.1000 }, "output": { "probPrecipita": 0.5 } }
];


// Opções de configuração da rede neural
const networkOptions = { learningRate: 0.05 };

// Opções de treinamento
const trainingOptions = { iterations: 10000, errorThresh: 0.004 };

const crossValidate = new brain.CrossValidate(() => new brain.NeuralNetwork, networkOptions);
crossValidate.train(data, trainingOptions);


// Conversão para formato JSON e obtenção da rede neural treinada
const json = crossValidate.toJSON();
const net = crossValidate.toNeuralNetwork();


const input = {"idTipoTempo": 3, "tMax": 20.5000, "tMin": 15.8000 };
const results = net.run(input);

console.log(`\n> Taxa de erro: ${json.sets[3].error}\n> Iterações: ${json.sets[3].iterations}`);
console.log('-----------------------------------------------------');
console.log(`\n> Chuva Probabilidade: ${parseFloat(results["probPrecipita"]).toFixed(15)}.`);

switch(true) { 
  case results["probPrecipita"] < 0.5:
    console.log(`\n> Probabilidade de chover é baixa.`);
    break;
  case results["probPrecipita"] >= 0.5 && results["probPrecipita"] <= 0.6:
    console.log(`\n> É capaz de chover`);
    break;
  case results["probPrecipita"] > 0.6:
    console.log(`\n> Probabilidade de chover é alta.`);
    break;
    
  default: 
    console.log(`\n> Dados insuficientes.`);
}

