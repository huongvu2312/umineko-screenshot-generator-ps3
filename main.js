var left = "";
var center = "";
var right = "";
var bg = "";

var metaLeft = "";
var metaCenter = "";
var metaRight = "";

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const allSections = document.querySelectorAll('.section');
        allSections.forEach((sec) => sec.classList.remove('active'));
        section.classList.add('active');

        const allButtons = document.querySelectorAll('.button');
        allButtons.forEach((btn) => btn.classList.remove('activeButton'));
        const button = document.getElementById(sectionId + "Button");
        button.classList.add('activeButton');
    }
}

function load_thumbnails(data) {
    let thumbnail = [];

    for (const key in data) {
        if (data.hasOwnProperty(key) && Array.isArray(data[key]) && data[key].length > 0) {
            const firstImagePath = data[key][0].thumbnail;
            console.log(firstImagePath)
            thumbnail.push([key, firstImagePath]);
        }
    }

    return thumbnail
}

function load_images(key, position, id) {

    const imagesContainer = document.getElementById(id);

    while (imagesContainer.firstChild) {
        imagesContainer.removeChild(imagesContainer.firstChild);
    }

    let currentSprite = spriteMap[key];

    for (let i = 0; i < currentSprite.length; i++) {

        const imgElement = document.createElement("img");
        let selected;
        let targetSprite;

        imgElement.src = currentSprite[i].thumbnail

        imgElement.style.objectFit = "cover";
        imgElement.style.objectPosition = "center center";
        imgElement.style.width = "100px";
        imgElement.style.height = "100px";
        imgElement.style.margin = "5px";
        imgElement.style.border = "2px solid"
        imgElement.onclick = function() {
            switch (position) {
                case "left":
                    left = currentSprite[i].sprite;
                    selected = document.getElementById("selectedLeftSprite");
                    targetSprite = currentSprite[i].thumbnail;
                    break;
                case "center":
                    center = currentSprite[i].sprite;
                    selected = document.getElementById("selectedCenterSprite");
                    targetSprite = currentSprite[i].thumbnail;
                    break;
                case "right":
                    right = currentSprite[i].sprite;
                    selected = document.getElementById("selectedRightSprite");
                    targetSprite = currentSprite[i].thumbnail;
                    break;
                case "metaWorldLeft":
                    metaLeft = currentSprite[i].sprite;
                    selected = document.getElementById("selectedMetaLeftSprite");
                    targetSprite = currentSprite[i].thumbnail;
                    break;
                case "metaWorldCenter":
                    metaCenter = currentSprite[i].sprite;
                    selected = document.getElementById("selectedMetaCenterSprite");
                    targetSprite = currentSprite[i].thumbnail;
                    break;
                case "metaWorldRight":
                    metaRight = currentSprite[i].sprite;
                    selected = document.getElementById("selectedMetaRightSprite");
                    targetSprite = currentSprite[i].thumbnail;
                    break;
            }
            if (selected) {
                selected.src = targetSprite;
            }
        }

        imagesContainer.appendChild(imgElement);
    }
}


function createThumbnails(map, position, id, imageId) {
    const thumbnailsContainer = document.getElementById(id);
    const imageContainer = document.getElementById(imageId);

    let sprites = load_thumbnails(map)

    for (let i = 0; i < sprites.length; i++) {
        const sprite = sprites[i];
        const spriteName = sprite[0];
        const spritePath = sprite[1];

        const imgElement = document.createElement("img");

        imgElement.src = spritePath;

        imgElement.style.objectFit = "cover";
        imgElement.style.objectPosition = "center center";
        imgElement.style.width = "100px";
        imgElement.style.height = "100px";
        imgElement.style.margin = "5px";
        imgElement.style.border = "2px solid"

        imgElement.onclick = function () {
            load_images(spriteName, position, imageId)
        }

        thumbnailsContainer.appendChild(imgElement);
    }

    let selected;

    const imgElement = document.createElement("img");
    imgElement.src = "";
    imgElement.style.objectFit = "cover";
    imgElement.style.objectPosition = "center center";
    imgElement.style.width = "100px";
    imgElement.style.height = "100px";
    imgElement.style.margin = "5px";
    imgElement.style.border = "2px solid"
    imgElement.onclick = function() {
        switch (position) {
            case "left":
                left = "";
                selected = document.getElementById("selectedLeftSprite");
                selected.src = "";
                break;
            case "center":
                center = "";
                selected = document.getElementById("selectedCenterSprite");
                selected.src = "";
                break;
            case "right":
                right = "";
                selected = document.getElementById("selectedRightSprite");
                selected.src = "";
                break;
            case "metaWorldLeft":
                metaLeft = "";
                selected = document.getElementById("selectedMetaLeftSprite");
                selected.src = "";
                break;
            case "metaWorldCenter":
                metaCenter = "";
                selected = document.getElementById("selectedMetaCenterSprite");
                selected.src = "";
                break;
            case "metaWorldRight":
                metaRight = "";
                selected = document.getElementById("selectedMetaRightSprite");
                selected.src = "";
                break;
        }
        while (imageContainer.firstChild) {
            imageContainer.removeChild(imageContainer.firstChild);
        }
    }

    thumbnailsContainer.appendChild(imgElement);
}

