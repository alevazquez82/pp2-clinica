import { useState } from "react";
import "./LoginRegister.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    return (
        <main>
            <h2>Registrese</h2>

            <form id="registerForm">
                <label htmlFor="nombre">Nombre</label>
                <input id="nombre" name="nombre" type="text" placeholder="Ingrese su nombre..." />
                <label htmlFor="apellido">Apellido</label>
                <input id="apellido" name="apellido" type="text" placeholder="Ingrese su apellido..." />
                <label htmlFor="dni">DNI</label>
                <input id="dni" name="dni" type="text" placeholder="Ingrese su DNI sin puntos" />
                <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
                <input id="fecha_nacimiento" name="fecha_nacimiento" type="date" />
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="text" placeholder="Ingrese su email..." />
                <label htmlFor="telefono">Telefono</label>
                <input id="telefono" name="telefono" type="text" placeholder="Ingrese su telefono..." />

                <section>
                    <button type="submit" id="registerButton">
                        Registrarse
                    </button>
                    <button type="reset" id="cancelButton">
                        Cancelar
                    </button>
                </section>
                <Link to="/login">Si ya esta registado, ingresa aca.</Link>
            </form>
        </main>
    );
};

export default RegisterForm;
