import { useEffect } from 'react';
import Button from "@/components/ui/button";
import '@/styles/home_style.css'
import "@/styles/utility.css";
import { Route, useRoutes } from 'react-router-dom';
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