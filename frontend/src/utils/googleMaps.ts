const googleMapsStyle = [
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [
			{
				color: "#A3D5D6",
			},
			{
				lightness: 17,
			},
		],
	},
	{
		featureType: "landscape",
		elementType: "geometry",
		stylers: [
			{
				color: "#ffffff",
			},
			{
				lightness: 20,
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#C0C3C8",
			},
			{
				lightness: 17,
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#C0C3C8",
			},
			{
				lightness: 29,
			},
			{
				weight: 0.2,
			},
		],
	},
	{
		featureType: "road.arterial",
		elementType: "geometry",
		stylers: [
			{
				color: "#C0C3C8",
			},
			{
				lightness: 18,
			},
		],
	},
	{
		featureType: "road.local",
		elementType: "geometry",
		stylers: [
			{
				color: "#ffffff",
			},
			{
				lightness: 16,
			},
		],
	},
	{
		featureType: "poi",
		elementType: "geometry",
		stylers: [
			{
				color: "#f1f1f1",
			},
			{
				lightness: 21,
			},
		],
	},
	{
		elementType: "labels.text.stroke",
		stylers: [
			{
				visibility: "on",
			},
			{
				color: "#ffffff",
			},
			{
				lightness: 16,
			},
		],
	},
	{
		elementType: "labels.text.fill",
		stylers: [
			{
				saturation: 36,
			},
			{
				color: "#333333",
			},
			{
				lightness: 40,
			},
		],
	},
	{
		elementType: "labels.icon",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "transit",
		elementType: "geometry",
		stylers: [
			{
				color: "#f2f2f2",
			},
			{
				lightness: 19,
			},
		],
	},
	{
		featureType: "administrative",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#fefefe",
			},
			{
				lightness: 20,
			},
		],
	},
	{
		featureType: "administrative",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#fefefe",
			},
			{
				lightness: 17,
			},
			{
				weight: 1.2,
			},
		],
	},
];
export default googleMapsStyle;
