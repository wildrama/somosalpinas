const btnActualizarCategoria = document.querySelector('#actNombreCategoria');
const nombreInput = document.querySelector('#nombre');
const idCategoriaDOM = document.querySelector('#idCategoriaDOM').innerHTML;
const switchCategora = document.querySelector('#switchCategora');
const labelswitchCategora = document.querySelector('.labelswitchCategora')
const axiosActualizarCategoria = async ()=>{
    try {
        const res = await axios.post(`/administrador/adm-categorias/${idCategoriaDOM}/nuevo-nombre`,{nombre : nombreInput.value})
     
        if(res){
            btnActualizarCategoria.classList.remove('btn-outline-primary');
            btnActualizarCategoria.classList.add('btn-success');
            btnActualizarCategoria.innerHTML = "Nombre actualizado";


            setTimeout(function(){
                btnActualizarCategoria.classList.remove('btn-success');
                btnActualizarCategoria.classList.add('btn-outline-primary');
                window.location.reload();
            }, 1500);
        }
        
        
     
    } catch (error) {
        console.log(error)
    }


}
btnActualizarCategoria.addEventListener('click',axiosActualizarCategoria);


switchCategora.addEventListener('change',async e => {

    if(e.target.checked){
        console.log('SI')
        const res1 = await axios.post(`/administrador/adm-categorias/${idCategoriaDOM}/mostrar`,{active : 'SI'})
        labelswitchCategora.innerHTML = 'Activa'
    }else{
        console.log('NO')

        const res2 = await axios.post(`/administrador/adm-categorias/${idCategoriaDOM}/mostrar`,{active : 'NO'})
        labelswitchCategora.innerHTML = 'Inactiva'

    }

});