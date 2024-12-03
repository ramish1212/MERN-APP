import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
    const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'light');

    useEffect(() => {
        document.body.className = mode;
        localStorage.setItem('mode', mode);
    }, [mode]);

    const handleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Link className='navbar-brand' to="/"><img src={mode === 'light' ? "/white-logo.png" : "/dark-logo.png"} alt="Logo" /></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className='nav-link' to="/">YouTube to WAV Downloader</Link>
                        <Link className='nav-link' to="/youtube-to-mp4-converter">YouTube to MP4 Converter</Link>
                        <Link className='nav-link' to="/youtube-to-aac">YouTube To AAC</Link>
                        <Link className='nav-link' to="/youtube-to-flac">YouTube To FLAC</Link>
                        <button className="btn-simple" onClick={handleMode}>
                            <FontAwesomeIcon icon={mode === 'light' ? faSun : faMoon} />
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;