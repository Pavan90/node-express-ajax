$(function(){
//GET/READ
 $('#get-button').on('click',function(){
 	$.ajax({
 		url: '/products',
 		contentType: 'application/json',
 		success:function(response){
 			var tbodyEl = $('tbody');
 			tbodyEl.html('');

 			response.products.forEach(function(product){
 				tbodyEl.append('\
 					<tr>\
 					<td class="id">' + product.id  + '</td>\
 					<td><input type="text" class="name" value=" ' + product.name+'"></td>\
 					<td>\
 					<button class="update-button">update/put</button>\
 					<button class="delete-button">delete</button>\
 					</td>\
 					</tr>\
 					');
 			});
 		}
 	});
 });

//cretae/post

$('#create-form').on('submit',function(e){
e.preventDefault();

var createInput = $('#create-input');

$.ajax({
	url: '/products',
	method: 'POST',
	contentType: 'application/json',
	data: JSON.stringify({name:createInput.val()}),
	success:function(res){
		console.log(res);
		createInput.val('');
		$('#get-button').click();
	}
})
})


//update/put

$('table').on('click','.update-button',function(){
	var rowEl = $(this).closest('tr');
	var id = rowEl.find('.id').text();
	var newName = rowEl.find('.name').val();

	$.ajax({
		url:'/product/' +id,
		method:'PUT',
		contentType:'application/json',
		data: JSON.stringify({newName:newName}),
		success:function(res){
			console.log(res);
			$('#get-button').click();
		}
	});
})


//delete


$('table').on('click','.delete-button',function(){
	var rowEl = $(this).closest('tr');
	var id = rowEl.find('.id').text();


	$.ajax({
		url:'/products/' + id,
		method:'DELETE',
		contentType: 'application/json',
		success:function(res){
			console.log(res);
			$('#get-button').click();
		}
	})
})

});