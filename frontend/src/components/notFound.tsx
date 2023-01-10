const NotFound = () => {
	return (
		<div className="h-screen bg-teal-500">
			<div className="flex flex-col items-center justify-center h-screen bg-teal-500">
				<div className="text-6xl text-white">404</div>
				<div className="text-3xl text-white font-bold mt-10">
					Page Not Found
				</div>
				<div className="text-xl text-white mt-3">
					Looks like the page you're trying to visit doesn't exist.
				</div>
			</div>
		</div>
	);
};

export default NotFound;
