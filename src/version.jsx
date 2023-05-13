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
                </ul>

                </div>
        </div>
        </>
    );
}

export default VersionPage;