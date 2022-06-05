const xhr = new XMLHttpRequest();
const url = 'http://localhost:3000';

xhr.addEventListener('readystatechange', () => {
  if( xhr.readyState === 4 && xhr.status === 200) {
    if (xhr.responseText.slice(0, 1) === '[') {
      setButtons(xhr.responseText);
    }
  }
});

window.addEventListener('load', () => {
  send('/getlabels');
});

function send(s)
{
  xhr.open( 'get', url + s);
  xhr.send();
}

function setButtons(s)
{
  let labels = eval(s);
  setButton('#b00', labels[0], 'send("/button/0")');
  setButton('#b01', labels[1], 'send("/button/1")');
  setButton('#b02', labels[2], 'send("/button/2")');
  setButton('#b10', labels[3], 'send("/button/3")');
  setButton('#b11', labels[4], 'send("/button/4")');
  setButton('#b12', labels[5], 'send("/button/5")');
  setButton('#b20', labels[6], 'send("/button/6")');
  setButton('#b21', labels[7], 'send("/button/7")');
  setButton('#b22', labels[8], 'send("/button/8")');
}

function setButton(id, label, onclick)
{
  let elem = document.querySelector(id);
  elem.innerText = label;
  if (label !== '') {
    elem.setAttribute('onclick', onclick);
  }
}
