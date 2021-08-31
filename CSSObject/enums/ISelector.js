/**
 * @enum ISelector
 * Selector Types
 */
 const ISelector = {

	/** Universal Selector */
	UniversalSelector: "*",

	/** Tag Selector Type */
	TagSelector: "",

	/** ID Selector Type */
	IDSelector: "#",
	
	/** Class Selector Type */
	ClassSelector: ".",
	
	/** Attribute Selector Type */
	AttrSelector: "[",
	
	/** Pseudo-Class Selector Type */
	PseudoSelector: ":",
	
	/** Pseudo-Element Selector Type */
	PseudoElementSelector: "::",

	/** Percentage Selector Type (Keyframe) */
	PercentageSelector: "%",

	/** From Keyframe Selector Type */
	FromKeyframeSelector: "from",

	/** To Keyframe Selector Type */
	ToKeyframeSelector: "to"

}


export default ISelector
