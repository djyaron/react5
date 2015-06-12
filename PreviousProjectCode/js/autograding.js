// Record the answers to the questions on the page in this variable. The answers should be in the following format: {"question 1 id attr":question 1 answer,"question 2 id attr":question 2 answer,...} Each type of question has a different format for the answer:
// 	Multiple-choice (1 possible answer): "value attribute of correct option"
// 	Diagram labelling, Matching: {"id attr of box 1":"id attr of matching label","id attr of box 2":"id attr of matching label",etc...}
// 	Multiple-select (1+ possible answers):["value attr of correct option 1","value attr of correct option 2",etc....]
// 	Ordering/Arranging:["id attr of first/top item","id attr of second item",....."id attr of last/bottom item"]  <  in the CORRECT order
// 	Fill in the blank:["acceptable answer 1","acceptable answer 2","acceptable answer 3"]
var answers = {"mod1_01":"A", "mod1_02":"D", "samp01":"A","samp02":{"samp02-drop_01":"anode","samp02-drop_02":"electrons-right","samp02-drop_03":"salt-bridge","samp02-drop_04":"cathode","samp02-drop_05":"metal-salt"},"samp03":{"samp03-drop_01":"dipole","samp03-drop_02":"acid","samp03-drop_03":"titration"},"samp04":["A","D","E"],"samp05":{"samp05-drop_01":"ag","samp05-drop_02":"cu","samp05-drop_03":"sn","samp05-drop_04":"zn","samp05-drop_05":"mg"},"samp06":["five","5","5.0"], "mod1_e01": ["A","D"], "mod1_e02": "C"};
var incorrect = {"samp01":"The correct answer is A.","samp02":"The correct answers are (clockwise, from bottom left: Anode, Electrons >>>, Salt Bridge, Cathode, Metal Salt.","samp03":"The correct answers are (top to bottom): Dipole, Acid, Titration.","samp04":"The correct answers are A, D, and E.","samp05":"The correct answers are (top to bottom): Ag, Cu, Sn, Zn, Mg.","samp06":"The correct answer is 5.", "mod1_e01" : "The correct answers are A and D."};

var mcIncorrect = {};

mcIncorrect["A"] = {"mod1_e02":"It is true that \“influx\” is the same as \“adding,\” but we call any addition or removal from an equilibrium system a \“stress.\” Also, a stress does not cause a balance, and equilibrium systems never go to total completion.", "mod1_01":"Correct!", "mod1_02":"While it is true that the reaction rates can change, we don’t have enough information in this question to know which one will change."};

mcIncorrect["B"]  = {"mod1_e02":"An \“efflux\” would mean \“removing,\” and adding O2 pushes the reaction in the forward, not reverse direction.", "mod1_01":"The reaction that allows our blood to transport oxygen from the lungs to the muscles is reversible.", "mod1_02":"While it is true that the reaction rates can change, we don’t have enough information in this question to know which one will change."};

mcIncorrect["C"]  = {"mod1_e02":"Correct!", "mod1_01":"The reaction that allows our blood to transport oxygen from the lungs to the muscles is reversible.", "mod1_02":"A stress to the system will always result in a change in one of the reactio rates."};

mcIncorrect["D"]  = {"mod1_e02":"It is not useful to think of a stress to a system as good or bad. Instead, think equilibrium systems as nature’s way of dealing with changes in the environment. And, while it is true that a stress can increase the rate of the forward or reverse reaction, equilibrium reactions never go to total completion.", "mod1_02":"Correct!"};
mcIncorrect["E"]  = {};
mcIncorrect["F"]  = {};


