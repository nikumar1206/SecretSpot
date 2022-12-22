export interface User {
	id: string;
	email: string;
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
	nameLocation: string;
	caption: string;
}
