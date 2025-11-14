    let sliderImages = ['images/slider1.jpg','images/slider2.jpg','images/slider3.jpg','images/slider4.jpg','images/slider5.jpg'];

    let slider = document.getElementById('slider');
    let currentIndex = 0;

    function updateImage(){
        slider.src = sliderImages[currentIndex];
    }

    document.getElementById('next').addEventListener('click', function(){
            currentIndex++;
            // console.log('yes');
            
            if(currentIndex >= sliderImages.length){
                currentIndex = 0;
            }
            updateImage();
    })


    document.getElementById('pre').addEventListener('click', function(){
        currentIndex--;
        // console.log('yes');
        
        if(currentIndex < 0 ){
            currentIndex = sliderImages.length - 1;
            // console.log(currentIndex);
        }
        updateImage();
    })


