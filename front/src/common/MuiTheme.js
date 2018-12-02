import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '100%'
  },
  textField: {
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  selectMargin: {
  	marginTop: '-2em',//to compensate for the formHelperText height
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

export const theme = createMuiTheme({
	overrides: {
		MuiFormControl: {
			root: {
				width: '100%',
			}
		},
		MuiInputBase: {
			root:{
				border: '1px solid #fff',
				marginBottom: '20px',
				color:'#fff',
				borderRadius: '4px',
				"&$focused": {
          borderColor: "transparent"
        }
			}
		},
		MuiFormHelperText: {
			root: {
				  color: '#fff',
			    fontSize: '1em',
			    textAlign: 'left',
			    minHeight: '1em',
			    position: 'relative',
			    left: '1em',
			    top: '0.5em',
			    height: '1em',
			    overflow: 'hidden',
			    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
			    lineHeight: '1em',
			    width: '85%',
			    textOverflow: 'ellipsis',
			    whiteSpace: 'nowrap'
			},
			contained: {
				  top: '-1em',
    			left: '.3em',
    			margin: 0
			}
		},
	 	MuiFormLabel: {
 			root: {
	 			color:'#fff',
	 			'&$focused':{
	  			color: '#fff'
	  		}
  		},
    },
    MuiButtonBase: {
    	root: {
    		width: '100%'
    	}
    }
  },
  palette: {
    primary: { main: '#ffffff' },
    secondary: { main: '#ff0669' },
    error: { main: '#ff0669' },
  },
  typography: { useNextVariants: true },
});

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function getStyles(arr, val, that, sugg) {
  return {
    backgroundColor:
      that.state[arr].indexOf(val) === -1
        ? 'transparent'
        : 'rgba(0, 0, 0, 0.14)',
    fontWeight: 
      sugg 
      ? val.toLowerCase().indexOf(sugg.toLowerCase()) === 0 ? 'bold':'inherit' 
      : 'inherit'
  };
}