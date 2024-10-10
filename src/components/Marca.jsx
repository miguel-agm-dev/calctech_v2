import React from 'react';

//Creo el componente superior de la pantalla
const Marca = () => {
    return (
        <div>
            <span className="flex items-center py-5 text-left">
                <img
                    width="50"
                    height="auto"
                    src="https://i0.wp.com/sagatech.es/wp-content/uploads/2024/03/cropped-logo-world.png?fit=512%2C512&ssl=1"
                    className="custom-logo"
                    alt="SAGATECH"
                />
                <p className="font-bold text-sky-400 align-middle">CALCTECH V2.0</p>
            </span>
        </div>
    );
};

export default Marca;