function loadBackgrounds() {
    const backgroundsContainer = document.getElementById("backgroundsContainer");

    for (let i = 0; i < backgroundList.length; i++) {
        const backgroundMain = backgroundList[i];

        const background = backgroundMain.thumbnail

        const imgElement = document.createElement("img");

        imgElement.src = background;

        imgElement.style.objectFit = "cover";
        imgElement.style.objectPosition = "center center";
        imgElement.style.maxWidth = "300px";
        imgElement.style.maxHeight = "300px";
        imgElement.style.margin = "5px";
        imgElement.style.border = "2px solid"
        imgElement.onclick = function() {
            bg = backgroundMain.background
            const selected = document.getElementById("selectedBackground");
            selected.src = background
        }

        backgroundsContainer.appendChild(imgElement);
    }
}

function generate() {
    const textOverlay = document.getElementById("text-overlay");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const background = new Image();
    background.src = bg
    const leftImage = new Image();
    leftImage.src = left
    const rightImage = new Image();
    rightImage.src = right
    const centerImage = new Image();
    centerImage.src = center

    const metaLeftImage = new Image();
    metaLeftImage.src = metaLeft
    const metaRightImage = new Image();
    metaRightImage.src = metaRight
    const metaCenterImage = new Image();
    metaCenterImage.src = metaCenter

    let font = new FontFace('SazanamiGothic', 'url(./assets/font/sazanami-gothic.ttf)');
    font.load().then(function(loaded_face) {
        document.fonts.add(loaded_face);
    }).catch(function(error) {
        console.log(error)
    });

    const metaOverlayPath = "./assets/metaworld/hana1.webp"

    const metaOverlay = new Image();
    metaOverlay.src = metaOverlayPath

    Promise.all([
            loadImageAsync(bg),
            loadImageAsync(left),
            loadImageAsync(center),
            loadImageAsync(right),
            loadImageAsync(metaLeft),
            loadImageAsync(metaCenter),
            loadImageAsync(metaRight),
            loadImageAsync(metaOverlayPath),
        ]
    )
        .then(([bgImage, leftImage, centerImage, rightImage, metaLeftImage, metaCenterImage, metaRightImage, metaOverlay]) => {
            ctx.filter = "brightness(55%)";

            let meta = false
            const scaleFactor = 1.2;

            if (metaLeftImage || metaRightImage || metaCenterImage) {
                meta = true
            }

            if (meta) {
                ctx.filter = "brightness(30%)";
            }

            ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

            if (leftImage) {
                let adder = 400;
                const leftImageWidth = leftImage.width * scaleFactor;
                const leftImageHeight = leftImage.height * scaleFactor;
                if (leftImage.width > 500) {
                    adder = 300;
                }
                else if (leftImage.width < 400) {
                    adder = 425;
                }
                const leftImageX = canvas.width - leftImageWidth - adder;
                const leftImageY = canvas.height - leftImageHeight + 60;
                ctx.drawImage(leftImage, leftImageX, leftImageY, leftImageWidth, leftImageHeight);
            }

            if (rightImage) {
                const rightImageWidth = rightImage.width * scaleFactor;
                const rightImageHeight = rightImage.height * scaleFactor;
                let adder = 150;
                if (rightImageWidth < 500) {
                    adder = 50;
                }
                //const rightImageX = (canvas.width - rightImageWidth) + adder;
                const rightImageX = canvas.width - rightImageWidth / 2 - 170
                const rightImageY = canvas.height - rightImageHeight + 50;
                ctx.drawImage(rightImage, rightImageX, rightImageY, rightImageWidth, rightImageHeight);
            }

            if (centerImage) {
                const centerImageWidth = centerImage.width * scaleFactor;
                const centerImageHeight = centerImage.height * scaleFactor;
                const centerImageX = canvas.width / 2 - centerImageWidth / 2;
                const centerImageY = canvas.height - centerImageHeight + 70;
                ctx.drawImage(centerImage, centerImageX, centerImageY, centerImageWidth, centerImageHeight);
            }

            if (meta) {
                ctx.filter = "brightness(55%)";
                ctx.drawImage(metaOverlay, 0, 0, canvas.width, canvas.height);
            }

            if (metaLeftImage) {
                const metaLeftImageWidth = metaLeftImage.width * scaleFactor;
                const metaLeftImageHeight = metaLeftImage.height * scaleFactor;
                const metaLeftImageX = canvas.width - metaLeftImageWidth - 400;
                const metaLeftImageY = canvas.height - metaLeftImageHeight + 60;
                ctx.drawImage(metaLeftImage, metaLeftImageX, metaLeftImageY, metaLeftImageWidth, metaLeftImageHeight);
            }

            if (metaRightImage) {
                const metaRightImageWidth = metaRightImage.width * scaleFactor;
                const metaRightImageHeight = metaRightImage.height * scaleFactor;
                const metaRightImageX = canvas.width - metaRightImageWidth / 2 - 170
                const metaRightImageY = canvas.height - metaRightImageHeight + 50;
                ctx.drawImage(metaRightImage, metaRightImageX, metaRightImageY, metaRightImageWidth, metaRightImageHeight);
            }

            if (metaCenterImage) {
                const metaCenterImageWidth = metaCenterImage.width * scaleFactor;
                const metaCenterImageHeight = metaCenterImage.height * scaleFactor;
                const metaCenterImageX = canvas.width / 2 - metaCenterImageWidth / 2;
                const metaCenterImageY = canvas.height - metaCenterImageHeight + 70;
                ctx.drawImage(metaCenterImage, metaCenterImageX, metaCenterImageY, metaCenterImageWidth, metaCenterImageHeight);
            }

            ctx.globalAlpha = 1;
            ctx.filter = "none";
            ctx.font = "26px SazanamiGothic";

            const textX = 50;
            const textY = 70;
            const maxTextWidth = 750;
            const lineHeight = 40;
            const text = document.getElementById("text").value;
            ctx.textShadow = "2px 2px #000000";
            wrapText(ctx, text, textX, textY, maxTextWidth, lineHeight);
            const dataURL = ctx.toDataURL('image/png');
            const downloadLink = document.createElement("a");
            downloadLink.href = dataURL;
            downloadLink.download = "image.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        })
        .catch(error => {
            console.log(error);
        });

}

function loadImageAsync(url) {
    return new Promise((resolve, reject) => {
        if (url !== "") {
            const image = new Image();
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = url;
        } else {
            resolve(null);
        }
    });
}
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const colorCodes = {
        red: "#ff0000",
        blue: "#5decff",
        golden: "#ffcc00",
    };

    const regex = /\[(\w+)\](.*?)\[\/\w+\]|([^\[\n]+)|(\n)/g;
    let match;
    let currentX = x;
    let currentY = y;

    while ((match = regex.exec(text)) !== null) {
        const [fullMatch, color, content, plainText, newLine] = match;

        if (newLine) {
            currentY += lineHeight;
            currentX = x;
        } else if (color) {
            const textColor = colorCodes[color] || "white";
            const words = content.split(" ");
            let line = "";

            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + " ";
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;

                if (currentX + testWidth > x + maxWidth) {
                    ctx.fillStyle = textColor;
                    ctx.fillText(line, currentX, currentY);
                    currentY += lineHeight;
                    line = words[i] + " ";
                    currentX = x;
                } else {
                    line = testLine;
                }
            }

            ctx.fillStyle = textColor;
            ctx.fillText(line, currentX, currentY);

            const lineMetrics = ctx.measureText(line);
            currentX += lineMetrics.width - ctx.measureText(" ").width;
        } else if (plainText) {
            const words = plainText.split(" ");
            let line = "";

            for (let i = 0; i < words.length; i++) {
                const testLine = line + words[i] + " ";
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;

                if (currentX + testWidth > x + maxWidth) {
                    ctx.fillStyle = "white";
                    ctx.fillText(line, currentX, currentY);
                    currentY += lineHeight;
                    line = words[i] + " ";
                    currentX = x;
                } else {
                    line = testLine;
                }
            }

            ctx.fillStyle = "white";
            ctx.fillText(line, currentX, currentY);

            const lineMetrics = ctx.measureText(line);
            currentX += lineMetrics.width - ctx.measureText(" ").width;
        }
    }
}

window.addEventListener('load', function () {
    document.getElementById('loadingScreen').style.display = 'none';
});