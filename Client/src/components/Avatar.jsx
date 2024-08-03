// components/Avatar.js
import React from 'react';

const Avatar = ({ initials, color = '#043432', size = 30 }) => {
	const avatarStyle = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: size,
		height: size,
		borderRadius: '50%',
		backgroundColor: color,
		color: '#fff',
		fontSize: size / 2.5,
		fontWeight: 'bold',
		textTransform: 'uppercase',
	};

	return <div style={avatarStyle}>{initials}</div>;
};

export default Avatar;
