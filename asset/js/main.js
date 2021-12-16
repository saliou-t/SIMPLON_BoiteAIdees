const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODg4MTg4OCwiZXhwIjoxOTU0NDU3ODg4fQ.8kYZB_B7tP4HnVseFpg_KLtyI-ucHsksFcWU54PwEW4'
const SUPABASE_URL = "https://tenjvxuzssuicdopqfau.supabase.co/rest/v1/Boite_a_idee"


var idees = [
    {
        'id' :1,
        'idee' :  'Une première idée',
        'text' :  'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        'status': false
    },
    {
        'id' :2,
        'idee' :  'Une deuxième idée',
        'text' :  'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        'status': true
    },
    {
        'id' :3,
        'idee' :  'Une troisième idée',
        'text' :  'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        'status': true
    },
    {
        'id' :4,
        'idee' :  'Une quatrième idée',
        'text' :  'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        'status': false
    },
    {
        'id' :5,
        'idee' :  'Une cinquième idée',
        'text' :  'Lorem ipsum dolor sit amet consectetur adipisicing elit',
        'status': true
    }
]

let container = document.querySelector(".container");

// for(let item in idees){
//     CreateCard(item)
// }

let btnSubmit = document.getElementById('submit');
btnSubmit.addEventListener('click', ()=>{
    let InputSujetContent = document.getElementById('sujet').value;
    let InputTextContent = document.getElementById('text').value;

    document.querySelector('.formulaire').reset()
    let newObjet = 
        {
            sujet: InputSujetContent,
            description: InputTextContent,
            etat: false
        }
    
    console.log(JSON.stringify(newObjet));
    idees.push(newObjet)

    //Affichage de l'idée reçu

   CreateCard(newObjet)

    fetch(SUPABASE_URL,{
        method: "POST",
        headers: {
            apikey: SUPABASE_KEY,
            'Content-Type': "application/json", 
        },
        body: JSON.stringify(newObjet),
    })
})

function ValiderIdee(id){
    const apiUrl = `https://tenjvxuzssuicdopqfau.supabase.co/rest/v1/Boite_a_idee?id=eq.${id}`
    
    // let UpdateIdee = 
    // {
    //     etat: true
    // }
    
    fetch(apiUrl,{
       method: "PATCH",
       headers:{
        apikey: SUPABASE_KEY,
        'Content-Type': "application/json", 
        Prefer: 'return=representation',
        'Authorization' : `Bearer ${SUPABASE_KEY}`
       },
       body: JSON.stringify({etat: true})
   })
}

function SupprimerIdee(id){    
    let  confirmation = window.confirm('Confirmer la suppression définitive ?')

    if(confirmation){
        let CartASupprimer = document.querySelector(`.card-${id}`)
        CartASupprimer.remove()
        const ApiDeleteUrl = `https://tenjvxuzssuicdopqfau.supabase.co/rest/v1/Boite_a_idee?id=eq.${id}`
       
        fetch(ApiDeleteUrl,{
            method: "DELETE",
            headers:{
             apikey: SUPABASE_KEY,
             'Authorization' : `Bearer ${SUPABASE_KEY}`
            }
        })
    }    
}

function CreateCard(donnees){
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('animate__animated');
    card.classList.add('animate__bounce');
    card.classList.add('animate__swing');
    card.classList.add(`card-${donnees.id}`);
    card.style.width ='18rem';
    card.style.display ='inline-block'
    card.style.margin = '10px 10px'
    card.style.padding = '10px 10px'

    if(donnees.etat == true){
        card.classList.add('true')
    }
 
    let cartBody = document.createElement('div');
    cartBody.classList.add('cart-body');
    
    let btn1 = document.createElement('a')
    btn1.innerHTML = 'Approuver'
    btn1.classList.add('btn')
     btn1.style.margin = '20px'
    btn1.classList.add('btn-success')
    
    btn1.addEventListener('click', (e)=>{
        ValiderIdee(donnees.id)
        card.style.border = "3px solid #198754"
    })
 
    let btn2 = document.createElement('a')
    btn2.innerHTML = 'Rejeter'
    btn2.classList.add('btn')
    btn2.classList.add('btn-danger')
    
    btn2.addEventListener('click', (e)=>{
        SupprimerIdee(donnees.id)

    })
    
    let titre = document.createElement('h5')
    titre.classList.add('card-title')
    titre.innerHTML = donnees.sujet;
 
    let text = document.createElement('p')
    text.innerHTML = donnees.description;
    text.classList.add('card-text')
 
    cartBody.appendChild(titre)
    cartBody.appendChild(text)
    cartBody.appendChild(btn1)
    cartBody.appendChild(btn2)
    card.appendChild(cartBody)
 
    container.appendChild(card);
}

let inputTextArea  = document.getElementById('text');


const max = 50;


inputTextArea.addEventListener('input', (e) =>{
    document.querySelector('#longeurText').innerHTML = inputTextArea.value.length
    inputTextArea.maxLength = max;
    if(inputTextArea.value.length === max){
        inputTextArea.style.backgroundColor = 'rgba(255,0,0,0.4)'
    }else{
        inputTextArea.style.backgroundColor = 'white'
    }
})
window.addEventListener('load', (e)=>{
    fetch(SUPABASE_URL, {
        method: "GET",
        headers:{
            apikey: SUPABASE_KEY,
        }
    })
    .then((response) =>response.json())
    .then((idees) =>{
      for( let idee in idees){
          CreateCard(idees[idee])
      }
    })
    
})






