const btnActualizarCategoria = document.querySelector('#actNombreCategoria');
const nombreInput = document.querySelector('#nombre');
const idCategoriaDOM = document.querySelector('#idCategoriaDOM').innerHTML;
const axiosActualizarCategoria = async ()=>{
    try {
        const res = await axios.post(`/administrador/adm-categorias/${idCategoriaDOM}/nuevo-nombre`,{nombre : nombreInput.value})
     
        if(res){
            btnActualizarCategoria.classList.remove('btn-outline-primary');
            btnActualizarCategoria.classList.add('btn-success');
            btnActualizarCategoria.innerHTML = "Nombre actualizado";


            setTimeout(function(){
                btnActualizarCategoria.classList.remove('btn-success');
                btnActualizarCategoria.classList.add('btn-outline-success');
                btnActualizarCategoria.innerHTML = "Actualizar nombre";
            }, 1500);
        }

        
     
    } catch (error) {
        console.log(error)
    }


}
btnActualizarCategoria.addEventListener('click',axiosActualizarCategoria);