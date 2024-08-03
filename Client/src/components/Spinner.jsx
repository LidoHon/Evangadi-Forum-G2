import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
const override = {
	display: 'block',
	margin: '75px auto',
};
const Spinner = (loading) => {
	return (
		<MoonLoader
			color="#b1e0cc"
			loading={loading}
			cssOverride={override}
			size={25}
		/>
	);
};

export default Spinner;
