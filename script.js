'use strict';
import Graph from './graph.js';
import DrawGraph from './drawGraph.js';
const n1 = 3;
const n2 = 2;
const n3 = 1;
const n4 = 0;
let k = 1.0 - n3 * 0.01 - n4 * 0.01 - 0.3;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.height = window.innerHeight - document.getElementById('header').offsetHeight;
canvas.width = window.innerWidth;

const nodeRadius = 30;
const distanceFromCenter = 270;
const amountOfNodes = 10 + n3;
let condesationMatrix;

document.addEventListener('keypress', (event) => {
  //press Enter co change
  if (event.code === 'Digit1') {
    console.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
    const graph = new Graph(amountOfNodes);
    const generator = new Math.seedrandom([n1, n2, n3, n4].join);
    graph.randm(generator);
    graph.mulmr(k);
    DrawGraph.drawGraphInCircle(canvas, graph, distanceFromCenter, nodeRadius);
    console.log(`Що виводиться(вказано по порядку):
    1) матриця суміжності напрямленого графа;
    2) степенi вершин напрямленого графа, напiвстепенi виходу та заходу напрямленого графа(перше число загальна степінь, інші два півстепені);
    3) чи є граф однорiдним (регулярним), i якщо так, вказати степiнь однорiдностi графа;
    4) перелiк iзольованих вершин;
    5) перелiк висячих вершин;`);
    console.log(graph.adjacencyMatrix);
    console.log(graph.getDegreeOfNodes());
    console.log(graph.isRegular());
    console.log(graph.findIsolatedNodes());
    console.log(graph.findLeafNodes());
  }
  if (event.code === 'Digit2') {
    console.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
    const graph = new Graph(amountOfNodes);
    const generator = new Math.seedrandom([n1, n2, n3, n4].join);
    graph.randm(generator);
    graph.mulmr(k);
    graph.toUndirected();
    DrawGraph.drawGraphInCircle(canvas, graph, distanceFromCenter, nodeRadius);
    console.log(`Що виводиться(вказано по порядку):
    1) матриця суміжності ненапрямленого графа;
    2) степенi вершин ненапрямленого графа};
    3) чи є граф однорiдним (регулярним), i якщо так, вказати степiнь однорiдностi графа;
    4) перелiк ізольованих вершин;
    5) перелiк висячих вершин;`);
    console.log(graph.adjacencyMatrix);
    console.log(graph.getDegreeOfNodes());
    console.log(graph.isRegular());
    console.log(graph.findIsolatedNodes());
    console.log(graph.findLeafNodes());
  }
  if (event.code === 'Digit3') {
    console.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
    const graph = new Graph(amountOfNodes);
    const generator = new Math.seedrandom([n1, n2, n3, n4].join);
    graph.randm(generator);
    graph.randm(generator);
    k = 1.0 - n3 * 0.005 - n4 * 0.005 - 0.27;
    graph.mulmr(k);
    DrawGraph.drawGraphInCircle(canvas, graph, distanceFromCenter, nodeRadius);
    console.log(`Що виводиться(вказано по порядку):
    1) матриця суміжності нового напрямленого графа
    2) пiвстепенi вершин(перше число загальна степінь, інші два півстепені);
    3) всi шляхи довжини 2;
    4) кількість шляхів довжини 2(квадрат матриці суміжності);
    5) всi шляхи довжини 3;
    6) кількість шляхів довжини 3(куб матриці суміжності);
    7) матрицю досяжностi;
    8) матрицю сильної зв’язностi;
    9) перелiк компонент сильної зв’язностi;
    10) граф конденсацiї.`);
    console.log(graph.adjacencyMatrix);
    console.log(graph.getDegreeOfNodes());
    console.log(graph.pathsOfSecondLength());
    console.log(graph.pathsOfDefinedLength(2));
    console.log(graph.pathsOfThirdLength());
    console.log(graph.pathsOfDefinedLength(3));
    console.log(graph.getReachabilityMatrix());
    console.log(graph.getStronglyConnectedMatrix());
    console.log(graph.findSCC());
    console.log(graph.getCondensationMatrix());
    condesationMatrix = graph.getCondensationMatrix();
  }
  if (event.code === 'Digit4') {
    console.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
    const graph = new Graph(condesationMatrix.length);
    graph.adjacencyMatrix = condesationMatrix;
    DrawGraph.drawGraphInCircle(canvas, graph, distanceFromCenter, nodeRadius);
    console.log('Матриця суміжності графа конденсації: ');
    console.log(graph.adjacencyMatrix);
  }
});
