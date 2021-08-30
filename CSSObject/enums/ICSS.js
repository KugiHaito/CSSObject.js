/**
 * @enum ICSS
 * CSS Symbols
 */
const ICSS = {

	/** Empty Character */
	EMPTY: '',

	/** At Character */
	AT: '@',

	/** Dots Character */
	DOTS: ':',

	/** Comma Character */
	COMMA: ',',

	/** Semicolon Character */
	SEMICOLON: ';',

	/** Break Line Character */
	BREAK_LINE: '\n',

	/** Important Rule Character */
	IMPORTANT: '!',

	/** Block Characters */
	BLOCK: {

		/** Begin Block Character */
		BEGIN: '{',
		
		/** End Block Character */
		END: '}',

		/** Double End Block Characters */
		DOUBLE_END: '}}'

	},
	
	/** Bracket Characters */
	BRACKET: {
		
		/** Begin Bracket Character */
		BEGIN: '(',
		
		/** End Bracket Character */
		END: ')',
		
		/** End Rule Bracket Characters */
		END_RULE: ');'

	},
	
	/** Data URI Character */
	DATA_URI: {

		/** Data URI Index Character */
		KEY: 'data:',

		/** Data URI Characters (to replace) */
		KEYS: {':': '=', ';': '&'},

		/** Data URI Characters (inverted keys) */
		VALUES: {'=': ':', '&': ';'}
	},

	/** Pseudo Characters */
	PSEUDO: {

		/** Pseudo Indexs Characters */
		KEYS: [':', '::', '@'],
		
		/** Pseudo Class Character */
		CLASS: ':',
		
		/** Pseudo Element Character */
		ELEMENT: '::',
		
		/** Pseudo Event Character (custom pseudo type) */
		EVENT: '@'
	
	},
	
	/** Regex to Commments Characters */
	REGEX_COMMENTS: /\/\*(\r|\n|.)*\*\//g,
	
	/** Regex to Functions Characters */
	REGEX_BRACKETS: /\(([^)]+)\)/,

	/** Regex Replace to CSS Characters */
	REGEX_REPLACE: (str, obj) => {
		return str.replace(new RegExp(Object.keys(obj).join('|'), 'g'), i => obj[i])
	}

}


export default ICSS
