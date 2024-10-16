import { useEffect } from 'react';
import Button from "@/components/ui/button";
import '@/styles/home_style.css'


function Home() {
    useEffect(() => {
        document.body.classList.add('home-page');
        
        return () => {
            document.body.classList.remove('home-page');
        };
    }, []);

    const falarAlgo = () => {
        alert("algo");
    }

    const nada = () => {
        alert("n faço nada otario kkk")
    }
    return (
        <>
            <h1>HOME</h1>
            <p>teste dos botões, pode apagar isso vinao kkk</p>
            <Button color={1} text="Ir para pagina fornecedores" link="/fornecedores" />
            <Button color={2} text="Falar algo" onClick={falarAlgo} />
            <Button color={3} text="Sair" onClick={nada} link="/login" />

        </>
    )
}

export default Home;