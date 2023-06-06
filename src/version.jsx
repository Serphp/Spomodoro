//import TaskList from '../components/Tasklist';

const VersionPage = () => {
    return (
        <>
        <div className="container mt-5">
            <div className="contenedor__version">
                <h3>Version 1.0.0 Without beta</h3>
                <ul>
                    <li>Funcionamiento correcto del Technique Pomodoro. </li>
                </ul>
            <br/>
                <h3>Version 1.0.1</h3>
                <p>Se agrego la funcionalidad de eliminar tareas</p>
                <ul>
                    <li><b> New feature: </b> Nueva pagina List </li>
                    <li>Se agrego la funcionalidad de eliminar tareas</li>
                    <li>Se agrego la funcionalidad de Añadir tareas </li>
                    <li>Se agrego la funcionalidad de Completar tareas </li>
                </ul>

            <br/>

                <h3>Version 1.2</h3>
                <ul>
                    <li><b>New feature:</b> ahora se puede cambiar el tamaño de la fuente del timer.</li>
                    <li><b>New feature:</b> ahora puedes mover el timer con un tamaño de texto elegido.</li>
                    <li><b>New feature:</b> Se añadio la posibilidad de colocarle tiempo a las listas de tareas.</li>
                    <li>Mejoras en los diseños de botones. </li>
                </ul>
            <br/>
                <h3>Version 1.2.1</h3>

                <b> {'-'} Web</b>
                    <ul>
                    <li><b> Rework: </b> Se mejoro el diseño del navbar. </li>
                    <li><b>New Logo: </b> Se añadio un nuevo Logo </li>
                    <li><b>Rework Socials: </b> Se mejoro el diseño de redes sociales en footer. </li>
                    </ul>

                    <b> {'-'} Mobil</b>
                    <ul>
                    <li><b>Fixes: </b> Se corrigieron problemas de diseño en la versión mobil. </li>
                    <li><b>New Design: </b> Mejoras en el diseño mobil para hacerlo mas comodo. </li>
                    </ul>
          

            <br/>

                <h3>Version 1.2.2</h3>
                <ul>
                    <li><b>New feature:</b> ahora se ocultan los botones de Normal, short and long break dependiendo
                    de cual este activo.</li>
                    <li>
                        <b>New feature:</b> Cuando el timer llegue a 00:00, mostrara el Break time como continuación de la Technique Pomodoro.
                    </li>
                   <br/>
                        <b>Patch 1.2.3</b> Mejoras visuales a los botones de comenzar, pausar e iniciar sesión.
                </ul>

            <br/>

                <h3>Version 1.2.5</h3>
                <ul>
                    <li><b  style={{color: 'white'}}>New feature:</b> Ahora hay un ciclo de Pomodoro, Cada vez que termine el tiempo hay un <b>Break Time</b>
                    y volvera al estado <b> Normal </b> de <b> 25:00 Minutos </b> cada vez que termine el ciclo.</li>
                    <li><b  style={{color: 'white'}}>New feature:</b> Barra lateral con las configuraciones del Pomodoro.</li>
                    <li><b>New Improvement:</b></li>
                    <li><b  style={{color: 'white'}}>New feature:</b> Nuevo boton donde te dirige al correo para poder enviar Sugerencias del pomodoro.</li>
                    <li><b style={{color: 'white'}}>New Improvement:</b></li>
                    <ol>Ahora se oculta el Eliminar, Completar y Escoger hora de las tareas en Inicio.</ol> 
                    <ol>Ahora los iconos muestran sus funciones en las lista de tarea de inicio. <b>(Al pasar el mouse)</b></ol> 
                    <ol></ol> 

                    <li><b style={{color: 'white'}}>Fixed Mobile Version:</b> </li>
                        <ol>Se arreglo el responsive en celulares en la hora del navbar.</ol>
                        <ol>Se arreglo que no mostraba los demas iconos en navbar.</ol>
                        <ol>Se arreglaron pequeños errores de estilo.</ol>
                </ul>


            <br/>

            <small>
                Sugerencias: 
                <a href="mailto:bryanr.initd@gmail.com" target="_blank" rel="noopener noreferrer"> Email</a>
                
            </small>
                </div>
        </div>
        </>
    );
}

export default VersionPage;