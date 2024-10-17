// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

let studentsList = [
  {
    surname:'Разумовский',
    name: 'Илья',
    patr: 'Олегович',
    birth: new Date(1992, 8, 12),
    faculty: 'Экономика',
    start: 2010,
  },

  {
    surname:'Левина',
    name: 'Ольга',
    patr: 'Петровна',
    fio:'Левина Ольга Петровна',
    birth: new Date(2002, 3, 24),
    faculty: 'Лингвистика',
    start: 2020,
  },

  {
    surname:'Никонов',
    name: 'Михаил',
    patr: 'Павлович',
    fio: 'Никонов Михаил Павлович',
    birth: new Date(1993, 2, 24),
    faculty: 'Робототехника',
    start: 2012,
  },

  {
    surname:'Щербаков',
    name: 'Николай',
    patr: 'Михайлович',
    birth: new Date(2002, 11, 11),
    faculty: 'Барное дело',
    start: 2017,
  },

  {
    surname:'Михайлова',
    name: 'Светлана',
    patr: 'Вячеславовна',
    birth: new Date(1974, 6, 19),
    faculty: 'Архивоведение',
    start: 1992,
  }
]


// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

function getStudentItem(studentObj) {

  const tr = document.createElement('tr')
  const tdFIO = document.createElement('td')
  const tdFaculty = document.createElement('td')
  const tdBirth = document.createElement('td')
  const tdPeriod = document.createElement('td')

  const age = getAge(studentObj.birth)

  function dateToDMY(date) {
    let d = date.getDate()
    let m = date.getMonth() + 1
    let y = date.getFullYear()
    return `${d <= 9 ? '0' + d : d}.${m<=9 ? '0' + m : m}.${y}`
  }

  function getAge(dateString) {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    return age;
}

  function getAgeString(age) {
    let count = age % 100
    if (count >= 10 && count <= 20) {
      return'лет'
    } else {
      count = age % 10
      if (count === 1) {
        return 'год'
      } else if (count >=2 && count <= 4) {
        return 'года'
      } else {
        return 'лет'
      }
    }
  }

  function getStatus(start) {
    const now = new Date()
    const nowYY = now.getFullYear();
    const nowMM = now.getMonth() + 1;
    const diff = nowYY - start;

    if(start === nowYY) {
      return '1 курс'
    } else if((diff === 4 && nowMM >= 9)|| diff > 4) {
      return ('Закончил')
    } else {
      return `${diff} курс`
    }
  }

  tdFIO.textContent = `${studentObj.surname} ${studentObj.name} ${studentObj.patr}`
  tdFaculty.textContent = `${studentObj.faculty}`
  tdBirth.textContent = `${dateToDMY(studentObj.birth)} (${age} ${getAgeString(age)})`
  tdPeriod.textContent = `${studentObj.start}-${studentObj.start+4} (${getStatus(studentObj.start)})`

  tr.append(tdFIO, tdFaculty, tdBirth, tdPeriod)

  return tr
}

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

function renderStudentsTable(arr) {

  let copyArr = [...arr]

  const tbody = document.getElementById('tbody')
  tbody.innerHTML = ''

  for (const studentObj of copyArr) {
    const newItem = getStudentItem(studentObj)
    tbody.append(newItem)
  }
}

renderStudentsTable(studentsList)

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

