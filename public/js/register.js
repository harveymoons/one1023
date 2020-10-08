import * as daum from "./lib/daumPostCode.js";

window.onload = function () {
    setDaumPostCode();
    setBirthDate();
    setJoinDate();
    setImagePreview();
};

function setDaumPostCode(){
    const layer = document.querySelector(".address-layer");
    document.querySelector("#btnSearch").addEventListener("click", function () {
        daum.getAddress(layer);
    });
};

function setBirthDate(){
    //birth year
    const date = new Date();
    const thisYear = date.getFullYear();

    date.setFullYear(thisYear - 120);
    const minimumYear = date.getFullYear();

    for (let i = minimumYear; i <= thisYear; i++) {
        
        const option = document.createElement("option");
        option.value = i;
        option.text = i;

        document.querySelector("[name=birthYear]").appendChild(option);
    }
    //birth month
    for (let i = 1; i <= 12; i++) {
        
        const option = document.createElement("option");
        option.value = i;
        option.text = i;

        document.querySelector("[name=birthMonth]").appendChild(option);
    }
    //birth day
    for (let i = 1; i <= 31; i++) {
        
        const option = document.createElement("option");
        option.value = i;
        option.text = i;

        document.querySelector("[name=birthDay]").appendChild(option);
    }
}

function setJoinDate(){
    //join year
    const openYear = 2015;
    const thisYear = Number(new Date().getFullYear());

    for (let i = openYear; i <= thisYear; i++) {
        
        const option = document.createElement("option");
        option.value = i;
        option.text = i;

        document.querySelector("[name=joinYear]").appendChild(option);
    }
    //join month
    for (let i = 1; i <= 12; i++) {
        
        const option = document.createElement("option");
        option.value = i;
        option.text = i;

        document.querySelector("[name=joinMonth]").appendChild(option);
    }
}

function setImagePreview(){

    const imageFile = document.querySelector("#imageFile");
    const imageContainer = document.querySelector("#imagePreview");
    const imagePreview = imageContainer.querySelector(".image-preview__real");
    const imageText = imageContainer.querySelector(".image-preview__text");

    imageFile.addEventListener("change", function(){
        
        const file = this.files[0];
        
        if (file) {
            
            const reader = new FileReader();
            
            imageText.style.display = "none";
            imagePreview.style.display = "block";

            reader.addEventListener("load", function(){
                imagePreview.setAttribute("src", this.result);
            });
            reader.readAsDataURL(file);

        } else {
            imageText.style.display = null;
            imagePreview.style.display = null;
        }
    });

    // delete image File
    document.querySelector("#btnDelete").addEventListener("click", function(){
        imageFile.value = null;
        imageText.style.display = null;
        imagePreview.style.display = null;
    });

    // endlarge image
    imagePreview.addEventListener("click", function(){

        const enlargeImage = document.getElementById("enlargeImage");
        const image = enlargeImage.querySelector("img");
        const myModal = new bootstrap.Modal(enlargeImage);
        const reader = new FileReader();

        reader.addEventListener("load", function(){
            image.setAttribute("src", this.result);
            image.style.width = "100%";
        });
        reader.readAsDataURL(imageFile.files[0]);
        
        myModal.show();
    });
}