import ICSS from "./ICSS.js"


/**
 * @enum ICSSStatments
 * CSS Staments Names
 */
const ICSSStatments = {

    /** Charset CSS Statment */
    CHARSET: {
        
        /** Charset Key */
        KEY:'charset',

        /** Charset Block Delimiter */
        DELIMITER: ICSS.SEMICOLON,

    },

    /** Import CSS Statment */
    IMPORT: {
        
        /** Import Key */
        KEY:'import',

        /** Import Block Delimiter */
        DELIMITER: ICSS.SEMICOLON,

    },
    
    /** Media Query CSS Statment */
    MEDIA: {
        
        /** Media Key */
        KEY:'media',

        /** Media Block Delimiter */
        DELIMITER: ICSS.BLOCK.DOUBLE_END,

    },
    
    /** Keyframe CSS Statment */
    KEYFRAME: {
        
        /** Keyframe Key */
        KEY:'keyframes',

        /** Keyframe Block Delimiter */
        DELIMITER: ICSS.BLOCK.DOUBLE_END,

    },
    
    /** FontFace CSS Statment */
    FONTFACE: {
        
        /** FontFace Key */
        KEY:'font-face',

        /** Font Block Delimiter */
        DELIMITER: ICSS.BLOCK.END,

    },

}


export default ICSSStatments
