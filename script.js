var guess=null;
var count=0;
var chances=5;

function generate(){
	return Math.round(Math.random()*100);
}

function get_player_guess(){
	guess=+$("#guess").val();
	$("#guess").val("");
}

function check_guess(guess, number){
	if (guess==number){
		$("#winOrLose").text("Great Job! You just guessed the number!!! You win!").css({"color":"red"}).slideToggle(500).slideToggle(500).slideToggle(500).slideToggle(500).slideToggle(500).slideToggle(500);
		$("#message2").text("");
		$("#message").text("");
	}else {
		if (check_chances())
			return;
		var absolute_value=+Math.abs(guess-number);
		if (absolute_value>20){
			$("#message2").text("You're cold...");
			$("#message2").css({"color":"blue"});}
		else if (absolute_value<20 && absolute_value>10){
			$("#message2").text("You're getting warmer!");
			$("#message2").css({"color":"brown"});}
		else if (absolute_value<10 && absolute_value>5){
			$("#message2").text("You're hot!!");
			$("#message2").css({"color":"orange"});}
		else if (absolute_value<5){
			$("#message2").text("You're ON FIRE!!!");
			$("#message2").css({"color":"red"});}
		$("#message").text("Try again.");
		}
}

function check_chances(){
	chances-=1
	if (chances==0){
		$("#winOrLose").text("I'm sorry. You ran out of guesses. The number was "+ winning_number+ ".").css({"color":"black"});
		return true;
	}
}

function update_guesses(){
	var guesses=' '
	for (i=chances; i>0; i--)
		guesses+="I";
	$("#chances").text(guesses);
}

	
function onClick(){
	get_player_guess();
	check_guess(guess, winning_number);
	update_guesses();
}

function replay(){
	guess=null;
	winning_number=generate();
	count=0;
	chances=5;
	$("#message").text("");
	$("#message2").text("");
	$("#winOrLose").text("");
	$("#chances").text(" IIIII");
}

function hint(){
	var message=null
	var hint=[];
	var winner=false;
	for (i=0; i<4;i++){
		if (!winner){
			var x=Math.random()
			if (x>.5){
				hint.push(winning_number);
				winner=true;}
			}
		var decoy=generate();
		hint.push(decoy);
	}
	if (!winner)
		hint.push(winning_number);
	message="It's one of these numbers: "+hint;
	if (count>0)
		message="You only get one hint!";
	count+=1;
	alert(message);
}

var winning_number=generate();

$(document).ready(function(){
$("#chances").text(" IIIII");
$(document).on("click", "#guessButton", onClick);
$(document).on("keypress", "#guessButton", onClick);
$(document).on("click", "#replay", replay);
$(document).on("click", "#hint", hint);
});
