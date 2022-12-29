export interface User {
	id: string;
	username: string;
}
export interface Post {
	id: string;
	name: string;
	location: string;
	caption: string;
	attendies: User[];
	createdAt: string;
	updatedAt: string;
	imageUrl: string;
	lat: number;
	lng: number;
	creator: User;
}
export interface postForm {
	place: string;
	rating: number;
	caption: string;
}
