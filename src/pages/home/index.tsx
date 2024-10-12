import Button from "@/components/ui/button";
import '@/styles/index.css'


function Home() {
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
            <Button nivel={1} text="Ir para pagina fornecedores" link="/fornecedores"/>
            <Button nivel={2} text="Falar algo" onClick={falarAlgo}/>
            <Button nivel={3} text="Sair" onClick={nada} link="/login"/>
            
        </>
    )
}

export default Home;