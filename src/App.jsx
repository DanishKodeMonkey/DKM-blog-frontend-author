import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import './styles/index.css';

function App() {
    return (
        <div className='flex flex-col justify-between h-screen bg-slate-500'>
            <header className='h-10 mb-7 my'>
                <Header />
            </header>
            <main className='flex-grow flex justify-center'>
                <Outlet />
            </main>
            <footer className='h-12'>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
