module.exports = {
    columns: 12,
    offset: '30px',
    container: {
        maxWidth: '1170px',
        fields: '40px' // >= offset/2
    },
    breakPoints: {
        lg: {
            width: '992px',
        },
        md: {
            width: '768px',
            // fields: '15px'
        },
        sm: {
            width: '576px'
        },
        xs: {
            width: '480px'
        },
        // xxs: {
			  //     width: '350px',
        // }
	},
	detailedCalc: true
};
