export default {
    listContainer: {
        listStyle: 'none',
        padding: '0'
    },
    hitBase: {
        marginTop: '30px',
        borderBottom: 'solid 1px #c0c0c0',
        overflow: 'hidden',
        backgroundColor: 'white',        
        top: '20px',
        width: '740px',
        '@media (max-width: 1025px)': {
            width: '100%'
        },
    },
    hitIcon: {
        display: 'inline-block',
        padding: '5px',
        cursor: 'pointer',
        '@media (max-width: 515px)': {
            display: 'none'
        }
    },
     hitLinkContainer: {
        display: 'inline-block',
        margin: '0 auto 0 auto',
        width: '100%',
        textAlign:'center'
    },
     hitLink: {
        display: 'inline-block',
        padding: '5px',
        cursor: 'pointer'
    },
     hitLinkCurrent: {
        display: 'inline-block',
        padding: '5px',
        border: '1px solid #bfbfbf',
        fontWeight:'bold',
        '@media (max-width: 515px)': {
            display: 'none'
        }
    },
    hitContent: {
        display: 'inline-block',
        paddingBottom:'19px',
        verticalAlign: 'top',
        color: '#000',
        cursor: 'pointer',
        width: '600px',
        '@media (max-width: 1025px) and (min-width: 516px)': {
            width: '380px'
        },
        '@media (max-width: 515px)': {
             width: '100%'
        }
    },
    title: {
        fontFamily: 'Open Sans',
        textDecoration: 'none',
        fontSize: '15px',
        fontWeight: 'normal',
        color: '#333',
        ':hover': {
            textDecoration: 'underline'
        }
    },
    bestBetBox: {
        borderTop: 'solid 1px #bfbfbf',
        borderRight: 'solid 1px #bfbfbf',
        borderBottom: 'solid 1px #bfbfbf',
        borderLeft: 'solid 1px #bfbfbf',
        paddingTop:'30px',
        backgroundColor: 'white',
        borderRadius: '5px'
    },
    excerpt: {
        color: '#333',
        paddingTop: '19px',
        fontWeight: 'normal',
        fontSize: '13px'
    },
    breadcrumb: {
        paddingLeft: '70px',
        paddingBottom: '19px',
        width: '600px',
        '@media (max-width: 1025px) and (min-width: 516px)': {            
            width: '380px'
        },
        '@media (max-width: 515px)': {
            paddingLeft: '0px',
            width: '100%'
        }
    },
    breadcrumbheadline: {
        paddingLeft: '70px',
        fontStyle: 'italic',
        paddingBottom: '19px',
        width: '600px',
        '@media (max-width: 1025px) and (min-width: 516px)': {            
            width: '380px'
        },
        '@media (max-width: 515px)': {
            paddingLeft: '0px',
            width: '100%'
        }
    },
    breadcrumbItem: {
        color: '#00759a',
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline'
        }
    },
    searchhiticon:{
        width:'30px',
        marginLeft:'30px'  
    },
    bold: {
        fontWeight: 'bold'
    },
    waitGif: {
        position: 'absolute',
        zIndex: '10000',
        left: '660px',
        top: '14px',
        '@media (max-width: 320px)': {
            left: '250px'
        },
        '@media (max-width: 400px)': {
            width: '350px'
        },
        '@media (max-width: 515px)': {
            width: '450px'
        },
        '@media (max-width: 639px)': {
            width: '590px'
        },
    },
    waitGifImage: {
        width: '25px'
    },
    arrowBox: {
        height: '40px',
        top: '30px',
        position: 'relative'
    },
    pagerText: {
        display: 'inline-block',
        width: '100%',
        textAlign: 'center',
        fontSize: '18px',
        paddingTop: '5px',
    },
    nohitStyle: {              
        position: 'relative',
        marginBottom: '50px',
        paddingLeft : '10px',
        paddingRight : '10px',
        top: '25px'
    },
    failStyle: {
        backgroundColor: 'red'
    },
    arrow: {
        cursor: 'pointer'
    },
    left: {
        position: 'absolute',
        left: '0'
    },
    right: {
        position: 'absolute',
        right: '0'
    },
    noselect: {
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
    },
    faded: {
        opacity: '0.5',
        transition: 'all 0.5s'
    }
}