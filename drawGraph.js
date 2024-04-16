'use strict';
export default class DrawGraph {
  static #drawNode(canvas, nodeRadius, x, y, text) {
    const context = canvas.getContext('2d');
    context.beginPath();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = '20px Arial';
    context.lineWidth = 5;

    context.fillText(text, x, y);
    context.arc(x, y, nodeRadius, 0, Math.PI * 2, false);
    context.stroke();

    context.closePath();
  }

  static #drawArrow(canvas, x, y, angle, headLength) {
    const context = canvas.getContext('2d');
    context.strokeStyle = '#263e7c';
    context.lineTo(x - headLength * Math.cos(angle - Math.PI / 6), y - headLength * Math.sin(angle - Math.PI / 6));
    context.moveTo(x, y);
    context.lineTo(x - headLength * Math.cos(angle + Math.PI / 6), y - headLength * Math.sin(angle + Math.PI / 6));
  }
  static #drawEdge(canvas, curGraph, nodeRadius, fromX, fromY, toX, toY, i, j) {
    const context = canvas.getContext('2d');
    const headLength = 15; // length of head in pixels
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
    if (curGraph.isDirected) this.#drawArrow(canvas, toX, toY, angle, headLength);
    context.stroke();
    context.strokeStyle = 'Black';
    context.closePath();
  }
  static #drawEdgeToItself(canvas, curGraph, nodeRadius, x, y) {
    const context = canvas.getContext('2d');
    const headLength = 15; // length of head in pixels
    const dx = canvas.width / 2 - x;
    const dy = canvas.height / 2 - y;
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
    if (curGraph.isDirected) this.#drawArrow(canvas, x - offsetX, y - offsetY, angle - Math.PI / 2, headLength);
    context.stroke();
    context.strokeStyle = 'Black';
    context.closePath();
  }

  static #drawInCircle(canvas, amount, distanceFromCenter, nodeRadius, nodes) {
    const context = canvas.getContext('2d');
    let angle = 0;
    for (let i = 0; i < amount; i++) {
      const x = canvas.width / 2 + distanceFromCenter * Math.cos(angle);
      const y = canvas.height / 2 + distanceFromCenter * Math.sin(angle);
      const node = { x, y, nodeRadius, text: i };
      nodes.push(node);
      this.#drawNode(canvas, nodeRadius, x, y, i);
      angle += (2 * Math.PI) / amount;
    }
    context.stroke();
  }
  static drawGraphInCircle(canvas, curGraph, distanceFromCenter, nodeRadius) {
    const nodes = [];
    this.#drawInCircle(canvas, curGraph.numberNodes, distanceFromCenter, nodeRadius, nodes);
    const matrix = curGraph.adjacencyMatrix;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (matrix[i][j] === 1) {
          if (i === j) {
            this.#drawEdgeToItself(canvas, curGraph, nodeRadius, nodes[i].x, nodes[i].y);
          } else {
            this.#drawEdge(canvas, curGraph, nodeRadius, nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, i, j);
          }
        }
      }
    }
  }
}
