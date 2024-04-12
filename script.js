import Graph from './graph.js';
const n1 = 3;
const n2 = 2;
const n3 = 1;
const n4 = 0;
let k = 1.0 - n3 * 0.01 - n4 * 0.01 - 0.3;
const generator = new Math.seedrandom([n1, n2, n3, n4].join);

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const windowHeight = window.innerHeight - document.getElementById('header').offsetHeight;
const windowWidth = window.innerWidth;

canvas.height = windowHeight;
canvas.width = windowWidth;

const middleX = canvas.width / 2;
const middleY = canvas.height / 2;
const nodeRadius = 30;
const distanceFromCenter = 270;
const amountOfNodes = 10 + n3;
let directed;
let condesationMatrix;
let isGraph2Visited = false;
let graph2;
const getDistance = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
const drawNode = (x, y, nodeRadius, text) => {
  context.beginPath();
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = '20px Arial';
  context.lineWidth = 5;

  context.fillText(text, x, y);
  context.arc(x, y, nodeRadius, 0, Math.PI * 2, false);
  context.stroke();

  context.closePath();
};

const drawArrow = (x, y, angle, headlen) => {
  context.strokeStyle = '#263e7c';
  context.lineTo(x - headlen * Math.cos(angle - Math.PI / 6), y - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(x, y);
  context.lineTo(x - headlen * Math.cos(angle + Math.PI / 6), y - headlen * Math.sin(angle + Math.PI / 6));
};
const drawEdge = (curGraph, fromX, fromY, toX, toY, i, j) => {
  const headlen = 15; // length of head in pixels
  const dx = toX - fromX;
  const dy = toY - fromY;
  let angle = Math.atan2(dy, dx);
  fromX = fromX + nodeRadius * Math.cos(angle);
  fromY = fromY + nodeRadius * Math.sin(angle);
  context.beginPath();
  context.strokeStyle = '#263e7c';
  context.moveTo(fromX, fromY);
  if (curGraph.isDirected && curGraph.adjacencyMatrix[i][j] === curGraph.adjacencyMatrix[j][i]) {
    const offset = Math.PI / 8;
    toX = toX - nodeRadius * Math.cos(angle + offset);
    toY = toY - nodeRadius * Math.sin(angle + offset);
  } else {
    toX = toX - nodeRadius * Math.cos(angle);
    toY = toY - nodeRadius * Math.sin(angle);
  }
  context.lineTo(toX, toY);
  if (curGraph.isDirected) drawArrow(toX, toY, angle, headlen);
  context.stroke();
  context.strokeStyle = 'Black';
  context.closePath();
};
const drawEdgeToItself = (curGraph, x, y) => {
  const headlen = 15; // length of head in pixels
  const dx = middleX - x;
  const dy = middleY - y;
  const angle = Math.atan2(dy, dx);
  const radiusToItself = (nodeRadius * 2) / 3;
  const radiusToItselfX = radiusToItself * Math.cos(angle);
  const radiusToItselfY = radiusToItself * Math.sin(angle);
  const offsetX = nodeRadius * Math.cos(angle);
  const offsetY = nodeRadius * Math.sin(angle);
  context.beginPath();
  context.strokeStyle = '#263e7c';
  context.arc(x - offsetX - radiusToItselfX, y - offsetY - radiusToItselfY, radiusToItself, 0, Math.PI * 2, false);
  context.moveTo(x - offsetX, y - offsetY);
  if (curGraph.isDirected) drawArrow(x - offsetX, y - offsetY, angle - Math.PI / 2, headlen);
  context.stroke();
  context.strokeStyle = 'Black';
  context.closePath();
};

const drawInCircle = (amount, distance, nodes) => {
  let angle = 0;
  for (let i = 0; i < amount; i++) {
    const x = middleX + distance * Math.cos(angle);
    const y = middleY + distance * Math.sin(angle);
    const node = { x, y, nodeRadius, text: i };
    nodes.push(node);
    drawNode(x, y, nodeRadius, i);
    angle += (2 * Math.PI) / amount;
  }
  context.stroke();
};
const drawGraph = (curGraph) => {
  const nodes = [];
  drawInCircle(curGraph.numberNodes, distanceFromCenter, nodes);
  const matrix = curGraph.adjacencyMatrix;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] === 1) {
        if (i === j) {
          drawEdgeToItself(curGraph, nodes[i].x, nodes[i].y);
        } else {
          drawEdge(curGraph, nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, i, j);
        }
      }
    }
  }
};
document.addEventListener('keypress', (event) => {
  //press Enter co change
  if (event.code === 'Enter') {
    console.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (graph.isDirected) {
      directed = graph.toUndirected();
    } else {
      graph.adjacencyMatrix = directed;
    }
    graph.isDirected = !graph.isDirected;
    drawGraph(graph);
    console.log(`Що виводиться(вказано по порядку):
    1) матриця суміжності ${graph.isDirected ? '' : 'не'}напрямленого графа;
    2) степенi вершин ${graph.isDirected ? '' : 'не'}напрямленого графа, ${graph.isDirected ? 'напiвстепенi виходу та заходу напрямленого графа(перше число загальна степінь, інші два півстепені)' : ''};
    3) чи є граф однорiдним (регулярним), i якщо так, вказати степiнь однорiдностi графа;
    4) перелiк ізольованих вершин;
    5) перелiк висячих вершин;`);
    console.log(graph.adjacencyMatrix);
    console.log(graph.getDegreeOfNodes());
    console.log(graph.isRegular());
    console.log(graph.findIsolatedNodes());
    console.log(graph.findLeafNodes());
  }
  if (event.code === 'Digit1') {
    console.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (isGraph2Visited === false) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      graph2 = new Graph(amountOfNodes);
      graph2.randm(generator);
      k = 1.0 - n3 * 0.005 - n4 * 0.005 - 0.27;
      graph2.mulmr(k);
      isGraph2Visited = true;
    }
    drawGraph(graph2);
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
    console.log(graph2.adjacencyMatrix);
    console.log(graph2.getDegreeOfNodes());
    console.log(graph2.pathsOfSecondLength());
    console.log(graph2.pathsOfDefinedLength(2));
    console.log(graph2.pathsOfThirdLength());
    console.log(graph2.pathsOfDefinedLength(3));
    console.log(graph2.getReachabilityMatrix());
    console.log(graph2.getStronglyConnectedMatrix());
    console.log(graph2.findSCC());
    console.log(graph2.getCondensationMatrix());
    condesationMatrix = graph2.getCondensationMatrix();
  }
  if (event.code === 'Digit2') {
    console.clear();
    context.clearRect(0, 0, canvas.width, canvas.height);
    const graph3 = new Graph(condesationMatrix.length);
    graph3.adjacencyMatrix = condesationMatrix;
    drawGraph(graph3);
    console.log('Матриця суміжності графа конденсації: ');
    console.log(graph3.adjacencyMatrix);
  }
});
const graph = new Graph(amountOfNodes);
graph.randm(generator);
graph.mulmr(k);
drawGraph(graph);
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
