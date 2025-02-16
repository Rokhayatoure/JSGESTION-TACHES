const slides = [
    { type: 'image', content: 'image/image1.jpg' },
    { type: 'image', content: 'image/image2.jpg' },
    { type: 'image', content: 'image/image3.jpg' },
]

let slideNum = 0

 const img = document.getElementById('slide')
// const spots = document.querySelectorAll('.spots')


// let img_src = img.src
// function renderSlide() {
//     img_src = slides[slideNum].content
//     img.src = img_src
// }

function changeSlide(move) {
    slideNum += move;

    if (slideNum >= slides.length)
        slideNum = 0;
    if (slideNum < 0)
        slideNum = slides.length - 1;
 document.getElementById("slide").src=slides[slideNum].content;

    
    // renderSlide();
}

setInterval(() => changeSlide(1), 3000);
setInterval("ChangeSlide(1)", 4000);

// spots.forEach(spot => {
//     spot.addEventListener('mouseover', ()=> {
//         spot.classList.add('cursor-pointer')
//     })

//     spot.addEventListener('mouseout', ()=> {
//         spot.classList.remove('cursor-pointer')
//     })
// })




// function ChangeSlideWithBouton(Sens)
// {
//     slideNum=slideNum + Sens ;
//     if(slideNum<0)
//         slideNum= slides.length-1;


// }