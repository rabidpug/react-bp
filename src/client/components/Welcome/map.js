import { getGreeterMessages, } from 'Store/greeter/selectors';
import { getPublicId, } from 'Store/user/selectors';

const mapWelcome = {
  State: state => ( {
    messages : getGreeterMessages( state ),
    publicId : getPublicId( state ),
  } ),
};

export default mapWelcome;
