const colors = {
  button: {
    default: {
      backgroundColor: 'rgb(255, 221, 45)',
      font: 'rgb(0, 0, 0)',
      border: 'rgb(255, 221, 45)',
    },
    hover: {
      backgroundColor: 'rgb(252, 197, 33)',
      font: 'rgb(0, 0, 0)',
      border: 'rgb(252, 197, 33)',
    },
    disabled: {
      backgroundColor: 'rgba(255, 221, 45, 0.56)',
      font: 'rgb(0, 0, 0)',
      border: 'rgba(255, 221, 45, 0.56)',
    },
  },

  input: {
    default: {
      backgroundColor: 'rgb(236, 241, 247)',
      font: 'rgb(0, 0, 0)',
      border: 'transparent',
    },
    hover: {
      backgroundColor: 'rgb(228, 235, 243)',
      font: 'rgb(0, 0, 0)',
      border: 'transparent',
    },
    focus: {
      backgroundColor: 'rgb(255, 255, 255)',
      font: 'rgb(0, 0, 0)',
      border: 'rgb(0, 0, 0)',
    },
    error: {
      default: {
        backgroundColor: 'rgba(224, 31, 25, 0.12)',
        font: 'rgb(227, 28, 28)',
        border: 'transparent',
      },
      hover: {
        fontColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgba(224, 31, 25, 0.16)',
        borderColor: 'transparent',
      },
      focus: {
        fontColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255, 255, 255)',
        borderColor: 'rgb(227, 28, 28)',
      },
    },
  },
}

export { colors }
