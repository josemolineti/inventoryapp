import { useEffect } from 'react';
import '@/styles/home_style.css'
import "@/styles/utility.css";
import TopBar from '@/components/ui/top-bar';

function Home() {
    useEffect(() => {
        document.body.classList.add('home-page');
        
        return () => {
            document.body.classList.remove('home-page');
        };
    }, []);


    return (
        <>
    <header>
        <TopBar/>
    </header>






        </>
    )
}

export default Home;