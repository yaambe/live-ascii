//const density = 'N@#W$9876543210?!abc;:+=-,.      ';
const density = '       ,.-=+:;cba?!0123456789$W#@N';
let video;
let asciiDiv;

function setup() {
    noCanvas();
    video = createCapture(VIDEO);
    //video.size(150, 100); 
    video.size(96, 72);  // Lower resolution for faster processing
    video.hide();  // Hide the original video element
    asciiDiv = createDiv('');
}
function draw() {
    video.loadPixels();
    let asciiImage = '';

    for (let j = 0; j < video.height; j++) {
        let row = '';
        for (let i = 0; i < video.width; i++) {
            const pixelIndex = (i + j * video.width) * 4;
            const r = video.pixels[pixelIndex + 0];
            const g = video.pixels[pixelIndex + 1];
            const b = video.pixels[pixelIndex + 2];
            const avg = (r + g + b) / 3;
            const len = density.length;
            //const charIndex = floor(map(avg, 0, 255, len - 1, 0));
            const charIndex = floor(map(avg, 0, 255, 0, len-1));

            const c = density.charAt(charIndex);
            if (c == ' ') {
                row += '&nbsp;';
            } else {
                row += c;
            }
        }
        row += '<br>';
        asciiImage += row; 
    }
    asciiDiv.html(asciiImage);
}
