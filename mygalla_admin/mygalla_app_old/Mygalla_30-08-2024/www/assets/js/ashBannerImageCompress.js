/**
 * Resize a base 64 Image
 * @param {String} base64Str - The base64 string (must include MIME type)
 * @param {Number} MAX_WIDTH - The width of the image in pixels
 * @param {Number} MAX_HEIGHT - The height of the image in pixels
 */

var ash ="";

async function reduce_image_file_size(base64Str, MAX_WIDTH = 600, MAX_HEIGHT = 300) {
    let resized_base64 = await new Promise((resolve) => {
        let img = new Image()
        img.src = base64Str
        img.onload = () => {
            let canvas = document.createElement('canvas')
            let width = img.width
            let height = img.height

            // new ash code

            // console.log(height,width)

            x = height
            y = width

            if ( width > MAX_WIDTH ) {
                y = y - MAX_WIDTH ;
                y /= 2
            }
            if ( height > MAX_HEIGHT ) {
                x = x - MAX_HEIGHT ;
                x /= 2
            }

            if ( width <= MAX_WIDTH ) {
                y = MAX_WIDTH ;
            }
            if ( height <= MAX_HEIGHT ) {
                x = MAX_HEIGHT ;
            }

            // console.log("NH"+x,"NW"+y)

            height = MAX_HEIGHT
            width = MAX_WIDTH

            canvas.width = MAX_WIDTH
            canvas.height = MAX_HEIGHT

            // end ash code

            // old ash code

            // if (width > height) {
            //     if (width > MAX_WIDTH) {
            //         height *= MAX_WIDTH / width
            //         width = MAX_WIDTH
            //     }
            // } else {
            //     if (height > MAX_HEIGHT) {
            //         width *= MAX_HEIGHT / height
            //         height = MAX_HEIGHT
            //     }
            // }

            // canvas.width = width
            // canvas.height = height


            let ctx = canvas.getContext('2d')
            if ( x <= MAX_HEIGHT && y == MAX_WIDTH  ) {
                ctx.drawImage(img, 0, 0, width, height )
            } else {
                ctx.drawImage( img, y, x, width, height , 0 , 0 , width , height )
            }
            resolve(canvas.toDataURL("image/webp", 0.8))

            // console.log("H "+height ,"W "+width)
        }
    });
    return resized_base64;
}


async function image_to_base64(file) {
    let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.onerror = (error) => {
            console.log(error)
            alert('An Error occurred please try again, File might be corrupt');
        };
        fileReader.readAsDataURL(file);
    });
    return result_base64;
}

function image_compress_loading(s) {
    if(s) {
        $("#msg").html(`
            <div class="alert alert-warning">
                IMAGE COMPRESSION ON PROCESS....
            </div>
        `)
    } else {
        $("#msg").html('');
    }
    $("#file").val('');
}

async function process_image(file, min_image_size = 20 ) {
    image_compress_loading(true);
    const res = await image_to_base64(file);
    if (res) {
        const old_size = calc_image_size(res);
        if (old_size > min_image_size) {
            const resized = await reduce_image_file_size(res);
            const new_size = calc_image_size(resized)
            if(resized)
                image_compress_loading(false);
                // console.log('new_size=> ', new_size, 'KB');
                // console.log('old_size=> ', old_size, 'KB');
            return resized;
        } else {
            if(res)
                image_compress_loading(false);
            console.log('image already small enough')
            return res;
        }

    } else {
        console.log('return err')
        return null;
    }
}

async function preview_image() {
    const file = document.getElementById('file');
    const image = await process_image(file.files[0]);
    ash = image;
    document.getElementById('preview_img').src = ash;
}

function calc_image_size(image) {
    let y = 1;
    if (image.endsWith('==')) {
        y = 2
    }
    const x_size = (image.length * (3 / 4)) - y
    return Math.round(x_size / 1024)
}


// iamge check
var imgCheck = document.getElementById("file");
if(imgCheck) {
imgCheck.addEventListener("change", function () {
  var file = this.files[0];
  var img = new Image();

  img.onload = function () {
    
      width = this.width;
      height = this.height;

      if(width && height) {
        document.getElementById("submit").disabled = false;
        preview_image();
      }
      else {
        document.getElementById("submit").disabled = true;
        alert("IMAGE SIZE MUST BE 600px X 600px")
      }

    URL.revokeObjectURL(this.src);

    console.log(width);
    console.log(height);
  };

  var objectURL = URL.createObjectURL(file);

  img.src = objectURL;
});
}