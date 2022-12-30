import { Button } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { loginUser, registerUser } from "../utils/user_api";
import LoginSignup from "./loginSignup";

const Splash = () => {
	const [open, setOpen] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [modal, setModal] = useState("");
	const backgroundVideoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		backgroundVideoRef.current?.addEventListener("loadeddata", () =>
			setLoaded(true)
		);
	}, []);

	const handleOpen = (formType: string) => {
		setModal(formType);
		setOpen(!open);
	};

	return (
		<>
			{loaded ? null : (
				<div className="flex justify-center items-center w-full h-full">
					<div
						className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
						role="status"
					>
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			)}
			<video
				src="https://streetsmart-safeassets.s3.amazonaws.com/diningout_broll.mp4"
				autoPlay={true}
				muted
				loop
				ref={backgroundVideoRef}
				playsInline
				preload="true"
				onContextMenu={(e) => e.preventDefault()}
				onLoadedData={() => setLoaded(true)}
				className={`absolute top-0 left-0 w-full h-auto overflow-hidden z-0  m-0 ${
					loaded ? "" : "hidden"
				}`}
			></video>

			<div className="relative m-auto text-center z-1 text-white top-44 overflow-hidden">
				<div className="flex flex-col items-center justify-center">
					<article className="bg-black bg-opacity-40 flex flex-col items-center justify-center mx-auto rounded-xl pt-15 pb-11 px-20">
						<h1 className="font-h1 text-9xl mt-5 mb-5 font-thin">
							Secret Spot
						</h1>
						<span className="text-xl">
							Find the best food spots, with friends!
						</span>
						<div className="flex gap-2 justify-center mt-5">
							<Button
								variant="outlined"
								size="md"
								color="white"
								ripple={false}
								onClick={() => handleOpen("Login")}
								className="border-2"
							>
								Login
							</Button>
							<Button
								variant="outlined"
								size="md"
								color="white"
								ripple={false}
								onClick={() => handleOpen("Register")}
								className="border-2"
							>
								Sign Up
							</Button>
							<LoginSignup
								action={modal == "Login" ? loginUser : registerUser}
								formType={modal}
								setModal={setModal}
								setOpen={setOpen}
								open={open}
							></LoginSignup>
						</div>
					</article>
				</div>
			</div>
		</>
	);
};

export default Splash;
