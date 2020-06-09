/**Help*/
function log(message) {
  console.log('> ' + message);
}
/**App*/
const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.dropzone');

/**Our Cards */
cards.forEach(card => {
  card.addEventListener('dragstart', dragstart);
  card.addEventListener('dragend', dragend);
});

function dragstart() {
  //log('CARD: Start dragging');
  //this = card

  dropzones.forEach(dropzone => {
    dropzone.classList.add('highlight');
  })

  this.classList.add('is-dragging');

  //remove status
  cardStatus = this.querySelector('.status');
  const cardColor = cardStatus.classList.item(1);
  cardStatus.classList.remove(cardColor);
}

function dragend() {
  //log('CARD: Stop drag');
  //this = card
  
  dropzones.forEach(dropzone => {
    dropzone.classList.remove('highlight');
  })  

  this.classList.remove('is-dragging');

  //change color
  cardStatus.classList.add(boardColor);
}

/**Place where we will drop cards*/

dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragover', dragover);
  dropzone.addEventListener('dragleave', dragleave);
  dropzone.addEventListener('drop', drop);
});

function dragover() {
  //log('DROPZONE: Over');
  //this = dropzone

  this.classList.add('over');
  
  //get dragging card
  const cardBeingDragged = document.querySelector('.is-dragging');
  this.appendChild(cardBeingDragged);
  
  //get board color
  boardColor = this.classList.item(1);
}

function dragleave() {
  //log('DROPZONE: Leaved');
  //this = dropzone

  this.classList.remove('over');
}

function drop() {
  //log('DROPZONE: Droped');
  //this = dropzone
  
  //to prevent error in highlight
  this.classList.remove('over');
}