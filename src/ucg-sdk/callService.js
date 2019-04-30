import callAction from './callAction';

function callService(options) {
  if (!options) return;
  return (
    callAction({
      ...options
    })
  )
}

export default callService