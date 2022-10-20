//1.initial Data masyva i deti i local storage

let initialData = [
    {
      name: 'John',
      surname: 'Doe',
      age: 30,
      phone: 4565464645,
      email: 'name@surname.com',
      itKnowledge: 8,
      group: 'feu 5',
      interests: ['JavaScript', 'PHP'],
    },
    {
      name: 'Ona',
      surname: 'Onutaitė',
      age: 45,
      phone: 87964631321,
      email: 'name2@surname.com',
      itKnowledge: 4,
      group: 'feu 3',
      interests: [],
    },
    {
      name: 'Doe',
      surname: 'John',
      age: 45,
      phone: 87964631321,
      email: 'name2@surname.com',
      itKnowledge: 10,
      group: 'feu 1',
      interests: ['C++', 'PHP'],
    },
    {
      name: 'Petras',
      surname: 'Petraitis',
      age: 18,
      phone: 87964631321,
      email: 'name2@surname.com',
      itKnowledge: 1,
      group: 'feu 4',
      interests: ['PHP', 'Node.js', 'JavaScript'],
    },
    {
      name: 'Jonas',
      surname: 'Jonaitis',
      age: 45,
      phone: 87964631321,
      email: 'name2@surname.com',
      itKnowledge: 7,
      group: 'feu 2',
      interests: ['PHP'],
    },
  ]; 

let localStorageStudentData = JSON.parse(localStorage.getItem('students-data'))
  
//   let localStorageStudentsData = [];

// localStorage.setItem('students-data', JSON.stringify(initialData));
// let localStorageStudentData = JSON.parse(localStorage.getItem('localStorageStudentData'))
// console.log(localStorageStudentData)




