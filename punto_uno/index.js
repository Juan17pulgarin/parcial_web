const myArray = [0, 1, 4, 3, 1]; 

const arraySinRepetir = [...new Set(myArray)];
const numeroMaximo = Math.max(...arraySinRepetir);

console.log(numeroMaximo);
