fetch('http://localhost:4545/todos') 
  .then(response => response.json())
  .then(data => {
    console.log(data); 
})
.catch(error => console.error('Xatolik yuz berdi:', error));