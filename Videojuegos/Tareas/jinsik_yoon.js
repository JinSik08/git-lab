/*
 * Ejemplos de funciones para practicar Javascript
 * Autor: JinSik Yoon
 * Fecha: 2025/02/19
*/

"use strict"; // Activa el modo estricto de JavaScript

// 1. Escribe una función llamada firstNonRepeating que encuentre el primer carácter de un cadena de texto que no se repite.
// Prueba tu función con: 'abacddbec'

function firstNonRepeating(str){ // Recibe el string
    let no_repite = ''; // Inicializa la variable no_repite con 'let'
    for(let i = 0; i < str.length; i++){ // Inicia un ciclo for para recorrer el string
        let char = str[i]; // Inicializa la variable char con el caracter en la posición i del string
        // Si el índice de la primer posición del caracter es igual al índice de la última posición del caracter
        if(str.indexOf(char) == str.lastIndexOf(char)){
            no_repite = char; // La variable no_repite es igual al caracter
            break; // Rompe el ciclo si se cumple la condición
        }
    }
    return no_repite; // Regresa el no_repite
}

console.log(firstNonRepeating('abacddbec')); // Imprime el resultado de la función

// ------------------------------------------------------------------------------------------------------------

// 2. Escribe una función llamada bubbleSort que implemente el algoritmo 'bubble-sort' para ordenar una lista de números.

function bubbleSort(nums){ // Recibe el arreglo con números
    for(let i = 0; i < nums.length; i++){ // Inicia un ciclo for para recorrer el arreglo
        for(let j = 0; j < nums.length - i - 1; j++){ // Inicia un ciclo for para recorrer el arreglo
            // Si el elemento en la posición j es mayor al elemento en la posición j + 1
            if(nums[j] > nums[j + 1]){
                let temp = nums[j]; // Inicializa la variable temp con el elemento en la posición j
                nums[j] = nums[j + 1]; // El elemento en la posición j es igual al elemento en la posición j + 1
                nums[j + 1] = temp; // El elemento en la posición j + 1 es igual a temp
            }
        }
    }
    return nums; // Regresa el arreglo ordenado
}

console.log(bubbleSort([54,8,12,92,17,82,35]).join(', ')); // Imprime el resultado de la función

// ------------------------------------------------------------------------------------------------------------

// 3. Escribe dos funciones: la primera con nombre invertArray que invierta un arreglo de números y regrese un nuevo arreglo
// con el resultado la segunda, con nombre invertArrayInplace, que modifique el mismo arreglo que se pasa como argumento.
// No se permite usar la función integrada 'reverse'.

function invertArray(nums){ // Recibe el arreglo con números
    let reverso = []; // Inicializa la variable reverso con 'let'
    for(let i = nums.length - 1; i >= 0; i--){ // Inicia un ciclo for para recorrer el arreglo
        reverso.push(nums[i]); // Agrega el elemento en la posición i al arreglo result
    }
    return reverso; // Regresa el arreglo invertido
}

function invertArrayInplace(nums){ // Recibe el arreglo con números
    for(let i = 0; i < nums.length / 2; i++){ // Inicia un ciclo for para recorrer la mitad del arreglo
        let temp = nums[i]; // Inicializa la variable temp con el elemento en la posición i
        nums[i] = nums[nums.length - 1 - i]; // El elemento en la posición i es igual al elemento en la posición nums.length - 1 - i
        nums[nums.length - 1 - i] = temp; // El elemento en la posición nums.length - 1 - i es igual a temp
    }
    return nums; // Regresa el arreglo invertido
}

console.log([23,32,23,65,27,98].join(', ')); // Imprime el arreglo original
console.log(invertArrayInplace([23,32,23,65,27,98]).join(', ')); // Imprime el resultado de la función invertArray

// ------------------------------------------------------------------------------------------------------------

// 4. Escribe una función llamada capitalize que reciba una cadena de texto y regrese una nueva con la primer letra
// de cada palabra en mayúscula.

function capitalize(string){ // Recibe el string
    let capital = string.split(' '); // Inicializa la variable capital con el string dividido por espacios
    for(let i = 0; i < capital.length; i++){ // Inicia un ciclo for para recorrer el arreglo capital
        capital[i] = capital[i][0].toUpperCase() + capital[i].slice(1); // La primer letra de cada palabra en mayúscula
    }
    return capital.join(' '); // Regresa el arreglo unido por espacios
}

console.log(capitalize('blue archive')); // Imprime el resultado de la función

// ------------------------------------------------------------------------------------------------------------

// 5. Escribe una función llamada mcd que calcule el máximo común divisor de dos números.

