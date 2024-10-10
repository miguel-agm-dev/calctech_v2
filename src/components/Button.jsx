import React, {useState, useEffect} from 'react';

const Button = ({ label, onClick, onKeyDown, className = '' }) => {

    const [isActive, setIsActive] = useState(false);

    const handleKeyPress = (event) => {
        if (event.key === label) {
            setIsActive(true);
        }
    };

    const handleKeyUp=() => {
        setIsActive(false);
    };

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <button 
            className={`btn ${className} mb-5 text-lg font-bold gap-x-2 justify-center border-slate-100 shadow-md h-8 ${className.includes('w-10') ? 'w-10' : 'w-16'}${isActive ? 'w-16 gap-x-2 border-b-4 border-4 border-error border-b-error' : ''}`}
            onClick={() => onClick(label)}
            onKeyDown={onKeyDown ? (event) => onKeyDown(event) : undefined}
        >
            {label}
        </button>
    );
};

export default Button;
