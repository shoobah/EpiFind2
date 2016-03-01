export default {
    siMain: {
        position: 'relative',
        //height: '80px'
    },
    siBase: {
        backgroundColor: '#f6f6f6',
        border: '1px solid #bfbfbf',
        borderTopLeftRadius: '0',
        borderTopRightRadius: '5px',
        borderBottomRightRadius: '5px',
        borderBottomLeftRadius: '5px',
        //height: '60px',
        minHeight: '50px',
        padding: '11px 11px 9px 11px',
        position: 'relative',
        top: '15px',
        '@media (max-width: 1025px)': {                        
        }
    },
    searchButton: {        
        height: '30px',
        position: 'absolute',
        right: '10px'
    },
    searchInput: {
        width: '673px',
        border: '1px solid #bfbfbf',
        borderRadius: '5px',
        height: '27px',
        paddingLeft: '5px',     
        '@media (max-width: 1025px)': {
            width: '80%',
            boxSizing: 'border-box',
            position: 'absolute',
            height: '30px'
        },
    },
    tab: {
        backgroundColor: '#f6f6f6',
        borderLeft: '1px solid #bfbfbf',
        borderTop: '1px solid #bfbfbf',
        borderRight: '1px solid #bfbfbf',
        borderBottom: 'none',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
        display: 'inline-block',
        fontSize: '.8em',
        fontWeight: 'normal',
        height: '16px',
        lineHeight: '20px',
        marginRight: '5px',
        padding: '0 11px',
        position: 'relative',
        zIndex: '999',
        cursor: 'pointer'
    },
    topTab: {
        top: '-14px',
        position: 'absolute'
    },
    bottomTab: {
        bottom: '-10px',
        height: '20px',
        borderBottom: '1px solid #bfbfbf',
        '@media (max-width: 1025px)': {
            bottom: '-38px'   
        }        
    },
    bottomTabActive: {
        backgroundColor: 'white',
        borderBottom: 'none',
        height: '21px',
        transition: 'background-color 0.5s, border-bottom 0.5s',
    },
    autoCompleteList: {
        zIndex: '2000',
        borderLeft: '1px solid #bfbfbf',
        borderRight: '1px solid #bfbfbf',
        borderBottom: '1px solid #bfbfbf',
        backgroundColor: 'white',        
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        position: 'absolute',
        padding: '0',
        width: '678px',
        top: '38px',
        '@media (max-width: 1025px)': {
            width: '80%',
            boxSizing: 'border-box'
        }
    },
    
    autoCompleteSelected:{
        backgroundColor: '#e9f1d9',
        textDecoration: 'underline'
    },
    
    autoCompleteItem: {
        cursor: 'pointer',
        lineHeight: 'normal',
        paddingTop: '5px',
        paddingBottom: '7px',
        paddingLeft: '10px',
        paddingRight: '10px',        
        ':hover': {
            textDecoration: 'underline',
            backgroundColor: '#e9f1d9'
        }
    },    
    autoCompleteItemLast:{                
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px'
    },
    dymDiv: {
        zIndex: '2000',
        border: '1px solid #bfbfbf',
        backgroundColor: '#ffe',
        left: '300px',
        borderRadius: '5px',
        padding: '10px',
        marginTop: '10px',
        '@media (max-width: 1025px)': {
            marginTop: '40px',
            wordBreak: 'break-all'
        }
    },
    dymList: {
        listStyle: 'none',
        padding: '0',
        marginTop: '10px'
    },
    dymItem: {
        cursor: 'pointer',
        lineHeight: '20px',
        paddingLeft: '10px',
        ':hover': {
            textDecoration: 'underline'
        }
    },
    blue: {
        backgroundColor: '#dcedf6',
        color: '#000'
    },
    pink: {
        backgroundColor: '#fbdad0',
        color: '#000'
    },
    orange: {
        backgroundColor: '#fff5c5',
        color: '#000'
    },
    purple: {
        backgroundColor: '#e8dfee',
        color: '#000'
    },
    green: {
        backgroundColor: '#e9f1d9',
        color: '#000'
    },
    red: {
        backgroundColor: '#e40427',
        color: '#fff'
    }
}