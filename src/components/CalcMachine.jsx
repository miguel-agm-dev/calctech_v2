
// Importar todo lo necesario para la calculadora
import Button from "./Button.jsx";
import {Calculate} from "./CalcScreen.jsx";
import Marca from "./Marca.jsx";
import { sum, res, divi, mult, pot } from "../utils/calc.mjs";
import {useState, useEffect }from 'react';

export function CalcMachine(){
    const [currentValue, setCurrentValue] = useState('0');
    const [operator, setOperator] = useState('');
    const [firstNumber, setFirstNumber] = useState(null);


    const handleButtonClick = (label) => {
        if (label === 'CE') {
            setCurrentValue('0');
            setOperator('');
            setFirstNumber(null);
        } else if (['+', '-', '*', '/', '^'].includes(label)) {
            if (firstNumber === null) {
                // Guarda el primer número y el operador
                setFirstNumber(parseFloat(currentValue));
                setOperator(label);
                setCurrentValue(currentValue + ' ' + label + ' '); // Muestra el primer número seguido del operador
            } else {
                // Ya hay un primer número y un operador, realiza el cálculo con el segundo número
                const secondNumber = parseFloat(currentValue.split(' ').pop()); // Extrae el segundo número
                let result;
    
                switch (operator) {
                    case '+':
                        result = sum(firstNumber, secondNumber);
                        break;
                    case '-':
                        result = res(firstNumber, secondNumber);
                        break;
                    case '*':
                        result = mult(firstNumber, secondNumber);
                        break;
                    case '/':
                        result = divi(firstNumber, secondNumber);
                        break;
                    case '^':
                        result = pot(firstNumber, secondNumber);
                        break;
                    default:
                        result = secondNumber;
                }
    
                // Actualiza el estado con el resultado y el nuevo operador
                setCurrentValue(result.toString() + ' ' + label + ' '); // Muestra el resultado seguido del nuevo operador
                setFirstNumber(result); // El resultado se convierte en el nuevo primer número
                setOperator(label); // Guarda el nuevo operador
            }
        } else if (label === '=') {
            if (firstNumber !== null && operator) {
                const secondNumber = parseFloat(currentValue.split(' ').pop()); // Extrae el segundo número 
                let result;
    
                switch (operator) {
                    case '+':
                        result = sum(firstNumber, secondNumber);
                        break;
                    case '-':
                        result = res(firstNumber, secondNumber);
                        break;
                    case '*':
                        result = mult(firstNumber, secondNumber);
                        break;
                    case '/':
                        result = divi(firstNumber, secondNumber);
                        break;
                    case '^':
                        result = pot(firstNumber, secondNumber);
                        break;
                    default:
                        result = secondNumber;
                }
    
                setCurrentValue(result.toString()); // Muestra solo el resultado
                setOperator(''); // Reinicia el operador
                setFirstNumber(null); // Limpia el primer número
            }
        } else {
            // Manejo de números
            if (operator) {
                // Si ya hay un operador, actualiza currentValue para mostrar el segundo número
                const parts = currentValue.split(' '); // Divide el currentValue
                const lastPart = parts.length > 2 ? parts.slice(-1)[0] : ''; // Obtiene el último número ingresado
                const newSecondNumber = lastPart + label; // Concatenar el nuevo dígito

                // Deja solo el último número si no excede el límite de 14 dígitos
                if (newSecondNumber.length <= 14) {
                    setCurrentValue(parts.slice(0, -1).join(' ') + ' ' + newSecondNumber);
                }
        
            } else {
                // Manejo de primer número
                const newNumber=currentValue === '0' ? label : currentValue + label;
                
                // Deja solo el primer número si no excede el límite de 14 dígitos
                if (newNumber.length <= 14) {
                    setCurrentValue(newNumber);
                }
            }
        }
    };

    

    const handleKeyDown = (event) => {
        
        const key = event.key;

        const keyMap = {
            '0': '0',
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9',
            '+': '+',
            '-': '-',
            '*': '*',
            '/': '/',
            '=': '=',
            'c': 'CE',
            '.': '.',
            'p': '^',
            'Enter': '='
        };

        
        //Si la tecla presionada está en el mapa, llama a handleButtonClick
        if (keyMap[key]) {
            handleButtonClick(keyMap[key]);
        }
    };
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, );
    

