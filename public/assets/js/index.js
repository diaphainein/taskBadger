// event handler for add task button
$("#addTask").on("click", function () {
	var input1 = $("#inputDateTime1").val();
	var input2 = $("#datepicker").val();
	var row = "<tr>";
	var element1 = "<td>" + input1 + "</td>";
	var element2 = "<td><div class='checkbox text-right'><label><input type='checkbox' name='optionsCheckboxes'>Done</label></div></td>";
	var element3 = "<td class='text-right'><button type='button' class='btn btn-link btn-xs'>Edit</button></td>";
	var closeRow = "</tr>";
	$("#activeTask").append(row + element1 + element2 + element3 + closeRow);
});
