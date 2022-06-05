const xhr = new XMLHttpRequest();
const url = 'http://localhost:3000';

xhr.addEventListener('readystatechange', () => {
  if( xhr.readyState === 4 && xhr.status === 200) {
    if (xhr.responseText.slice(0, 1) === '[') {
      setLabels(xhr.responseText);
    }
  }
});

window.addEventListener('load', () => {
  send('/getlabels');
  document.querySelector("#b00").setAttribute('onclick', 'send("/button/0")');
  document.querySelector("#b01").setAttribute('onclick', 'send("/button/1")');
  document.querySelector("#b02").setAttribute('onclick', 'send("/button/2")');
  document.querySelector("#b10").setAttribute('onclick', 'send("/button/3")');
  document.querySelector("#b11").setAttribute('onclick', 'send("/button/4")');
  document.querySelector("#b12").setAttribute('onclick', 'send("/button/5")');
  document.querySelector("#b20").setAttribute('onclick', 'send("/button/6")');
  document.querySelector("#b21").setAttribute('onclick', 'send("/button/7")');
  document.querySelector("#b22").setAttribute('onclick', 'send("/button/8")');
});

function send(s)
{
  xhr.open( 'get', url + s);
  xhr.send();
}

function setLabels(s)
{
  let labels = eval(s);
  document.querySelector("#b00").innerText = labels[0];
  document.querySelector("#b01").innerText = labels[1];
  document.querySelector("#b02").innerText = labels[2];
  document.querySelector("#b10").innerText = labels[3];
  document.querySelector("#b11").innerText = labels[4];
  document.querySelector("#b12").innerText = labels[5];
  document.querySelector("#b20").innerText = labels[6];
  document.querySelector("#b21").innerText = labels[7];
  document.querySelector("#b22").innerText = labels[8];
}