return (
    <div class="hover:-translate-y-1 hover:scale-110 duration-300">
        <div class="rounded-[140px]">
            <div class="flex flex-col items-center text-center w-96 bg-gradient-to-t from-gray-800 to-gray-500 rounded-b rounded-[50px] p-5 shadow-2xl">
                <Marca />
                <Calculate value={currentValue} />
            </div>

            <div class="flex flex-col items-center text-center w-96 bg-gradient-to-t from-gray-400 to-gray-200 rounded-t rounded-[120px] p-5 shadow-2xl border-b-8 border-b-gray-600">
                <div class="flex w-80 mb-0 gap-x-2 justify-center">
                <Button label="CE" onClick={handleButtonClick} className="bg-gradient-to-t from-error text-white btn-primary-content w-8 rounded-full border-b-4 border-b-gray-200" />
                <Button label="+" onClick={handleButtonClick} className="bg-gradient-to-t from-accent text-white w-8 rounded-full border-b-4 border-b-gray-200" />
                <Button label="-" onClick={handleButtonClick} className="bg-gradient-to-t from-accent text-white w-8 rounded-full border-b-4 border-b-gray-200" />
                <Button label="/" onClick={handleButtonClick} className="bg-gradient-to-t from-accent text-white w-8 rounded-full border-b-4 border-b-gray-200" />
                <Button label="*" onClick={handleButtonClick} className="bg-gradient-to-t from-accent text-white w-8 rounded-full border-b-4 border-b-gray-200" />
                <Button label="^" onClick={handleButtonClick} className="bg-gradient-to-t from-accent text-white w-8 rounded-full border-b-4 border-b-gray-200" />
                <Button label="." onClick={handleButtonClick} className="bg-gradient-to-t from-accent text-white w-8 rounded-full border-b-4 border-b-gray-200" />
                <Button label="=" onClick={handleButtonClick} className="bg-gradient-to-t from-warning text-white w-8 rounded-full border-b-4 border-b-gray-200" />
                </div>

                <div class="w-80 flex justify-around">
                    <Button label="7" className="bg-gradient-to-t from-yellow-200 active:border-error active:border-4 text-orange-800 border-b-4 border-b-gray-200" onClick={handleButtonClick} />
                    <Button label="8" className="bg-gradient-to-t from-yellow-200 active:border-error active:border-4 text-orange-800 border-b-4 border-b-gray-200" onClick={handleButtonClick} />
                    <Button label="9" className="bg-gradient-to-t from-yellow-200 active:border-error active:border-4 text-orange-800 border-b-4 border-b-gray-200" onClick={handleButtonClick} />
                </div>

                <div class="w-80 flex justify-around">
                    <Button label="4" className="bg-gradient-to-t from-yellow-200 active:border-error active:border-4 text-orange-800 border-b-4 border-b-gray-200" onClick={handleButtonClick} />
                    <Button label="5" className="bg-gradient-to-t from-yellow-200 active:border-error active:border-4 text-orange-800 border-b-4 border-b-gray-200" onClick={handleButtonClick} />
                    <Button label="6" className="bg-gradient-to-t from-yellow-200 active:border-error active:border-4 text-orange-800 border-b-4 border-b-gray-200" onClick={handleButtonClick} />
                </div>

                <div class="w-80 flex justify-around">
                    <Button label="1" className="bg-gradient-to-t from-yellow-200 active:border-error active:border-4 text-orange-800 border-b-4 border-b-gray-200" onClick={handleButtonClick} />
                    <Button label="2" className="bg-gradient-to-t from-yellow-200 active:border-error active:border-4 text-orange-800 border-b-4 border-b-gray-200" onClick={handleButtonClick} />
                    <Button label="3" className="bg-gradient-to-t from-yellow-200 active:border-error active:border-4 text-orange-800 border-b-4 border-b-gray-200" onClick={handleButtonClick} />
                </div>

                <div class="w-80">
                    <Button label="0" className="bg-gradient-to-t from-yellow-200 active:border-error active:border-4 text-orange-800 border-b-4 border-b-gray-200" onClick={handleButtonClick} />
                </div>
            </div>
        </div>
    </div>

)
};