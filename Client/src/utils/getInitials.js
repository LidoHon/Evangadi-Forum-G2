export const getInitials = (username) => {
	if (!username) return '';
	const nameParts = username.split(' ');
	const initials = nameParts
		.map((part) => part.charAt(0).toUpperCase())
		.join('');
	return initials;
};
