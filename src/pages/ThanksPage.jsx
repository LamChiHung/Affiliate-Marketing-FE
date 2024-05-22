import { Fireworks } from 'fireworks-js'
import { useEffect } from 'react';

function ThanksPage(params) {
    useEffect(()=>{
    const container = document.querySelector('.container');
    const fireworks = new Fireworks(container, { /* options */ });
    fireworks.start();
    },[])
    return (
        <div className="thanksPage container">
            <h1>THANK YOU FOR YOUR PURCHASE</h1>
        </div>
    )
}
export default ThanksPage;