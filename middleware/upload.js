const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        if (file.fieldname == "photo_url") {
            cb(null, "static/film_photo")
        } else {
            cb(null, "static/film_video")
        }

    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

module.exports = upload