async function loadTicker(){

const r=await fetch("data/police.json")
const data=await r.json()

const list=data.map(x=>"🚓 "+x.title)

document.getElementById("ticker")
.innerText=list.join(" • ")

}

loadTicker()
