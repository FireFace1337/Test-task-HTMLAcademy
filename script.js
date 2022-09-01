// Modal

const modalTrigger = document.querySelector('.btn');
const modal = document.querySelector('.modal');
const modalSend = document.querySelector('.btn__send');

modal.classList.add('hide');

modalTrigger.addEventListener('click', () => {
    modal.classList.add('show');
    modal.classList.remove('hide');
});

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
};

document.addEventListener('keydown', (event) => {
    if (event.code === "Escape" && modal.classList.contains('show')) {
        closeModal();
    }
});

// POST

const requestURL = 'https://jsonplaceholder.typicode.com/users';


let body = {
    name,
    email
  }


function sendRequest(method, url, body) {
  const headers = {
    'Content-Type': 'application/json'
  }

  return fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: headers
  }).then(response => {
    if (response.ok) {
      return response.json()
    } 

    return response.json().then(error => {
      const e = new Error('Что-то пошло не так')
      e.data = error
      throw e
    })
  })
}

const sendTrigger = document.querySelector('.btn__send');
sendTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    body.name = document.getElementById('name').value;
    body.email = document.getElementById('email').value;
    sendRequest('POST', requestURL, body)
        .then(() => {
            let div = document.createElement('div');
            div.className = 'inscription';
            div.innerHTML = "<h2>Данные успешно отправлены</h2>";
            document.getElementById('modal').append(div);
        })
        .catch(() => {
        let div = document.createElement('div');
        div.className = 'error';
        div.innerHTML = "<h2>При отправке возникла ошибка</h2>";
        document.getElementById('modal').append(div);
        })
});

