let generatedPairs = [];
let count = 0;

function checkEmpty() {
  document.getElementById('newGame').style.visibility = 'hidden';
  if (generatedPairs.length === 0) {
    document.getElementById('start').style.visibility = 'hidden';
  } else {
    document.getElementById('start').style.visibility = 'visible';
  }
}

$('#submit').click( () => {
  if (!($('#item1').val() === '') && !($('#item2').val() === '')) {
    var item1 = document.createElement("li");
    item1.innerHTML = $('#item1').val();
    item1.setAttribute('class', 'list1Item');
    document.getElementById('item1List').appendChild(item1);
  
    var item2 = document.createElement("li");
    item2.innerHTML = $('#item2').val();
    item2.setAttribute('class', 'list2Item');
    document.getElementById('item2List').appendChild(item2);
  
    generatedPairs.push({"id" : count,"item1" : $('#item1').val(), "item2" : $('#item2').val()});
    count++;
    document.getElementById('item1').value = '';
    document.getElementById('item2').value = '';
    checkEmpty();
  }
})

$('#start').click( () => {
  var item1s = [], item2s = [];
  generatedPairs.forEach(function(element) {
    item1s.push(element.item1);
    item2s.push(element.item2);
  });
  shuffle(item1s);
  shuffle(item2s);
  $('#item1List li').each(function(i, li) {
    $(li).text(item1s[i]); 
    $(li).droppable();
  });

  $('#item2List li').each(function(i, li) {
    $(li).text(item2s[i]); 
    $(li).draggable();
  });
  document.getElementById('start').style.visibility = 'hidden';
  document.getElementById('newGame').style.visibility = 'visible';
  document.getElementById('inputWrap').style.visibility = 'hidden';
  document.getElementById('item1').value = '';
  document.getElementById('item2').value = '';
})

$('#newGame').click( () => {
  generatedPairs = [];
  $('ul').empty();
  document.getElementById('newGame').style.visibility = 'hidden';
  document.getElementById('inputWrap').style.visibility = 'visible';
  checkEmpty();
})

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function containsObject(list, obj) {
  generatedPairs.forEach(function(element) {
    if (element == obj) return true;
  });
  return false;
}

(function handleDragging(){
  var dragItem;
  var dragItemPosition;
  $('#item2List').on('mousedown', '.list2Item', function(){
    dragItem = $(this);
    for (let i = 0; i < generatedPairs.length; i++){
      if (generatedPairs[i].item2 === dragItem.text()){
        dragItemPosition = generatedPairs[i].item1;
      }
    }
    $('.list1Item').droppable({
      drop: function(){
        console.log($(this).text());
        console.log(dragItemPosition);
        console.log(generatedPairs);
        if (dragItemPosition === $(this).text()){
          $(this).css('opacity', '0');
          dragItem.css('opacity', '0');
        }
      }
    });
  })
})();