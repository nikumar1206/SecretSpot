export interface User {
	id: string;
	email: string;
	pfpURL: string;
	favorite_cuisine: string;
	followers: User[];
	following: User[];
	posts: Post[];
	places_been: Post[];
	places_to_go: Place[];
	recs: Place[];
	bookmarks: Place[];
	top5Spots: Post[];
}
export interface userInterface {
	email: string;
	password: string;
}
export interface editUserInterface {
	email: string;
	favorite_cuisine: string;
	id: string;
}

export interface Place {
	id: string;
	name: string;
	location: string;
	nameLocation: string;
	lat: number;
	lng: number;
	imageURL: string;
	rating?: number;
}

export interface Post {
	id: string;
	caption: string;
	rating: number;
	creator: User;
	place: Place;
	createdAt: Date;
	updatedAt: Date;
	bookmarked: boolean;
}
export interface postForm {
	place: string;
	rating: string;
	caption: string;
}
