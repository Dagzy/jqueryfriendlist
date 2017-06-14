//defines variables and calls jQuery on the variables
var $friends = $('#friends');
var $name = $('#name');
var $age = $('#age');

//automatic container production system
var friendTemplate = "" +
	"<li>" +
	"<p><strong>Name:</strong> {{name}}</p>" +
	"<p><strong>Age:</strong> {{age}}</p>" +
	"<button id='{{id}}' class+'remove'>X</button>" +
	"</li>";
	function addFriend(friend){
		$friends.append(Mustache.render(friendTemplate, friend));
	};
/*Once document is finished loading (the .ready function recognizes this) it will pull data from the json file at the URL and
 for each object it adds the information */
//loads friends into the friends template
$(document).ready(function(){
	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/learncode/friends',
		success: function(friends) {
			$.each(friends, function(i, friend){
				addFriend(friend);
			});
		},
		error: function(){
			alert('error loading friends');
		}
	});
$('#add-friend').on('click', function(){

		var friend = {
			name: $name.val(),
			age:  $age.val()
		};
		$.ajax({
			type:'POST',
			url: 'http://rest.learncode.academy/api/learncode/friends',
			data: friend,
			success: function(newFriend){
				addFriend(newFriend);
			},
			error: function(){
				alert('error saving order');
			}
		});
	});
	//.delegate allows you to remove items that were loaded by other students
	$friends.delegate('.remove', 'click', function(){
		var $li = $(this).closest('li');
		//AJAX DELETE function - click the .remove class button and the id identifies what to delete
		$.ajax({
			type: 'DELETE',
			url: 'http://rest.learncode.academy/api/learncode/friends/' + $(this).attr('id'),
			success: function(){
				$li.fadeOut(800, function(){
					$(this).remove();
				});
			}
		});		
	});
$("h2").css("color", "blue"),("text-align", "center");
$("h4").css("text-align", "center");
});

