/**Help*/
function log(message) {
  console.log('> ' + message);
}

/**App*/
const boards = document.querySelectorAll('.board');
const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.dropzone');
const button = document.querySelector('.btn-add');
const inputElement = document.querySelector('input');

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

/**Our Buttons */

button.addEventListener('click', showInput);

function showInput() {  
  const isVisible = document.querySelector('.active');
  const element = this.children[0];
  
  if (isVisible) {
    inputElement.classList.remove('active');
    changeImage(element, 'assets/add-orange-18dp.svg');
    addCard();
    
  } else {
    inputElement.classList.add('active');
    changeImage(element, 'assets/done-orange-18dp.svg');
  }
}

function changeImage(element, src) {
  element.src = src;
}

function addCard() {
  const titleText = inputElement.value;

  if (titleText === '' || titleText === null) {
    return
  } else {
    const title = document.createElement('textarea');
    title.classList.add('editInput');
    title.setAttribute('disabled', 'true');
    title.setAttribute('value', titleText);

    const dropzone = document.querySelector('.dropzone');
    
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('draggable', true);
    card.addEventListener('dragstart', dragstart);
    card.addEventListener('dragend', dragend);
    
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    
    const content = document.createElement('div');
    content.classList.add('content');
    
    const status = document.createElement('div');
    status.classList.add('status');
    status.classList.add('red');
    
    const actions = document.createElement('div');
    actions.classList.add('actions');
    
    const editA = document.createElement('a');
    editA.addEventListener('click', editCard);

    const removeA = document.createElement('a');
    removeA.addEventListener('click', removeCard);

    const editImg = document.createElement('img');
    editImg.setAttribute('src', 'assets/create-white-18dp.svg');
    editImg.setAttribute('alt', 'edit');

    const closeImg = document.createElement('img');
    closeImg.setAttribute('src', 'assets/close-white-18dp.svg');
    closeImg.setAttribute('alt', 'close');

    removeA.appendChild(closeImg);
    editA.appendChild(editImg);
    actions.appendChild(editA);
    actions.appendChild(removeA);
    cardHeader.appendChild(status);
    cardHeader.appendChild(actions);
    content.appendChild(title);
    title.appendChild(document.createTextNode(titleText));
    card.appendChild(cardHeader);
    card.appendChild(content);

    dropzone.appendChild(card);

    inputElement.value = '';
  }
}

function removeCard() {
  this.closest('.card').remove();
}

function editCard() {
  const card = this.closest('.card');
  const content = card.children[1];
  const input = content.children[0];

  const element = this.children[0];
  
  const isDisabled = input.hasAttribute('disabled');
  
  if (isDisabled) {
    input.removeAttribute('disabled');
    changeImage(element, 'assets/done-white-18dp.svg');
    input.classList.add('notDisabled');
  } else {
    input.setAttribute('disabled', 'true');
    changeImage(element, 'assets/create-white-18dp.svg');
    input.classList.remove('notDisabled');
  }
  
}

/**
 * ✅ Remover
 * ✅ Vazio nao
 * ✅ Estilização input
 * ✅ Muita letra
 * ✅ Hover
 * ✅ Editar
 *  
*/