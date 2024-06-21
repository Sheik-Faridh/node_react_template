export const getTheme = (mode = 'light') => ({
  palette: {
    type: mode,
    primary: {
      main: '#9933cc',
    },
    secondary: {
      main: '#f50057',
    },
  },
})
