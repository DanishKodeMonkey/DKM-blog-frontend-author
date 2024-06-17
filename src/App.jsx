import Footer from './components/Footer';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import './styles/index.css';

function App() {
    return (
        <div className='flex flex-col h-screen bg-slate-500'>
            <header>
                <Header />
            </header>
            <main className='container mx-auto  p-4 flex-grow'>
                <Outlet />
            </main>
            <footer className='h-15'>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
