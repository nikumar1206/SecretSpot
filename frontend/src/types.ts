export interface User {
	id: string;
	username: string;
	pfpURL: string;
	favorite_cuisine: string;
	followers: User[];
	following: User[];
	posts: Post[];
	places_been: Place[];
	places_to_go: Place[];
	recs: Place[];
	bookmarks: Place[];
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
	createdAt: Date;
	updatedAt: Date;
	bookmarked: boolean;
}
export interface postForm {
	place: string;
	rating: string;
	caption: string;
}
