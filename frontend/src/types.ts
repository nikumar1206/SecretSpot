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
	imageURL: string;
}
export interface Post {
	id: string;
	caption: string;
	rating: number;
	creator: User;
	place: Place;
}
export interface postForm {
	place: string;
	rating: string;
	caption: string;
}