function mcd(x,y){ // Recibe dos números
    while(y){ // Mientras 'y' sea verdadero (hasta que no sea cero)
        let t = y; // Inicializa la variable 't' con 'y'
        y = x % y; // 'y' es igual al residuo de x/y
        x = t; // 'x' es igual a 't'
    }
    return x; // Regresa x que es el mcd
}

console.log(mcd(4,5)); // Imprime el resultado de la función

// ------------------------------------------------------------------------------------------------------------

// 6. Crea una función llamada hackerSpeak que cambie una cadena de texto a 'Hacker Speak'. Por ejemplo, para la cadena
// 'Javascript es divertido', su hacker speak es: 'J4v45c1pt 35 d1v3rt1d0'.
// Referencia de HackerSpeak:
// https://gist.github.com/akey7/5abcc62edad715a0a3a42e1616e3a138

function hackerSpeak(string){ // Recibe el string
    // Inicializa la función hacker con el string y el objeto replace con las letras a cambiar y sus valores
    let hacker = (origen, replace = {'a':'4','e':'3','i':'1','o':'0'}) => (
        // Divide el string y lo mapea con las letras a cambiar y las cambiadas, si no se encuentra la letra, se deja igual
        origen.split('').map((char) => (replace[char] || char)).join('')
    );
    return hacker(string); // Regresa el string cambiado
}

console.log(hackerSpeak('tecnológico de monterrey')) // Imprime el resultado de la función

// ------------------------------------------------------------------------------------------------------------

// 7. Escribe una función llamada factorize que reciba un número, y regrese una lista con todos sus factores. Por ejemplo:
// factorize(12) -> [1, 2, 3, 4, 6, 12].

function factorize(num){ // Recibe el número
    let factors = []; // Crea el arreglo como variable factores con 'let'
    for(let i = 1; i <= num; i++){ // Inicia un ciclo for para recorrer los números hasta num
        if(num % i == 0){ // Si num es divisible entre i (residuo 0)
            factors.push(i); // Agrega i a factors
        }
    }
    return factors; // Regresa los factores
}

console.log(factorize(12).join(', ')); // Imprime el resultado de la función

// ------------------------------------------------------------------------------------------------------------

// 8. Escribe una función llamada deduplicate que quite los elementos duplicados de un arreglo y regrese una lista
// con los elementos que quedan. Por ejemplo:
// deduplicate([1, 0, 1, 1, 0, 0]) -> [1, 0]
// Referencia de Set y ...:
// https://stackoverflow.com/questions/20069828/how-to-convert-set-to-array

function deduplicate(list){ // Recibe el arreglo con números
    // Inicializa la variable no_dupli con los elementos únicos del arreglo list con 'let' y 'Set' 
    // para eliminar duplicados y '...' para expandir el arreglo en uno nuevo
    let no_dupli = [...new Set(list)];
    return no_dupli; // Regresa los elementos no duplicados
}

console.log(deduplicate([1, 0, 1, 1, 0, 0]).join(', ')); // Imprime el resultado de la función

// ------------------------------------------------------------------------------------------------------------

// 9. Escribe una función llamada findShortestString que reciba como parámetro una lista de cadenas de texto,
// y regrese la longitud de la cadena más corta.

function findShortestString(string){ // Recibe el arreglo con strings
    // Inicializa la variable corto con la longitud de la cadena más corta del arreglo strings con 'let' y 'Math.min'
    let corto = Math.min(...string.map((str) => str.length));
    return corto; // Regresa la longitud de la cadena más corta
}

console.log(findShortestString(['jin','montaña','impacto'])); // Imprime el resultado de la función

// ------------------------------------------------------------------------------------------------------------

// 10. Escribe una función llamada isPalindrome que revise si una cadena de texto es un palíndromo o no.
// Referencia de expresión regular de .replace:
// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/replace

function isPalindrome(string){ // Recibe el string
    // Inicializa la variable palindromo con el string en minúsculas y sin espacios con 'let' y 'replace'
    let palindromo = string.toLowerCase().replace(/ /g, '');
    let reverso = palindromo.split('').reverse().join(''); // Inicializa la variable reverso con el string invertido sin espacios
    return palindromo == reverso; // Regresa si palin es igual a reverso
}

console.log(isPalindrome('Anita lava la tina')); // Imprime el resultado de la función

// ------------------------------------------------------------------------------------------------------------

// 11. Escribe una función llamada sortStrings que tome una lista de cadena de textos y devuelva una nueva lista
// con todas las cadenas en orden alfabético.

