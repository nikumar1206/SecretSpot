import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Splash = () => {
	return (
		<section className="absolute w-full h-full overflow-hidden z-0">
			<video
				src="https://streetsmart-safeassets.s3.amazonaws.com/diningout_broll.mp4"
				autoPlay={true}
				muted
				loop
				className="absolute top-0 left-0 width-full overflow-hidden"
			></video>
			<div className="absolute m-auto text-center z-1 text-white w-full h-full flex-col justify-center items-center">
				<article>
					<h1 className="text-9xl mt-5 mb-3">Secret Spot</h1>
					<span className="text-xl">
						Find the best food spots, with friends!
					</span>
					<div className="flex gap-2 justify-center mt-5">
						<Link to="/login">
							<Button variant="outlined" size="md" color="amber">
								Login
							</Button>
						</Link>
						<Link to="/register">
							<Button variant="outlined" size="md" color="amber">
								Sign Up
							</Button>
						</Link>
					</div>
				</article>
			</div>
		</section>
	);
};

export default Splash;
