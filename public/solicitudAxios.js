const btnActualizarCategoria = document.querySelector('#actNombreCategoria');
const nombreInput = document.querySelector('#nombre');
const idCategoriaDOM = document.querySelector('#idCategoriaDOM').innerHTML;
const axiosActualizarCategoria = async ()=>{
    try {
        const res = await axios.post(`/administrador/adm-categorias/${idCategoriaDOM}/nuevo-nombre`,{nombre : nombreInput.value})
     
       
    
    } catch (error) {
        console.log(error)
    }


}
btnActualizarCategoria.addEventListener('click',axiosActualizarCategoria);