//2. uzkrovus puslapi is local storage isimti si masyva ir ji prideti prie localStorageStudentdata
//JSon stringify, paskui parse ir prideti 
//let initialData; masyvas paimtas is local storage

  let studentForm = document.querySelector('#student-form');
  let studentsList = document.querySelector('#students-list');

  //cia dedam nauja masyva
  localStorageStudentData.map(student => {
    renderSingleStudent(student);
  })


  function renderSingleStudent(data) {
    let name = data.name;
    let surname = data.surname;
    let age = data.age;
    let phone = data.phone;
    let email = data.email;
    let itKnowledge = data.itKnowledge;
    let group = data.group;
    let interests = data.interests;
    
    let inputErrorMessages = studentForm.querySelectorAll('.input-error-message');
    inputErrorMessages.forEach(message => message.remove());
    let requiredInputs = studentForm.querySelectorAll('.required');
    let formIsValid = true;
    
    requiredInputs.forEach(input => {
      input.classList.remove('input-error');
      if (!input.value) {
        formIsValid = false;
        checkInputData(input, 'This field is required.');
      } else if (input.name === 'name') {
        if (input.value.length < 3) {
          formIsValid = false;
          let errorText = 'Name is too short. At least 3 symbols is required.'
          checkInputData(input, errorText);
        }
      } else if (input.name === 'surname') {
        if (input.value.length < 3) {
          formIsValid = false;
          checkInputData(input, 'Surname is too short. At least 3 symbols is required.');
        }
      } else if (input.name === 'phone') {
        if (input.value.length < 9 || input.value.length > 12) {
          formIsValid = false;
          checkInputData(input, 'Phone number is invalid.');
        }
      } else if (input.name === 'age') {
        if (input.value < 0) {
          formIsValid = false;
          checkInputData(input, 'Age cannot be a negative number.');
        } else if (input.value > 120) {
          formIsValid = false;
          checkInputData(input, 'Age cannot be more then 120 years.');
        }
      } else if (input.name === 'email') {
        if (input.value.length < 9 || !input.value.includes('@') || !input.value.includes('.')) {
          formIsValid = false;
          checkInputData(input, 'Email is incorrect.');
        }
      }
    });
    if (!formIsValid) {
      let errorMessage = 'Some fields are missing...';
      renderAlertMessage(errorMessage, 'color-red');
      return;
    }




    let studentItem = document.createElement('div');
    studentItem.classList.add('student-item');

    let nameElement = document.createElement('p');
    nameElement.innerHTML = `<strong>Name:</strong>  <span class="student-name"> ${name} </span>`;

    let surnameElement = document.createElement('p');
    surnameElement.innerHTML = `<strong>Surname:</strong> <span class="student-surname">${surname} </span>`;

    let ageElement = document.createElement('p');
    ageElement.innerHTML = `<strong>Age:</strong> <span class="student-age>${age}</span>`;
console.log(ageElement)
    let emailElement = document.createElement('p');
    emailElement.innerHTML = `<strong>Email:</strong> <span class="hidden-area">****</span>`;

    let phoneElement = document.createElement('p');
    phoneElement.innerHTML = `<strong>Phone:</strong> <span class="hidden-area">****</span>`;

    let itKnowledgeElement = document.createElement('p');
    itKnowledgeElement.innerHTML = `<strong>IT knowledge:</strong><span class="student-itKnowledge"> ${itKnowledge}</span>`;

    let groupElement = document.createElement('p');
    groupElement.innerHTML = `<strong>Group:</strong> <span class="student-group">${group}</span>`;

    let interestWrapperElement = document.createElement('div');
    interestWrapperElement.classList.add('interest-wrapper');

    let interestTitleElement = document.createElement('h3');
    interestTitleElement.textContent = 'Interests:';

    let interestListElement = document.createElement('ul');

    interests.forEach(interest => {
      let interestItem = document.createElement('li');
      interestItem.textContent = interest;

      interestListElement.append(interestItem);
    });

  
    interestWrapperElement.append(interestTitleElement, interestListElement);

    let privateInfoButton = document.createElement('button');
    privateInfoButton.textContent = 'Show personal info';
    privateInfoButton.classList.add('private-info-button', 'show');
    let dataHidden = true;
    privateInfoButton.addEventListener('click', () => {
      let privateEmail = emailElement.querySelector('.hidden-area');
      let privatePhone = phoneElement.querySelector('.hidden-area');

      if (dataHidden) {
        privateEmail.textContent = email;
        privatePhone.textContent = phone;
        privateInfoButton.textContent = 'Hide personal info';
      } else {
        privateEmail.textContent = '****';
        privatePhone.textContent = '****';
        privateInfoButton.textContent = 'Show personal info';
      }

      dataHidden = !dataHidden;

    });

    let removeStudentButton = document.createElement('button');
    removeStudentButton.textContent = 'Remove student';
    removeStudentButton.addEventListener('click', () => {
      studentItem.remove();
      let removedStudentText = `Student (${name} ${surname}) successfully removed.`;
      renderAlertMessage(removedStudentText);
    });
    studentItem.append(nameElement, surnameElement, ageElement, emailElement, phoneElement, itKnowledgeElement, groupElement, interestWrapperElement, privateInfoButton, removeStudentButton);
    studentsList.prepend(studentItem);
    let createdStudentText = `Student created (${name} ${surname})`;
    renderAlertMessage(createdStudentText);
  
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('age');
    localStorage.removeItem('phone');
    localStorage.removeItem('email');
    localStorage.removeItem('it-knowledge');
    localStorage.removeItem('group');
    localStorage.removeItem('interest');

  }


  function changeRangeOutput() {
    let itKnowledgeInput = document.querySelector('#student-it-knowledge');
    let itKnowledgeOutput = document.querySelector('#it-knowledge-output');
    itKnowledgeInput.addEventListener('input', () => {
      itKnowledgeOutput.textContent = itKnowledgeInput.value;
    });

 studentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let elements = event.target.elements;
    let name = elements.name.value;
    let surname = elements.surname.value;
    let age = elements.age.value;
    let phone = elements.phone.value;
    let email = elements.email.value;
    let itKnowledge = elements['it-knowledge'].value;
    let group = elements.group.value;
    let interests = document.querySelectorAll('[name="interest"]:checked');
    let inputErrorMessages = event.target.querySelectorAll('.input-error-message');

    inputErrorMessages.forEach(message => message.remove());
    let requiredInputs = event.target.querySelectorAll('.required');
    let formIsValid = true;
    requiredInputs.forEach(input => {
      input.classList.remove('input-error');
      if (!input.value) {
        formIsValid = false;
        checkInputData(input, 'This field is required.');
      } else if (input.name === 'name') {
        if (input.value.length < 3) {
          formIsValid = false;
          let errorText = 'Name is too short. At least 3 symbols is required.'
          checkInputData(input, errorText);
        }
      } else if (input.name === 'surname') {
        if (input.value.length < 3) {
          formIsValid = false;
          checkInputData(input, 'Surname is too short. At least 3 symbols is required.');
        }
      } else if (input.name === 'phone') {
        if (input.value.length < 9 || input.value.length > 12) {
          formIsValid = false;
          checkInputData(input, 'Phone number is invalid.');

        }
      } else if (input.name === 'age') {
        if (input.value < 0) {
          formIsValid = false;
          checkInputData(input, 'Age cannot be a negative number.');
        } else if (input.value > 120) {
          formIsValid = false;
          checkInputData(input, 'Age cannot be more then 120 years.');
        }
      } else if (input.name === 'email') {
        if (input.value.length < 9 || !input.value.includes('@') || !input.value.includes('.')) {
          formIsValid = false;
          checkInputData(input, 'Email is incorrect.');
        }
      }
    });

    if (!formIsValid) {
      let errorMessage = 'Some fields are missing...';
      renderAlertMessage(errorMessage, 'color-red');
      return;
    }


    let studentItem = document.createElement('div');
    studentItem.classList.add('student-item');

    let nameElement = document.createElement('p');
    nameElement.innerHTML = `<strong>Name:</strong> <span class="student-name"> ${name}</span>`;

    let surnameElement = document.createElement('p');
    surnameElement.innerHTML = `<strong>Surname:</strong> <span class="student-surname"> ${surname} </span>`;

    let ageElement = document.createElement('p');
    ageElement.innerHTML = `<strong>Age:</strong> <span class="student-age"> ${age} </span> `;

    let emailElement = document.createElement('p');
    emailElement.innerHTML = `<strong>Email:</strong> <span class="hidden-area">****</span>`;

    let phoneElement = document.createElement('p');
    phoneElement.innerHTML = `<strong>Phone:</strong> <span class="hidden-area">****</span>`;

    let itKnowledgeElement = document.createElement('p');
    itKnowledgeElement.innerHTML = `<strong>IT knowledge:</strong> <span class="student-itKnowledge"> ${itKnowledge} </span>`;

    let groupElement = document.createElement('p');
    groupElement.innerHTML = `<strong>Group:</strong> <span class="student-group"> ${group} </span>`;

    let interestWrapperElement = document.createElement('div');
    interestWrapperElement.classList.add('interest-wrapper');

    let interestTitleElement = document.createElement('h3');
    interestTitleElement.textContent = 'Interests:';

    let interestListElement = document.createElement('ul');

    interests.forEach(interest => {
      let interestItem = document.createElement('li');
      interestItem.textContent = interest.value;
      interestListElement.append(interestItem);
    });
    


    interestWrapperElement.append(interestTitleElement, interestListElement);
    let privateInfoButton = document.createElement('button');
    privateInfoButton.textContent = 'Show personal info';
    privateInfoButton.classList.add('private-info-button', 'show');
 
    let dataHidden = true;
    privateInfoButton.addEventListener('click', () => {
      let privateEmail = emailElement.querySelector('.hidden-area');
      let privatePhone = phoneElement.querySelector('.hidden-area');
      if (dataHidden) {
        privateEmail.textContent = email;
        privatePhone.textContent = phone;
        privateInfoButton.textContent = 'Hide personal info';
      } else {
        privateEmail.textContent = '****';
        privatePhone.textContent = '****';
        privateInfoButton.textContent = 'Show personal info';
      }
      dataHidden = !dataHidden;
    });

    let removeStudentButton = document.createElement('button');
    removeStudentButton.textContent = 'Remove student';
    removeStudentButton.addEventListener('click', () => {
      studentItem.remove();
      let removedStudentText = `Student (${name} ${surname}) successfully removed.`;
      renderAlertMessage(removedStudentText);
    });
    studentItem.append(nameElement, surnameElement, ageElement, emailElement, phoneElement, itKnowledgeElement, groupElement, interestWrapperElement, privateInfoButton, removeStudentButton);
    studentsList.prepend(studentItem);
    let createdStudentText = `Student created (${name} ${surname})`;
    renderAlertMessage(createdStudentText);
    // 3. Kontaktų forma turi išsivalyti.
    event.target.reset();

//1. Localstorage paimti students-data masyva ir ji issiparsinti.
//2. Sukurti naujo studento objekta pagal pateikta pavyzdi, (pradzioj initialData)
//3. nauja studento objekta prideti (push) i studentu masyva(kuris gautas is pirmos uzduoties)
//4. Atnaujinta studentu masyva prideti i localStorage( setItem, stringify nepamirsti)

//1.is localstorage paimti masyva
let localStorageStudentsData = JSON.parse(localStorage.getItem('students-data'));
//2. sukurti naujo studento objekta,pagal pavyzdi(ikeltas i localStorage ir ten pasilieka ir paskui pasiima)
console.log(interests)
//taskai isskleidzia nodelista, idedam i masyva i r gallim leisti map. nes Nodelistui tik forEach.
let interestValues = [...interests].map(interest => interest.value);

let createdStudent = {
  name:name,
  surname:surname,
  age:age,
  email:email,
  phone:phone,
  itKnowledge:itKnowledge,
  group: group,
  interests: interestValues,
}

// let createdStudent = {
  
  // taip parasyta jeigu key ir value pavadinimai vienodi
//   name,
//  surname,
//  age,
//   email,
//   phone,
//   itKnowledge,
//   group,
//   interests: interestValues,
// }
localStorageStudentsData.push(createdStudent);

localStorage.setItem('students-data', JSON.stringify(localStorageStudentsData))

    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('age');
    localStorage.removeItem('phone');
    localStorage.removeItem('email');
    localStorage.removeItem('it-knowledge');
    localStorage.removeItem('group');
    localStorage.removeItem('interest');

          });


  }
  
  changeRangeOutput();
 


          function renderAlertMessage(text, elementClass) {
            let alertMessage = document.querySelector('#alert-message');
            alertMessage.textContent = text;
            if (elementClass) {
              alertMessage.classList.add(elementClass);
            }
            setTimeout(() => {
              alertMessage.textContent = '';
              alertMessage.classList.remove(elementClass);
            }, 5000);
          }
          function checkInputData(input, text) {
            let inputErrorMessage = document.createElement('span');
            inputErrorMessage.classList.add('input-error-message', 'color-red');
            input.classList.add('input-error');
            input.after(inputErrorMessage);
            inputErrorMessage.textContent = text;
          }

    // AŠTUNTA UŽDUOTIS (filtravimas):
    // 1. HTML faile sukurti naują form'ą. Joje pridėti šiuos input elementus: text ir submit.
    // 2. Formos submit event'o metu, gauti įvestą tekstą ir:
    // 2.1. Patikrinti ar studentų sąraše yra studentas, kurio varde arba pavardėje yra įvestas tekstas.
    // 2.2. Ekrane atvaizduoti tik tuos studentus, kurie tenkina sąlygą.
    // 1. Selektinti paieškos forma javascript'e ir priskirti ją kintamąjam.
    // 2. Šiam kintamąjam pridėti event listener'į - jo tipas submit.
    // 3. Submit metu, išsaugoti duomenis, kurie įvesti paieškos formoje (text input'e).
    // 5.2. Paselektinti studento pavardę.
    // 5.3. Patikrinti ar varde arba pavardėje yra ieškoma frazė.
    // 5.3.1. Jeigu nėra, tai reikia paslėpti studento elementą (display: none).
    // 5.3.2. Jeigu yra, tai reikia parodyti studento elementą (display: block).



