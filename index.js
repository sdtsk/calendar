(function(selector) {
    let arr = []

  let calendar = document.querySelector(selector)
  let dates = calendar.querySelector('.calendar_body')
  let header = calendar.querySelector('.calendar_header')


  let currentYear = getNowYear()
  let currentMonth = getNowMonth()
  let currentDay = getNowDay()
  draw(year, month, dates)


  function draw(year, month, dates) {
    let arr = []

    const firstDayOfMonth = 1
    let lastDayOfMonth = getLastDayOfMonth(year, month)
    let shiftElemsNum = getShiftElemsNum(year, month)
    let popElemsNum = getPopElemsNum(year, month)
    arr = createArr(firstDayOfMonth, lastDayOfMonth)
    arr = shiftElems(shiftElemsNum, arr)
    arr = popElems(popElemsNum, arr)
    arr = chunkArr(7, arr)  
    createTable(arr, dates)  

    createHeader(header)
    
    nextMonth()
    prevMonth()

  }


  //получаем теукщий год, месяц и число
  function getNowYear() {
    let today = new Date()
    return year = today.getFullYear()
  }

  function getNowMonth() {
    let today = new Date()
    return month = today.getMonth()
  }

  function getNowDay() {
    let today = new Date()
    return date = today.getDate()
  }


  //функция стрелочки переключения на следующий месяц
  function nextMonth() {

    //создаём стрелку вперёд
    let nextArrow = document.createElement('a')
    nextArrow.className = 'calendar_header-next'
    nextArrow.href = '#'
    header.append(nextArrow)
    let nextArrowItem = document.createElement('img')
    nextArrowItem.className = 'nextarrow'
    nextArrowItem.src = '/calendar/images/arrow.png'
    nextArrow.append(nextArrowItem)
    
    let monthField = calendar.querySelector('.calendar_header-month')
    let yearField = calendar.querySelector('.calendar_header-year')

    nextArrow.addEventListener('click', () => {
      
      month++;

      if (month > 11) {
        year++
        month = 0
      }

      createMonthName(month)
      monthField.innerHTML = monthName;
      yearField.innerHTML = year;

      draw(year, month, dates)

    });

  }


  //функция стрелочки переключения на предыдущий месяц
  function prevMonth() {

    //создаём стрелку назад
    let prevArrow = document.createElement('a')
    prevArrow.className = 'calendar_header-prev'
    prevArrow.href = '#'
    header.append(prevArrow)
    let prevArrowItem = document.createElement('img')
    prevArrowItem.className = 'prevarrow'
    prevArrowItem.src = '/calendar/images/arrow.png' 
    prevArrow.append(prevArrowItem)


    let monthField = calendar.querySelector('.calendar_header-month')
    let yearField = calendar.querySelector('.calendar_header-year')

    prevArrow.addEventListener('click', () => {
      month--;

      if (month < 0) {
        year--
        month = 11
      }

      createMonthName(month)
      monthField.innerHTML = monthName;
      yearField.innerHTML = year;
      
      draw(year, month, dates)

    });

  }


  //создаём header
  function createHeader(header) {

    createMonthName(month)

    header.innerHTML = ''

    let calendarHeaderWrapper = document.createElement('div')
    calendarHeaderWrapper.className = 'calendar_header-wrapper'
    header.append(calendarHeaderWrapper)

    let calendarHeaderMonth = document.createElement('div')
    let calendarHeaderYear = document.createElement('div')
    calendarHeaderMonth.className = 'calendar_header-month'
    calendarHeaderYear.className = 'calendar_header-year'
    calendarHeaderWrapper.append(calendarHeaderMonth, calendarHeaderYear)

    calendarHeaderMonth.innerHTML = monthName
    calendarHeaderYear.innerHTML = year

  }


  //функция создаёт имя месяца на русском языке
  function createMonthName(month) {

    switch (month) {
      case 0:
        monthName = 'Январь'
        break
      case 1:
        monthName = 'Февраль'
        break
      case 2:
        monthName = 'Март'
        break
      case 3:
        monthName = 'Апрель'
        break
      case 4:
        monthName = 'Май'
        break
      case 5:
        monthName = 'Июнь'
        break
      case 6:
        monthName = 'Июль'
        break
      case 7:
        monthName = 'Август'
        break
      case 8:
        monthName = 'Сентябрь'
        break
      case 9:
        monthName = 'Октябрь'
        break
      case 10:
        monthName = 'Ноябрь'
        break
      case 11:
        monthName = 'Декабрь'
        break

    }
  }


  //создаём таблицу из массива arr внутри родителя parrents
  function createTable(arr, dates) {

    dates.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {

      let calendarBodyRow = document.createElement('ul')
      calendarBodyRow.className = 'calendar_body-row'
      dates.append(calendarBodyRow)

      for (let j = 0; j < arr[i].length; j++) {

        let calendarItem = document.createElement('div')
        
        if (arr[i][j] == currentDay && year == currentYear && month == currentMonth) {
          calendarItem.className = 'calendar_item active'
        } else {
          calendarItem.className = 'calendar_item'
        }
        calendarBodyRow.append(calendarItem)

        let calendarBodyDay = document.createElement('div')
        calendarBodyDay.className = 'calendar_body-day'
        calendarItem.append(calendarBodyDay)
        calendarBodyDay.innerHTML = arr[i][j]

      }
    }
  }

  //создаем массив чисел месяца от 1 до 28/29/30/31
  function createArr(firstDayOfMonth, lastDayOfMonth) {
    let arr = []
    let from = firstDayOfMonth
    let to = lastDayOfMonth

    for (let i = 0; i < to; i++) {
      arr[i] = from + i
    }
    return arr
  }

  //узнаём какое количество пропусков необходимо в начале месяца
  function getShiftElemsNum(year, month) {
    let date = new Date(year, month, 1)
    let weekday = date.getDay()

    if (weekday === 0) {
      return 6
    }

    return (weekday - 1)
  }

  //узнаём какое количество пропусков необходимо в конце месяца
  function getPopElemsNum(year, month) {
    let date = new Date(year, month + 1, 0)
    let weekday = date.getDay()

    if (weekday === 0) {
      return 0
    }

    return (7 - weekday)
  }

  //добавляем необходимое число пропусков num в начало массива arr
  function shiftElems(num, arr) {
    for (let i = 0; i < num; i++) {
      arr.unshift('')
    }
    return arr
  }

  //добавляем необходимое число пропусков num в конец массива arr
  function popElems(num, arr) {
    for (let i = 0; i < num; i++) {
      arr.push('')
    }
    return arr
  }

  //узнаём последний день в определенном месяце в определённом году
  function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0)
    return date.getDate()
  }

  function chunkArr(num, arr) {
    let newArr = []

    while (arr.length > 0)
      newArr.push(arr.splice(0, num))

    return newArr
  }

}('#calendar'));


