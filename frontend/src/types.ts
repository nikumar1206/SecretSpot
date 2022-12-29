export interface User {
	id: string;
	username: string;
}

export interface Place {
	id: string;
	name: string;
	location: string;
	nameLocation: string;
	lat: number;
	lng: number;
	imageUrl: string;
}
export interface Post {
	id: string;
	caption: string;
	creator: User;
	place: Place;
}
export interface postForm {
	place: string;
	rating: string;
	caption: string;
}
