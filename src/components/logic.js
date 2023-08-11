export default class BoardLogic {
  //! declare variable
  constructor(initGrid) {
    this.arrayToBeManipulated = [];
    this.moveHistory = [];
    this.counterUndo = 1;

    this.setMoveHistory(initGrid);
  }

  //! meant to be used within the class
  setArrayToBeManipulated(arrayOfNumber) {
    this.arrayToBeManipulated = [...arrayOfNumber];
  }

  setMoveHistory(arrayData) {
    this.moveHistory.push(this.deepCopy(arrayData));
  }

  getMoveHistory() {
    return this.moveHistory;
  }

  setMovement(step) {
    this.setArrayToBeManipulated(this.moveHistory[step]);
  }

  generateNewtile() {
    const emptyTile = [];
    this.arrayToBeManipulated.forEach((row, rowIndex) => {
      row.forEach((item, index) => {
        if (item === 0) emptyTile.push([rowIndex, index]);
      });
    });
    const randomIndex = Math.floor(Math.random() * emptyTile.length);
    const [row, column] = emptyTile[randomIndex];
    this.arrayToBeManipulated[row][column] = 2;
    this.setMoveHistory(this.arrayToBeManipulated);
    return this.arrayToBeManipulated;
  }

  // eslint-disable-next-line class-methods-use-this
  deepCopy(array) {
    // whacky deep copy, since structuredClone only for object
    return JSON.parse(JSON.stringify(array));
  }

  //! meant to be used outside the class
  moveToLeft(arrayOfNumber) {
    this.setArrayToBeManipulated(arrayOfNumber);
    function findEveryZeroAndRemoveIt(row, rowIndex, array) {
      row.forEach((zero, indexZero) => {
        if (!zero) array[rowIndex].splice(indexZero, 1);
        if (row.length !== 4) array[rowIndex].push(0);
        return false;
      });
    }
    arrayOfNumber.forEach((row, rowIndex) => {
      const manipulatedArray = this.arrayToBeManipulated[rowIndex];
      if (row.every((item) => !item)) return; // do nothing if all 0
      row.forEach((item, index) => {
        const isItemAndAdjacentEqual = item && item === row[index + 1];
        findEveryZeroAndRemoveIt(row, rowIndex, this.arrayToBeManipulated);
        if (isItemAndAdjacentEqual) {
          manipulatedArray[index] *= 2;
          manipulatedArray.splice(index + 1, 1);
          manipulatedArray.push(0);
        }
        if (row.length !== 4) manipulatedArray.push(0);
      });
    });

    this.setMoveHistory(this.arrayToBeManipulated);
    this.generateNewtile();
    return this.arrayToBeManipulated;
  }

  moveToRight(arrayOfNumber) {
    this.setArrayToBeManipulated(arrayOfNumber);

    arrayOfNumber.forEach((row, rowIndex) => {
      const manipulatedArray = this.arrayToBeManipulated[rowIndex];
      if (row.every((item) => !item)) return; // do nothing if all 0
      let isCombined = false;
      row.forEach((item, index) => {
        const isItemAndAdjacentEqual = item === row[index + 1] && item !== 0;
        if (item === 0) {
          manipulatedArray.splice(index, 1);
        }
        if (isItemAndAdjacentEqual && !isCombined) {
          manipulatedArray[index] *= 2;
          manipulatedArray.splice(index + 1, 1);
          manipulatedArray.unshift(0);
          isCombined = !isCombined;
        }
        if (row.length !== 4) manipulatedArray.unshift(0);
      });
    });

    this.setMoveHistory(this.arrayToBeManipulated);
    this.generateNewtile();
    return this.arrayToBeManipulated;
  }

  moveToTop(arrayOfNumber) {
    this.setArrayToBeManipulated(arrayOfNumber);

    arrayOfNumber.forEach((row, rowIndex) => {
      const currentRow = this.arrayToBeManipulated[rowIndex];
      const nextRow = this.arrayToBeManipulated[rowIndex + 1];
      row.forEach((item, index) => {
        const isCurrentItemAndNextEqual = item === nextRow?.[index];
        if (!item && nextRow) {
          const buffer = nextRow[index];
          currentRow[index] = buffer;
          nextRow[index] = item;
        }
        if (isCurrentItemAndNextEqual) {
          currentRow[index] *= 2;
          nextRow[index] = 0;
        }
      });
    });

    this.setMoveHistory(this.arrayToBeManipulated);
    this.generateNewtile();
    return this.arrayToBeManipulated;
  }

  moveToBottom(arrayOfNumber) {
    this.setArrayToBeManipulated(arrayOfNumber);

    // eslint-disable-next-line no-plusplus
    for (let indexLength = this.arrayToBeManipulated.length - 1; indexLength >= 0; indexLength--) {
      const row = arrayOfNumber[indexLength];
      const currentRow = this.arrayToBeManipulated[indexLength];
      const nextRow = this.arrayToBeManipulated[indexLength - 1];

      row.forEach((item, index) => {
        const isCurrentItemAndNextEqual = item === nextRow?.[index];
        if (!item && nextRow) {
          const buffer = nextRow[index];
          currentRow[index] = buffer;
          nextRow[index] = item;
        }
        if (isCurrentItemAndNextEqual) {
          currentRow[index] *= 2;
          nextRow[index] = 0;
        }
      });
    }

    this.setMoveHistory(this.arrayToBeManipulated);
    this.generateNewtile();
    return this.arrayToBeManipulated;
  }

  undoMovement() {
    const step = this.moveHistory.length - 2;
    this.setMovement(step);
    return this.arrayToBeManipulated;
  }

  redoMovement() {
    const step = this.moveHistory.length - 1;
    this.setMovement(step);
    return this.arrayToBeManipulated;
  }

  getScore() {
    const score = this.arrayToBeManipulated.flat().reduce((acc, curr) => acc + curr, 0);
    return score;
  }
}
