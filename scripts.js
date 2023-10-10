const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
                '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="'+item.path+'">'+
                '</div><div class="card-content">'+
                '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#"></a></p></div>'+
                '<div class="card-reveal">'+
                '<span class="card-title grey-text text-darken-4">'+item.subTitle+'<i class="material-icons right">close</i></span>'+
                '<p class="card-text">'+item.description+'</p>'+
                '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    console.log(formData);
    postCar(formData);
}

function postCar(car){
    $.ajax({
        url:'/api/car',
        type:'POST',
        data:car,
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('car post successful');
            }
        }
    });
}

function getAllCars(){
    $.get('/api/cars', (response)=>{
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSubmitted();
    });
    $('.modal').modal();
    getAllCars();
});