function sortStrings(arreglo){ // Recibe el arreglo con strings
    // Inicializa la variable orden con el arreglo ordenado alfabéticamente con 'let' y 'sort'
    let orden = arreglo.sort(); // .sort ordena alfabéticamente el arreglo
    return orden; // Regresa el arreglo ordenado
}

console.log(sortStrings(['mundo','boliche','xilofono']).join(', ')); // Imprime el resultado de la función

// ------------------------------------------------------------------------------------------------------------

// 12. Escribe una función llamada stats que tome una lista de números y devuelva una lista con dos elementos:
// la mediana y la moda. Por ejemplo:
// stats([8, 4, 2, 6, 8, 13, 17, 2, 4, 8]) -> [ 7.2, 8 ]

function stats(nums){ // Recibe el arreglo con números
    nums.sort((a, b) => a - b); // (a - b) garantiza que los números se ordenen correctamente de menor a mayor
    let mitad = nums.length / 2; // Calcula la posición central de la lista
    // Calcula la mediana dependiendo si la lista tiene un número par o impar
    let mediana = nums[Math.round(nums.length - 1 - (nums.length / 2))];
    let frecuencia = {}; // Inicializa la variable frecuencia con un objeto vacío
    let maxFrecuencia = 0; // Inicializa la variable maxFrecuencia con para calcular la alta frecuencia
    let moda = nums[0]; // Inicializa la variable moda con el primer número del arreglo
    for (let num of nums){ // Recorre el array nums número por número.
        // Si num ya existe en el arreglo, aumenta su contador. Si no existe, lo inicializa en 0 y luego le suma 1
        frecuencia[num] = (frecuencia[num] || 0) + 1;
        if (frecuencia[num] > maxFrecuencia){ // Si la frecuencia actual (frecuencia[num]) es mayor que maxFrecuencia:
            maxFrecuencia = frecuencia[num]; // Se actualiza maxFrecuencia con la nueva cantidad.
            moda = num; // Se actualiza moda con el número más repetido.
        }
    }
    return [mediana, moda]; // Regresa la mediana y la moda
}

console.log(stats([8, 4, 6, 8, 13, 17, 2, 4, 8])); // Imprime el resultado de la función

// ------------------------------------------------------------------------------------------------------------

// 13. Escribe una función llamada popularString que tome una lista de cadenas de texto y devuelva la cadena más frecuente.

function popularString(strings){ // Recibe el arreglo con strings
    let frecuencia = {}; // Inicializa la variable frecuencia con un objeto vacío
    let maxFrecuencia = 0; // Inicializa la variable maxFrecuencia con para calcular la alta frecuencia
    let pop = strings[0]; // Inicializa la variable pop con el primer string del arreglo
    for (let string of strings){ // Recorre el array strings string por string.
        // Si string ya existe en el arreglo, aumenta su contador. Si no existe, lo inicializa en 0 y luego le suma 1
        frecuencia[string] = (frecuencia[string] || 0) + 1;
        if (frecuencia[string] > maxFrecuencia){ // Si la frecuencia actual (frecuencia[string]) es mayor que maxFrecuencia:
            maxFrecuencia = frecuencia[string]; // Se actualiza maxFrecuencia con la nueva cantidad.
            pop = string; // Se actualiza pop con el string más repetido.
        }
    }
    return pop; // Regresa el string más repetido
}

console.log(popularString(['buenos dias','buenas tardes','buenas noches','buenas tardes','buenas noches',
'buenas tardes','buenos dias','buenas tardes'])); // Imprime el resultado de la función

// ------------------------------------------------------------------------------------------------------------

// 14. Escribe una función llamada isPowerOf2 que tome un número y devuelva verdadero
// si es una potencia de dos, falso de lo contrario.

function isPowerOf2(numero){ // Recibe el número
    if (numero == 0 || numero == 1) return true; // Si el número es 0 o 1, regresa verdadero
    else if (numero < 0) return false; // Si el número es negativo, regresa falso
    // El operador & compara los bits del número con los bits de (numero - 1) y regresa verdadero si son iguales
    else (numero & (numero - 1)) == 0;
        return true;
}

console.log(isPowerOf2(32)); // Imprime el resultado de la función

// ------------------------------------------------------------------------------------------------------------

// 15. Escribe una función llamada sortDescending que tome una lista de números y devuelva una nueva lista
// con todos los números en orden descendente.

function sortDescending(nums){ // Recibe el arreglo con números
    let descendente = nums.sort((a, b) => b - a); // (b - a) garantiza que los números se ordenen correctamente de mayor a menor
    return descendente; // Regresa el arreglo ordenado de mayor a menor
}

console.log(sortDescending([23,32,23,65,27,98]).join(', ')); // Imprime el resultado de la función