let nameInput = document.getElementById('student-name');
let surnameInput = document.getElementById('student-surname');
let ageInput = document.getElementById('student-age');
let phoneInput = document.getElementById('student-phone');
let emailInput = document.getElementById('student-email');
let itKnowledgeInput = document.getElementById('student-it-knowledge');
let groupInputs = document.querySelectorAll('[name="group"]');
let interestInputs = document.querySelectorAll('[name="interest"]');


  
  // LOCAL STORAGE 2 (naudojant objektą)
  function formDataInLocalStorage(form) {
    let localName = localStorage.getItem('name');
    let localSurname = localStorage.getItem('surname');
    let localAge = localStorage.getItem('age');
    let localPhone = localStorage.getItem('phone');
    let localEmail = localStorage.getItem('email');
    let localItKnowledge = localStorage.getItem('it-knowledge');
    let localGroup = localStorage.getItem('group');
    let localInterests = JSON.parse(localStorage.getItem('interest'));
    let nameInput = form.elements.name;
    let surnameInput = form.elements.surname;
    let ageInput = form.elements.age;
    let phoneInput = form.elements.phone;
    let emailInput = form.elements.email;
    let itKnowledgeInput = form.elements['it-knowledge'];
    let groupInput = form.elements.group;
    nameInput.value = localName;
    surnameInput.value = localSurname;
    ageInput.value = localAge;
    phoneInput.value = localPhone;
    emailInput.value = localEmail;
    itKnowledgeInput.value = localItKnowledge;
    groupInput.value = localGroup;
    if (localInterests) {
      localInterests.map(interestValue => {
        let interestElement = document.querySelector(`[value="${interestValue}"]`);
        if (interestElement) {
          interestElement.checked = true;
        }
      });
    }
    form.addEventListener('input', (event) => {
      let activeInput = event.target;
      let inputName = activeInput.name;
      let inputValue = activeInput.value;
      localStorage.setItem(inputName, inputValue);
      let formInterests = document.querySelectorAll('[name="interest"]:checked');
      let interestValues = [];
      formInterests.forEach(interest => {
        interestValues.push(interest.value);
      });
      localStorage.setItem('interest', JSON.stringify(interestValues));
    })
  }
  formDataInLocalStorage(studentForm);
  
  let searchForm = document.querySelector('#search-form');
  let searchName = document.querySelector('#search');
  
  function filterStudents(){
    let searchForm = document.querySelector('#search-form');

    searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let allStudents = document.querySelectorAll('.student-item');
    let searchInput = event.target.elements.search.value.toLowerCase();  
    let searchVariations = document.querySelector('#search-variations').value;

    allStudents.forEach(student => {
      let studentName = student.querySelector('.student-name').textContent.toLowerCase()
      let studentSurname = student.querySelector('.student-surname').textContent.toLowerCase();
      let studentGroup = student.querySelector('.student-group').textContent.toLowerCase();
   
      let studentAge = student.querySelector('.student-age').textContent;
      let studentItKnowledge = student.querySelector('.student-it-knowledge').textContent;

      let displayStr = '';
      if (searchVariations === 'name' && studentName.includes(searchInput)){
        displayStr = 'block';
      }else if (searchVariations === 'surname' && studentSurname.includes(searchInput)){
        displayStr = 'block';
      }else if (searchVariations === 'group' && studentGroup.includes(searchInput)){
        displayStr = 'block';
      }else if (searchVariations === 'age' && studentAge === searchInput){
        displayStr = 'block';
      }else if (searchVariations === 'it-knowledge' && studentItKnowledge=== searchInput){
        displayStr = 'block';
      }else{
        displayStr = 'none';
      }
      student.style.display = displayStr;

  })
})
}
filterStudents();
  




  


