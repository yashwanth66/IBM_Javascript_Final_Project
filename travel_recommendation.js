const fetchurl = "travel_recommendation_api.json";
let fetchedData = {};
function fetchData(){
fetch(fetchurl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data1 => {
        fetchedData = data1;
        console.log(fetchedData)
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}
fetchData();
 const search_button = document.getElementById('nav-search');
 const clear_button = document.getElementById('nav-clear');
 const input = document.getElementById('nav-input');
 const result = document.getElementById('result');
 
 search_button.addEventListener('click', function(){
    result.innerHTML = "";
    let value = input.value.toLowerCase();
    const arr = ['country','beach','temple','countries','temples','beaches'];
    if(arr.includes(value)){
        let temp="";
        if(value=='country'){
            temp='countries';
        }else if(value == 'beach'){
            temp = 'beaches';
        }else if(value == 'temple'){
            temp = 'temples';
        }else{
            temp = value;
        }
        let item=fetchedData[temp];
        item.forEach((data)=>{
            let name = ""
            let imgurl = ""
            let desc = ""
            if(temp == 'countries'){
                name = data.cities[0].name
               imgurl = "./images/" + data.cities[0].imageUrl
               desc = data.cities[0].description 
            }else{
                name = data.name
               imgurl = "./images/"+data.imageUrl;
               desc = data.description;
            }
            const resultCards = document.createElement('div');
            console.log(imgurl+"\n"+name+"\n"+desc)
            resultCards.classList.add('result-cards');
            const img = document.createElement('img');
            const n = document.createElement('h3');
            const p = document.createElement('p');
            img.setAttribute('src',imgurl)
            img.classList.add('result-img');
            n.classList.add('result-title');
            n.innerText = name;
            p.innerText = desc;
            p.classList.add('result-description');
            resultCards.appendChild(img);
            resultCards.appendChild(n);
            resultCards.appendChild(p);
            result.appendChild(resultCards);
        })
       // console.log(item);
    }else{
        result.innerHTML = `<h2 style="color:white">Match Not Found</h2>`
    }
    
    
 })
 clear_button.addEventListener('click', function(){
    input.value = "";
    result.innerHTML = "";

 })