$(function () {
	$(".draggable").draggable({snap: ".droppable", snapMode: "inner", containment: "parent"});
	$(".droppable").droppable({
		tolerance:"intersect",
		drop:function(event,ui) {
			$(this)
				.html(ui.draggable.html())
				.droppable('option','accept',ui.draggable);
			$(ui.draggable)
				.css("opacity","0.0");
			$(":input[name='" + $(this).attr('id') + "']")
				.val(ui.draggable.attr('id'));
		},
		out:function(event,ui) {
			$(this)
				.html("")
				.droppable('option','accept','.draggable');
			$(ui.draggable)
				.css("opacity","1.0")
				.css("width","auto")
				.css("height","auto")
				.css("padding","5px");
			$("input[name=" + $(this).prop('id') + "]")
				.val("");
		}
	});

	$(".sortable").sortable({
		revert:true,
		create: function() {
			$("input[name='"+$(this).attr('id').replace('sort-','')+"']").val($(this).sortable("toArray"));
		},
		update: function() {
			$("input[name='"+$(this).attr('id').replace('sort-','')+"']").val($(this).sortable("toArray"));
		}
	});

	$("ul, li").disableSelection();

	$(".hint").data('pos',-1);

	$(".showHints").click(function() {
		if ($(this).siblings('.hint').data('pos') == -1) {
		    $(this).siblings('.hint').children('span').first().css('display','inline');
		    if ($(this).siblings('.hint').children('span').length > 1) {
		        $(this).siblings('.hint').children('.nextHint').css('display','inline');
		    }
		    $(this).siblings('.hint').data('pos',0);
		    $(this).html('Hide');
		} else {
			$(this).siblings('.hint').children().css('display','none');
			$(this).siblings('.hint').data('pos',-1);
			$(this).html('Hint');
		}
	    return false;
	});

	$('.nextHint').click(function() {
	    $(this).parent().children('span').eq($(this).parent().data('pos')).css('display','none');
	    $(this).parent().data('pos',$(this).parent().data('pos')+1);
	    $(this).parent().children('span').eq($(this).parent().data('pos')).css('display','inline');
	    if ($(this).parent().data('pos') == 1) {
	        $(this).siblings('.prevHint').css('display','inline');
	    }
	    if ($(this).parent().data('pos') == $(this).siblings('span').length-1) {
	        $(this).css('display','none');
	    }
	    return false;
	});

	$('.prevHint').click(function() {
	    $(this).parent().children('span').eq($(this).parent().data('pos')).css('display','none');
	    $(this).parent().data('pos',$(this).parent().data('pos')-1);
	    $(this).parent().children('span').eq($(this).parent().data('pos')).css('display','inline');
	    if ($(this).parent().data('pos') == $(this).parent().children('span').length-2) {
	        $(this).siblings('.nextHint').css('display','inline');
	    }
	    if ($(this).parent().data('pos') == 0) {
	        $(this).css('display','none');
	    }
	    return false;
	});
});

function check(question) { 
	var complete = true;
	var correct = true;
	if (question.hasClass('multiple-choice')) {
		if ($("input[name='"+question.attr('id')+"']:checked").length == 0){
			complete = false;
		} else if (answers[question.attr('id')] != $("input[name='"+question.attr('id')+"']:checked").val()) {
			correct = false;
		}
	} else if (question.hasClass('match')) {
		jQuery.each(answers[question.attr('id')], function(key,value) {
			if ($("input[name='"+key+"']").val() == "") {
				complete = false;
				return false;
			} else if ($("input[name='"+key+"']").val() != value) {
				correct = false;
			}
		});
	} else if (question.hasClass('select-all')) {
		if ($("input[name='"+question.attr('id')+"']:checked").length == 0) {
			complete = false;
		} else {
			var response = $("input[name='"+question.attr('id')+"']:checked");
			var response_Arr = [];
			var answer = answers[question.attr('id')];

			for (var i = 0; i < response.length; i++){
				response_Arr.push(response[i].value);
			}

			if (response_Arr.length != answer.length){
				// console.log("Lengths differ");
				correct = false;
				console.log("Correct: " + correct);
			}else{
				answer = answer.sort();
				response_Arr = response_Arr.sort();

				$(answer).each(function(index){
					if (answer[index] != response_Arr[index]){
						correct = false;
					}
				});
			}

			
		}

	} else if (question.hasClass('arrange')) {
		if (answers[question.attr('id')] != $("input[name='"+question.attr('id')+"']").val()) {
			correct = false;
		}
	} else if (question.hasClass('fill-in')) {
		if ($("input[name='"+question.attr('id')+"']").val() == ""){
			complete = false;
		} else if (jQuery.inArray($("input[name='"+question.attr('id')+"']").val(),answers[question.attr('id')]) == -1){
			correct = false;
		}
	}


	if (!complete) {
		$("#results-" + question.attr('id')).css('display','block').html("You have not fully completed this question.").addClass("incorrect").removeClass('correct');
	} else if (!correct) {
		var answer;
		if (question.hasClass('multiple-choice')) {
			var user_resp = $("input[name='"+question.attr('id')+"']:checked").val();
			var responses_arr = mcIncorrect[user_resp];
			answer = responses_arr[question.attr('id')];
		}
		else{
			answer = incorrect[question.attr('id')];
		} 
		$("#results-"+question.attr('id')).css('display','block').addClass('incorrect').removeClass('correct').html("Incorrect. " + answer);
		resetForms();
	} else if (correct && complete) {
		$("#results-"+question.attr('id')).css('display','block').addClass('correct').removeClass('incorrect').html("Correct!");
		$("#" + question.attr('id')).fadeOut(1000);
	}
	return false;
}

function resetForms() {
	$(".tutor input").each(function() {
		$(this).removeAttr('disabled','');
	});

	$(".tutor").each(function() {
		// $(this).children('input').each(function(){
		// 	$(this).attr('disabled','');
		// });

		$(this).each(function() {
			this.reset();
		});
	});


}