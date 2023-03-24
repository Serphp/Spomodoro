import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <>

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark probootstrap-navabr-dark">
        <div class="container">
        <a class="navbar-brand" href="index.html">Present</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#probootstrap-nav" aria-controls="probootstrap-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="probootstrap-nav">
            <ul class="navbar-nav ml-auto">
            <li class="nav-item"><Link to="/" class="nav-link">Home</Link></li>
            <li class="nav-item"><Link to="/Taskpage" class="nav-link">About</Link></li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <button className='btn'>login</button>
                </a>
                </li>
            </ul>
        </div>
        </div>
    </nav>


        </>
    )
}