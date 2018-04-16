import store from 'Store';
const mapWelcome = {
  State: state => ( {
    messages : store.greeter.get.messages( state ),
    publicId : store.user.get.publicId( state ),
  } ),
};

export default mapWelcome;
