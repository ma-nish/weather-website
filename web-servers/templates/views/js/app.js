// document.write('<br>This is from JavaScript File');


// fetch('http://puzzle.mead.io/puzzle')
// .then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   })
// })




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#msg-1');
const message2 = document.querySelector('#msg-2');


weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const address = search.value; 
  message1.textContent = 'Loading...'
  message2.textContent = ''
  weatherInfo(address);
}); 



const weatherInfo = (address) => {
  if(!address){
    alert('Please provide a valid address.')
  }else{
    fetch(`http://localhost:3000/weather?address=${address}`)
    .then((response) => {
      response.json()
      .then((data) => {
    
        if(data.error){
          message1.textContent = data.error;
          message2.textContent = ''
        }else{
          message1.textContent = `Location: ${data.location}`;
          message2.textContent = `Location: ${data.forecast}`;
        }
      })
    })
  }
}  