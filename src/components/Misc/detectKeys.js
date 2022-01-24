const detectKeys = (setKonamiCodeActive) => {
    
    let secuencie  = []

    window.addEventListener('keydown', (event) => {

        let k = event.key

        secuencie.push(k)

        if (
            secuencie[0] === 'ArrowUp' &&
            secuencie[1] === 'ArrowUp' &&
            secuencie[2] === 'ArrowDown' &&
            secuencie[3] === 'ArrowDown' &&
            secuencie[4] === 'ArrowLeft' &&
            secuencie[5] === 'ArrowRight' &&
            secuencie[6] === 'ArrowLeft' &&
            secuencie[7] === 'ArrowRight' &&
            (secuencie[8] === 'b' || secuencie[8] === 'B') && 
            (secuencie[9] === 'a' || secuencie[9] === 'A') && 
            secuencie[10] === 'Enter' 
        ) {

            secuencie = []

            setKonamiCodeActive(true)

            return true
        }

        if (secuencie.length >= 12) {
            
            secuencie = []
        }
       
        switch (k) {
            case 'ArrowUp':
                break;
        
            case 'ArrowDown':
                break;
            
            case 'ArrowRight':
                break;
            
            case 'ArrowLeft':
                break;

            case 'b':
                break;
            
            case 'B':
                break;

            case 'a':
                break;
            
            case 'A':
                break;

            case 'Enter':
                break;

            default:

                secuencie = []
                break;
        }        
    })
}

export default detectKeys
