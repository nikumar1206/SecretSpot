const MainView = ({ view }: { view: String }) => {
	return view == "Recommended" ? <>Recommended</> : <>Not Recommended</>;
};
export default MainView;
