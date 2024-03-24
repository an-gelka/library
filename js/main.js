
//менюшка

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("burger").addEventListener("click", function() {
    document.querySelector("header").classList.toggle("open");
  })
})

//фильтр секции Favorites

let radioButtons=document.getElementsByName('filter');
let listItems = document.querySelectorAll('.books-list');
for(let i=0;i<radioButtons.length;i++){
  radioButtons[i].addEventListener('change', function(){
    let selectorValue = this.value;
    for(let k=0; k<listItems.length; k++){
      if(listItems[k].classList.contains(selectorValue)){
        listItems[k].style.display="flex";
      }
      else{
        listItems[k].style.display="none";
      }
    }
  })
}

// всплытие модальных окон

const btnPath = document.querySelectorAll('.path');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal');
const closePopupButton = document.querySelectorAll('.close');

btnPath.forEach((el) => {
	el.addEventListener('click', (e) => {
		let path = e.currentTarget.getAttribute('data-path');
    // e.preventDefault();

		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});

		document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
		modalOverlay.classList.add('modal-overlay--visible');
	});
});

// //закрытие модальных окон по щелчку вне поля

// modalOverlay.addEventListener('click', (e) => {

// 	if (e.target == modalOverlay) {
// 		modalOverlay.classList.remove('modal-overlay--visible');
// 		modals.forEach((el) => {
// 			el.classList.remove('modal--visible');
// 		});
// 	}
// });

// //закрытие модальных окон по щелчку на крестик

// closePopupButton.forEach((el) => {
// 	el.addEventListener('click',() => {

//   modalOverlay.classList.remove('modal-overlay--visible');
//   modals.forEach((el) => {
//     el.classList.remove('modal--visible');
//   });
// })
// })

// вариант с добавлением функции 

modalOverlay.addEventListener('click', (e) => {
	// console.log(e.target);

	if (e.target == modalOverlay) {
	modalClose();
	}
});

closePopupButton.forEach((el) => {
	el.addEventListener('click', modalClose)
})

// при нажатии на  клавишу esc

document.addEventListener('keydown', function(event) {
  if (event.code === 'Escape') {
    modalClose();
  }
});

function modalClose (){
  modalOverlay.classList.remove('modal-overlay--visible');
  modals.forEach((el) => {
    el.classList.remove('modal--visible');
  });
}

//  REGISTER

// const registerForm = document.querySelector('.register-form');

// registerForm.addEventListener('submit', function(event) {event.preventDefault();

//   let firstname = document.getElementById('firstname').value;
//   let lastname = document.getElementById('lastname').value;
//   let email = document.getElementById('email').value;
//   let password = document.getElementById('password').value;

//   // if(firstname === "" || password === "" || lastname === "" || email === "") {
//   //   alert('Пожалуйста, заполните все поля');
//   //   return;
//   // }
//   let users = JSON.parse(localStorage.getItem('users')) || [];

//   // let existingUser = users.find(function(user) {
//   //   return user.username === username;
//   // });

//   // if(existingUser) {
//   //   alert('Это имя пользователя уже занято');
//   //   return;
//   // }

//   users.push({
//     firstname: firstname,
//     lastname: lastname,
//     email: email,
//     password: password
//   });

//   localStorage.setItem('users', JSON.stringify(users));

//   alert('Регистрация прошла успешно!');
// });

const registerForm = document.querySelector('.register-form');
const loginForm = document.querySelector('.login-form');

registerForm.addEventListener('submit', function(event){
  event.preventDefault();

  const firstname = registerForm.elements.firstname.value;
  const lastname = registerForm.elements.lastname.value;
  const email = registerForm.elements.email.value;
  const password = registerForm.elements.password.value;
  const cardNumber = document.querySelectorAll('.card-number');
  let result = getRamNumber();
  cardNumber.forEach((el) => {el.textContent = result;})

  localStorage.setItem('firstname', firstname);
  localStorage.setItem('lastname', lastname);
  localStorage.setItem('email', email);
  localStorage.setItem('password', password);
  localStorage.setItem('cardnumber', result);

// открытие модального окна при регистрации

  const cancelDialog = document.getElementById("cancel");
  const dialog = document.getElementById("dialog");
  dialog.showModal();

  cancelDialog.addEventListener("click", function () {
    dialog.close();
  });

  // modalClose();
})