document.getElementById('add-form').addEventListener('submit', function(e) {
  e.preventDefault()

  let surname = document.getElementById('surname-input').value.trim()
  let name = document.getElementById('name-input').value.trim()
  let patr = document.getElementById('patr-input').value.trim()
  let birth = new Date(document.getElementById('birth-input').value)
  let faculty = document.getElementById('faculty-input').value.trim()
  let start = Number(document.getElementById('start-input').value)


  function formValidate(form) {
    let inputs = form.querySelectorAll('input')
    let result = true

    function createError(input, text) {
      input.parentElement.classList.add('error')
      input.classList.add('error')
      const errorText = document.createElement('label')
      errorText.classList.add('error-text')
      errorText.textContent = text
      input.parentElement.append(errorText)
    }

    function removeError(input) {
      if (input.parentElement.classList.contains('error')) {
        input.parentElement.querySelector('.error-text').remove()
        input.parentElement.classList.remove('error')
        input.classList.remove('error')
      }
    }

    for  (let i = 0; i < inputs.length; i++) {
      const input = inputs[i]
      removeError(input)

      if (input.value.trim() === '') {
        result = false
        createError(input, 'Поле не заполнено')
      } else if (input.getAttribute('id') === ('birth-input')) {
        if (birth < new Date(1900, 0, 1) || birth > new Date()) {
          result = false
          createError(input, 'Дата рождения должна быть в диапазоне от 01.01.1900 до текущей даты')
        }
      } else if (input.getAttribute('id') === ('start-input')) {
          if (start < 2000 || start > new Date().getFullYear()) {
            result = false
            createError(input, 'Год начала обучения должен находиться в диапазоне от 2000-го до текущего года')
          }
       }  else if (input.getAttribute('type') === ('text')) {
            let err = 0
            for (let i=0; i<input.value.trim().length; i++) {
              if (!isNaN(input.value.trim()[i])) {
                  err+=1
              }
            }
            if (err>0) {
              result = false
              createError(input, 'Введите корректное значение')
            }
       }
    }

    return result
  }

  if (formValidate(this)) {

    let newStudentObj = {
      surname: surname,
      name: name,
      patr: patr,
      birth: birth,
      faculty: faculty,
      start: start
    }

    studentsList.push(newStudentObj)
    renderStudentsTable(studentsList)
    document.getElementById('add-form').reset();
  }


})


// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

const table = document.querySelector('table')
let colIndex = -1

const toSort = function(index, type, isSorted) {
  const tbody = table.querySelector('tbody')

  const compare = function(rowA, rowB) {
    const rowAVal = rowA.cells[index].textContent
    const rowBVal = rowB.cells[index].textContent

    switch(type) {
      case 'date':
        let dateA = rowAVal.slice(0, 10)
        let dateB = rowBVal.slice(0, 10)
        dateA = dateA.split('.').reverse().join('-')
        dateB = dateB.split('.').reverse().join('-')
        return new Date(dateA).getTime() - new Date(dateB).getTime()
      case 'text':
        if (rowAVal < rowBVal) return -1
        else if (rowAVal > rowBVal) return 1
        return 0
      case 'period':
        const periodA = rowAVal.slice(0, 4)
        const periodB = rowBVal.slice(0, 4)
        return periodA - periodB
    }
  }

  let rows = [].slice.call(tbody.rows)
  rows.sort(compare)

  if (isSorted) rows.reverse()

  table.removeChild(tbody)
  for (let i=0; i<rows.length; i++) {
    tbody.append(rows[i])
  }
  table.append(tbody)
}

table.addEventListener('click', (e) => {
  const el = e.target
  if (el.tagName !== 'TH') return
  const index = el.cellIndex
  const type = el.getAttribute('data-type')

  toSort(index, type, colIndex === index)
  colIndex = (colIndex === index) ? -1 : index
})



// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.

function filter(arr, prop, value) {
  let result = [],
      copy = [...arr]
  for (const item of copy) {
    if (String(item[prop]).includes(value) === true) result.push(item)
  }
  return result
}

for (const item of studentsList) {
  item.fio = item.surname + '' + item.name + '' + item.patr
  item.end = Number(item.start+4)
}

function filterRender(arr) {

  const tbody = document.getElementById('tbody')
  tbody.innerHTML = ''

  const fioVal = document.getElementById('fio-filter-input').value.trim(),
        facultyVal = document.getElementById('faculty-filter-input').value.trim(),
        startVal = document.getElementById('start-filter-input').value.trim(),
        endVal = document.getElementById('end-filter-input').value.trim()


  let newArr = [...arr]

  if (fioVal !== '') newArr = filter(newArr,'fio', fioVal)
    else if (facultyVal !== '') newArr = filter(newArr,'faculty', facultyVal)
    else if (startVal !== '') newArr = filter(newArr,'start', startVal)
    else if (endVal !== '') newArr = filter(newArr,'end', endVal)

  for (const item of newArr) {
    const newItem = getStudentItem(item)
    tbody.append(newItem)
  }

}

document.getElementById('filter-form').addEventListener('submit', function(e) {
  e.preventDefault()
  filterRender(studentsList)
  document.getElementById('filter-form').reset()
})


