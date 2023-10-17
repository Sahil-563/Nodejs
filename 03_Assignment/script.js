var navlinks = document.getElementById('navLinks');

document.getElementById('close').addEventListener('click',function(e) {
    navlinks.style.right="-250px";
    navlinks.classList.toggle("show")

})
document.getElementById('lines').addEventListener('click',function(e) {
    navlinks.style.right="0px";
    navlinks.classList.toggle("show")
})


const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
let isdragging = false,startX,startScrolleft;
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
arrowBtns.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        console.log(btn.id);
        carousel.scrollLeft += btn.id==="left"? -firstCardWidth : firstCardWidth;
    })
})
const dragStart=(e)=>{
    isdragging=true;
    carousel.classList.add("dragging");
    startX=e.pageX;
    startScrolleft=carousel.scrollLeft
}
const dragging=(e)=>{
    if(!isdragging) return;
    carousel.scrollLeft=startScrolleft-(e.pageX-startX);
}
const dragStop=()=>{
    isdragging=false;
    carousel.classList.remove("dragging");
}
carousel.addEventListener("mousedown",dragStart);
carousel.addEventListener("mousemove",dragging);
carousel.addEventListener("mouseup",dragStop);