// LOG IN

loginForm.addEventListener('submit', function(event){
  event.preventDefault();
  const username = loginForm.elements.username.value;
  const password = loginForm.elements.password.value;
  const savedUsername = localStorage.getItem('email');  
  const savedPassword = localStorage.getItem('password');
  const savedCardnumber = localStorage.getItem('cardnumber');

  if( username === savedUsername && password === savedPassword){
    userActive();
    blockActive();
    buttonsChange();
    changePathBtnBuy();
    changeTitle();
    alert('Вы успешно вошли')
  }
  else if( username === savedCardnumber && password === savedPassword){
    userActive();
    blockActive();
    buttonsChange();
    changePathBtnBuy();
    changeTitle();
    alert('Вы успешно вошли!')
  } 
  else {
    alert('ошибка!')
  }
})
function userActive(){
  modalOverlay.classList.remove('modal-overlay--visible');
  modals.forEach((el) => {
    el.classList.remove('modal--visible');
  });
  getInitials();
}


// Инициалы вместо иконки логина

const initials = document.querySelectorAll('.initials');
const iconFill = document.querySelector('.icon-fill');
const iconFillaccount = document.querySelector('.icon-fill-account');
const savedFirstname = localStorage.getItem('firstname');
const savedLastname = localStorage.getItem('lastname');
console.log(`${savedFirstname} ${savedLastname}`);
let str1 = `${savedFirstname}`;
let str2 = `${savedLastname}`;

function getInitials(){
  let letterOne = str1.toUpperCase().slice(0,1);
  let letterTwo = str2.toUpperCase().slice(0,1);

  initials.forEach((el) => {
 el.textContent=letterOne+letterTwo;
  iconFillaccount.style.display="flex";
  iconFill.style.display="none";})

}

// имя в профайле и номер карты

const profile = document.querySelectorAll('.path-profile');
 const fullName = document.querySelector('.username');
 let cardNumber = document.querySelectorAll('.card-number');
 let result = getRamNumber();


 profile.forEach((el) => {
 el.addEventListener('click', function(){
  getUsername();
  getInitials();
  showCardNumber();
 })
})

function getUsername(){ 
  let savedFirstname = localStorage.getItem('firstname');
  let savedLastname = localStorage.getItem('lastname');
  fullName.textContent = savedFirstname + ' ' + savedLastname;
}

function showCardNumber(){
  cardNumber.forEach((el) => {el.textContent = localStorage.getItem('cardnumber');})
}

// Изменение title на имя пользователя 

function changeTitle(){
  let iconFillaccount = document.querySelector('.icon-fill-account');
  iconFillaccount.title = savedFirstname + ' ' + savedLastname;
}

// получение случайного 9 значного номера в формате 16-ричного числа

function getRamNumber(){
  let result='';
  for(let i=0;i<9;i++){
  result += Math.floor (Math.random () * 16) .toString (16); // Get 0-15 rpm by hexadecimal toString
  }
   return result.toUpperCase(); 
  }
 
// Block Active at section LibraryCard

function blockActive(){
const notActive = document.querySelectorAll('.not-account');
const active = document.querySelectorAll('.account');

active.forEach((el) =>{
  el.classList.remove('block--hidden');  
  el.classList.add('block--visible');    
  })

notActive.forEach((el) =>{
el.classList.add('block--hidden');
})
}

// Смена кнопок "Buy" на "Own"

function buttonsChange(){
let buttons = document.querySelectorAll('.btn');
buttons.forEach((el)=>{
  if(el.classList.contains('own')){
    el.classList.remove('btn-bookBlock');
  el.classList.add('btn-disabled');
  el.textContent="Own";
  el.setAttribute("disabled", "");
  }  
})
}

// Смена кнопки "profile" на номер карты 

function buttonsChangeToCardNumber(){
  document.getElementById('btn-profile').textContent = localStorage.getItem('cardnumber');
}

