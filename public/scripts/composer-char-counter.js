$(document).ready(function() {
  // --- our code goes here ---
  const area = document.getElementById("tweet-text");
  const counter = document.getElementsByName("counter")[0];
  let number = 140
  area.addEventListener("input",(event) => {
    number = 140 - area.textLength
    counter.textContent = number;
    counter.style.color = (number > 0 ? "#545149" : "red");
  })

  // $('text').on('',()=>{
    
  // })
});
