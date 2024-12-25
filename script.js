const word = document.querySelector("#word")
const btn = document.querySelector("#button")
const result = document.querySelector("#res")
btn.addEventListener("click", (e) => {
    e.preventDefault();
    getword(word.value);
})
const getword = async (data) => {
   try{
        result.innerHTML=`Fetching Data....`
    const Api = `https://api.dictionaryapi.dev/api/v2/entries/en/${data}`;
    const res = await fetch(Api);
    const value = await res.json();
    let def=value[0].meanings[0].definitions[0]
    result.innerHTML = `<h2><strong>Word:</strong> ${value[0].word}</h2>
       <p class="part">${value[0].meanings[0].partOfSpeech} </p>
    <p><strong>Meaning:</strong>${value[0].meanings[0].definitions[0].definition}</p>
            <p><strong>Example:-</strong>${value[0].meanings[0].definitions[0].example === undefined?"Example Not Found":value[0].meanings[0].definitions[0].example}</p> 
            <p><strong>Antonyms</strong></p>`
            console.log(def)
            if (def.antonyms.length !== 0) {
                for(let i=0;i<def.antonyms.length;i++)
                    {
                        result.innerHTML=result.innerHTML+`<li>${def.antonyms[i]}</li>`
                    }
    
            }
            else
            {
                result.innerHTML=result.innerHTML+`<span>Not Found</span>`
            } 

            result.innerHTML=result.innerHTML+`<div><a href=${value[0].sourceUrls} target="_blank">Read More</a></div>`;
        }catch(error)
        {
            // console.log(error)
            result.innerHTML=`<p>Sorry,The word couldnot be found</p>`
        }  
        
}