// кнопки "buy" в библиотеке
// 1) при нажатии ссылается на форму покупки, а не авторизации

function changePathBtnBuy(){
  let buyBtn = document.querySelectorAll('.btn-bookBlock');

  buyBtn.forEach((el)=>{
    el.dataset.path = 'buy-popup';
  })
}
// 2) при нажатии становится некликабельной и надпись "Own" (добавление класса own при покупки книги)

function delData(){
  let buyBtn = document.querySelectorAll('.btn-bookBlock');

  buyBtn.forEach((el)=>{
     delete el.dataset.path;    
  })
}

function changeBtnBuyToOwn(){
  let buttons = document.querySelectorAll('.btn');

  buttons.forEach((el)=>{
    el.addEventListener('click', function(){
      if(el.classList.contains('btn-bookBlock')){
      el.classList.add('own');
      buttonsChange();
      // el.classList.remove('btn-bookBlock');
      // el.classList.add('btn-disabled');
      // el.textContent="Own";
      // el.setAttribute("disabled", "");
    }
    })
  })
}

// доступ к абонементу (иконки)

function blockActiveAfterBuyCard(){
  const beforeBuyCard = document.querySelectorAll('.before-buy-card');
  const afterBuyCard = document.querySelectorAll('.after-buy-card');
  
  beforeBuyCard.forEach((el) =>{
  el.classList.add('block-hidden');
  })
  
  afterBuyCard.forEach((el) =>{
    el.classList.remove('block-hidden');  
    el.classList.add('block--visible');    
    })
  }

// покупка абонемента => доступна покупка книг (отправка формы)

const formBuy = document.getElementById('form-for-buy');
const btnFormBuy = document.getElementById('btn-submit');

// function isValid (){
  
//   const formElements = Array.from(formBuy.elements).filter(e => e.nodeName !== 'BUTTON');}
    

  formBuy.addEventListener('submit', (event)=>{
    event.preventDefault();
     formBuy.addEventListener('submit', saveArticle); 
  });

  // функция отправки формы и проверка успешно ли

async function saveArticle(event){
  event.preventDefault();
  const myFormData = new FormData(formBuy);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(myFormData);
  if (xhr.status != 200){
    console.log("error");
      delData();
   changeBtnBuyToOwn();
   blockActiveAfterBuyCard(); 
   buttonsChangeToCardNumber(); 
    modalClose();
  }
  else {
    console.log('успешно');
  }
  // xhr.onload = () => alert(xhr.response);
}


// вместо кнопки "profile" номер карты после покупки абонимента

 function changeBtnProfileToCardNumber(){
  let btnProfile = document.querySelector('.path-profile');
  btnProfile.textContent = "";
  btnProfile.classList.add('card-number');
  btnProfile.textContent = localStorage.getItem('cardnumber');
 }

// по нажатию на кнопку ничего не происходит

const btnDoNothinh = document.querySelector('.before-buy-card');
btnDoNothinh.addEventListener('click', (event)=>{
  event.preventDefault();
})

// Счетчик визитов через localStorage

const btnLogin = document.querySelector('.btn-login');
const counter = document.querySelectorAll('.count-visits');


btnLogin.addEventListener('click', (event)=>{

      let count = localStorage.getItem('visitCount');

    // Если значение не существует, устанавливаем счетчик в 0
    if (count === null) {
        count = 0;
    }
    // Увеличиваем счетчик на 1
    count++;
    // Обновляем значение счетчика в localStorage
    localStorage.setItem('visitCount', count);
    // Выводим значение счетчика на страницу
    counter.forEach((el)=> el.innerText = count); 
})


// class LocalStorageUntil {
//   constructor(){
//     this.keyName = 'products';
//   }
// }

// function getProducts(){
//   const productsLocalStorage = localStorage.getItem(this.keyName);
//   if(productsLocalStorage !== null){
//     return JSON.parse(productsLocalStorage);
//   }
//   return [];
// }

// putProducts(id){
//   let products=this.getProducts();
//   products.push(id);
//   localStorage.setItem(this.keyName, JSON.stringify(products));
// }
// const localStorageUtil = new LocalStorageUntil();