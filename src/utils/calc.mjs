export function sum(a,b){
    let result = a + b;
    return result.toFixed(2) * 1;
}

export function res(a,b){
    let result = a - b;
    return result.toFixed(2) * 1;
}

export function divi(a,b){
    if(b === 0) return "Error: 0";
    let result= a / b;
    return result.toFixed(2) * 1;
}

export function mult(a,b){
    let result = a * b;
    return result.toFixed(2) * 1;
}

export function pot(a,b){
    let result = a ** b
    return result.toFixed(2) * 1;
}

