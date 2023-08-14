let langOption=document.querySelectorAll('select');
let fromtext=document.querySelector('.fromtext');
let transText=document.querySelector('.toTranslate');
let fromVoice=document.querySelector('.from');
let toVoice=document.querySelector('.to');
let copybtn=document.querySelector('.bx-copy');
let countvalue=document.querySelector('.code_length');
let exchangelang=document.querySelector('.bx-transfer');
langOption.forEach((get,con) =>{
    for(let countryCode in language){
        //selecting english as a default from the option to hindi as a default as a option
        let selected;
        if(con==0 && countryCode=="en-GB"){ //country code for english
            selected="selected";
        }
        else if(con==1 && countryCode=="hi-IN"){ // country code for hindi
            selected="selected";
        }
        //below line is for fetching all the languages from calling language.js file where we have stored diffrent options of language
        let option= `<option value="${countryCode}" ${selected}>${language[countryCode]} </option>`;
        get.insertAdjacentHTML('beforeend',option);// this line is for adding options inside select tag
    }
}) 

fromtext.addEventListener('input',function() {
    let content=fromtext.value;
    fromContent=langOption[0].value;
    transContent=langOption[1].value;
    let transLink= `https://api.mymemory.translated.net/get?q=${content}&langpair=${ fromContent}|${transContent}`;
   
   

    fetch(transLink).then(translate => translate.json()).then(data =>{
        transText.value=data.responseData.translatedText;
    })

}
)

fromVoice.addEventListener('click',function() {
     let fromtalk;
     fromtalk= new SpeechSynthesisUtterance(fromtext.value);
     fromtalk.lang=langOption[0].value;
     speechSynthesis.speak(fromtalk)

})

toVoice.addEventListener('click',function(){
    let fromtalk;
    fromtalk= new SpeechSynthesisUtterance( transText.value);
    fromtalk.lang=langOption[1].value;
    speechSynthesis.speak(fromtalk)
})

copybtn.addEventListener('click',function(){
    navigator.clipboard.writeText(transText.value);
})

fromtext.addEventListener('keyup',function(){
 countvalue.innerHTML=`${fromtext.value.length}/5000`;
})

exchangelang.addEventListener('click',function(){
    let temptext=fromtext.value;
    fromtext.value=transText.value;
    transText.value=temptext;

    let translang=langOption[0].value;
    langOption[0].value=langOption[1].value;
    langOption[1].value=translang;
})